import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class SearchInput extends Component {

  onInputChange = (event) => {
    this.props.updateSearchInput(event.target.value);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this._searchInput.blur();
    this.props.history.push("/search?q=" + this.props.input);
  }

  render() {
    const { input, updateSearchInput } = this.props;
    return (
      <div className="search">
        <form action="" onSubmit={this.onSubmit}>
          <input ref={el => this._searchInput = el} type="search" placeholder="Search (example: str ssb vegito)" 
            value={input}
            onChange={this.onInputChange} 
          />
        </form>
      </div>
    )
  }
}

SearchInput.propTypes = {
  input: PropTypes.string,
  updateSearchInput: PropTypes.func,
  fetchCards: PropTypes.func,
}

export default withRouter(SearchInput);
