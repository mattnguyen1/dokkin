/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import CardGrid from "dokkin/js/common/card/components/card-grid";

class UpcomingCardPage extends Component {
  static getPageTitle() {
    return `Upcoming Cards | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    this.updateCardGrid();
    document.title = UpcomingCardPage.getPageTitle();
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid();
      document.title = UpcomingCardPage.getPageTitle();
    }
  }

  updateCardGrid(props) {
    this.props.fetchUpcomingCards();
  }

  render() {
    const { cards, canLoadMore, isLoading, fetchUpcomingCards } = this.props;
    return (
      <div className="page upcoming-card-page">
        <div className="page-header">
          <h1 className="page-name">Upcoming Cards</h1>
        </div>
        <CardGrid
          cardsList={cards}
          canLoadMore={canLoadMore}
          isLoading={isLoading}
          fetchCards={fetchUpcomingCards}
        />
      </div>
    );
  }
}

UpcomingCardPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  fetchUpcomingCards: PropTypes.func.isRequired
};

export default withRouter(UpcomingCardPage);
