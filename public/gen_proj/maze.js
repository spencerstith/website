let cellSize = 15;
let cellCount = 40;
let cells = [];
let cellStack = [];
let finished = false;
let solutionStack = [];
let solutionFound = false;

function setup() {
  createCanvas(601, 601).parent("canvas");
  for (let i = 0; i < cellCount; i++) {
    let row = [];
    for (let j = 0; j < cellCount; j++) {
      row.push(new Cell(i, j));
    }
    cells.push(row);
  }

  // Create openings for beggining and end
  cells[0][0].walls = {
    top: false,
    right: true,
    bottom: true,
    left: false
  };

  cells[cellCount - 1][cellCount - 1].walls = {
    top: true,
    right: false,
    bottom: false,
    left: true
  };

  // We start out in the top right, so visit there first
  cells[0][0].visited = true;
  cellStack.push(cells[0][0]);
}

function draw() {
  background(0);
  cells.forEach(row => {
    row.forEach(cell => {
      cell.show();
    })
  });
  if (!finished) {
    for (let i = 0; i < 10; i++) {
      stepAlgorithm();

    }
  } else {
    drawsolutionStack();
    noLoop();
  }
}

function drawsolutionStack() {
  stroke(255, 255, 0);
  for (let i = 0; i < solutionStack.length - 1; i++) {
    let x1 = solutionStack[i].col * cellSize + cellSize * 0.5;
    let y1 = solutionStack[i].row * cellSize + cellSize * 0.5;
    let x2 = solutionStack[i + 1].col * cellSize + cellSize * 0.5;
    let y2 = solutionStack[i + 1].row * cellSize + cellSize * 0.5;
    line(x1, y1, x2, y2);
  }
}

function getNeighbors(current) {
  let row = current.row;
  let col = current.col;
  let neighbors = [];
  // Top
  if (row > 0 && !cells[row - 1][col].visited) {
    neighbors.push(cells[row - 1][col]);
  }
  // Right
  if (col < cellCount - 1 && !cells[row][col + 1].visited) {
    neighbors.push(cells[row][col + 1]);
  }
  // Bottom
  if (row < cellCount - 1 && !cells[row + 1][col].visited) {
    neighbors.push(cells[row + 1][col]);
  }
  // Left
  if (col > 0 && !cells[row][col - 1].visited) {
    neighbors.push(cells[row][col - 1]);
  }
  return neighbors;
}

function removeWalls(current, next) {
  // Are they horizontal or vertical?
  if (current.row == next.row) {
    // Is current on the left or right?
    if (current.col < next.col) {
      current.walls.right = false;
      next.walls.left = false;
    } else {
      current.walls.left = false;
      next.walls.right = false;
    }
  } else {
    // Is current on the top or bottom?
    if (current.row < next.row) {
      current.walls.bottom = false;
      next.walls.top = false;
    } else {
      current.walls.top = false;
      next.walls.bottom = false;
    }
  }

}

function stepAlgorithm() {
  let done = false;
  if (cellStack.length != 0) {
    let current = cellStack.pop();

    // Create stack for solution to be shown
    if (current.row == cellCount - 1 && current.col == cellCount - 1 && !solutionFound) {
      solutionFound = true;
      cellStack.forEach(c => {
        solutionStack.push({
          row: c.row,
          col: c.col
        });
      })
    }

    let neighbors = getNeighbors(current);
    if (neighbors.length > 0) {
      cellStack.push(current);
      let next = neighbors[Math.floor(random(neighbors.length))];
      done = true;

      // Draw current cell
      fill(255);
      rect(next.col * cellSize, next.row * cellSize, cellSize, cellSize);

      removeWalls(current, next);
      next.visited = true;
      cellStack.push(next);
    }
    if (!done) {
      noStroke();
      fill(255);
      rect(current.i * cellSize, current.j * cellSize, cellSize, cellSize);
    }
  } else {
    finished = true;
  }

}

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.visited = false;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
  }

  show() {
    stroke(255);
    strokeWeight(1);
    let x = cellSize * this.col;
    let y = cellSize * this.row;
    if (this.walls.top) {
      line(x, y, x + cellSize, y);
    }
    if (this.walls.right) {
      line(x + cellSize, y, x + cellSize, y + cellSize);
    }
    if (this.walls.bottom) {
      line(x + cellSize, y + cellSize, x, y + cellSize);
    }
    if (this.walls.left) {
      line(x, y + cellSize, x, y);
    }

    if (this.visited) {
      fill(255, 0, 255, 100);
      noStroke();
      rect(x, y, cellSize, cellSize);
    }
  }
}