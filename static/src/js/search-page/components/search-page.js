import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'dokkin/js/card/components/card'
import CardGrid from 'dokkin/js/card/card-grid-container'
import { getMappedQueryParams } from 'dokkin/js/utils/url'

const DEFAULT_SEARCH_QUERY = '';
const DEFAULT_SITE_TITLE = 'dokk.in | DBZ Dokkan Battle';

class SearchPage extends Component {

  componentWillMount() {
    this.updateCardGrid(this.props);
    document.title = DEFAULT_SITE_TITLE;
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {
      this.updateCardGrid(nextProps);
      document.title = DEFAULT_SITE_TITLE;
    }
  }

  updateCardGrid(props) {
    const { pathname, search } = props.location;
    const queryParams = getMappedQueryParams(search);
    let searchQuery = queryParams.q || DEFAULT_SEARCH_QUERY;

    this.props.fetchCards(searchQuery);
  }

  render() {
    return (
      <div className="page search-page">
        <CardGrid />
      </div>
    )
  }
}

export default SearchPage;