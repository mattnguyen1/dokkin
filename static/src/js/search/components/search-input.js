import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import SelectorDropdown from "dokkin/js/common/selector-dropdown/index";
import SearchItem from "./search-item";
import _ from "lodash";

class SearchInput extends Component {
  constructor(props) {
    super(props);
    const { fetchQuickSearch } = props;
    this.throttledFetchQuickSearch = _.throttle(fetchQuickSearch, 350, {
      leading: true,
      trailing: true
    });
  }

  onInputChange = event => {
    const { updateSearchInput } = this.props;
    updateSearchInput(event.target.value);
    if (event.target.value) {
      this.throttledFetchQuickSearch(event.target.value);
    }
  };

  onSubmit = (event, selectedItemIndex) => {
    const { history, input, quickSearchResults } = this.props;
    event.preventDefault();

    if (selectedItemIndex >= 0) {
      history.push(quickSearchResults[selectedItemIndex].url);
    } else {
      history.push(`/search?q=${input}`);
    }
  };

  render() {
    const { input, quickSearchResults } = this.props;
    return (
      <div className="search">
        <SelectorDropdown
          inputRef={el => {
            this.searchInput = el;
          }}
          type="search"
          placeholder="Search (example: str ssb vegito)"
          value={input}
          onChange={this.onInputChange}
          onEnterKeyDown={this.onSubmit}
        >
          {quickSearchResults &&
            quickSearchResults.map((result, index) => {
              return (
                <Link to={result.url} key={`quick-search-result-${index}`}>
                  <SearchItem
                    text={`${result.leader_skill} ${result.name}`}
                    value={`${result.id}`}
                  />
                </Link>
              );
            })}
        </SelectorDropdown>
      </div>
    );
  }
}

SearchInput.propTypes = {
  input: PropTypes.string.isRequired,
  updateSearchInput: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(SearchInput);
