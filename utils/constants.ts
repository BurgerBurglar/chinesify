import { Gender, MingResult, XingResult } from "../types";

export const INITIAL_GIVEN_NAME = "Chandan";
export const INITIAL_FAMILY_NAME = "Amonkar";
export const INITIAL_GENDER: Gender = "m";

export const INITIAL_XING_OPTIONS: XingResult = [
  {
    char: "孟",
    pinyin: "mèng",
    pronunciation:
      "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/meng4.mp3?raw=true",
  },
  {
    char: "蒙",
    pinyin: "méng",
    pronunciation:
      "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/meng2.mp3?raw=true",
  },
];

export const INITIAL_MING_OPTIONS: MingResult = [
  [
    {
      char: "晨",
      pinyin: "chén",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/chen2.mp3?raw=true",
    },
    {
      char: "臣",
      pinyin: "chén",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/chen2.mp3?raw=true",
    },
    {
      char: "辰",
      pinyin: "chén",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/chen2.mp3?raw=true",
    },
    {
      char: "陈",
      pinyin: "chén",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/chen2.mp3?raw=true",
    },
    {
      char: "宸",
      pinyin: "chén",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/chen2.mp3?raw=true",
    },
  ],
  [
    {
      char: "旦",
      pinyin: "dàn",
      pronunciation:
        "https://github.com/shikangkai/Chinese-Pinyin-Audio/blob/master/Pinyin-Female/dan4.mp3?raw=true",
    },
  ],
];
