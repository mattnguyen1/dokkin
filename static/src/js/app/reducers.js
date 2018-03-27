import { combineReducers } from 'redux'
import cardReducer from '../card/card-reducers'
import searchReducer from '../search/search-reducers'

const rootReducer = combineReducers({
  cardReducer,
  searchReducer
});

export default rootReducer;
