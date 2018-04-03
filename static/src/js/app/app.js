import React from 'react'
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import SearchPage from '../pages/search-page';
import CardPage from '../pages/card-page';
require('../../css/app.scss')



const App = () => (
    <BrowserRouter>
      <div className="app-container">
        <Route exact path="/" component={SearchPage}/>
        <Route path="/search" component={SearchPage}/>
        <Route path="/card/:cardSlug" component={CardPage}/>
      </div>
    </BrowserRouter>
);
export default App;
