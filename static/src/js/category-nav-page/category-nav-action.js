/* global fetch */
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_LOADING,
  FETCH_CATEGORIES_ERROR
} from "./category-nav-action-types";

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  };
}

export function fetchCategoriesLoading() {
  return {
    type: FETCH_CATEGORIES_LOADING
  };
}

export function fetchCategoriesError(error) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    error
  };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesLoading());
    return fetch(`/api/categories`)
      .then(response => response.json())
      .then(responseBody => {
        dispatch(fetchCategoriesSuccess(responseBody.categories));
      })
      .catch(error => {
        dispatch(fetchCategoriesError(error));
      });
  };
}
