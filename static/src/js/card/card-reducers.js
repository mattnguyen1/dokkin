import { combineReducers } from 'redux'
import { 
  FETCH_CARDS_SUCCESS, FETCH_CARDS_LOADING, FETCH_CARDS_ERROR,
  FETCH_CARD_SUCCESS, FETCH_CARD_LOADING, FETCH_CARD_ERROR
} from './card-action-types'
import { FETCH_LINK_LOADING } from 'dokkin/js/link-page/link-action-types'

function cardsList(state = {}, action) {
  switch (action.type) {
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cardsList
      };

    case FETCH_CARDS_LOADING:
      const didParamsChange = state.query !== action.query;
      return {
        ...state,        
        query: action.query,
        cards: didParamsChange ? [] : state.cards
      };
    
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        cards: [],
      };

    case FETCH_LINK_LOADING:
      const didLinkParamsChange = state.linkId !== action.id;
      return {
        ...state,        
        linkId: action.id,
        cards: didLinkParamsChange ? [] : state.cards
      };
    
    default:
      return state;
  }
}

function cardCache(state = {}, action) {
  switch (action.type) {
    case FETCH_CARD_SUCCESS:
      // @TODO: Set a bound on this cache
      return {
        ...state,
        [action.card.id]: action.card
      };

    case FETCH_CARD_ERROR:
      return {};

    default:
      return state;
  }
}

export default combineReducers({
  cardsList: cardsList,
  cardCache: cardCache
});