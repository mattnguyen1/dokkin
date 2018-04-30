import { SEARCH_INPUT_CHANGED } from "dokkin/js/search/search-action-types";

export function updateSearchInput(input) {
  return {
    type: SEARCH_INPUT_CHANGED,
    input
  };
}
