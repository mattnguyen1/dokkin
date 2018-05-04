import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchItem extends Component {
  render() {
    const { imageUrl, text, value } = this.props;
    return (
      <div className="search-item">
        {imageUrl && <img src={imageUrl} alt={`Search result for ${text}`} />}
        <div>{text}</div>
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SearchItem.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
};
/* eslint-enable react/forbid-prop-types */

SearchItem.defaultProps = {
  imageUrl: ""
};

export default SearchItem;
