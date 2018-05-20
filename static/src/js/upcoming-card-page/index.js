import { connect } from "react-redux";
import { fetchUpcomingCards } from "./upcoming-card-action";
import UpcomingCardPage from "./components/upcoming-card-page";

const mapStateToProps = state => ({
  reducer: state.upcomingCardReducer,
  cards: state.upcomingCardReducer.cardsList.cards,
  isLoading: state.upcomingCardReducer.cardsList.isLoading,
  canLoadMore: state.upcomingCardReducer.cardsList.canLoadMore
});

const mapDispatchToProps = dispatch => ({
  fetchUpcomingCards: id => dispatch(fetchUpcomingCards())
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingCardPage);
