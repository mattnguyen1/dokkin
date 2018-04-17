import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TetherComponent from 'react-tether'

class Tooltip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  onMouseEnter = () => {
    this.setState({
      isOpen: true
    });
  }

  onMouseLeave = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <TetherComponent
        attachment="top center"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        <div
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          {this.props.children}
        </div>
        <div className="tooltip">
          {this.state.isOpen && this.props.tooltipContent}
        </div>
      </TetherComponent>
    )
  }
}


export default Tooltip;
