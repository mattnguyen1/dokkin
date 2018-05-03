import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import SelectorDropdown from "dokkin/js/common/selector-dropdown/index";
import SearchItem from "./search-item";

class SearchInput extends Component {
  onInputChange = event => {
    this.props.updateSearchInput(event.target.value);
    // if (event.target.value) {
    //   this.props.fetchQuickSearch(event.target.value);
    // }
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/search?q=${this.props.input}`);
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
          {/* {quickSearchResults &&
            quickSearchResults.map((result, index) => {
              return (
                <SearchItem
                  key={`quick-search-result-${index}`}
                  text={`${result.leader_skill} ${result.name}`}
                  value={`${result.id}`}
                  onClick={() => {}}
                />
              );
            })} */}
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
