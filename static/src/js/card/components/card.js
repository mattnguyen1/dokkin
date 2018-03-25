import React from 'react';
import PropTypes from 'prop-types';
import { getThumbnailUrl, getThumbnailBGUrl, getRarityIconUrl } from '../../utils/url';

const Card = ({id, name, element, rarity, rarity_string}) => {
  const cardStyle = {
    backgroundImage: `url(${getThumbnailBGUrl(element, rarity)})`
  }
  return (
    <div className="card" data-type-id={id}>
      <div className="card-frame" style={cardStyle}>
        <img className="card-character" src={getThumbnailUrl(id)} />
        <img className="card-rarity" src={getRarityIconUrl(rarity_string)} />
      </div>
      {name}
    </div>)
}

Card.propTypes = {
  name: PropTypes.string.isRequired
}

export default Card;
