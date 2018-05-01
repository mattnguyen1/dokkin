import { connect } from "react-redux";
import CardPage from "dokkin/js/card-page/components/card-page";
import { fetchCard } from "dokkin/js/common/card/card-action";

const mapStateToProps = state => ({
  cardCache: state.cardReducer.cardCache
});

const mapDispatchToProps = dispatch => ({
  fetchCard: id => dispatch(fetchCard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
