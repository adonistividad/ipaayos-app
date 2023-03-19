import { FETCH_PROVIDERS  } from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchProviders: any = () => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("provider/fetch-all", {});

    dispatch({
      type: FETCH_PROVIDERS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_PROVIDERS,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching providers.",
        items: [],
      },
    });
  }
};

// export const fetchProvider: any = (id: number) => async (dispatch: any) => {
//   try {
//     const { data } = await axiosInstance.post("provider/fetch-one", { id });

//     dispatch({
//       type: FETCH_PROVIDER,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: FETCH_PROVIDER,
//       payload: {
//         status: 500,
//         msg: "Something went wrong while fetching providers.",
//         items: [],
//       },
//     });
//   }
// };

// export const updateProvider: any = (data: any) => async (dispatch: any) => {
//   try {
//     await axiosInstance.post("provider/update", data);

//     dispatch({
//       type: UPDATE_PROVIDER,
//       payload: data,
//     });
//   } catch (e) {
//     dispatch({
//       type: UPDATE_PROVIDER,
//       payload: {
//         status: 500,
//         msg: "Something went wrong while fetching providers.",
//         items: [],
//       },
//     });
//   }
// };
