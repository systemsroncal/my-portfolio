import { legalEs } from "./es";
import { legalEn } from "./en";
import { privacyEs } from "../privacy/es";
import { privacyEn } from "../privacy/en";

import type { Locale } from "../../i18n/types";
import type { LegalDocument } from "./types";
import type { LegalPage } from "../../composables/useLegalRoute";

const documents: Record<LegalPage, Record<Locale, LegalDocument>> = {
  legal: { es: legalEs, en: legalEn },
  privacy: { es: privacyEs, en: privacyEn },
};

export function getLegalDocument(page: LegalPage, docLocale: Locale): LegalDocument {
  return documents[page][docLocale];
}
