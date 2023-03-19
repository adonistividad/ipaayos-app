import { FETCH_BADGES } from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchBadges =
  (params: any = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await axiosInstance.post(
        "user/fetch-badges",
        params
      );
      dispatch({
        type: FETCH_BADGES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_BADGES,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };
