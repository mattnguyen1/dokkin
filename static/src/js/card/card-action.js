/* global fetch */
import {
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_LOADING,
  FETCH_CARDS_ERROR,
  FETCH_CARD_SUCCESS,
  FETCH_CARD_LOADING,
  FETCH_CARD_ERROR
} from "dokkin/js/card/card-action-types";
import { getQueryParamString } from "dokkin/js/utils/url";

const DEFAULT_LIMIT = 50;

export function fetchCardsSuccess(response) {
  return {
    type: FETCH_CARDS_SUCCESS,
    response
  };
}

export function fetchCardsLoading(params) {
  return {
    type: FETCH_CARDS_LOADING,
    params
  };
}

export function fetchCardsError(error) {
  return {
    type: FETCH_CARDS_ERROR,
    error
  };
}

export function fetchCardSuccess(card) {
  return {
    type: FETCH_CARD_SUCCESS,
    card
  };
}

export function fetchCardLoading(id) {
  return {
    type: FETCH_CARD_LOADING,
    id
  };
}

export function fetchCardError(error) {
  return {
    type: FETCH_CARD_ERROR,
    error
  };
}

export function fetchCards(params) {
  const queryParams = Object.assign({}, params);
  queryParams.limit = DEFAULT_LIMIT;
  const queryParamString = getQueryParamString(queryParams);
  return dispatch => {
    dispatch(fetchCardsLoading(queryParams));
    fetch(`/api/cards${queryParamString}`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchCardsSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchCardsError(error));
      });
  };
}

export function fetchCard(id) {
  return dispatch => {
    dispatch(fetchCardLoading(id));
    fetch(`/api/cards/${id}`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchCardSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchCardsError(error));
      });
  };
}
