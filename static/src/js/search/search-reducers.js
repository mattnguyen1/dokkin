import { combineReducers } from "redux";
import {
  SEARCH_INPUT_CHANGED,
  FETCH_QUICK_SEARCH_SUCCESS,
  FETCH_QUICK_SEARCH_LOADING,
  FETCH_QUICK_SEARCH_ERROR
} from "dokkin/js/search/search-action-types";

function input(state = "", action) {
  switch (action.type) {
    case SEARCH_INPUT_CHANGED:
      return action.input;

    default:
      return state;
  }
}

function quickSearch(state = {}, action) {
  switch (action.type) {
    case FETCH_QUICK_SEARCH_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_QUICK_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.response.cards
      };

    case SEARCH_INPUT_CHANGED:
      return {
        ...state,
        results: action.input ? state.results : []
      };

    default:
      return state;
  }
}

export default combineReducers({
  input,
  quickSearch
});
