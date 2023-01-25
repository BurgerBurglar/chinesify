import type { NextApiRequest, NextApiResponse } from "next";
import { XingResult } from "../../types";
import { beautifyXing } from "../../utils/pinyin";
import translate from "../../utils/translate";

const getXing = async (
  req: NextApiRequest,
  res: NextApiResponse<XingResult>
) => {
  const { originalName } = req.query;
  const xing = await translate(originalName as string);
  res.status(200).json(beautifyXing(xing));
};

export default getXing;
