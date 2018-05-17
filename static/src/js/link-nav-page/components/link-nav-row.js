import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavRow from "dokkin/js/common/nav-grid/components/nav-row";

const LinkNavRow = ({ name, description, slug, className, ...rest }) => {
  return (
    <NavRow
      to={`/links/${slug}`}
      titleText={name}
      subtitleText={description}
      className={`link-nav-row grid-item ${className ? className : ""}`}
      {...rest}
    />
  );
};

LinkNavRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default LinkNavRow;
