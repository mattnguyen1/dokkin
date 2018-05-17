import { connect } from "react-redux";
import LinkNavPage from "./components/link-nav-page";
import { fetchLinks } from "./link-nav-action";

const mapStateToProps = state => ({
  links: state.linkNavReducer.links.links,
  isLoading: state.linkNavReducer.links.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchLinks: id => dispatch(fetchLinks())
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkNavPage);
