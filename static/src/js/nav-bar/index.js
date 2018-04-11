import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

import SearchInput from 'dokkin/js/search/search-input-container'

class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-bar-left">
          <a href="/" className="logo-link">
            <img src="https://static.dokk.in/dokkin-logo.png" title="dokk.in"/>
          </a>
          <SearchInput/>
        </div>
      </div>
    )
  }
}


export default NavBar;
