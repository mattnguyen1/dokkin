import { connect } from 'react-redux'
import SearchInput from './components/search-input'
import { updateSearchInput } from './search-action'
import { fetchCards } from '../card/card-action'


const mapStateToProps = (state) => ({
  input: state.searchReducer.input
})

const mapDispatchToProps = (dispatch) => ({
  updateSearchInput: (input) => dispatch(updateSearchInput(input)),
  fetchCards: (name) => dispatch(fetchCards(name))  
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
