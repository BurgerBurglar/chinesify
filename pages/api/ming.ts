import type { NextApiRequest, NextApiResponse } from "next";
import { Gender, MingResult } from "../../types";
import { capitalize } from "../../utils/name";
import { beautifyMing } from "../../utils/pinyin";
import translate from "../../utils/translate";

const getMing = async (
  req: NextApiRequest,
  res: NextApiResponse<MingResult | string>
) => {
  const { originalName, gender } = req.query;
  try {
    const translation = await translate(capitalize(originalName as string));
    const beautified = beautifyMing(translation, gender as Gender);
    res.status(200).json(beautified);
  } catch (error) {
    res
      .status(400)
      .send(
        "We don't know how to pronounce that.\nMaybe use a English spelling that sounds like it?"
      );
  }
};

export default getMing;
