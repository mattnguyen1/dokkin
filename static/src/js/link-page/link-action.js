/* global fetch */
import {
  FETCH_LINK_SUCCESS,
  FETCH_LINK_LOADING,
  FETCH_LINK_ERROR
} from "dokkin/js/link-page/link-action-types";
import { fetchCards } from "dokkin/js/common/card/card-action";

export function fetchLinkSuccess(link) {
  return {
    type: FETCH_LINK_SUCCESS,
    link
  };
}

export function fetchLinkLoading(id) {
  return {
    type: FETCH_LINK_LOADING,
    id
  };
}

export function fetchLinkError(error) {
  return {
    type: FETCH_LINK_ERROR,
    error
  };
}

export function fetchLink(id) {
  return dispatch => {
    dispatch(fetchLinkLoading(id));
    return fetch(`/api/links/${id}`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchLinkSuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchLinkError(error));
      });
  };
}

export function fetchLinkAndCards(id) {
  return (dispatch, getState) =>
    dispatch(fetchLink(id)).then(() => {
      const fetchedLink = getState().linkReducer.linkCache[id];
      return dispatch(fetchCards({ q: "", links: fetchedLink.name }));
    });
}
