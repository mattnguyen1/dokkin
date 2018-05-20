import { combineReducers } from "redux";
import {
  FETCH_NEW_CARDS_SUCCESS,
  FETCH_NEW_CARDS_LOADING,
  FETCH_NEW_CARDS_ERROR
} from "./new-card-action-types";

function cardsList(state = { cards: [], canLoadMore: false }, action) {
  switch (action.type) {
    case FETCH_NEW_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.response.cards,
        canLoadMore: false,
        isLoading: false
      };

    case FETCH_NEW_CARDS_LOADING:
      return {
        ...state,
        canLoadMore: false,
        isLoading: true
      };

    case FETCH_NEW_CARDS_ERROR:
      return {
        ...state,
        cards: [],
        isLoading: false
      };

    default:
      return state;
  }
}

export default combineReducers({
  cardsList
});
