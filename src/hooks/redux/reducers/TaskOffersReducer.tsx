import { FETCH_TASK_OFFER, FETCH_TASK_OFFERS, UPDATE_TASK_OFFER } from "../actions/types";

const TaskOffersReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_TASK_OFFER:
      console.log("FETCH_TASK_OFFER action.payload >>>>", action.payload);
      return action.payload;
    case FETCH_TASK_OFFERS:
      // console.log("FETCH_TASK_OFFERS action.payload >>>>", action.payload);
      if (action.payload?.tasks) {
        return action.payload?.tasks!;
      } else {
        return {};
      }
    case UPDATE_TASK_OFFER:
      // console.log("UPDATE_TASK_OFFER action.payload >>>>", action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default TaskOffersReducer;
