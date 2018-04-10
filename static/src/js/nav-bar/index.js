import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SearchInput from 'dokkin/js/search/search-input-container'

class NavBar extends Component {

  render() {
    return (
      <div className="nav-bar">
        <Link to="/" className="logo-link">
          <img src="https://static.dokk.in/dokkin-logo.png" title="dokk.in"/>
        </Link>
        <SearchInput/>
      </div>
    )
  }
}


export default NavBar;
