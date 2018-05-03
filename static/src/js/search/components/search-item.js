import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchItem extends Component {
  handleClick = () => {
    const { onClick } = this.props;
    onClick(value);
  };

  render() {
    const { imageUrl, text, value } = this.props;
    return (
      <div role="link" className="search-item" onClick={this.handleClick}>
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
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func.isRequired
};
/* eslint-enable react/forbid-prop-types */

SearchItem.defaultProps = {
  imageUrl: ""
};

export default SearchItem;
