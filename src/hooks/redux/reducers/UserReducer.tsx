import {
  FETCH_USER,
  // FETCH_USER_DETAILS,
  // UPDATE_USER_DETAILS,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_UPDATE,
  VERIFY_OTP,
} from "../actions/types";

const UserReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case USER_SIGNIN:
      return action.payload;
    case USER_SIGNUP:
      return action.payload;
    case USER_UPDATE:
      return action.payload;
    case VERIFY_OTP:
      return action.payload;
    case FETCH_USER:
      if (action.payload?.user) {
        return action.payload?.user;
      } else {
        return {};
      }
    default:
      return state;
  }
};
export default UserReducer;
