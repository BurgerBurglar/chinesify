import { MingParams, MingResult, XingParams, XingResult } from "./types";
import axios from "axios";

const BASE_URL = "https://name-chinesify.herokuapp.com";

export const getMingOptions = async (givenName: string, params: MingParams) => {
  const response = await axios.get<MingResult>(
    BASE_URL + "/mings/" + givenName,
    {
      params,
    }
  );
  return response.data.options;
};

export const getXingOptions = async (
  familyName: string,
  params?: XingParams
) => {
  const response = await axios.get<XingResult>(
    BASE_URL + "/xings/" + familyName,
    {
      params,
    }
  );
  return response.data.options;
};
