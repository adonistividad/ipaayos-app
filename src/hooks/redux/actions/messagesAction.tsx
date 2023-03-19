import {
  FETCH_MESSAGE,
  FETCH_GROUPED_MESSAGES,
  FETCH_MESSAGES,
  UPDATE_MESSAGE,
  UPDATE_MESSAGES,
} from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchMessages =
  (params: any = {}) =>
  async (dispatch: any) => {
    try {
      const { data } = await axiosInstance.post("messages/fetch-all", params);
      // console.log("fetchMessages data >>>", data)
      dispatch({
        type: FETCH_MESSAGES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_MESSAGES,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };
export const fetchGroupedMessages =
  (params: any = {}) =>
  async (dispatch: any) => {
    // console.log("params >>>>>", params)
    try {
      const { data } = await axiosInstance.post(
        "messages/fetch-all-grouped",
        params
      );
      dispatch({
        type: FETCH_GROUPED_MESSAGES,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_GROUPED_MESSAGES,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };

export const fetchMessage = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("messages/fetch", { id });
    dispatch({
      type: FETCH_MESSAGE,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_MESSAGE,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching task details.",
        items: [],
      },
    });
  }
};

export const updateMessage =
  (data: any, payload: any = data) =>
  async (dispatch: any) => {
    try {
      await axiosInstance.post("messages/update", data);
      // console.log("data >>>>", data);

      dispatch({
        type: UPDATE_MESSAGE,
        payload,
      });
    } catch (e) {
      dispatch({
        type: UPDATE_MESSAGE,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching data.",
          items: [],
        },
      });
    }
  };
  
export const updateMessages =
  (data: any, payload: any = data) =>
  async (dispatch: any) => {
    try {
      await axiosInstance.post("messages/update-all", data);
      // console.log("data >>>>", data);

      dispatch({
        type: UPDATE_MESSAGES,
        payload,
      });
    } catch (e) {
      dispatch({
        type: UPDATE_MESSAGES,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching data.",
          items: [],
        },
      });
    }
  };
