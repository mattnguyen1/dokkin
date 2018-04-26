import React from 'react'
import PropTypes from 'prop-types'

const CardRowLoader = (props) => {
  
  return (
    <li className="card-row loader" data-type-id={props.id}>
      <div className="card-row-left">
        <div className="card-row-thumb-loader"/>
      </div>
      <div className="card-row-right">
        <div className="card-row-title-loader"/>
        <div className="card-row-loader-text first"/>
        <div className="card-row-loader-text second"/>
        <div className="card-row-loader-text third"/>
      </div>
    </li>
  )
}

export default CardRowLoader;
