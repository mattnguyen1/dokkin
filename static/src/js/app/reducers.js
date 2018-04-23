import { combineReducers } from 'redux'
import cardReducer from 'dokkin/js/card/card-reducers'
import searchReducer from 'dokkin/js/search/search-reducers'
import linkReducer from 'dokkin/js/link-page/link-reducers'

const rootReducer = combineReducers({
  cardReducer,
  searchReducer,
  linkReducer
});

export default rootReducer;
