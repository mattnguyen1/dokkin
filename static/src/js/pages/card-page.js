import React from 'react'
import Card from '../card/components/card'
import CardGrid from '../card/card-grid-container'
import SearchInput from '../search/search-container';

const CardPage = () => (
  <div className="page card-page">
    <SearchInput/>
    <CardGrid/>
  </div>
);
export default CardPage;
