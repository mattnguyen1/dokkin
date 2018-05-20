import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import NavGrid from "dokkin/js/common/nav-grid";
import LinkNavRow from "./link-nav-row";

class LinkNavPage extends Component {
  static getPageTitle() {
    return `Links | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    const { fetchLinks } = this.props;
    document.title = LinkNavPage.getPageTitle();
    fetchLinks();
  }

  render() {
    const { links, isLoading } = this.props;
    return (
      <div className="page link-nav-page">
        <div className="page-header">
          <h1 className="page-name">Links</h1>
        </div>
        <NavGrid
          RowComponent={LinkNavRow}
          navList={links}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default withRouter(LinkNavPage);
