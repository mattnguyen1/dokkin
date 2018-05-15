import { connect } from "react-redux";
import CategoryNavPage from "./components/category-nav-page";
import { fetchCategories } from "./category-nav-action";

const mapStateToProps = state => ({
  categories: state.categoryNavReducer.categories.categories,
  isLoading: state.categoryNavReducer.categories.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: id => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavPage);
