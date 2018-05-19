/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import CardGrid from "dokkin/js/common/card/card-grid-container";

class NewCardPage extends Component {
  static getPageTitle() {
    return `New Cards | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    this.updateCardGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;

    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid(nextProps);
      document.title = NewCardPage.getPageTitle();
    }
  }

  updateCardGrid(props) {
    this.props.fetchNewCards();
  }

  render() {
    return (
      <div className="page new-card-page">
        <div className="page-header">
          <h1 className="page-name">Recently Released</h1>
        </div>
        <CardGrid />
      </div>
    );
  }
}

NewCardPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  categoryCache: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  fetchCategoryAndCards: PropTypes.func.isRequired
};

export default withRouter(NewCardPage);
