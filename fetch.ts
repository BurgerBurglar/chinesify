import { MingParams, MingResult, XingParams, XingResult } from "./types";
import axios from "axios";
import {
  INITIAL_FAMILY_NAME,
  INITIAL_GENDER,
  INITIAL_GIVEN_NAME,
  INITIAL_MING_OPTIONS,
  INITIAL_XING_OPTIONS,
} from "./utils/constants";

const BASE_URL = "/api";

export const getMingOptions = async ({ originalName, gender }: MingParams) => {
  if (originalName === INITIAL_GIVEN_NAME && gender === INITIAL_GENDER) {
    return INITIAL_MING_OPTIONS;
  }
  return (
    await axios.get<MingResult>(BASE_URL + "/ming", {
      params: { originalName, gender },
    })
  ).data;
};

export const getXingOptions = async ({ originalName }: XingParams) => {
  if (originalName === INITIAL_FAMILY_NAME) {
    return INITIAL_XING_OPTIONS;
  }
  return (
    await axios.get<XingResult>(BASE_URL + "/xing", {
      params: { originalName },
    })
  ).data;
};
