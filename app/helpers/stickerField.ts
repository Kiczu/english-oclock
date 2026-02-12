const withStrokeWidth = (encodedSvg: string, width: number) => {
  const svg = decodeURIComponent(encodedSvg);
  const patched = svg.replace(
    /stroke-width="[^"]*"/g,
    `stroke-width="${width}"`
  );
  return encodeURIComponent(patched);
};

export const roughInputWideA = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 110" width="1200" height="110">
  <path d="
    M 108 18
    C 220 6, 360 12, 500 14
    C 640 16, 760 6, 900 12
    C 1020 18, 1090 10, 1120 16
    C 1196 14, 1186 24, 1186 34
    C 1190 12, 1178 68, 1186 64
    C 1188 80, 1182 86, 1186 92
    C 1178 105, 1152 92, 1120 94
    C 1070 98, 980 88, 840 90
    C 700 92, 560 102, 420 96
    C 300 90, 210 88, 86 100
    C 14 105, 30 78, 26 62
    C 22 34, 34 86, 26 22
    C 20 22, 46 12, 108 18
    Z"
    fill="none"
    stroke="#374373"
    stroke-width="8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`);


export const roughInputWideB = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 110" width="1200" height="110">
  <path d="
    M 108 18
    C 220 6, 360 12, 500 14
    C 640 16, 760 6, 900 12
    C 1020 18, 1090 10, 1120 16
    C 1196 14, 1186 24, 1186 34
    C 1190 12, 1178 68, 1186 64
    C 1188 80, 1182 86, 1186 92
    C 1178 105, 1152 92, 1120 94
    C 1070 98, 980 88, 840 90
    C 700 92, 560 102, 420 96
    C 300 90, 210 88, 86 100
    C 14 105, 30 78, 26 62
    C 22 34, 34 86, 26 22
    C 20 22, 46 12, 108 18
    Z"
    fill="none"
    stroke="#374373"
    stroke-width="8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
`);


export const roughTextareaWideA = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 280">
  <path d="
    M 70 30
    C 210 18, 420 22, 600 38
    C 780 54, 980 22, 1120 28

    C 1162 30, 1186 48, 1186 74
    C 1176 108, 1180 142, 1186 176
    C 1188 206, 1166 238, 1122 254

    C 980 260, 780 246, 600 252
    C 420 258, 230 266, 90 258

    C 48 256, 22 238, 22 212
    C 30 176, 26 142, 22 108
    C 18 78, 38 44, 70 30
    Z"
    fill="none"
    stroke="#374373"
    stroke-width="6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>


`);

export const roughTextareaWideB = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 280">
  <path d="
    M 45 34

    C 170 18, 260 18, 330 28
    C 400 38, 410 18, 510 26
    C 610 34, 620 18, 690 26
    C 770 34, 780 18, 880 22
    C 980 26, 1060 12, 1122 20

    C 1162 30, 1186 48, 1186 74
    C 1176 108, 1180 142, 1186 176
    C 1188 256, 1166 248, 1122 254

    C 1060 262, 980 248, 880 252
    C 780 256, 770 236, 690 246
    C 610 256, 610 238, 510 246
    C 410 254, 400 238, 330 246
    C 260 254, 170 262, 60 258

    C 44 256, 22 238, 22 212
    C 30 176, 26 142, 22 108
    C 18 78, 38 44, 45 34
    Z"
    fill="none"
    stroke="#374373"
    stroke-width="6"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>


`);

export const roughInputWideA_Thick = withStrokeWidth(roughInputWideA, 12);
export const roughInputWideB_Thick = withStrokeWidth(roughInputWideB, 12);
export const roughTextareaWideA_Thick = withStrokeWidth(roughTextareaWideA, 12);
export const roughTextareaWideB_Thick = withStrokeWidth(roughTextareaWideB, 12);
