import {
  // FETCH_NOTIFICATION,
  // FETCH_GROUPED_NOTIFICATIONS,
  FETCH_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
} from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchNotifications =
  (params: any = {}) =>
  async (dispatch: any) => {
    try { 
      const { data } = await axiosInstance.post("notifications/fetch-all", params);
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };
  /*
export const fetchGroupedNotifications =
  (params: any = {}) =>
  async (dispatch: any) => {
    console.log("params >>>>>", params)
    try {
      const { data } = await axiosInstance.post(
        "notifications/fetch-all-grouped",
        params
      );
      dispatch({
        type: FETCH_GROUPED_NOTIFICATIONS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_GROUPED_NOTIFICATIONS,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };

export const fetchNotification = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("notifications/fetch", { id });
    dispatch({
      type: FETCH_NOTIFICATION,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_NOTIFICATION,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching task details.",
        items: [],
      },
    });
  }
};
*/

export const updateNotification = (data: any, payload: any = data) => async (dispatch: any) => {
  try {
    await axiosInstance.post("notifications/update", data);
    // console.log("data >>>>", data);

    dispatch({
      type: UPDATE_NOTIFICATION,
      payload,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_NOTIFICATION,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};