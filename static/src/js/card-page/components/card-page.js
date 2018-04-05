import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'dokkin/js/card/components/card'
import SearchInput from 'dokkin/js/search/search-input-container'
import { getCharacterImageUrl } from 'dokkin/js/utils/url'

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
          <div>
            <img src={getCharacterImageUrl(card.id)}/>
            <div>
              {card.leader_skill} {card.name}
            </div>
            <div>
              {card.leader_skill_description}
            </div>
            <div>
              {card.passive_description}
            </div>
            {
              card.links &&
              <div>
                Links:
                {
                  card.links.map((link) =>
                    <div key={link}>
                      {link}
                    </div>
                  )
                }
              </div>
            }
            {
              card.categories &&
              <div>
                Categories:
                {
                  card.categories.map((category) =>
                    <div key={category}>
                      {category}
                    </div>
                  )
                }
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default CardPage;
