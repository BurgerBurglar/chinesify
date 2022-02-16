from dataclasses import dataclass
from pypinyin import lazy_pinyin, load_single_dict
import pandas as pd


@dataclass
class CharDetails:
    char: str
    pinyin_tone: str


load_single_dict({ord("什"): "shí,shén"})

df_ming = pd.read_csv("data/ming_chars.csv")
ming_pinyins: list[str] = list(df_ming["pinyin"].unique())

df_xing = pd.read_csv("data/xings.csv")
xing_pinyins: list[str] = list(df_xing["pinyin"].unique())


def get_pinyin(char: str) -> str:
    pinyin = lazy_pinyin(char)[0]
    return pinyin


def beautify_ming(original: str, gender: str) -> list[list[CharDetails]]:
    if gender.lower() not in ["m", "f"]:
        raise ValueError("Gender must be either M or F.")

    two_char_ming = original[:2]

    char_details_options: list[list[CharDetails]] = []

    for i, char in enumerate(two_char_ming):
        position = i + 1
        pinyin = get_pinyin(char)

        df_heteronym = df_ming[
            (df_ming["pinyin"] == pinyin)
            & (df_ming["position"] == position)
            & (df_ming["gender"] == gender.lower())
        ]
        char_details_list: list[CharDetails] = [
            {"char": row[1]["char"], "pinyin_tone": row[1]["pinyin_tone"]}
            for row in df_heteronym.iterrows()
        ]
        if len(char_details_list) != 0:
            chosen_char_details = char_details_list[0:5]
        else:
            chosen_char_details = [char]
        char_details_options.append(chosen_char_details)

    return char_details_options


def beautify_xing(original: str, position=0) -> list[CharDetails]:
    length = len(original)
    if length == 0:
        raise ValueError("I don't know how to pronounce this name :/")
    if position >= length:
        position = 0

    one_char_xing = original[position]
    pinyin = get_pinyin(one_char_xing)

    all_options: list[CharDetails] = [
        {"char": row[1]["xing"], "pinyin_tone": row[1]["pinyin_tone"]}
        for row in df_xing[df_xing["pinyin"] == pinyin].iterrows()
    ]

    if len(all_options) == 0:
        if position == length - 1:
            return [original[0]]
        return beautify_xing(original, position + 1)
    return all_options


if __name__ == "__main__":
    print(beautify_ming("凯尔", "m"))
