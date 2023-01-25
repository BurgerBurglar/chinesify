import axios from "axios";

const TRANSLATE_API_URL = "https://www.googleapis.com/language/translate/v2";
const TRANSLATION_KEY = process.env["TRANSLATION_KEY"];

const META_PARAMS = {
  key: TRANSLATION_KEY,
  target: "zh-CN",
  mimeType: "text/plain",
};

const QUERY_PREFIX = "my name ";
const RESULT_PREFIXES = ["我的名字是", "我的名字", "我叫"];

const translate = async (originalName: string) => {
  const params = {
    q: QUERY_PREFIX + originalName.toLowerCase(),
    ...META_PARAMS,
  };

  const response = await axios.get(TRANSLATE_API_URL, { params });
  let translation: string =
    response.data["data"]["translations"][0]["translatedText"];

  for (const prefix of RESULT_PREFIXES) {
    if (translation.includes(prefix)) {
      translation = translation.split(prefix)[1];
    }
  }

  return translation;
};

export default translate;
