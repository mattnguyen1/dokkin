import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SidebarLink extends Component {
  render() {
    const { children, to, location, staticContext, ...rest } = this.props;
    const isCurrentPage = to === location.pathname;

    const linkClass = `sidebar-link ${isCurrentPage && "active"}`;
    return (
      <div className={linkClass}>
        <Link to={to} {...rest}>
          {children}
        </Link>
      </div>
    );
  }
}

export default withRouter(SidebarLink);
