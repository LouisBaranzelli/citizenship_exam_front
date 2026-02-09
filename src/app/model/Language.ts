import {Level} from './Level';

export function getCodeLanguage(language: string): string {
  return language.split(".")[1]
}


export enum LanguageID {
  L1= "language.fr",
  L2= "language.en",
  L3= "language.ru"
}

export const DEFAULT_LANGUAGE = {id: LanguageID.L1}

export interface Language {
  id: LanguageID
}

export function findLanguage(languageStr: string): Language {
  const languageId =LANGUAGES.find(val => val === languageStr) as LanguageID;
  return {id: languageId}
}


export const LANGUAGES: string[] = Object.values(LanguageID)
