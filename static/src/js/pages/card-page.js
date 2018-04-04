import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../card/components/card'
import SearchInput from '../search/search-container'
import { fetchCard } from '../card/card-action'
import { withRouter } from 'react-router-dom'

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
    const { card } = this.props;
    return (
      <div className="page card-page">
        <SearchInput/>
        {
          card &&
          <div>
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

const mapStateToProps = (state) => ({
  card: state.cardReducer.card
});

const mapDispatchToProps = (dispatch) => ({
  fetchCard: (id) => dispatch(fetchCard(id))  
})

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
