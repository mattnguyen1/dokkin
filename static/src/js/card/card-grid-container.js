import { connect } from 'react-redux'
import CardGrid from './components/card-grid'
import { fetchCards } from './card-action'

const mapStateToProps = (state) => ({
  cards: state.cardReducer.cards
});

export default connect(mapStateToProps)(CardGrid)
