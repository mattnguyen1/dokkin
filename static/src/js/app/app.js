import React from 'react'
import Card from '../card/components/card'
import CardGrid from '../card/card-grid-container'
require('../../css/app.scss')

const App = ({cards}) => (
  <div>
    <CardGrid cards />
  </div>
);
export default App;
