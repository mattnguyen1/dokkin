import React, { Component } from "react";
import PropTypes from "prop-types";

class SelectorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldMenuBeVisible: false
    };
  }

  show() {
    this.setState({
      shouldMenuBeVisible: true
    });
  }

  hide() {
    this.setState({
      shouldMenuBeVisible: false
    });
  }

  handleInputKeyDown = event => {
    const { onEscapeKeyDown, onEnterKeyDown } = this.props;
    switch (event.key) {
      case "Escape":
        onEscapeKeyDown(event);
        break;
      case "Enter":
        onEnterKeyDown(event);
        break;
      // no default
    }
  };

  handleInputFocus = () => {
    this.show();
  };

  isMenuVisible() {
    const { children } = this.props;
    const { shouldMenuBeVisible } = this.state;
    return children && children.length > 0 && shouldMenuBeVisible;
  }

  render() {
    const {
      inputRef,
      children,
      onEscapeKeyDown,
      onEnterKeyDown,
      ...rest
    } = this.props;
    return (
      <div>
        <input
          ref={inputRef}
          onKeyDown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          {...rest}
        />
        {this.isMenuVisible() && (
          <div className="dropdown-menu">{children}</div>
        )}
      </div>
    );
  }
}

SelectorDropdown.propTypes = {
  children: PropTypes.node,
  onEscapeKeyDown: PropTypes.func,
  onEnterKeyDown: PropTypes.func,
  inputRef: PropTypes.func
};

SelectorDropdown.defaultProps = {
  onEscapeKeyDown: () => {},
  onEnterKeyDown: () => {},
  inputRef: () => {},
  children: null
};

export default SelectorDropdown;
