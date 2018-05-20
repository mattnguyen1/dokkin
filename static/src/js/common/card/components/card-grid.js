import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import CardRowLoader from "dokkin/js/common/card/components/card-row-loader";
import CardRow from "dokkin/js/common/card/components/card-row";

class CardGrid extends Component {
  static renderLoaders(numLoaders) {
    const loaderArr = [];
    for (let i = 0; i < numLoaders; i++) {
      loaderArr.push(i);
    }
    return (
      <ul className="card-grid" key={0}>
        {loaderArr.map(index => <CardRowLoader key={index} />)}
      </ul>
    );
  }

  loadCards = page => {
    const { params, fetchCards } = this.props;
    const { limit } = params;

    if (limit) {
      const queryParams = Object.assign(params);
      queryParams.offset = page * limit;
      fetchCards(queryParams);
    } else {
      fetchCards();
    }
  };

  render() {
    const { cardsList, canLoadMore, isLoading } = this.props;
    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.loadCards}
        hasMore={canLoadMore}
        loader={CardGrid.renderLoaders(5)}
        className="infinite-card-grid"
      >
        {!cardsList.length && isLoading ? (
          CardGrid.renderLoaders(50)
        ) : (
          <ul className="card-grid">
            {cardsList &&
              cardsList.map(card => <CardRow key={card.id} {...card} />)}
          </ul>
        )}
      </InfiniteScroll>
    );
  }
}

CardGrid.propTypes = {
  cardsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchCards: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    q: PropTypes.string
  }),
  isLoading: PropTypes.bool.isRequired
};

CardGrid.defaultProps = {
  params: {
    q: ""
  },
  isLoading: false
};

export default CardGrid;
