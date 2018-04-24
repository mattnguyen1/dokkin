import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'dokkin/js/card/components/card'
import CardGrid from 'dokkin/js/card/card-grid-container'
import { getMappedQueryParams } from 'dokkin/js/utils/url'

class CategoryPage extends Component {

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

    if (pathname !== nextProps.location.pathname ||
        search !== nextProps.location.search) {
      this.updateCardGrid(nextProps);
      if (category) {
        document.title = this._getPageTitle(category);
      }
    }
    if (!category && nextCategory) {
      document.title = this._getPageTitle(nextCategory);
    }
  }

  _getPageTitle(category) {
    const name = category.name.replace("#", "");
    return `${name} | Categories | DBZ Dokkan Battle`;
  }

  updateCardGrid(props) {
    const { params } = this.props.match;
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
        {
          category &&
          <div className="category-page-header">
              <div className="category-page-name">{category.name}</div>
          </div>
        }
        <CardGrid />
      </div>
    )
  }
}

export default CategoryPage;