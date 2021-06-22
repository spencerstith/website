let board;
let cp;
let forwards;

function setup() {
    createCanvas(600, 600);
    board = new Board(width, height, 2, 2);
    let values = [
        [3, 0, 6, 5, 0, 8, 4, 0, 0],
        [5, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 7, 0, 0, 0, 0, 3, 1],
        [0, 0, 3, 0, 1, 0, 0, 8, 0],
        [9, 0, 0, 8, 6, 3, 0, 0, 5],
        [0, 5, 0, 0, 9, 0, 6, 0, 0],
        [1, 3, 0, 0, 0, 0, 2, 5, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 5, 2, 0, 6, 3, 0, 0]

    ];
    let cells = [];
    for (let i = 0; i < values.length; i++) {
        let row = [];
        for (let j = 0; j < values[i].length; j++) {
            row.push(new Cell(
                0,
                values[i][j],
                values[i][j] ? true : false
            ))
        }
        cells.push(row);
    }
    board.populate(cells, true);
    fill(255);
    stroke(255);
    textAlign(CENTER, CENTER);
    textSize(30);

    cp = { i: 0, j: 0 };
    forwards = true;
}

function draw() {
    // Finds the next position, either next or previous. Accounts for multiple permanent tiles in a row.
    while (board.cells[cp.i][cp.j].tf) {
        console.log(cp.i, cp.j);
        if (forwards) {
            cp = board.getNextPosition(cp.i, cp.j);
        } else {
            cp = board.getPreviousPosition(cp.i, cp.j);
        }
    }

    /**
     * Enter a while loop to continuously increase the tile's value until we either:
     * - Get to a maximum value (10 is out of bounds)
     * - The current number in the tile is valid
     * 
     * If value is at max value
     *      Reset current value to 0
     *      Make current position the previous available spot
     * If valid
     *      Make current position the next available spot
     */
    while (true) {
        board.cells[cp.i][cp.j].value++;
        if (board.cells[cp.i][cp.j].value >= 10) {
            board.cells[cp.i][cp.j].value = 0;
            cp = board.getPreviousPosition(cp.i, cp.j);
            forwards = false;
            break;
        }

        if (isValidAtPosition(cp.i, cp.j)) {
            cp = board.getNextPosition(cp.i, cp.j);
            forwards = true;
            break;
        }
    }
    // We are at the end of the board. Stop and finish program
    if (cp.i == 9 && cp.j == 0 && isValidAtPosition(8, 8)) {
        noLoop();
    }
    background(0);
    board.show();

}

function isValidAtPosition(i, j) {
    return isValidRow(i) && isValidColumn(j) && isValidSquare(i, j);
}

function isValidRow(row) {
    let checked = [];
    for (let j = 0; j < board.cells[row].length; j++) {
        if (board.cells[row][j].value != 0) {
            if (checked.includes(board.cells[row][j].value)) {
                return false;
            } else {
                checked.push(board.cells[row][j].value);
            }
        }
    }
    return true;
}

function isValidColumn(col) {
    let checked = [];
    for (let i = 0; i < board.cells.length; i++) {
        if (board.cells[i][col].value != 0) {
            if (checked.includes(board.cells[i][col].value)) {
                return false;
            } else {
                checked.push(board.cells[i][col].value);
            }
        }
    }
    return true;
}

function isValidSquare(i, j) {
    let horizontalSquare = Math.floor(j / 3);
    let verticalSquare = Math.floor(i / 3);

    let startI = verticalSquare * 3;
    let startJ = horizontalSquare * 3;

    let checked = [];
    for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
            if (board.cells[startI + m][startJ + n].value != 0) {
                if (checked.includes(board.cells[startI + m][startJ + n].value)) {
                    return false;
                } else {
                    checked.push(board.cells[startI + m][startJ + n].value);
                }
            }
        }
    }
    return true;
}