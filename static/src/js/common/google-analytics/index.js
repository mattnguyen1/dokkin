/* global document, window */
import { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";

class GoogleAnalytics extends Component {
  componentWillUpdate({ location, history }) {
    const { gtag } = window;

    if (location.pathname === this.props.location.pathname) {
      // don't log identical link clicks (nav links likely)
      return;
    }

    if (history.action === "PUSH" && typeof gtag === "function") {
      gtag("config", "UA-118060997-1", {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }

  render() {
    return null;
  }
}

GoogleAnalytics.propTypes = {
  location: ReactRouterPropTypes.location.isRequired
};

export default withRouter(GoogleAnalytics);
