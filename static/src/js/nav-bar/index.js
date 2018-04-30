/* global location, window */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SearchInput from "dokkin/js/search/search-input-container";

class NavBar extends Component {
  handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-bar-left">
          <Link to="/" onClick={this.handleLogoClick} className="logo-link">
            <img src="https://static.dokk.in/dokkin-logo.png" alt="dokk.in" />
          </Link>
          <SearchInput />
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
