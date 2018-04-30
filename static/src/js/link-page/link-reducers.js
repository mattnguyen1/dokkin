import { combineReducers } from "redux";
import { FETCH_LINK_SUCCESS, FETCH_LINK_ERROR } from "./link-action-types";

function linkCache(state = {}, action) {
  switch (action.type) {
    case FETCH_LINK_SUCCESS:
      // @TODO: Set a bound on this cache
      return {
        ...state,
        [action.link.id]: action.link
      };

    case FETCH_LINK_ERROR:
      return {};

    default:
      return state;
  }
}

export default combineReducers({
  linkCache
});
