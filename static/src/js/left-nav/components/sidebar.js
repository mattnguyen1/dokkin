import React, { Component } from "react";

class LeftNav extends Component {
  render() {
    const { className, ...rest } = this.props;
    return (
      <div className={`sidebar ${className ? className : ""}`} {...rest}>
        {this.props.children}
      </div>
    );
  }
}

export default LeftNav;
