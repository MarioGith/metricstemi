import React from "react";

const Row = ({ data }) => {
  const startDate = new Date(data.createdAt);
  const endDate = new Date(data.closedAt);
  const leadTime = Math.round((endDate - startDate) / (1000 * 60));

  return (
    <div className="transfer">
      <dl className="transfer-details">
        <div>
          <dt>{data.title}</dt>
          <dd>Issue Title</dd>
        </div>
        <div>
          <dt>{startDate.toLocaleString()}</dt>
          <dd>Created At</dd>
        </div>
        <div>
          <dt>{endDate.toLocaleString()}</dt>
          <dd>Closed At</dd>
        </div>
      </dl>
      <div className="transfer-number">{`${Math.round(
        leadTime / 60
      )} hours`}</div>
    </div>
  );
};

export default Row;
