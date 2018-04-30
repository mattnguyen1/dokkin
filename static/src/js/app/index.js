import React from 'react'
import { Link, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

import SearchPage from 'dokkin/js/search-page'
import CardPage from 'dokkin/js/card-page'
import LinkPage from 'dokkin/js/link-page'
import CategoryPage from 'dokkin/js/category-page'
import NavBar from 'dokkin/js/nav-bar'
import GoogleAnalytics from 'dokkin/js/common/google-analytics'
import 'dokkin/css/app.scss'
import 'babel-polyfill'

const App = () => (
    <BrowserRouter>
      <div className="app-container">
        <NavBar/>
        <Switch>
          <Route exact path="/" component={SearchPage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/card/:cardSlug" component={CardPage}/>
          <Route path="/link/:linkSlug" component={LinkPage}/>
          <Route path="/category/:categorySlug" component={CategoryPage}/>
          <Redirect to="/"/>
        </Switch>
        <GoogleAnalytics/>
      </div>
    </BrowserRouter>
);
export default App;
