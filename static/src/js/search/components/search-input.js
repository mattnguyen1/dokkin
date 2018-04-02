import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {

  onInputChange = (event) => {
    this.props.updateSearchInput(event.target.value);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.fetchCards(this.props.input);
  }

  render() {
    const { input, updateSearchInput } = this.props;
    return (
      <div className="search">
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Search names (ex: super str ssb vegito)" 
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

export default SearchInput;
