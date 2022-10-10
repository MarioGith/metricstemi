import React from "react";

const Tile = () => {
  return (
    <article className="tile">
      <div className="tile-header">
        <i className="ph-lightning-light"></i>
        <h3>
          <span>Electricity</span>
          <span>UrkEnergo LTD.</span>
        </h3>
      </div>
      <a href="#">
        <span>Go to service</span>
        <span className="icon-button">
          <i className="ph-caret-right-bold"></i>
        </span>
      </a>
    </article>
  );
};

export default Tile;
