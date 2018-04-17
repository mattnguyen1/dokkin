import { connect } from 'react-redux'

import { fetchCards } from 'dokkin/js/card/card-action'
import SearchPage from 'dokkin/js/search-page/components/search-page'

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (params) => dispatch(fetchCards(params))  
})

export default connect(null, mapDispatchToProps)(SearchPage);
