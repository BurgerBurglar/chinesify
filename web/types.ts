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
  originalName: string;
  gender: Gender;
}

export type MingOptions = [CharDetails[], CharDetails[]] | [CharDetails[]];

export type MingResult = [CharDetails[], CharDetails[]];

export interface MingRow {
  gender: string;
  char: string;
  position: string;
  pinyin: string;
  pinyin_tone: string;
}

export interface XingParams {
  originalName: string;
}

export type XingResult = CharDetails[];

export interface XingRow {
  xing: string;
  pinyin: string;
  pinyin_tone: string;
}
