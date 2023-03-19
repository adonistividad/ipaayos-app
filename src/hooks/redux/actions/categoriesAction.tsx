import { FETCH_CATEGORIES } from "./types";
import axiosInstance from "../../../lib/axios";

export const fetchCategories: any = () => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("common/fetch-categories", {});
    // console.log(">>>>>", data?.categories)

    dispatch({
      type: FETCH_CATEGORIES,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_CATEGORIES,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching categories.",
        items: [],
      },
    });
  }
};

// export const fetchCategories = () => async (dispatch: any) => {
//   try {
//     const { data } = await axios.post(
//       // const res = await axios.post(
//       // "https://api.takeone.studio/api/v1/common/fetch-all-tracks"
//       "http://localhost:5000/api/v1/common/fetch-categories"
//     );
//     // const { data } = await axiosInstance.post("common/fetch-categories",{});
//     console.log('data >>>>>>>>>', data)
//     if (data.status === 200) {
//       dispatch({
//         type: FETCH_CATEGORIES,
//         // payload: data.categories,
//         payload: data,
//       });
//     }

//   } catch (e) {
//     dispatch({
//       type: FETCH_CATEGORIES,
//       payload: {
//         status: 500,
//         msg: "Something went wrong while fetching categories.",
//         categories: [],
//       },
//     });
//   }
// };
