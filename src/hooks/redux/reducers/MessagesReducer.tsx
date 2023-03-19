import {
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  UPDATE_MESSAGE,
  UPDATE_MESSAGES,
} from "../actions/types";

const MessagesReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_MESSAGE:
      // console.log("FETCH_MESSAGE action.payload >>>>", action.payload);
      return action.payload;
    case FETCH_MESSAGES:
      // console.log("FETCH_MESSAGES action.payload >>>>",action?.payload?.messages);
      if (action.payload?.messages) {
        return action.payload?.messages!;
      } else {
        return {};
      }
    case UPDATE_MESSAGE:
      console.log("UPDATE_MESSAGE action.payload >>>>", action.payload);
      return action.payload;
    case UPDATE_MESSAGES:
      // console.log("UPDATE_MESSAGES action.payload >>>>", action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default MessagesReducer;
