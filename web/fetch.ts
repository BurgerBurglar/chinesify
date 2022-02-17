import { MingParams, MingResult, XingParams, XingResult } from "./types";
import axios from "axios";

const BASE_URL = "https://chinesify.herokuapp.com";

export const getMingOptions = async (givenName: string, params: MingParams) => {
  try {
    const response = await axios.get<MingResult>(
      BASE_URL + "/mings/" + givenName,
      {
        params,
      }
    );
    return response.data.options;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw Error(err.response?.data.detail);
    }
  }
};

export const getXingOptions = async (
  familyName: string,
  params?: XingParams
) => {
  try {
    const response = await axios.get<XingResult>(
      BASE_URL + "/xings/" + familyName,
      {
        params,
      }
    );
    return response.data.options;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw Error(err.response?.data.detail);
    }
  }
};
