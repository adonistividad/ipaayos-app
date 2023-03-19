import { FETCH_PROVIDERS } from "../actions/types";

const ProvidersReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_PROVIDERS:
      // console.log("action.payload>>>>", action.payload);
      if (action.payload?.providers) {
        return action.payload?.providers!;
      } else {
        return {};
      }
    default:
      return state;
  }
};
export default ProvidersReducer;
