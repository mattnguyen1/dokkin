import React, { Component } from "react";
import PropTypes from "prop-types";
import NavRow from "./components/nav-row";
import NavRowLoader from "./components/nav-row-loader";

class NavGrid extends Component {
  static renderLoaders(numLoaders) {
    const loaderArr = [];
    for (let i = 0; i < numLoaders; i++) {
      loaderArr.push(i);
    }
    return (
      <ul className="nav-grid" key={0}>
        {loaderArr.map(index => <NavRowLoader key={index} />)}
      </ul>
    );
  }

  render() {
    const { navList, isLoading, RowComponent } = this.props;
    return (
      <div>
        {!navList.length && isLoading ? (
          NavGrid.renderLoaders(10)
        ) : (
          <ul className="nav-grid">
            {navList &&
              navList.map(navItem => (
                <RowComponent key={navItem.id} {...navItem} />
              ))}
          </ul>
        )}
      </div>
    );
  }
}

NavGrid.propTypes = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ),
  isLoading: PropTypes.bool.isRequired,
  RowComponent: PropTypes.func.isRequired
};

export default NavGrid;
