import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'dokkin/js/card/components/card'
import CardGrid from 'dokkin/js/card/card-grid-container'
import { getMappedQueryParams } from 'dokkin/js/utils/url'

class LinkPage extends Component {

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

    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {
      this.updateCardGrid(nextProps);
      if (link) {
        document.title = this._getPageTitle(link);
      }
    }
    if (!link && nextLink) {
      document.title = this._getPageTitle(nextLink);
    }
  }

  _getPageTitle(link) {
    const name = link.name.replace("#", "");
    return `${name} | Links | DBZ Dokkan Battle`;
  }

  updateCardGrid(props) {
    const { params } = this.props.match;
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
        {
          link &&
          <div className="link-page-header">
              <div className="link-page-name">{link.name}</div>
              <div className="link-page-description">{link.description}</div>
          </div>
        }
        <CardGrid />
      </div>
    )
  }
}

export default LinkPage;