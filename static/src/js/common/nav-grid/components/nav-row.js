import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavRow = ({ id, titleText, subtitleText, ...rest }) => {
  return (
    <li className="nav-row" data-type-id={id}>
      <Link {...rest}>
        <div className="nav-row-title">{titleText}</div>
        {subtitleText && <div className="nav-row-subtitle">{subtitleText}</div>}
      </Link>
    </li>
  );
};

NavRow.propTypes = {
  id: PropTypes.number.isRequired,
  titleText: PropTypes.string.isRequired,
  subtitleText: PropTypes.string
};

NavRow.defaultProps = {
  subtitleText: ""
};

export default NavRow;
