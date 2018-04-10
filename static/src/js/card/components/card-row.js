import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { getThumbnailUrl, getThumbnailBGUrl, getRarityIconUrl,
  getElementIconUrl, getSlugFromName, getUrlFriendlyString } from 'dokkin/js/utils/url'
import Card from 'dokkin/js/card/components/card'

const CardRow = (props) => {
  
  let fullName = props.leader_skill + " " + props.name;
  const cardUrl = "/card/" + getSlugFromName(props.id, fullName);

  return (
    <li className="card-row" data-type-id={props.id}>
      <div className="card-row-left">
        <Link to={cardUrl}>
          <Card {...props}></Card>
        </Link>
      </div>
      <div className="card-row-right">
        <div className="card-row-title">
          {props.leader_skill} 
        </div>
        <div className="card-row-name">
          {props.name}        
        </div>
        <div className="card-row-details">
          <div className="card-row-detail-item">
            <span className="card-row-detail-title">Leader Skill: </span>{props.leader_skill_description}
          </div>
          <div className="card-row-detail-item">
            <span className="card-row-detail-title">Passive: </span>{props.passive_description}
          </div>
        </div>
      </div>
    </li>
  )
}

CardRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  element: PropTypes.number.isRequired,
  rarity: PropTypes.number.isRequired,
  rarity_string: PropTypes.string.isRequired,
  leader_skill: PropTypes.string.isRequired
}

export default CardRow;
