import { FETCH_BADGES } from "../actions/types";

const BadgesReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_BADGES:
      // console.log(
      //   "FETCH_BADGES action.payload >>>>",
      //   action?.payload 
      // );
      if (action.payload) {
        return action.payload!;
      } else {
        return {};
      }

    default:
      return state;
  }
};
export default BadgesReducer;
