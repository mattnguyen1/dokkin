import { connect } from "react-redux";
import SearchInput from "dokkin/js/search/components/search-input";
import {
  updateSearchInput,
  fetchQuickSearch
} from "dokkin/js/search/search-action";

const mapStateToProps = state => ({
  input: state.searchReducer.input,
  quickSearchResults: state.searchReducer.quickSearch.results
});

const mapDispatchToProps = dispatch => ({
  updateSearchInput: input => dispatch(updateSearchInput(input)),
  fetchQuickSearch: query => dispatch(fetchQuickSearch(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
