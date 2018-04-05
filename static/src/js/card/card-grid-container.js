import { connect } from 'react-redux'

import CardGrid from 'dokkin/js/card/components/card-grid'
import { fetchCards } from 'dokkin/js/card/card-action'

const mapStateToProps = (state) => ({
  cardsList: state.cardReducer.cardsList
});

export default connect(mapStateToProps)(CardGrid)
