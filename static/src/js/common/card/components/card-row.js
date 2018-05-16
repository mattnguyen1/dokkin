/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "dokkin/js/common/card/components/card";

const CardRow = props => {
  const cardUrl = props.url;

  return (
    <li className="grid-item" data-type-id={props.id}>
      <div className="grid-item-left">
        <Link to={cardUrl}>
          <Card {...props} />
        </Link>
      </div>
      <div className="grid-item-right">
        <div className="grid-item-title">{props.leader_skill}</div>
        <div className="grid-item-name">{props.name}</div>
        <div className="grid-item-details">
          <div className="grid-item-detail-item">
            <span className="grid-item-detail-title">Leader Skill: </span>
            {props.leader_skill_description}
          </div>
          <div className="grid-item-detail-item">
            <span className="grid-item-detail-title">Passive: </span>
            {props.passive_description}
          </div>
        </div>
      </div>
    </li>
  );
};

CardRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  element: PropTypes.number.isRequired,
  rarity: PropTypes.number.isRequired,
  rarity_string: PropTypes.string.isRequired,
  leader_skill: PropTypes.string.isRequired,
  leader_skill_description: PropTypes.string.isRequired,
  passive_description: PropTypes.string,
  url: PropTypes.string.isRequired
};

CardRow.defaultProps = {
  passive_description: "-"
};

export default CardRow;
