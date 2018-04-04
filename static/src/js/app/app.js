import React from 'react'
import { Link, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import SearchPage from '../pages/search-page';
import CardPage from '../pages/card-page';
require('../../css/app.scss')



const App = () => (
    <BrowserRouter>
      <div className="app-container">
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
