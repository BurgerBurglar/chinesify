export type Gender = "m" | "f";

export interface Inputs {
  givenName: string;
  familyName: string;
  gender: Gender;
}

export interface CharDetails {
  char: string;
  pinyin_tone: string;
}

export interface MingParams {
  gender: Gender;
  is_transliteration?: boolean;
}

export interface MingResult {
  translation: string;
  options: [CharDetails[], CharDetails[]];
}

export interface XingParams {
  is_transliteration?: boolean;
}

export interface XingResult {
  translation: string;
  options: CharDetails[];
}
