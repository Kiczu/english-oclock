// Set NEXT_PUBLIC_FACEBOOK_URL to the real page/profile URL when it's ready.
const configuredFacebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();

export const socialLinks = {
  facebook: configuredFacebookUrl || "https://www.facebook.com/",
} as const;
