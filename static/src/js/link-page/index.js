import { connect } from 'react-redux'

import { fetchLinkAndCards } from 'dokkin/js/link-page/link-action'
import LinkPage from 'dokkin/js/link-page/components/link-page'

const mapStateToProps = (state) => ({
  linkCache: state.linkReducer.linkCache
});

const mapDispatchToProps = (dispatch) => ({
  fetchLinkAndCards: (id) => dispatch(fetchLinkAndCards(id))  
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkPage);
