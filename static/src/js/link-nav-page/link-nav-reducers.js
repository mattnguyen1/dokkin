import { combineReducers } from "redux";
import {
  FETCH_LINKS_SUCCESS,
  FETCH_LINKS_LOADING,
  FETCH_LINKS_ERROR
} from "./link-nav-action-types";

function links(
  state = {
    isLoading: false,
    links: []
  },
  action
) {
  switch (action.type) {
    case FETCH_LINKS_SUCCESS:
      // @TODO: Set a bound on this cache
      return {
        ...state,
        links: action.links,
        isLoading: false
      };

    case FETCH_LINKS_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_LINKS_ERROR:
      return {
        ...state,
        isLoading: false,
        links: []
      };

    default:
      return state;
  }
}

export default combineReducers({
  links
});
