import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from './card';

class CardGrid extends Component {
  componentDidMount() {
    this.props.fetchCards('Super Saiyan Gotenks');
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="card-grid">
        {
          cards && cards.map((item) => 
            <Card 
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
