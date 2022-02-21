import { type } from "os";

export type Gender = "m" | "f";

export interface Inputs {
  givenName: string;
  familyName: string;
  gender: Gender;
}

export interface CharDetails {
  char: string;
  pinyin: string;
  pronunciation: string;
}

export interface MingParams {
  gender: Gender;
  is_transliteration?: boolean;
}

export type MingOptions = [CharDetails[], CharDetails[]] | [CharDetails[]];

export interface MingResult {
  translation: string;
  options: MingOptions;
}

export interface XingParams {
  is_transliteration?: boolean;
}

export interface XingResult {
  translation: string;
  options: CharDetails[];
}
