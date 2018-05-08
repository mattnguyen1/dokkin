import React, { Component } from "react";
import PropTypes from "prop-types";
import scrollIntoView from "scroll-into-view-if-needed";
import IconClose from "dokkin/js/common/icons/icon-close";

class SelectorDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldMenuBeVisible: false,
      selectedItemIndex: -1
    };
    this.itemRefs = {};
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.setState({ selectedItemIndex: -1 });
    }
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
      shouldMenuBeVisible: false,
      selectedItemIndex: -1
    });
  }

  clearInput = () => {
    const { onChange } = this.props;
    this.inputRef.value = "";
    onChange("");
  };

  scrollItemIntoView(index) {
    const { children } = this.props;
    if (children && index >= 0) {
      scrollIntoView(this.itemRefs[index], {
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest"
      });
    }
  }

  handleInputKeyDown = event => {
    const { onEscapeKeyDown, onEnterKeyDown, children } = this.props;
    const { selectedItemIndex } = this.state;
    const numItems = children ? children.length : 0;
    switch (event.key) {
      case "Escape":
        onEscapeKeyDown(event);
        this.clearInput();
        break;
      case "Enter":
        onEnterKeyDown(event, selectedItemIndex);
        this.hide();
        break;
      case "ArrowDown":
        const nextItemIndex = Math.min(selectedItemIndex + 1, numItems - 1);
        this.scrollItemIntoView(nextItemIndex);
        this.setState({
          selectedItemIndex: nextItemIndex
        });
        break;
      case "ArrowUp":
        const prevItemIndex = Math.max(selectedItemIndex - 1, 0);
        this.scrollItemIntoView(prevItemIndex);
        this.setState({
          selectedItemIndex: prevItemIndex
        });
        break;
      // no default
    }
  };

  handleChange = event => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.value);
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

  renderClearIcon() {
    return (
      <button onClick={this.clearInput} className="close-icon">
        <IconClose width={14} height={14} />
      </button>
    );
  }

  render() {
    const {
      inputRef,
      children,
      onEscapeKeyDown,
      onEnterKeyDown,
      onChange,
      SelectorCTARenderer,
      clearable,
      value,
      ...rest
    } = this.props;
    const { selectedItemIndex } = this.state;
    const inputClassName = SelectorCTARenderer ? "has-cta" : "";
    return (
      <div onBlur={this.handleBlur}>
        <input
          ref={el => {
            this.inputRef = el;
            inputRef(el);
          }}
          onKeyDown={this.handleInputKeyDown}
          onFocus={this.handleInputFocus}
          onChange={this.handleChange}
          className={inputClassName}
          value={value}
          {...rest}
        />
        {clearable && value && this.renderClearIcon()}
        {SelectorCTARenderer && (
          <SelectorCTARenderer
            onClick={() => {
              this.hide();
            }}
          />
        )}
        {this.isMenuVisible() && (
          <div className="dropdown-menu" onClick={this.handleMenuClick}>
            {children.map((node, index) => {
              return (
                <li
                  ref={el => {
                    this.itemRefs[index] = el;
                  }}
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
  inputRef: PropTypes.func,
  SelectorCTARenderer: PropTypes.func,
  clearable: PropTypes.bool,
  value: PropTypes.string.isRequired
};

SelectorDropdown.defaultProps = {
  onEscapeKeyDown: () => {},
  onEnterKeyDown: () => {},
  onChange: () => {},
  inputRef: () => {},
  children: null,
  SelectorCTARenderer: () => {},
  clearable: true
};

export default SelectorDropdown;
