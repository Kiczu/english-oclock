import { hash01, roughFrameA, roughFrameB } from "@/app/helpers/productCard";
import type { ShopProduct } from "@/app/types/commerce";

const DEFAULT_GALLERY_LABEL = "Podglad";
const FRAME_SVG_PREFIX = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">';

export const FALLBACK_PREVIEW_SRC = "/images/file.svg";
export const DEFAULT_ZOOM_ORIGIN = "50% 50%";
export const THUMBS_PER_PAGE = 3;

type GalleryItem = ShopProduct["gallery"][number];

const normalizeFrameSvg = (frameBase: string) =>
  frameBase.replace(
    FRAME_SVG_PREFIX,
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" preserveAspectRatio="none">',
  );

const withFrameStrokeWidth = (frameBase: string, strokeWidth: number) =>
  normalizeFrameSvg(frameBase).replace(
    'stroke-width="6"',
    `stroke-width="${strokeWidth}"`,
  );

const toFrameMask = (encodedFrame: string) => {
  const rawSvg = decodeURIComponent(encodedFrame);
  const filledShapeSvg = rawSvg
    .replace(/fill="none"/g, 'fill="white"')
    .replace(/stroke="#[^"]+"/g, 'stroke="none"')
    .replace(/stroke-width="[^"]+"/g, "")
    .replace(/stroke-linecap="[^"]+"/g, "")
    .replace(/stroke-linejoin="[^"]+"/g, "");

  return encodeURIComponent(filledShapeSvg);
};

const clampIndex = (value: number, max: number) =>
  Math.max(0, Math.min(max, value));

export const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export const canRenderImage = (src?: string, brokenSources?: Set<string>) =>
  Boolean(src && src !== FALLBACK_PREVIEW_SRC && !brokenSources?.has(src));

export const toSafeGalleryItems = (items: ShopProduct["gallery"]) =>
  items.length
    ? items
    : [{ src: FALLBACK_PREVIEW_SRC, label: DEFAULT_GALLERY_LABEL }];

export const resolveActiveItem = (
  items: ShopProduct["gallery"],
  activeIndex: number,
) => {
  const maxActiveIndex = Math.max(0, items.length - 1);
  const activeResolvedIndex = clampIndex(activeIndex, maxActiveIndex);
  const active = items[activeResolvedIndex] ?? items[0];

  return { maxActiveIndex, activeResolvedIndex, active };
};

export const resolveThumbViewport = (
  items: ShopProduct["gallery"],
  thumbPageIndex: number,
) => {
  const totalThumbPages = Math.max(1, Math.ceil(items.length / THUMBS_PER_PAGE));
  const maxThumbPageIndex = totalThumbPages - 1;
  const activeThumbPageIndex = clampIndex(thumbPageIndex, maxThumbPageIndex);
  const thumbStart = activeThumbPageIndex * THUMBS_PER_PAGE;
  const visibleThumbItems = items.slice(thumbStart, thumbStart + THUMBS_PER_PAGE);

  return {
    totalThumbPages,
    maxThumbPageIndex,
    activeThumbPageIndex,
    thumbStart,
    visibleThumbItems,
    canGoBack: activeThumbPageIndex > 0,
    canGoNext: activeThumbPageIndex < maxThumbPageIndex,
  };
};

const getFrameBase = (seedKey: string) =>
  hash01(seedKey) > 0.5 ? roughFrameA : roughFrameB;

export const createMainFrame = (title: string, src?: string) => {
  const frameBase = getFrameBase(`${title}-${src ?? ""}`);

  return {
    frame: withFrameStrokeWidth(frameBase, 12),
    frameMask: toFrameMask(frameBase),
  };
};

export const createThumbFrame = (
  title: string,
  item: GalleryItem,
  globalIndex: number,
  isActive: boolean,
) => {
  const frameBase = getFrameBase(`${title}-${item.src}-${globalIndex}`);
  return withFrameStrokeWidth(frameBase, isActive ? 14 : 12);
};
