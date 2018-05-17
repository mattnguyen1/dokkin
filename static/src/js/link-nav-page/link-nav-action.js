/* global fetch */
import {
  FETCH_LINKS_SUCCESS,
  FETCH_LINKS_LOADING,
  FETCH_LINKS_ERROR
} from "./link-nav-action-types";

export function fetchLinksSuccess(links) {
  return {
    type: FETCH_LINKS_SUCCESS,
    links
  };
}

export function fetchLinksLoading() {
  return {
    type: FETCH_LINKS_LOADING
  };
}

export function fetchLinksError(error) {
  return {
    type: FETCH_LINKS_ERROR,
    error
  };
}

export function fetchLinks() {
  return dispatch => {
    dispatch(fetchLinksLoading());
    return fetch(`/api/links`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchLinksSuccess(responseBody.links));
      })
      .catch(error => {
        dispatch(fetchLinksError(error));
      });
  };
}
