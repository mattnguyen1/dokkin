import React from "react";

const CardRowLoader = props => (
  <li className="card-row loader">
    <div className="card-row-left">
      <div className="card-row-thumb-loader" />
    </div>
    <div className="card-row-right">
      <div className="card-row-title-loader" />
      <div className="card-row-loader-text first" />
      <div className="card-row-loader-text second" />
      <div className="card-row-loader-text third" />
    </div>
  </li>
);

export default CardRowLoader;
