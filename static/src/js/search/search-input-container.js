import { connect } from 'react-redux'

import SearchInput from 'dokkin/js/search/components/search-input'
import { updateSearchInput } from 'dokkin/js/search/search-action'
import { fetchCards } from 'dokkin/js/card/card-action'

const mapStateToProps = (state) => ({
  input: state.searchReducer.input
})

const mapDispatchToProps = (dispatch) => ({
  updateSearchInput: (input) => dispatch(updateSearchInput(input)),
  fetchCards: (params) => dispatch(fetchCards(params))  
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
