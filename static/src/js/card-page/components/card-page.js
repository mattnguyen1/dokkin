import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Card from 'dokkin/js/card/components/card'
import { getCharacterImageUrl, getCharacterBGUrl, getCharacterEffectUrl } from 'dokkin/js/utils/url'

class CardPage extends Component {

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

    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {
      this.updateCard(nextProps)
      if (card) {
        document.title = this._getPageTitle(card);
      }
    }
    if (!card && nextCard) {
      document.title = this._getPageTitle(nextCard);
    }
  }

  _getPageTitle(card) {
    const name = card.name.replace("#", "");
    return card.leader_skill + " " + name + " | DBZ Dokkan Battle";
  }

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
    return (
      <div className="page card-page">
        {
          card &&
          <div className="card-page-content">
            <div className="card-full-art">
              <img className="card-char-bg" src={getCharacterBGUrl(card.id)}/>
              <img className="card-char-art" src={getCharacterImageUrl(card.id)}/>
              <img className="card-char-effect" src={getCharacterEffectUrl(card.id)}/>
            </div>
            <div className="card-page-info card-row-details">
              <div className="card-page-name">
                <div className="card-page-title">{card.leader_skill}</div>
                <div className="card-page-base-name">{card.name}</div>
                <hr/>
              </div>
              <div className="card-row-detail-item">
                <img src="https://static.dokk.in/label/com_label_leader_skill_03.png" title="Leader Skill"/>
                <div>{card.leader_skill_description}</div>
              </div>
              <div className="card-row-detail-item">
                <img src="https://static.dokk.in/label/com_label_passive_skill_02.png" title="Passive Skill"/>
                <div>{card.passive_description}</div>
              </div>
              <div className="card-row-detail-item">
                <img src="https://static.dokk.in/label/com_label_sp_atk.png" title="Super ATK"/>
                <div>{card.super_attack_description}</div>
              </div>
              {
                card.links &&
                <div className="card-row-detail-item card-page-links">
                  <img src="https://static.dokk.in/label/com_label_link_skill_99.png" title="Link Skill"/>
                  <ul>
                    {
                      card.links.map((link) =>
                        <li key={link}>
                          {link}
                        </li>
                      )
                    }
                  </ul>
                </div>
              }
              {
                card.categories &&
                <div className="card-row-detail-item card-page-categories">
                  <img className="card-info-category" src="https://static.dokk.in/label/com_label_category_99.png" title="Category"/>
                  <ul>
                  {
                    card.categories.map((category) =>
                      <li key={category}>
                        {category}
                      </li>
                    )
                  }
                  </ul>
                </div>
              }
            </div>
            <Helmet>
              <meta property="og:site" content="dokk.in"/>
              <meta property="og:type" content="website"/>
              <meta property="og:card" content={"Leader Skill: " + card.leader_skill_description + "\n" + "Passive: " + card.passive_description} />
              <meta property="og:title" content={card.leader_skill + " " + card.name}/>
              <meta property="og:image" content={getCharacterImageUrl(card.id)}/>
              <meta property="og:url" content={document.location}/>
            </Helmet>
          </div>
        }
      </div>
    );
  }
}

export default CardPage;
