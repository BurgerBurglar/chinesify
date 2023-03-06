import axios from "axios";
import { capitalize } from "./name";

const TRANSLATE_API_URL = "https://www.googleapis.com/language/translate/v2";
const TRANSLATION_KEY = process.env["TRANSLATION_KEY"];

const META_PARAMS = {
  key: TRANSLATION_KEY,
  target: "zh-CN",
  mimeType: "text/plain",
};

const QUERY_PREFIX = "my name is ";
const RESULT_PREFIXES = ["我的名字是", "我的名字", "我叫"];

const translate = async (
  originalName: string,
  shouldTryAgain = true
): Promise<string> => {
  const params = {
    q: QUERY_PREFIX + originalName,
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
  const CHINSESE_REGEX =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]+/;
  console.log({ translation });
  if (!CHINSESE_REGEX.test(translation)) {
    if (!shouldTryAgain)
      throw new Error("We don't know how to pronounce this name");
    // Try it one more time, but that's it
    return translate(originalName.toLowerCase(), false);
  }
  return translation;
};

export default translate;
