import { SEARCH_INPUT_CHANGED } from './search-action-types';

export function updateSearchInput(input) {
  return {
    type: 'SEARCH_INPUT_CHANGED',
    input: input
  }
}