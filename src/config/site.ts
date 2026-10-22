const DEFAULT_SITE_URL = "https://roncalportfolio.netlify.app";

export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? DEFAULT_SITE_URL;

export const siteName = "Enrique Roncal — Portafolio";

export const defaultTitle = "Enrique Roncal - Ingeniero de Sistemas | Desarrollo Web";

export const defaultDescription =
  "Ingeniero de Sistemas (+5 años): desarrollo web, AWS, e-commerce, BI e IA. Proyectos full-stack desde Lima, Perú.";

export const ogImagePath = "/meta/og-image.webp";

export const twitterImagePath = "/meta/twitter-image.webp";

export function absoluteUrl(pathname = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path}`;
}
