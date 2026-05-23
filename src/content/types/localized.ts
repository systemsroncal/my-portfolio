import type { Locale } from "../../i18n/types";

export type Localized<T> = Record<Locale, T>;
