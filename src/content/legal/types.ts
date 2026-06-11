export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "p"; html: string }
  | { type: "ul"; items: string[] };

export interface LegalDocument {
  title: string;
  updated: string;
  langSwitchLabel: string;
  blocks: LegalBlock[];
}
