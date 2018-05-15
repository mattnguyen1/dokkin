import { combineReducers } from "redux";
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_ERROR
} from "./category-nav-action-types";

function categories(
  state = {
    isLoading: false,
    categories: []
  },
  action
) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      // @TODO: Set a bound on this cache
      return {
        ...state,
        categories: action.categories,
        isLoading: false
      };

    case FETCH_CATEGORIES_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        categories: []
      };

    default:
      return state;
  }
}

export default combineReducers({
  categories
});
