import { connect } from 'react-redux'
import CardGrid from './components/card-grid'
import { fetchCards } from './card-action'

const mapStateToProps = (state) => ({
  cards: state.cardReducer.cards,
  searchInput: state.searchReducer.input
})

const mapDispatchToProps = (dispatch) => ({
  fetchCards: (name) => dispatch(fetchCards(name))  
})

export default connect(mapStateToProps, mapDispatchToProps)(CardGrid)
