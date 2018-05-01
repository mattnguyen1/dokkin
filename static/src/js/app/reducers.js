import { combineReducers } from "redux";
import cardReducer from "dokkin/js/common/card/card-reducers";
import searchReducer from "dokkin/js/search/search-reducers";
import linkReducer from "dokkin/js/link-page/link-reducers";
import categoryReducer from "dokkin/js/category-page/category-reducers";

const rootReducer = combineReducers({
  cardReducer,
  searchReducer,
  linkReducer,
  categoryReducer
});

export default rootReducer;
