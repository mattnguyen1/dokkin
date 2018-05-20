import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import SearchPage from "dokkin/js/search-page";
import CardPage from "dokkin/js/card-page";
import LinkPage from "dokkin/js/link-page";
import LinkNavPage from "dokkin/js/link-nav-page";
import CategoryPage from "dokkin/js/category-page";
import CategoryNavPage from "dokkin/js/category-nav-page";
import NewCardPage from "dokkin/js/new-card-page";
import UpcomingCardPage from "dokkin/js/upcoming-card-page";
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
        <Route path="/links/" component={LinkNavPage} />
        <Route path="/categories/:categorySlug" component={CategoryPage} />
        <Route path="/categories/" component={CategoryNavPage} />
        <Route path="/cards/new" component={NewCardPage} />
        <Route path="/cards/upcoming" component={UpcomingCardPage} />
        <Redirect to="/" />
      </Switch>
      <GoogleAnalytics />
    </div>
  </BrowserRouter>
);
export default App;
