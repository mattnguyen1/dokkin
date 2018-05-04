import {
  SEARCH_INPUT_CHANGED,
  FETCH_QUICK_SEARCH_ERROR,
  FETCH_QUICK_SEARCH_LOADING,
  FETCH_QUICK_SEARCH_SUCCESS
} from "dokkin/js/search/search-action-types";
import { getQueryParamString } from "dokkin/js/utils/url";

export function updateSearchInput(input) {
  return {
    type: SEARCH_INPUT_CHANGED,
    input
  };
}

export function fetchQuickSearchSuccess(response) {
  return {
    type: FETCH_QUICK_SEARCH_SUCCESS,
    response
  };
}

export function fetchQuickSearchLoading(params) {
  return {
    type: FETCH_QUICK_SEARCH_LOADING,
    params
  };
}

export function fetchQuickSearchError(error) {
  return {
    type: FETCH_QUICK_SEARCH_ERROR,
    error
  };
}

export function fetchQuickSearch(query) {
  const encodedQuery = encodeURIComponent(query);
  const queryParams = { q: encodedQuery, limit: 10, offset: 0 };
  const queryParamString = getQueryParamString(queryParams);
  return dispatch => {
    dispatch(fetchQuickSearchLoading(queryParams));
    fetch(`/api/cards${queryParamString}`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchQuickSearchSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchQuickSearchError(error));
      });
  };
}
