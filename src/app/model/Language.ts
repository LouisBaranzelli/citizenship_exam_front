export interface Language {
  id: "language.fr" | "language.en"
}

export const DEFAULT_LANGUAGE: Language = {id: "language.fr"}

export const LANGUAGES: string[] = ["language.fr", "language.en"]

export function getCodeLanguage(language: string): string {
  return language.split(".")[1]
}

