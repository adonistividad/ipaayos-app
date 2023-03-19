import { FETCH_GROUPED_MESSAGES } from "../actions/types";

const GroupedMessagesReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_GROUPED_MESSAGES:
      // console.log("FETCH_GROUPED_MESSAGES action.payload >>>>", action.payload);
      if (action.payload?.messages) {
        return action.payload?.messages!;
      } else {
        return {};
      }

    default:
      return state;
  }
};
export default GroupedMessagesReducer;
