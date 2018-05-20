/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import CardGrid from "dokkin/js/common/card/components/card-grid";

class NewCardPage extends Component {
  static getPageTitle() {
    return `New Cards | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    this.updateCardGrid();
    document.title = NewCardPage.getPageTitle();
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid();
      document.title = NewCardPage.getPageTitle();
    }
  }

  updateCardGrid(props) {
    this.props.fetchNewCards();
  }

  render() {
    const { cards, canLoadMore, isLoading, fetchNewCards } = this.props;
    return (
      <div className="page new-card-page">
        <div className="page-header">
          <h1 className="page-name">New Cards</h1>
        </div>
        <CardGrid
          cardsList={cards}
          canLoadMore={canLoadMore}
          isLoading={isLoading}
          fetchCards={fetchNewCards}
        />
      </div>
    );
  }
}

NewCardPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  fetchNewCards: PropTypes.func.isRequired
};

export default withRouter(NewCardPage);
