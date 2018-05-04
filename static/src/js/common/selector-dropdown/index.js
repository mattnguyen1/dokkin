import React, { Component } from "react";
import PropTypes from "prop-types";

class SelectorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldMenuBeVisible: false,
      selectedItemIndex: -1
    };
  }

  getSelectedItemClass(index) {
    const { selectedItemIndex } = this.state;
    return selectedItemIndex === index ? "selected" : "";
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
    const { onEscapeKeyDown, onEnterKeyDown, children } = this.props;
    const { selectedItemIndex } = this.state;
    const numItems = children ? children.length : 0;
    switch (event.key) {
      case "Escape":
        onEscapeKeyDown(event);
        break;
      case "Enter":
        onEnterKeyDown(event, selectedItemIndex);
        this.hide();
        break;
      case "ArrowDown":
        this.setState({
          selectedItemIndex: Math.min(selectedItemIndex + 1, numItems - 1)
        });
        break;
      case "ArrowUp":
        this.setState({
          selectedItemIndex: Math.max(selectedItemIndex - 1, 0)
        });
        break;
      // no default
    }
  };

  handleChange = event => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
    if (event.target.value) {
      this.show();
    }
  };

  handleInputFocus = () => {
    this.show();
  };

  handleBlur = event => {
    const currentTarget = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.hide();
      }
    }, 0);
  };

  handleMenuClick = event => {
    this.hide();
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
      onChange,
      ...rest
    } = this.props;
    const { selectedItemIndex } = this.state;
    return (
      <div onBlur={this.handleBlur}>
        <input
          ref={inputRef}
          onKeyDown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          onChange={this.handleChange}
          {...rest}
        />
        {this.isMenuVisible() && (
          <div className="dropdown-menu" onClick={this.handleMenuClick}>
            {children.map((node, index) => {
              return (
                <li
                  key={`dropdown-item-${index}`}
                  className={`dropdown-item ${this.getSelectedItemClass(
                    index
                  )}`}
                >
                  {node}
                </li>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

SelectorDropdown.propTypes = {
  children: PropTypes.node,
  onEscapeKeyDown: PropTypes.func,
  onEnterKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

SelectorDropdown.defaultProps = {
  onEscapeKeyDown: () => {},
  onEnterKeyDown: () => {},
  onChange: () => {},
  inputRef: () => {},
  children: null
};

export default SelectorDropdown;
