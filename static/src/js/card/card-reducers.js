import { combineReducers } from 'redux'
import { 
  FETCH_CARDS_SUCCESS, FETCH_CARDS_LOADING, FETCH_CARDS_ERROR,
  FETCH_CARD_SUCCESS, FETCH_CARD_LOADING, FETCH_CARD_ERROR
} from './card-action-types'
import { FETCH_LINK_LOADING } from 'dokkin/js/link-page/link-action-types'
import { FETCH_CATEGORY_LOADING } from 'dokkin/js/category-page/category-action-types'
import { getQueryParamString } from 'dokkin/js/utils/url';

function cardsList(state = {}, action) {
  switch (action.type) {
    case FETCH_CARDS_SUCCESS:
      const shouldConcat = state.params.offset > 0;
      return {
        ...state,
        cards: shouldConcat ? state.cards.concat(action.response.cards) : action.response.cards,
        marker: action.response.marker,
        totalCards: action.response.total_results,
        canLoadMore: action.response.marker >= 0,
        isLoading: false
      };

    case FETCH_CARDS_LOADING:
      
      const didParamsChange = 
        (!state.params && action.params) ||
        (state.params.q !== action.params.q) ||
        (state.params.links !== action.params.links) ||
        (state.params.categories !== action.params.categories);
      return {
        ...state,        
        query: action.query,
        cards: didParamsChange ? [] : state.cards,
        params: action.params,
        canLoadMore: false,
        isLoading: true
      };
    
    case FETCH_CARDS_ERROR:
      return {
        ...state,
        cards: [],
        isLoading: false
      };

    case FETCH_LINK_LOADING:
      const didLinkParamsChange = state.linkId !== action.id;
      return {
        ...state,        
        linkId: action.id,
        cards: didLinkParamsChange ? [] : state.cards,
        canLoadMore: false
      };

    case FETCH_CATEGORY_LOADING:
      const didCategoryParamsChange = state.categoryId !== action.id;
      return {
        ...state,        
        categoryId: action.id,
        cards: didCategoryParamsChange ? [] : state.cards,
        canLoadMore: false        
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