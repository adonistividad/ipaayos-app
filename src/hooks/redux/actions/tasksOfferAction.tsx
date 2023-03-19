import { FETCH_TASK_OFFER, FETCH_TASK_OFFERS, UPDATE_TASK_OFFER } from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchTaskOffers =
  (params: any = {}) =>
  async (dispatch: any) => {
    try {
      /******
      sample params: all fields are optional 
      { "user_id": 1  }
      { "user_id": 1, "status": "posted"  }
      { "user_id": 1, "status": "posted", "category": "Building Maintenance" }
       */
      const { data } = await axiosInstance.post("tasks/fetch-all-offers", params);
      dispatch({
        type: FETCH_TASK_OFFERS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_TASK_OFFERS,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };

export const fetchTaskOffer = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("tasks/fetch-offer", { id });
    dispatch({
      type: FETCH_TASK_OFFER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_TASK_OFFER,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching task details.",
        items: [],
      },
    });
  }
};

export const updateTaskOffer = (data: any) => async (dispatch: any) => {
  try {
    await axiosInstance.post("tasks/update-offer", data);
    // console.log("data >>>>", data);

    dispatch({
      type: UPDATE_TASK_OFFER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_TASK_OFFER,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};
