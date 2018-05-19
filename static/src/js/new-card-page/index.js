import { connect } from "react-redux";
import { fetchCategoryAndCards } from "dokkin/js/category-page/category-action";
import NewCardPage from "./components/new-card-page";

const mapStateToProps = state => ({
  cards: state.cardReducer.cards
});

const mapDispatchToProps = dispatch => ({
  fetchNewCards: id => dispatch(fetchNewCards(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
