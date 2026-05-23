import { watch } from "vue";
import { loadTranslations } from "../utils/load";
import { locale, translations } from "../store";
import { onMounted } from "vue";
import { LOCALES, LOCALE_DEFAULT } from "../constants";

import type { Locale } from "../types";

const STORAGE_KEY = "roncal-portfolio-locale";

export const useTranslations = () => {
  onMounted(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;

    if (stored && stored in LOCALES) {
      locale.value = stored;
    } else {
      locale.value = LOCALE_DEFAULT;
    }

    document.documentElement.lang = locale.value ?? LOCALE_DEFAULT;
  });

  watch(locale, () => {
    if (!locale.value) return;
    window.localStorage.setItem(STORAGE_KEY, locale.value);
    document.documentElement.lang = locale.value;
  });

  watch(
    locale,
    async (newLocale) => {
      if (!newLocale) return;
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );
};
