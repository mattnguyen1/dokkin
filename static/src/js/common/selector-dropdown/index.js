import React, { Component } from "react";
import PropTypes from "prop-types";

class SelectorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownMenuVisible: false
    };
  }

  render() {
    return (
      <div>
        <input
          ref={el => {
            this.input = el;
          }}
          {...this.props}
        />
        {this.state.isDropdownMenuVisible && (
          <div className="dropdown-menu">{this.props.children}</div>
        )}
      </div>
    );
  }
}

SelectorDropdown.propTypes = {
  children: PropTypes.node.isRequired
};

export default SelectorDropdown;
