import React from "react";
import Row from "./Row";

const List = ({ list }) => {
  return (
    <section className="transfer-section">
      <div className="transfer-section-header">
        <h2>Latest</h2>
      </div>
      <div className="transfers">
        {list.map((row) => {
          return <Row key={row.node.id} data={row.node} />;
        })}
      </div>
    </section>
  );
};

export default List;
