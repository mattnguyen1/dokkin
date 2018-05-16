import React from "react";

const CardRowLoader = props => (
  <li className="grid-item loader">
    <div className="grid-item-left">
      <div className="grid-item-thumb-loader" />
    </div>
    <div className="grid-item-right">
      <div className="grid-item-title-loader" />
      <div className="grid-item-loader-text first" />
      <div className="grid-item-loader-text second" />
      <div className="grid-item-loader-text third" />
    </div>
  </li>
);

export default CardRowLoader;
