import React from "react";
import PropTypes from "prop-types";

const SearchItem = ({ imageUrl, text, value, onClick }) => {
  handleClick = () => {
    const { onClick } = this.props;
    onClick(value);
  };

  return (
    <div role="link" className="search-item" onClick={this.handleClick}>
      {imageUrl && <img src={imageUrl} alt={`Search result for ${text}`} />}
      <div>{text}</div>
    </div>
  );
};

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
