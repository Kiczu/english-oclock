export function getVariant(p: { isFree?: boolean; isBestseller?: boolean }) {
    if (p.isFree) return "free" as const;
    if (p.isBestseller) return "bestseller" as const;
    return "paid" as const;
}

export function hash01(input: string) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    const u = h >>> 0;
    return (u % 10_000) / 10_000;
}

export function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export const roughFrameA = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">
  <path d="M20 18
           C60 6, 120 8, 150 12
           C190 18, 260 8, 282 22
           C294 34, 292 80, 286 108
           C280 140, 296 182, 274 198
           C250 214, 180 206, 150 206
           C110 206, 56 216, 26 198
           C10 186, 8 148, 14 110
           C18 78, 4 42, 20 18 Z"
        fill="none" stroke="#374373" stroke-width="6"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`);

export const roughFrameB = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">
  <path d="M26 20
           C58 10, 112 4, 150 12
           C196 22, 252 6, 280 26
           C298 42, 286 84, 288 112
           C290 144, 298 182, 270 198
           C240 212, 188 206, 150 206
           C110 206, 60 214, 30 198
           C10 184, 16 148, 14 112
           C12 84, 6 44, 26 20 Z"
        fill="none" stroke="#374373" stroke-width="6"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`);