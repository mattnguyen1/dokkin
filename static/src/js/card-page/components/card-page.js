import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'dokkin/js/card/components/card'
import SearchInput from 'dokkin/js/search/search-input-container'
import { getCharacterImageUrl, getCharacterBGUrl, getCharacterEffectUrl } from 'dokkin/js/utils/url'

class CardPage extends Component {

  componentWillMount() {
    this.updateCard(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {

      this.updateCard(nextProps)
    }
  }

  updateCard(props) {
    const { params } = props.match;
    this.props.fetchCard(params.cardSlug);
  }

  render() {
    const { cardCache } = this.props;
    const { params } = this.props.match;
    const card = cardCache[params.cardSlug];
    return (
      <div className="page card-page">
        <SearchInput/>
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
              </div>
              <div className="card-row-detail-item">
                <span className="card-row-detail-title">Leader Skill: </span>{card.leader_skill_description}
              </div>
              <div className="card-row-detail-item">
                <span className="card-row-detail-title">Passive: </span>{card.passive_description}
              </div>
              {
                card.links &&
                <div className="card-row-detail-item card-page-links">
                  <div className="card-row-detail-title">Links:</div>
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
                  <div className="card-row-detail-title">Categories:</div>
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
            
          </div>
        }
      </div>
    );
  }
}

export default CardPage;
