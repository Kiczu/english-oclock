"use client";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Box, Typography } from "@mui/material";
import { socialLinks } from "@/app/config/socialLinks";
import { floatingFacebookButtonStyles } from "./FloatingFacebookButton.styles";

const FloatingFacebookButton = () => {
  return (
    <Box sx={floatingFacebookButtonStyles.root}>
      <Box
        component="a"
        href={socialLinks.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Otworz profil English O'clock na Facebooku"
        sx={floatingFacebookButtonStyles.link}
      >
        <Box sx={floatingFacebookButtonStyles.content}>
          <Box sx={floatingFacebookButtonStyles.iconWrap}>
            <FacebookRoundedIcon sx={floatingFacebookButtonStyles.icon} />
            <Box sx={floatingFacebookButtonStyles.ping} />
          </Box>

          <Box sx={floatingFacebookButtonStyles.textStack}>
            <Typography component="span" sx={floatingFacebookButtonStyles.eyebrow}>
              Social
            </Typography>
            <Typography component="span" sx={floatingFacebookButtonStyles.label}>
              Facebook
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FloatingFacebookButton;
