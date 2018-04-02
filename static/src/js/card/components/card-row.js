import React from 'react';
import PropTypes from 'prop-types';
import { getThumbnailUrl, getThumbnailBGUrl, getRarityIconUrl, getElementIconUrl } from '../../utils/url';
import Card from './card';

const CardRow = (props) => {
  
  return (
    <div className="card-row" data-type-id={props.id}>
      <div className="card-row-left">
        <Card {...props}></Card>
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
    </div>
  )
}

CardRow.propTypes = {
  name: PropTypes.string.isRequired
}

export default CardRow;
