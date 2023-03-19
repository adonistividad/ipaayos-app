import { FETCH_TASK, FETCH_TASKS, UPDATE_TASK } from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchTasks =
  (params: any = {}) =>
  async (dispatch: any) => {
    try {
      /******
      sample params: all fields are optional 
      { "user_id": 1  }
      { "user_id": 1, "status": "posted"  }
      { "user_id": 1, "status": "posted", "category": "Building Maintenance" }
       */
      const { data } = await axiosInstance.post("tasks/fetch-all", params);
      dispatch({
        type: FETCH_TASKS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: FETCH_TASKS,
        payload: {
          status: 500,
          msg: "Something went wrong while fetching task details.",
          items: [],
        },
      });
    }
  };

export const fetchTask = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("tasks/fetch", { id });
    dispatch({
      type: FETCH_TASK,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_TASK,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching task details.",
        items: [],
      },
    });
  }
};
/** 
  
 export const updateTask =
   (data: any, payload: any = data) =>
   async (dispatch: any) => {
     try {
       console.log("data ====>>>", JSON.stringify(data));
       await axiosInstance.post("tasks/update", data);
       // console.log("result>>>", result.data.task);
       dispatch({
         type: UPDATE_TASK,
         // payload: data,
         payload,
       });
     } catch (e) {
       dispatch({
         type: UPDATE_TASK,
         payload: {
           status: 500,
           msg: "Something went wrong while updating task details.",
           items: [],
         },
       });
     }
   };
  */
export const updateTask = (data: any) => async (dispatch: any) => {
  try {
    await axiosInstance.post("tasks/update", data);
    // console.log("data >>>>", data);

    dispatch({
      type: UPDATE_TASK,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_TASK,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};
