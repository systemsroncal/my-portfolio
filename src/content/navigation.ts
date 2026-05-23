export const NAV_SECTIONS = [
  "about",
  "experience",
  "education",
  "skills",
  "projects",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
