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
    fetchCategories();
  }

  render() {
    const { categories, isLoading } = this.props;
    return (
      <div className="page category-nav-page">
        <div className="category-nav-page-header">
          <h1 className="category-nav-page-title">Categories</h1>
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
