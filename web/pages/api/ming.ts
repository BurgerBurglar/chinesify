import type { NextApiRequest, NextApiResponse } from "next";
import { Gender, MingResult } from "../../types";
import { beautifyMing } from "../../utils/pinyin";
import translate from "../../utils/translate";

const getMing = async (
  req: NextApiRequest,
  res: NextApiResponse<MingResult>
) => {
  const { originalName, gender } = req.query;
  const translation = await translate((originalName as string).toLowerCase());
  const beautified = beautifyMing(translation, gender as Gender);
  res.status(200).json(beautified);
};

export default getMing;
