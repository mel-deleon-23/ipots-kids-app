import React, { useState, useEffect, useRef } from 'react';
import Cell from './Cell';
import { createFrameBoxes, getInitialState } from './Utils';

const Crossword = () => {
    const [cells, setCells] = useState(getInitialState());
    const [currentCell, setCurrentCell] = useState(null);
    const [previousCell, setPreviousCell] = useState(null);
    const [toggleBox5, setToggleBox5] = useState(false);

    useEffect(() => {
        createFrameBoxes(setCells);
    }, []);

    const handleCellClick = (cell) => {
        if (cell.classList.contains('w')) {
            if (currentCell) {
                currentCell.style.background = 'transparent';
            }
            setCurrentCell(cell);
            cell.style.background = 'orange';

            const boxesBelongedTo = getBoxesBelongedTo(cell, questionCells);
            const htmlCells = getActualHtmlCells(boxesBelongedTo);

            const correctCells = getCorrectAxialCell(htmlCells, previousCell);
            highlightCells(correctCells);

            setPreviousCell(currentCell);
        }
    };

    return (
        <table id="table">
            <tbody>
                {cells.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                row={rowIndex}
                                col={colIndex}
                                className={cell}
                                onClick={() => handleCellClick(cell)}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Crossword;
