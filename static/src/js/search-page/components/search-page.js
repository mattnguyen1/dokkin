/* global document */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactRouterPropTypes from "react-router-prop-types";
import PropTypes from "prop-types";
import CardGrid from "dokkin/js/card/card-grid-container";
import { getMappedQueryParams } from "dokkin/js/utils/url";

const DEFAULT_SEARCH_QUERY = "";
const DEFAULT_SITE_TITLE = "dokkin | DBZ Dokkan Battle";

class SearchPage extends Component {
  componentWillMount() {
    this.updateCardGrid(this.props);
    document.title = DEFAULT_SITE_TITLE;
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid(nextProps);
      document.title = DEFAULT_SITE_TITLE;
    }
  }

  updateCardGrid(props) {
    const { search } = props.location;
    const queryParams = getMappedQueryParams(search);
    const searchQuery = queryParams.q || DEFAULT_SEARCH_QUERY;

    this.props.fetchCards({
      q: searchQuery,
      ...queryParams
    });
  }

  render() {
    return (
      <div className="page search-page">
        <CardGrid />
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
      </div>
    );
  }
}

SearchPage.propTypes = {
  fetchCards: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired
};

export default withRouter(SearchPage);
