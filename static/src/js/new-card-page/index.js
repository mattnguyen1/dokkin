import { connect } from "react-redux";
import { fetchNewCards } from "./new-card-action";
import NewCardPage from "./components/new-card-page";

const mapStateToProps = state => ({
  reducer: state.newCardReducer,
  cards: state.newCardReducer.cardsList.cards,
  isLoading: state.newCardReducer.cardsList.isLoading,
  canLoadMore: state.newCardReducer.cardsList.canLoadMore
});

const mapDispatchToProps = dispatch => ({
  fetchNewCards: id => dispatch(fetchNewCards())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCardPage);
