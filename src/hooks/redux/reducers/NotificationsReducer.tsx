import { 
  FETCH_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  UPDATE_NOTIFICATION,
} from "../actions/types";

const NotificationsReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_NOTIFICATION:
      // console.log("FETCH_NOTIFICATION action.payload >>>>", action.payload);
      return action.payload;
    case FETCH_NOTIFICATIONS:
      // console.log(
      //   "FETCH_NOTIFICATIONS action.payload >>>>",
      //   action?.payload?.notifications
      // );
      if (action.payload?.notifications) {
        return action.payload?.notifications!;
      } else {
        return {};
      }
    case UPDATE_NOTIFICATION:
      // console.log("UPDATE_NOTIFICATION action.payload >>>>", action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default NotificationsReducer;
