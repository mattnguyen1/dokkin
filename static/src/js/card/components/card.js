import React from 'react';
import PropTypes from 'prop-types';
import { getThumbnailUrl, getThumbnailBGUrl, getRarityIconUrl, getElementIconUrl } from '../../utils/url';

const Card = ({id, name, element, rarity, rarity_string}) => {
  const cardStyle = {
    backgroundImage: `url(${getThumbnailBGUrl(element, rarity)})`
  }
  return (
    <div className="card" data-type-id={id}>
      <div className="card-frame" style={cardStyle}>
        <div className="card-background">
          <img className="card-character" src={getThumbnailUrl(id)} />
        </div>
        <div className="card-foreground">
          <img className="card-element" src={getElementIconUrl(element)} />
          <img className="card-rarity" src={getRarityIconUrl(rarity_string)} />
        </div>
      </div>
      {name}
    </div>)
}

Card.propTypes = {
  name: PropTypes.string.isRequired
}

export default Card;
