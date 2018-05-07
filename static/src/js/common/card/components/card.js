import React from "react";
import PropTypes from "prop-types";
import {
  getThumbnailUrl,
  getThumbnailBGUrl,
  getRarityIconUrl,
  getElementIconUrl,
  getFallbackThumbnailUrl
} from "dokkin/js/utils/url";

const handleImageLoad = event => {
  event.target.className += " loaded";
};

const Card = ({
  id,
  name,
  element,
  element_string,
  rarity,
  rarity_string,
  leader_skill,
  resource_id,
  className
}) => {
  const cardStyle = {
    backgroundImage: `url(${getThumbnailBGUrl(element, rarity)})`
  };
  const resourceId = resource_id || id;
  const fullName = `${leader_skill} ${name}`;

  return (
    <div className={`card ${className}`} data-type-id={id} title={fullName}>
      <div className="card-frame" style={cardStyle}>
        <div className="card-background">
          <img
            className="card-character"
            src={getThumbnailUrl(resourceId)}
            onError={e => {
              e.target.src = getFallbackThumbnailUrl();
            }}
            onLoad={handleImageLoad}
            alt={fullName}
          />
        </div>
        <div className="card-foreground">
          <img
            className="card-element"
            src={getElementIconUrl(element)}
            alt={element_string}
          />
          <img
            className="card-rarity"
            src={getRarityIconUrl(rarity_string)}
            alt={rarity_string}
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  element: PropTypes.number.isRequired,
  element_string: PropTypes.string.isRequired,
  rarity: PropTypes.number.isRequired,
  rarity_string: PropTypes.string.isRequired,
  leader_skill: PropTypes.string.isRequired,
  resource_id: PropTypes.number,
  className: PropTypes.string
};

Card.defaultProps = {
  resource_id: null,
  className: ""
};

export default Card;
