/* global fetch */
import {
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_ERROR
} from "dokkin/js/category-page/category-action-types";
import { fetchCards } from "dokkin/js/card/card-action";

export function fetchCategorySuccess(category) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    category
  };
}

export function fetchCategoryLoading(id) {
  return {
    type: FETCH_CATEGORY_LOADING,
    id
  };
}

export function fetchCategoryError(error) {
  return {
    type: FETCH_CATEGORY_ERROR,
    error
  };
}

export function fetchCategory(id) {
  return dispatch => {
    dispatch(fetchCategoryLoading(id));
    return fetch(`/api/categories/${id}`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchCategorySuccess(responseBody));
      })
      .catch(error => {
        dispatch(fetchCategoryError(error));
      });
  };
}

export function fetchCategoryAndCards(id) {
  return (dispatch, getState) =>
    dispatch(fetchCategory(id)).then(() => {
      const fetchedCategory = getState().categoryReducer.categoryCache[id];
      return dispatch(fetchCards({ q: "", categories: fetchedCategory.name }));
    });
}
