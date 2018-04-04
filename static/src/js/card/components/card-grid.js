import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardRow from './card-row';

class CardGrid extends Component {

  render() {
    const { cards } = this.props;
    return (
      <ul className="card-grid">
        {
          cards && cards.map((item) => 
            <CardRow
              key={item.id}
              {...item}
            />
          )
        }
      </ul>
    )
  }
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.any)
}

export default CardGrid;
