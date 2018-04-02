import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardRow from './card-row';

class CardGrid extends Component {

  componentDidMount() {
    this.props.fetchCards("goku");
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="card-grid">
        {
          cards && cards.map((item) => 
            <CardRow
              key={item.id}
              {...item}
            />
          )
        }
      </div>
    )
  }
}

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.any),
  fetchCards: PropTypes.func
}

export default CardGrid;
