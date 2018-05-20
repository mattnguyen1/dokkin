import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import NavGrid from "dokkin/js/common/nav-grid";
import CategoryNavRow from "./category-nav-row";

class CategoryNavPage extends Component {
  static getPageTitle() {
    return `Categories | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    const { fetchCategories } = this.props;
    document.title = CategoryNavPage.getPageTitle();
    fetchCategories();
  }

  render() {
    const { categories, isLoading } = this.props;
    return (
      <div className="page category-nav-page">
        <div className="page-header">
          <h1 className="page-name">Categories</h1>
        </div>
        <NavGrid
          RowComponent={CategoryNavRow}
          navList={categories}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default withRouter(CategoryNavPage);
