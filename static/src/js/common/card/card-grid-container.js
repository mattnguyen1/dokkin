import { connect } from "react-redux";
import CardGrid from "dokkin/js/common/card/components/card-grid";
import { fetchCards } from "dokkin/js/common/card/card-action";

const mapStateToProps = state => ({
  cardsList: state.cardReducer.cardsList.cards,
  marker: state.cardReducer.cardsList.marker,
  canLoadMore: state.cardReducer.cardsList.canLoadMore,
  params: state.cardReducer.cardsList.params,
  isLoading: state.cardReducer.cardsList.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCards: params => dispatch(fetchCards(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardGrid);
