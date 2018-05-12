import React, { Component } from "react";

class LeftNav extends Component {
  render() {
    return <div className="sidebar">{this.props.children}</div>;
  }
}

export default LeftNav;
