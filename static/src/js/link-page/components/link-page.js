/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import CardGrid from "dokkin/js/common/card/card-grid-container";

class LinkPage extends Component {
  static getPageTitle(link) {
    const name = link.name.replace("#", "");
    return `${name} | Links | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    this.updateCardGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { linkCache } = this.props;
    const { linkCache: nextLinkCache } = nextProps;
    const { pathname, search } = this.props.location;
    const { params } = this.props.match;

    const linkId = params.linkSlug.split("-")[0];
    const link = linkCache[linkId];
    const nextLink = nextLinkCache[linkId];

    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid(nextProps);
      if (link) {
        document.title = LinkPage.getPageTitle(link);
      }
    }
    if (!link && nextLink) {
      document.title = LinkPage.getPageTitle(nextLink);
    }
  }
  updateCardGrid(props) {
    const { params } = props.match;
    const linkId = params.linkSlug.split(/-(.+)/)[0];
    this.props.fetchLinkAndCards(linkId);
  }

  render() {
    const { linkCache } = this.props;
    const { params } = this.props.match;
    const linkId = params.linkSlug.split(/-(.+)/)[0];
    const link = linkCache[linkId];
    return (
      <div className="page link-page">
        {link && (
          <div className="link-page-header">
            <h1 className="link-page-name">{link.name}</h1>
            <h2 className="link-page-description">{link.description}</h2>
          </div>
        )}
        <CardGrid />
      </div>
    );
  }
}

LinkPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  linkCache: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired,
  fetchLinkAndCards: PropTypes.func.isRequired
};

export default withRouter(LinkPage);
