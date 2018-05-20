/* global fetch */
import {
  FETCH_UPCOMING_CARDS_SUCCESS,
  FETCH_UPCOMING_CARDS_LOADING,
  FETCH_UPCOMING_CARDS_ERROR
} from "./upcoming-card-action-types";

export function fetchUpcomingCardsSuccess(response) {
  return {
    type: FETCH_UPCOMING_CARDS_SUCCESS,
    response
  };
}

export function fetchUpcomingCardsLoading() {
  return {
    type: FETCH_UPCOMING_CARDS_LOADING
  };
}

export function fetchUpcomingCardsError(error) {
  return {
    type: FETCH_UPCOMING_CARDS_ERROR,
    error
  };
}

export function fetchUpcomingCards(params) {
  return dispatch => {
    dispatch(fetchUpcomingCardsLoading());
    fetch(`/api/cards/upcoming`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchUpcomingCardsSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchUpcomingCardsError(error));
      });
  };
}
