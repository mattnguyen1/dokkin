import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";

class LeftNav extends Component {
  render() {
    return <Sidebar />;
  }
}

export default withRouter(LeftNav);
