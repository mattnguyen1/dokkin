/* global document */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import CardGrid from "dokkin/js/common/card/card-grid-container";

class CategoryPage extends Component {
  static getPageTitle(category) {
    const name = category.name.replace("#", "");
    return `${name} | Categories | DBZ Dokkan Battle | dokkin`;
  }

  componentWillMount() {
    this.updateCardGrid(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { categoryCache } = this.props;
    const { categoryCache: nextCategoryCache } = nextProps;
    const { pathname, search } = this.props.location;
    const { params } = this.props.match;

    const categoryId = params.categorySlug.split("-")[0];
    const category = categoryCache[categoryId];
    const nextCategory = nextCategoryCache[categoryId];

    if (
      pathname !== nextProps.location.pathname ||
      search !== nextProps.location.search
    ) {
      this.updateCardGrid(nextProps);
      if (category) {
        document.title = CategoryPage.getPageTitle(category);
      }
    }
    if (!category && nextCategory) {
      document.title = CategoryPage.getPageTitle(nextCategory);
    }
  }

  updateCardGrid(props) {
    const { params } = props.match;
    const categoryId = params.categorySlug.split(/-(.+)/)[0];
    this.props.fetchCategoryAndCards(categoryId);
  }

  render() {
    const { categoryCache } = this.props;
    const { params } = this.props.match;
    const categoryId = params.categorySlug.split(/-(.+)/)[0];
    const category = categoryCache[categoryId];
    return (
      <div className="page category-page">
        {category && (
          <div className="page-header">
            <h1 className="page-name">{category.name}</h1>
          </div>
        )}
        <CardGrid />
      </div>
    );
  }
}

CategoryPage.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  categoryCache: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  fetchCategoryAndCards: PropTypes.func.isRequired
};

export default withRouter(CategoryPage);
