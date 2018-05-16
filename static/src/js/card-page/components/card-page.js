/* global document */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactRouterPropTypes from "react-router-prop-types";
import Card from "dokkin/js/common/card/components/card";
import {
  getCharacterImageUrl,
  getCharacterBGUrl,
  getCharacterEffectUrl,
  getThumbnailUrl,
  getLargeRarityIconUrl,
  getElementIconUrl,
  getFallbackCharacterBGUrl
} from "dokkin/js/utils/url";
import { doesStringContainJapaneseCharacters } from "dokkin/js/utils/string-utils";
import Tooltip, { MIDDLE_LEFT } from "dokkin/js/common/tooltip";

class CardPage extends Component {
  static getPageTitle(card) {
    const name = card.name.replace("#", "");
    return `${card.leader_skill} ${name} | DBZ Dokkan Battle | dokkin`;
  }

  static getPageDescription(card) {
    const charTypeString = `[${card.rarity_string.toUpperCase()}][${
      card.alliance_type
    } ${card.element_string.toUpperCase()}]`;
    const charString = `${charTypeString} ${card.leader_skill} ${card.name}\n`;
    const descriptionString = `Leader Skill: ${
      card.leader_skill_description
    }\nPassive: ${card.passive_description}`;
    return charString + descriptionString;
  }

  componentWillMount() {
    this.updateCard(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { cardCache } = this.props;
    const { cardCache: nextCardCache } = nextProps;
    const { pathname, search } = this.props.location;
    const { params } = this.props.match;

    const cardId = params.cardSlug.split("-")[0];
    const card = cardCache[cardId];
    const nextCard = nextCardCache[cardId];

    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCard(nextProps);
      if (card) {
        document.title = CardPage.getPageTitle(card);
      }
    }
    if (!card && nextCard) {
      document.title = CardPage.getPageTitle(nextCard);
    }
  }

  handleImageLoad = event => {
    event.target.className += " loaded";
  };

  handleImageError = event => {
    event.target.src = getFallbackCharacterBGUrl();
    event.target.className += " loaded";
  };

  updateCard(props) {
    const { params } = props.match;
    const cardId = params.cardSlug.split(/-(.+)/)[0];
    this.props.fetchCard(cardId);
  }

  render() {
    const { cardCache } = this.props;
    const { params } = this.props.match;
    const cardId = params.cardSlug.split(/-(.+)/)[0];
    const card = cardCache[cardId];
    const resourceId = (card && card.resource_id) || cardId;

    return (
      <div className="page card-page">
        {card && (
          <div className="card-page-content">
            <div className="card-char-pane">
              <div className="card-full-art">
                <img
                  onLoad={this.handleImageLoad}
                  onError={this.handleImageError}
                  className="card-char-bg"
                  src={getCharacterBGUrl(resourceId)}
                  alt={`Background for ${card.name}`}
                />
                <img
                  onLoad={this.handleImageLoad}
                  className="card-char-art"
                  src={getCharacterImageUrl(resourceId)}
                  alt={`${card.leader_skill} ${card.name}`}
                />
                <img
                  onLoad={this.handleImageLoad}
                  className="card-char-effect"
                  src={getCharacterEffectUrl(resourceId)}
                  alt={`Effect for ${card.name}`}
                />
                <div className="card-overlay">
                  <img
                    className="card-rarity"
                    src={getLargeRarityIconUrl(card.rarity_string)}
                    alt={card.rarity_string}
                  />
                  <img
                    className="card-element"
                    src={getElementIconUrl(card.element)}
                    alt={card.element_string}
                  />
                </div>
              </div>
              <div className="card-awaken-info">
                <div className="card-awaken-arrow-box">
                  {card.prev_dokkan && (
                    <div className="card-awaken-container">
                      <Link to={card.prev_dokkan.url}>
                        <Card {...card.prev_dokkan} />
                      </Link>
                      <img
                        className="right-arrow"
                        src="https://static.dokk.in/ui/com_ui_arrow_01_right.png"
                        alt="right arrow"
                      />
                    </div>
                  )}
                </div>
                {(card.prev_dokkan || card.next_dokkan) && <Card {...card} />}
                <div className="card-awaken-arrow-box">
                  {card.next_dokkan && (
                    <div className="card-awaken-container">
                      <img
                        className="right-arrow"
                        src="https://static.dokk.in/ui/com_ui_arrow_01_right.png"
                        alt="right arrow"
                      />
                      <Link to={card.next_dokkan.url}>
                        <Card {...card.next_dokkan} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-page-info grid-item-details">
              <div className="card-page-name">
                <h1 className="card-page-title">{card.leader_skill}</h1>
                <h2 className="card-page-base-name">{card.name}</h2>
                <hr />
              </div>
              <div className="grid-item-detail-item">
                <img
                  src="https://static.dokk.in/label/com_label_leader_skill_03.png"
                  title="Leader Skill"
                  alt="Leader Skill"
                />
                <div>{card.leader_skill_description}</div>
              </div>
              <div className="grid-item-detail-item">
                <img
                  src="https://static.dokk.in/label/com_label_passive_skill_02.png"
                  title="Passive Skill"
                  alt="Passive Skill"
                />
                <div>{card.passive_description}</div>
              </div>
              <div className="grid-item-detail-item">
                <img
                  src="https://static.dokk.in/label/com_label_sp_atk.png"
                  title="Super ATK"
                  alt="Super ATK"
                />
                <div>
                  {card.super_attack_description.map(description => (
                    <div key={description}>{description}</div>
                  ))}
                </div>
              </div>
              {card.links && (
                <div className="grid-item-detail-item card-page-links">
                  <img
                    src="https://static.dokk.in/label/com_label_link_skill_99.png"
                    title="Link Skill"
                    alt="Link Skill"
                  />
                  <ul>
                    {card.links.map(link => (
                      <li key={link.id}>
                        <Tooltip
                          attachment={MIDDLE_LEFT}
                          tooltipContent={<span>{link.description}</span>}
                        >
                          <Link to={`/links/${link.slug}`}>{link.name}</Link>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {card.categories && (
                <div className="grid-item-detail-item card-page-categories">
                  <img
                    className="card-info-category"
                    src="https://static.dokk.in/label/com_label_category_99.png"
                    title="Category"
                    alt="Category"
                  />
                  <ul>
                    {card.categories.map(category => (
                      <li key={category.id}>
                        <Link to={`/categories/${category.slug}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Helmet>
              <meta property="og:site" content="dokk.in" />
              <meta property="og:type" content="website" />
              <meta
                property="og:description"
                content={CardPage.getPageDescription(card)}
              />
              <meta property="og:title" content={CardPage.getPageTitle(card)} />
              <meta property="og:image" content={getThumbnailUrl(card.id)} />
              <meta property="og:url" content={document.location} />
              {doesStringContainJapaneseCharacters(
                card.leader_skill_description
              ) && <meta name="robots" content="noindex" />}
            </Helmet>
          </div>
        )}
      </div>
    );
  }
}

CardPage.propTypes = {
  cardCache: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      element: PropTypes.number.isRequired,
      rarity_string: PropTypes.string.isRequired,
      element_string: PropTypes.string.isRequired
    })
  ).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  fetchCard: PropTypes.func.isRequired
};

export default withRouter(CardPage);
