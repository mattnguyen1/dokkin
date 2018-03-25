import { combineReducers } from 'redux'
import { FETCH_CARDS_SUCCESS } from './card-action-types'

function cards(state = [], action) {
  switch (action.type) {
    case FETCH_CARDS_SUCCESS:
      return action.cards;
    
    default:
      return state;
  }
}

export default combineReducers({
  cards: cards
});