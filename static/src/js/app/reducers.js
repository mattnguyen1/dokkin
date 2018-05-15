import { combineReducers } from "redux";
import cardReducer from "dokkin/js/common/card/card-reducers";
import searchReducer from "dokkin/js/search/search-reducers";
import linkReducer from "dokkin/js/link-page/link-reducers";
import categoryReducer from "dokkin/js/category-page/category-reducers";
import categoryNavReducer from "dokkin/js/category-nav-page/category-nav-reducers";

const rootReducer = combineReducers({
  cardReducer,
  searchReducer,
  linkReducer,
  categoryReducer,
  categoryNavReducer
});

export default rootReducer;
