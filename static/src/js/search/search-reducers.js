import { combineReducers } from 'redux'

import { SEARCH_INPUT_CHANGED } from 'dokkin/js/search/search-action-types'

function input(state = '', action) {
  switch (action.type) {
    case 'SEARCH_INPUT_CHANGED':
      return action.input;
    
    default:
      return state;
  }
}

export default combineReducers({
  input: input
});