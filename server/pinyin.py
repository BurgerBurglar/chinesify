from pypinyin import lazy_pinyin, load_single_dict
import pandas as pd

load_single_dict({ord("什"): "shí,shén"})

df_ming = pd.read_csv("data/ming_chars.csv")
ming_pinyins: list[str] = list(df_ming["pinyin"].unique())

df_xing = pd.read_csv("data/xings.csv")
xing_pinyins: list[str] = list(df_xing["pinyin"].unique())


def get_pinyin(char: str) -> str:
    pinyin = lazy_pinyin(char)[0]
    return pinyin


def beautify_ming(original: str, gender: str) -> list[list[str]]:
    if gender.lower() not in ["m", "f"]:
        raise ValueError("Gender must be either M or F.")

    two_char_ming = original[:2]

    ming_chars_options: list[list[str]] = []

    for i, char in enumerate(two_char_ming):
        position = i + 1
        pinyin = get_pinyin(char)

        df_heteronym = df_ming[
            (df_ming["pinyin"] == pinyin)
            & (df_ming["position"] == position)
            & (df_ming["gender"] == gender.lower())
        ]
        options: list[str] = df_heteronym["char"].to_list()
        if len(options) != 0:
            heteronym = options[0:5]
        else:
            heteronym = [char]
        ming_chars_options.append(heteronym)

    return ming_chars_options


def beautify_xing(original: str, position=0) -> list[str]:
    length = len(original)
    if length == 0:
        raise ValueError("I don't know how to pronounce this name :/")
    if position >= length:
        position = 0

    one_char_xing = original[position]
    pinyin = get_pinyin(one_char_xing)

    all_options: list[str] = df_xing[df_xing["pinyin"] == pinyin]["xing"].to_list()

    if len(all_options) == 0:
        if position == length - 1:
            return [original[0]]
        return beautify_xing(original, position + 1)
    return all_options


if __name__ == "__main__":
    print(beautify_ming("凯尔", "m"))
