import { FETCH_TASK, FETCH_TASKS, UPDATE_TASK } from "../actions/types";

const TasksReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_TASK:
      console.log("FETCH_TASK action.payload >>>>", action.payload);
      return action.payload;
    case FETCH_TASKS:
      // console.log("FETCH_TASKS action.payload >>>>", action.payload);
      if (action.payload?.tasks) {
        return action.payload?.tasks!;
      } else {
        return {};
      }
    case UPDATE_TASK:
      // console.log("UPDATE_TASK action.payload >>>>", action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default TasksReducer;
