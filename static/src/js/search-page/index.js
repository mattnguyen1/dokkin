import { connect } from 'react-redux'

import { fetchCards } from 'dokkin/js/card/card-action'
import SearchPage from 'dokkin/js/search-page/components/search-page'

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (query) => dispatch(fetchCards(query))  
})

export default connect(null, mapDispatchToProps)(SearchPage);
