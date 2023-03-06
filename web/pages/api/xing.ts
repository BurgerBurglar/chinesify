import type { NextApiRequest, NextApiResponse } from "next";
import { XingResult } from "../../types";
import { capitalize } from "../../utils/name";
import { beautifyXing } from "../../utils/pinyin";
import translate from "../../utils/translate";

const getXing = async (
  req: NextApiRequest,
  res: NextApiResponse<XingResult | string>
) => {
  const { originalName } = req.query;
  try {
    const xing = await translate(capitalize(originalName as string));
    res.status(200).json(beautifyXing(xing));
  } catch (error) {
    res
      .status(400)
      .send(
        "We don't know how to pronounce that.\nMaybe use a English spelling that sounds like it?"
      );
  }
};

export default getXing;
