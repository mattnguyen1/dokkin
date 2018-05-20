/* global fetch */
import {
  FETCH_NEW_CARDS_SUCCESS,
  FETCH_NEW_CARDS_LOADING,
  FETCH_NEW_CARDS_ERROR
} from "./new-card-action-types";

export function fetchNewCardsSuccess(response) {
  return {
    type: FETCH_NEW_CARDS_SUCCESS,
    response
  };
}

export function fetchNewCardsLoading() {
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
