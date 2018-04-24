import { combineReducers } from 'redux'
import { 
  FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_LOADING, FETCH_CATEGORY_ERROR
} from './category-action-types'

function categoryCache(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
      // @TODO: Set a bound on this cache
      return {
        ...state,
        [action.category.id]: action.category
      };

    case FETCH_CATEGORY_ERROR:
      return {};

    default:
      return state;
  }
}

export default combineReducers({
  categoryCache: categoryCache
});