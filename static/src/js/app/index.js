import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import SearchPage from "dokkin/js/search-page";
import CardPage from "dokkin/js/card-page";
import LinkPage from "dokkin/js/link-page";
import CategoryPage from "dokkin/js/category-page";
import CategoryNavPage from "dokkin/js/category-nav-page";
import NavBar from "dokkin/js/nav-bar";
import LeftNav from "dokkin/js/left-nav";
import GoogleAnalytics from "dokkin/js/common/google-analytics";
import "dokkin/css/app.scss";
import "babel-polyfill";

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <NavBar />
      <LeftNav />
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/card/:cardSlug" component={CardPage} />
        <Route path="/links/:linkSlug" component={LinkPage} />
        <Route path="/categories/:categorySlug" component={CategoryPage} />
        <Route path="/categories/" component={CategoryNavPage} />
        <Redirect to="/" />
      </Switch>
      <GoogleAnalytics />
    </div>
  </BrowserRouter>
);
export default App;
