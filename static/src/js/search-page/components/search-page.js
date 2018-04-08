import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import Card from 'dokkin/js/card/components/card'
import CardGrid from 'dokkin/js/card/card-grid-container'
import SearchInput from 'dokkin/js/search/search-input-container'

const DEFAULT_SEARCH_QUERY = 'goku';

class SearchPage extends Component {

  componentWillMount() {
    this.updateCardGrid(this.props);
    document.title = "dokk.in";
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {
      this.updateCardGrid(nextProps);
      document.title = "dokk.in";
    }
  }

  updateCardGrid(props) {
    const { pathname, search } = props.location;
    const queryParams = queryString.parse(search);
    let searchQuery = queryParams.q || DEFAULT_SEARCH_QUERY;

    this.props.fetchCards(searchQuery);
  }

  render() {
    return (
      <div className="page search-page">
        <SearchInput/>
        <CardGrid />
      </div>
    )
  }
}

export default SearchPage;