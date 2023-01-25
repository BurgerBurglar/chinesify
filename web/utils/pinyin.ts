import { readFile } from "fs/promises";
import neatCsv from "neat-csv";
import p from "pinyin";
import { IPinyinMode } from "pinyin/lib/declare";
import { CharDetails, Gender, MingResult, MingRow, XingRow } from "../types";

const xingsRaw = await readFile("./data/xings.csv", { encoding: "utf-8" });
const xingRows = await neatCsv<XingRow>(xingsRaw);

const mingsRaw = await readFile("./data/ming_chars.csv", { encoding: "utf-8" });
const mingRows = await neatCsv<MingRow>(mingsRaw);

const getPronunciation = (pinyinTone: string) => {
  const pinyinToneNumber = p(pinyinTone, { style: "TO3NE" });
  return `https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/${pinyinToneNumber}.mp3?raw=true`;
};

const getPinyins = (chars: string, mode: IPinyinMode) =>
  p(chars, { style: "normal", mode }).map((el) => el[0]);

export const beautifyMing = (originalMing: string, gender: Gender) => {
  const twoCharMing =
    originalMing.length === 1
      ? originalMing.repeat(2)
      : originalMing.slice(0, 2);

  const pinyins = getPinyins(twoCharMing, "NORMAL");

  const filteredMingRows = [
    mingRows
      .filter(
        ({ pinyin, position, gender: genderFromFile }) =>
          position === "1" && pinyin === pinyins[0] && gender === genderFromFile
      )
      .slice(0, 5),
    mingRows
      .filter(
        ({ pinyin, position, gender: genderFromFile }) =>
          position === "2" && pinyin === pinyins[1] && gender === genderFromFile
      )
      .slice(0, 5),
  ] as [MingRow[], MingRow[]];

  const beautifiedMing = filteredMingRows.map((rows) =>
    rows.map(({ char, pinyin_tone }) => ({
      char,
      pinyin: pinyin_tone,
      pronunciation: getPronunciation(pinyin_tone),
    }))
  ) as MingResult;

  return beautifiedMing;
};

export const beautifyXing = (originalXing: string) => {
  const pinyin = getPinyins(originalXing, "SURNAME")[0];
  console.log(pinyin);
  const filteredXingRows = xingRows
    .filter(({ pinyin: pinyinFromFile }) => pinyin === pinyinFromFile)
    .slice(0, 5);
  const beautifiedXing = filteredXingRows.map(({ xing, pinyin_tone }) => ({
    char: xing,
    pinyin: pinyin_tone,
    pronunciation: getPronunciation(pinyin_tone),
  })) as CharDetails[];
  return beautifiedXing;
};
