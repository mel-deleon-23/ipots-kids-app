import React from 'react';
import Cell from './Cell';

const Grid = ({ values, spansValue, onCellClick }) => {
  return (
    <table id="table">
      <tbody>
        {values.map((rowValues, i) => (
          <tr key={i}>
            {rowValues.split('').map((cellValue, j) => (
              <Cell
                key={`${i}-${j}`}
                value={cellValue}
                row={i}
                col={j}
                spansValue={spansValue[`${i},${j}`] || ""}
                onClick={() => onCellClick(document.querySelector(`.w[row='${i}'][col='${j}']`))}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
