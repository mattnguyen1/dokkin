import { combineReducers } from 'redux'
import cardReducer from 'dokkin/js/card/card-reducers'
import searchReducer from 'dokkin/js/search/search-reducers'

const rootReducer = combineReducers({
  cardReducer,
  searchReducer
});

export default rootReducer;
