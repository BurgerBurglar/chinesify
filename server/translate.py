from typing import Optional
import requests
import os
from guess_language import guess_language

url = "https://www.googleapis.com/language/translate/v2"
key = os.environ.get("TRANSLATION_KEY")
meta_params = {
    "key": key,
    "target": "zh-CN",
    "mimeType": "text/plain",
}

query_prefix = "my name "
result_prefixes = ["我的名字是", "我的名字", "我叫"]


def is_chinese(language_code: Optional[str]) -> bool:
    if language_code is None:
        return False
    return language_code[:2] == "zh"


def translate(original_name: str, is_transliteration = True) -> str:
    actual_query_prefix = query_prefix if is_transliteration else ""
    actual_result_prefixes = result_prefixes if is_transliteration else []

    params = {
        "q": actual_query_prefix + original_name.capitalize(),
        **meta_params,
    }

    response = requests.get(url, params)
    translation_meta = response.json()["data"]["translations"][0]

    source_language = translation_meta.get("detectedSourceLanguage", None)
    translation: str = translation_meta["translatedText"]

    chinese_name = translation
    for prefix in actual_result_prefixes:
        if prefix in translation:
            chinese_name = translation.split(prefix)[1]

    if not is_chinese(guess_language(chinese_name)):
        raise ValueError(
            "We don't know how to pronounce this :/"
            + "Consider using the first syllables, or spelling it like an English word?"
        )

    return {"chinese_name": chinese_name, "source_language": source_language}


def main():
    name = translate("Piyush")
    print(name)


if __name__ == "__main__":
    main()
