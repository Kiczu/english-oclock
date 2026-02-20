import { Box } from "@mui/material";

const Wave = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: { xs: 160, md: 400 },
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
      >
        <path
          fill="#374373"
          d="
            M0,210
            C160,150 320,150 480,200
            C640,255 800,265 960,215
            C1120,165 1280,155 1440,195
            L1440,320 L0,320 Z
          "
        />
      </svg>
    </Box>
  );
};

export default Wave;
