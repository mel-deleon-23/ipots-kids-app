// utils.js

// Values and spans used to generate the crossword puzzle grid
export const values = [
    "bbbbbbwbbwwwwwbbbbb", "bbbbbbwbbbbbwbbbbbb", "bbbbwwwwwwwwwwbbbbb", "bbbbbbwbbbbbwbbbbbb",
    "bbbbbbwbwwwwwbbwbbb", "bbbbbbwbwbbbwbbwbbb", "bbbbbbwbwbbbwbbwbbb", "bbbbbbwbbbbwwwwwwww",
    "wwwwwwwwwbbbwbbwbbb", "bbbbbbwbbbbbbbbwbbb", "bbbbbbwbbbbbbbbwbbb", "bbbbbbwbbbbbbbbwbbb",
    "bbbwwwwwwwbbbbbwbbb", "bbbbbbwbbbbbbbbwbbb"
];

// Total rows and columns based on the values array
export const total_rows = values.length;
export const total_cols = values[0].length;

// Spans value used to define crossword clues
export const spansValue = {
    "0,6": "1", "2,4": "4", "8,0": "8", "12,3": "9", "0,9": "2", "0,12": "3",
    "4,8": "5", "7,11": "7", "4,15": "6"
};

// Current state variables to track selections and interactions
export let current = null;
export let currentCells = null;
export let previous = null;
export let tempPrevious = null;
export let togglebox5 = false;

// Define question cells with corresponding questions and answers
export const questionCells = {
    "1": {
        "question": "Who is the most famous physicist with ALS that helped us understand space",
        "answer": "STEPHENHAWKING",
        "boxes": [
            { row: 0, col: 6 }, { row: 1, col: 6 }, { row: 2, col: 6 },
            { row: 3, col: 6 }, { row: 4, col: 6 }, { row: 5, col: 6 },
            { row: 6, col: 6 }, { row: 7, col: 6 }, { row: 8, col: 6 },
            { row: 9, col: 6 }, { row: 10, col: 6 }, { row: 11, col: 6 },
            { row: 12, col: 6 }, { row: 13, col: 6 }
        ],
        "direction": "down"
    },
    "2": {
        "question": "What did Hedgehog pack for his trip to space",
        "answer": "CROWN",
        "boxes": [
            { row: 0, col: 9 }, { row: 0, col: 10 }, { row: 0, col: 11 },
            { row: 0, col: 12 }, { row: 0, col: 13 }
        ],
        "direction": "across"
    },
    // Other questions and answers
};

// Utility function to create the crossword puzzle grid
export const createFrameBoxes = (setCells) => {
    const boxes = values.map((row, i) =>
        row.split('').map((value, j) => ({
            row: i,
            col: j,
            className: value,
            span: spansValue[`${i},${j}`] || ""
        }))
    );

    setCells(boxes);
};

// Get the initial state of the grid
export const getInitialState = () => createFrameBoxes();

// Additional utility functions
export const getBoxesBelongedTo = (selectedCell, questionCells) => {
    // Implementation here
};

export const getActualHtmlCells = (boxesBelongedTo) => {
    // Implementation here
};

export const getCorrectAxialCell = (htmlCellsCollections, prev) => {
    // Implementation here
};

export const highlightCells = (nestedCellsCollections) => {
    // Implementation here
};

export const getNextBox = (selectedCell, questionCells) => {
    // Implementation here
};

export const getActualNextHtmlCell = (nextBox) => {
    // Implementation here
};

export const positionOfCell = (cell, cells) => {
    // Implementation here
};

export const checkIfElementsCompletedCorrect = (box, cells, axis) => {
    // Implementation here
};

export const reverseString = (str) => str.split('').reverse().join('');
