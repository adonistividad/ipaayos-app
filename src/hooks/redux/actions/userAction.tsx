import {
  FETCH_USER,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_UPDATE,
  VERIFY_OTP,
} from "./types";
import axiosInstance from "../../../lib/axios";

export const userSignIn = (userData: any) => async (dispatch: any) => {
  try {
    // console.log("userSignIn userData>>>>>", userData)
    const { data } = await axiosInstance.post("user/signin", userData);

    // console.log("userSignIn data>>>>>", data)
    // const data = {
    //   email: "avtividad@yahoo.com ",
    //   firstname: "adonis",
    //   lastname: "tividad",
    //   is_logged:true,

    // };

    dispatch({
      type: USER_SIGNIN,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_SIGNIN,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};

export const userSignUp = (userData: any) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("user/signup", userData);
    dispatch({
      type: USER_SIGNUP,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_SIGNUP,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};

export const updateUser = (data: any) => async (dispatch: any) => {
  try {
    await axiosInstance.post("user/update", data);
    // console.log("data >>>>", data);

    dispatch({
      type: USER_UPDATE,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_UPDATE,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};

export const verifyOTP = (userData: any) => async (dispatch: any) => {
  try {
    // console.log("userData>>>>", userData)
    const { data } = await axiosInstance.post("user/verify-otp", userData);
    // console.log("data>>>>", data)
    dispatch({
      type: VERIFY_OTP,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: VERIFY_OTP,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};

export const resendOTP = (userData: any) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("user/send-otp", userData);
    dispatch({
      type: VERIFY_OTP,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: VERIFY_OTP,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching data.",
        items: [],
      },
    });
  }
};

export const fetchUser: any = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("user/fetch-one", { id });
    // console.log("fetchUser data>>>", data)

    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_USER,
      payload: {
        status: 500,
        msg: "Something went wrong while fetching users.",
        items: [],
      },
    });
  }
};
