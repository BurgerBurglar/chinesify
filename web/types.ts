export type Gender = "m" | "f";

export interface MingParams {
  gender: Gender;
  is_transliteration?: boolean;
}

export interface MingResult {
  translation: string;
  options: [string[], string[]];
}

export interface XingParams {
  is_transliteration?: boolean;
}

export interface XingResult {
  translation: string;
  options: string[];
}
