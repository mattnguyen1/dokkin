import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavRow from "dokkin/js/common/nav-grid/components/nav-row";

const CategoryNavRow = ({ name, slug, className, ...rest }) => {
  return (
    <NavRow
      to={`/categories/${slug}`}
      titleText={name}
      className={`category-nav-row grid-item ${className ? className : ""}`}
      {...rest}
    />
  );
};

CategoryNavRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default CategoryNavRow;
