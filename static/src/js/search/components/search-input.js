import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import SelectorDropdown from "dokkin/js/common/selector-dropdown/index";

class SearchInput extends Component {
  onInputChange = event => {
    this.props.updateSearchInput(event.target.value);
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/search?q=${this.props.input}`);
  };

  render() {
    const { input } = this.props;
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
        />
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
