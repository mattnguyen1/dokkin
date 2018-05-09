import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import SelectorDropdown from "dokkin/js/common/selector-dropdown/index";
import IconSearch from "dokkin/js/common/icons/icon-search";
import Card from "dokkin/js/common/card/components/card";
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

  submitSearch = () => {
    const { history, input } = this.props;
    history.push(`/search?q=${input}`);
  };

  onInputChange = input => {
    const { updateSearchInput } = this.props;
    updateSearchInput(input);
    if (input) {
      this.throttledFetchQuickSearch(input);
    }
  };

  onSubmit = (event, selectedItemIndex) => {
    const { history, input, quickSearchResults } = this.props;
    event.preventDefault();

    if (selectedItemIndex >= 0) {
      history.push(quickSearchResults[selectedItemIndex].url);
    } else {
      this.submitSearch();
    }
  };

  renderSearchIcon = ({ onClick }) => {
    const searchClickHandler = () => {
      if (onClick) {
        onClick();
      }
      this.submitSearch();
    };
    return (
      <button className="search-icon" onClick={searchClickHandler}>
        <IconSearch width={14} height={14} />
      </button>
    );
  };

  renderCard = props => {
    return <Card {...props} className={"small search-item-image"} />;
  };

  render() {
    const { input, quickSearchResults } = this.props;
    return (
      <div className="search">
        <SelectorDropdown
          inputRef={el => {
            this.searchInput = el;
          }}
          placeholder="Search (example: str ssb vegito)"
          value={input}
          onChange={this.onInputChange}
          onEnterKeyDown={this.onSubmit}
          SelectorCTARenderer={this.renderSearchIcon}
        >
          {quickSearchResults &&
            quickSearchResults.map((result, index) => {
              return (
                <Link to={result.url} key={`quick-search-result-${index}`}>
                  <SearchItem
                    imageRenderer={this.renderCard}
                    imageProps={result}
                    text={`${result.leader_skill} ${result.name}`}
                    value={`${result.id}`}
                    searchQuery={input}
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
