import { FETCH_CATEGORIES } from "../actions/types";

const CategoriesReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case FETCH_CATEGORIES: 
      return action.payload?.categories;
    default:
      return state;
  }
};
export default CategoriesReducer;
