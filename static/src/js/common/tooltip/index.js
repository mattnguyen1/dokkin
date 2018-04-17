import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TetherComponent from 'react-tether'

export const TOP_CENTER = 'top center';
export const TOP_LEFT = 'top left';
export const TOP_RIGHT = 'top right';

export const BOTTOM_CENTER = 'bottom center';
export const BOTTOM_LEFT = 'bottom left';
export const BOTTOM_RIGHT = 'bottom right';

export const MIDDLE_CENTER = 'middle center';
export const MIDDLE_LEFT = 'middle left';
export const MIDDLE_RIGHT = 'middle right';

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
        attachment={this.props.attachment}
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
        { 
          this.state.isOpen &&
          <div className={`tooltip ${this.props.attachment}`}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            {this.props.tooltipContent}
          </div>
        }
      </TetherComponent>
    )
  }
}


export default Tooltip;