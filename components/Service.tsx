import React from "react";
import Tile from "./Tile";

const Service = () => {
  return (
    <section className="service-section">
      <h2>Service</h2>
      <div className="service-section-header">
        <div className="search-field">
          <i className="ph-magnifying-glass"></i>
          <input type="text" placeholder="Account number"></input>
        </div>
        <button className="flat-button">Search</button>
      </div>
      <div className="mobile-only">
        <button className="flat-button">Toggle search</button>
      </div>
      <div className="tiles">
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className="service-section-footer">
        <p>
          Services are paid according to the current state of the currency and
          tariff.
        </p>
      </div>
    </section>
  );
};

export default Service;
