import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CardRow from 'dokkin/js/card/components/card-row';

class CardGrid extends Component {

  render() {
    const { cardsList } = this.props;
    console.log(this.props)
    return (
      <ul className="card-grid">
        {
          cardsList && cardsList.map((card) => 
            <CardRow
              key={card.id}
              {...card}
            />
          )
        }
      </ul>
    )
  }
}

CardGrid.propTypes = {
  cardsList: PropTypes.arrayOf(PropTypes.any)
}

export default CardGrid;
