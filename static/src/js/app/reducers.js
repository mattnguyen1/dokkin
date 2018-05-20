import { combineReducers } from "redux";
import cardReducer from "dokkin/js/common/card/card-reducers";
import newCardReducer from "dokkin/js/new-card-page/new-card-reducers";
import upcomingCardReducer from "dokkin/js/upcoming-card-page/upcoming-card-reducers";
import searchReducer from "dokkin/js/search/search-reducers";
import linkReducer from "dokkin/js/link-page/link-reducers";
import linkNavReducer from "dokkin/js/link-nav-page/link-nav-reducers";
import categoryReducer from "dokkin/js/category-page/category-reducers";
import categoryNavReducer from "dokkin/js/category-nav-page/category-nav-reducers";

const rootReducer = combineReducers({
  cardReducer,
  searchReducer,
  linkReducer,
  linkNavReducer,
  categoryReducer,
  categoryNavReducer,
  newCardReducer,
  upcomingCardReducer
});

export default rootReducer;
