import { computed, watch } from "vue";
import { path } from "./useRouteObserver";
import { locale } from "../i18n/store";
import { changeLocale } from "../i18n/utils/locale";

import type { Locale } from "../i18n/types";

export type LegalPage = "legal" | "privacy";

export interface ParsedLegalRoute {
  page: LegalPage;
  locale: Locale;
}

const LEGAL_PATHS: Record<string, ParsedLegalRoute> = {
  "/legal": { page: "legal", locale: "es" },
  "/privacy": { page: "privacy", locale: "es" },
  "/en/legal": { page: "legal", locale: "en" },
  "/en/privacy": { page: "privacy", locale: "en" },
};

export const legalPaths = {
  legal: { es: "/legal", en: "/en/legal" },
  privacy: { es: "/privacy", en: "/en/privacy" },
} as const;

export function parseLegalRoute(pathname: string): ParsedLegalRoute | null {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return LEGAL_PATHS[normalized] ?? null;
}

export const legalRoute = computed(() => parseLegalRoute(path.value));

export const isLegalRoute = computed(() => legalRoute.value !== null);

export function getLegalPath(page: LegalPage, targetLocale: Locale) {
  return legalPaths[page][targetLocale];
}

export function useLegalRouteSync() {
  watch(
    legalRoute,
    (route) => {
      if (!route) return;
      if (locale.value !== route.locale) {
        changeLocale(route.locale);
      }
    },
    { immediate: true },
  );
}
