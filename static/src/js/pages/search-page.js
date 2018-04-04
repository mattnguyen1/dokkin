import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../card/components/card'
import CardGrid from '../card/card-grid-container'
import SearchInput from '../search/search-container'
import queryString from 'query-string'
import { fetchCards } from '../card/card-action'
import { withRouter } from 'react-router-dom'

class SearchPage extends Component {

  componentWillMount() {
    this.updateCardGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, search } = this.props.location;
    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {

      this.updateCardGrid(nextProps);
    }
  }

  updateCardGrid(props) {
    const { pathname, search } = props.location;
    const queryParams = queryString.parse(search);
    let searchQuery = queryParams.q || 'goku';

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

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (query) => dispatch(fetchCards(query))  
})

export default connect(null, mapDispatchToProps)(SearchPage);
