import { watch } from "vue";
import { absoluteUrl, defaultDescription, defaultTitle, ogImagePath, siteUrl, twitterImagePath } from "../config/site";
import { path } from "./useRouteObserver";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function canonicalPathname(routePath: string): string {
  if (!routePath || routePath === "/") return "/";
  return routePath.endsWith("/") ? routePath.slice(0, -1) : routePath;
}

export function useSiteSeo() {
  watch(
    path,
    (routePath) => {
      const pathname = canonicalPathname(routePath);
      const url = absoluteUrl(pathname);

      document.title = defaultTitle;
      upsertLink("canonical", url);
      upsertMeta("name", "description", defaultDescription);
      upsertMeta("property", "og:title", defaultTitle);
      upsertMeta("property", "og:description", defaultDescription);
      upsertMeta("property", "og:type", "website");
      upsertMeta("property", "og:url", url);
      upsertMeta("property", "og:locale", "es_PE");
      upsertMeta("property", "og:image", absoluteUrl(ogImagePath));
      upsertMeta("property", "og:image:width", "1200");
      upsertMeta("property", "og:image:height", "630");
      upsertMeta("property", "og:image:alt", "Enrique Roncal — Ingeniero de Sistemas, portafolio web");
      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:title", defaultTitle);
      upsertMeta("name", "twitter:description", defaultDescription);
      upsertMeta("name", "twitter:image", absoluteUrl(twitterImagePath));
    },
    { immediate: true },
  );
}

export { siteUrl };
