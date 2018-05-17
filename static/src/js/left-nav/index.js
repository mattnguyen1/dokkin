import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import SidebarLink from "./components/sidebar-link";

class LeftNav extends Component {
  render() {
    return (
      <Sidebar className="left-nav">
        <SidebarLink to="/categories">Categories</SidebarLink>
        <SidebarLink to="/links">Links</SidebarLink>
      </Sidebar>
    );
  }
}

export default withRouter(LeftNav);
