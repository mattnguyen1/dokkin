import { connect } from "react-redux";
import { fetchCategoryAndCards } from "dokkin/js/category-page/category-action";
import CategoryPage from "dokkin/js/category-page/components/category-page";

const mapStateToProps = state => ({
  categoryCache: state.categoryReducer.categoryCache
});

const mapDispatchToProps = dispatch => ({
  fetchCategoryAndCards: id => dispatch(fetchCategoryAndCards(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
