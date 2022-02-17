import { MingParams, MingResult, XingParams, XingResult } from "./types";
import axios from "axios";
import {
  INITIAL_FAMILY_NAME,
  INITIAL_GENDER,
  INITIAL_GIVEN_NAME,
  INITIAL_MING_OPTIONS,
  INITIAL_XING_OPTIONS,
} from "./utils/constants";

const BASE_URL = "https://chinesify.herokuapp.com";

export const getMingOptions = async (givenName: string, params: MingParams) => {
  if (givenName === INITIAL_GIVEN_NAME && params.gender === INITIAL_GENDER) {
    return INITIAL_MING_OPTIONS;
  }

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
  if (familyName === INITIAL_FAMILY_NAME) {
    return INITIAL_XING_OPTIONS;
  }
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
