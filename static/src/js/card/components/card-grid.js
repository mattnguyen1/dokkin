import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroller';

import CardRow from 'dokkin/js/card/components/card-row';
import CardRowLoader from './card-row-loader';

class CardGrid extends Component {

  _loadCards = (page) => {
    const { params, fetchCards } = this.props;
    const { limit } = params;

    if (limit) {
      const queryParams = Object.assign(params);
      queryParams.offset = page * limit;
      fetchCards(queryParams);
    }
  }

  _renderLoaders(numLoaders) {
    const loaderArr = [];
    for (let i = 0; i < numLoaders; i++) {
      loaderArr.push(i);
    }
    return (
      <ul className="card-grid" key={0}>
        {
          loaderArr.map((index) => <CardRowLoader key={index}/>)
        }
      </ul>
    )
  }

  render() {
    const { cardsList, canLoadMore, isLoading } = this.props;
    return (
      <InfiniteScroll
          pageStart={1}
          loadMore={this._loadCards}
          hasMore={canLoadMore}
          loader={this._renderLoaders(10)}
      >
        {
          (!cardsList.length && isLoading) ?
            this._renderLoaders(50)
            :
            <ul className="card-grid">
              {
                cardsList && cardsList.map((card) => 
                  <CardRow
                    key={card.id}
                    {...card}
                  />
                )
              }
            </ul>
        }
      </InfiniteScroll>
    )
  }
}

CardGrid.propTypes = {
  cardsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCards: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired
}

export default CardGrid;
