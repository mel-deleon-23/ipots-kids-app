import React from 'react';

const Cell = ({ value, row, col, spansValue, onClick }) => {
  return (
    <th
      onClick={onClick}
      row={row}
      col={col}
      className={value}
    >
      <span>{spansValue}</span>
      <b></b>
    </th>
  );
};

export default Cell;
