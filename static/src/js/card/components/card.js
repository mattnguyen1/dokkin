import React from 'react'
import PropTypes from 'prop-types'

import {
  getThumbnailUrl, getThumbnailBGUrl, getRarityIconUrl,
  getElementIconUrl, getFallbackThumbnailUrl
} from 'dokkin/js/utils/url'

const _handleImageLoad = (event) => {
  event.target.className += " loaded";
}

const Card = ({id, name, element, rarity, rarity_string, leader_skill}) => {
  const cardStyle = {
    backgroundImage: `url(${getThumbnailBGUrl(element, rarity)})`
  }
  
  return (
    <div className="card" data-type-id={id} title={leader_skill + " " + name}>
      <div className="card-frame" style={cardStyle}>
        <div className="card-background">
          <img className="card-character" src={getThumbnailUrl(id)}
            onError={(e)=>{e.target.src=getFallbackThumbnailUrl()}}
            onLoad={_handleImageLoad}
          />
        </div>
        <div className="card-foreground">
          <img className="card-element" src={getElementIconUrl(element)} />
          <img className="card-rarity" src={getRarityIconUrl(rarity_string)} />
        </div>
      </div>
    </div>)
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  element: PropTypes.number.isRequired,
  rarity: PropTypes.number.isRequired,
  rarity_string: PropTypes.string.isRequired,
  leader_skill: PropTypes.string.isRequired,
}

export default Card;
