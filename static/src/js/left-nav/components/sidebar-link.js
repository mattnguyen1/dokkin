import React, { Component } from "react";
import { Link } from "react-router-dom";

class SidebarLink extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <div className="sidebar-link">
        <Link {...rest}>{children}</Link>
      </div>
    );
  }
}

export default SidebarLink;
