import React, { Component } from "react";
import PropTypes from "prop-types";
import Highlighter from "react-highlight-words";

class SearchItem extends Component {
  render() {
    const { imageRenderer, imageProps, text, value, searchQuery } = this.props;
    return (
      <div className="search-item">
        {imageRenderer && imageProps && imageRenderer(imageProps)}
        <div className="search-item-text">
          <Highlighter
            highlightClassName="search-key-word"
            searchWords={searchQuery.split(" ")}
            autoescape
            textToHighlight={text}
          />
        </div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SearchItem.propTypes = {
  imageRenderer: PropTypes.func,
  imageProps: PropTypes.shape({
    id: PropTypes.number
  }),
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};
/* eslint-enable react/forbid-prop-types */

SearchItem.defaultProps = {
  imageRenderer: null,
  imageProps: { id: null }
};

export default SearchItem;
