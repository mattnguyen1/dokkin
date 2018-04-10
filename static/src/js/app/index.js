import React from 'react'
import { Link, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'

import SearchPage from 'dokkin/js/search-page'
import CardPage from 'dokkin/js/card-page'
import NavBar from 'dokkin/js/nav-bar'
require('dokkin/css/app.scss')

const App = () => (
    <BrowserRouter>
      <div className="app-container">
        <NavBar/>
        <Switch>
          <Route exact path="/" component={SearchPage}/>
          <Route path="/search" component={SearchPage}/>
          <Route path="/card/:cardSlug" component={CardPage}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </BrowserRouter>
);
export default App;
