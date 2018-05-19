/* global fetch */
import {
  FETCH_NEW_CARDS_SUCCESS,
  FETCH_NEW_CARDS_LOADING,
  FETCH_NEW_CARDS_ERROR
} from "./new-card-action-types";
import { fetchNewCards } from "./new-card-action";

export function fetchNewCardsSuccess() {
  return {
    type: FETCH_NEW_CARDS_SUCCESS
  };
}

export function fetchNewCardsLoading(id) {
  return {
    type: FETCH_NEW_CARDS_LOADING
  };
}

export function fetchNewCardsError(error) {
  return {
    type: FETCH_NEW_CARDS_ERROR,
    error
  };
}

export function fetchNewCards(params) {
  return dispatch => {
    dispatch(fetchNewCardsLoading());
    fetch(`/api/cards/new`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchNewCardsSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchNewCardsError(error));
      });
  };
}
