import React from 'react'
import Card from '../card/components/card'
import CardGrid from '../card/card-grid-container'
import SearchInput from '../search/search-container';
require('../../css/app.scss')

const App = ({cards}) => (
  <div className="app-container">
    <SearchInput/>
    <CardGrid cards />
  </div>
);
export default App;
