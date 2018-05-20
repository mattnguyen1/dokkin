import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import SidebarLink from "./components/sidebar-link";
import IconCalendar from "../common/icons/icon-calendar";
import IconLink from "../common/icons/icon-link";
import IconClock from "../common/icons/icon-clock";
import IconCategories from "../common/icons/icon-categories";

class LeftNav extends Component {
  render() {
    return (
      <Sidebar className="left-nav">
        <SidebarLink to="/cards/new">
          <IconClock className="left-nav-icon" width={12} height={12} />
          <span>New Cards</span>
        </SidebarLink>
        <SidebarLink to="/cards/upcoming">
          <IconCalendar className="left-nav-icon" width={12} height={12} />
          <span>Upcoming Cards</span>
        </SidebarLink>
        <SidebarLink to="/categories">
          <IconCategories className="left-nav-icon" width={12} height={12} />
          <span>Categories</span>
        </SidebarLink>
        <SidebarLink to="/links">
          <IconLink className="left-nav-icon" width={12} height={12} />
          <span>Links</span>
        </SidebarLink>
      </Sidebar>
    );
  }
}

export default withRouter(LeftNav);
