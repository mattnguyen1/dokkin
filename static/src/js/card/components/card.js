import React from 'react';
import PropTypes from 'prop-types';
import { getThumbnailUrl, getThumbnailBGUrl } from '../../utils/url';

const Card = ({id, name, element, rarity}) => {
  const cardStyle = {
    backgroundImage: `url(${getThumbnailBGUrl(element, rarity)})`
  }
  return (
    <div className="card">
      <div className="card-frame" style={cardStyle}>
        <img className="card-character" src={getThumbnailUrl(id)} />
      </div>
      {name}
    </div>)
}

Card.propTypes = {
  name: PropTypes.string.isRequired
}

export default Card;
