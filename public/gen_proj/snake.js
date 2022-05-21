let size = 500;
let tileSize = size / 25;
let totalTiles = size / tileSize;
let board;
let player;
let direction;
let hasFruit, isAlive;

function setup() {
  createCanvas(500, 500).parent("canvas");
  initPlayer();
  initBoard();
  frameRate(10);
  direction = 1;
  hasFruit = false;
  isAlive = true;
}

function draw() {
  background(0);
  updatePlayer();
  drawBoard();
}

function updatePlayer() {
  //Update the head's location with a deep copy
  let xVal = player[0][0];
  let yVal = player[0][1];
  let newLocation = [xVal, yVal];
  switch (direction) {
    case 1:
      newLocation[1] -= 1;
      break;
    case 2:
      newLocation[0] += 1;
      break;
    case 3:
      newLocation[1] += 1;
      break;
    case 4:
      newLocation[0] -= 1;
      break;
  }

  //Move everything into the last tile's position
  for (let i = 0; i < player.length; i++) {
    let current = player[i];
    player[i] = newLocation;
    newLocation = current;
  }
  //Add on a new block if head got the fruit
  if (hasFruit) {
    player.push(newLocation);
    hasFruit = false;
  }

  //Check for being out of bounds
  let xCoord = player[0][0];
  let yCoord = player[0][1];
  if (xCoord < 0 || xCoord >= totalTiles || yCoord < 0 || yCoord >= totalTiles) {
    isAlive = false;
  }

  //Check to see if he's eating himself
  for (let i = 1; i < player.length; i++) {
    if (player[0][0] == player[i][0] && player[0][1] == player[i][1]) {
      isAlive = false;
    }
  }
}

function initPlayer() {
  player = [];
  //Add the initial player location
  let half = parseInt(totalTiles / 2);
  let initialCoords = [half, half];
  let daBut = [half + 1, half];
  player.push(initialCoords);
  player.push(daBut);
}

function initBoard() {
  //New set of tiles
  board = [];
  //Fill board with empty tiles
  for (let i = 0; i < totalTiles; i++) {
    let temp = [];
    for (let j = 0; j < totalTiles; j++) {
      temp.push(new Tile(i, j));
    }
    board.push(temp);
  }
  //Randomly placeFruit
  board[int(random(totalTiles))][int(random(totalTiles))].placeFruit();
}

function drawBoard() {
  if (isAlive) {
    //Place all player locations on board
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].removePlayer();
      }
    }
    for (let i = 0; i < player.length; i++) {
      let x = player[i][0];
      let y = player[i][1];
      board[x][y].placePlayer();
    }
    //Go through all tiles and color correctly
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].drawTile();
        //Also see if the snake has eaten the fruit
        console.log(board[i][j]);
        if (board[i][j].hasFruit && player[0][0] == i && player[0][1] == j) {
          hasFruit = true;
          board[i][j].removeFruit();
          //Have to make sure the fruit doesn't place underneath the snake
          let xF = int(random(totalTiles));
          let yF = int(random(totalTiles));
          while (onSnake(xF, yF)) {
            xF = int(random(totalTiles));
            yF = int(random(totalTiles));
          }
          board[xF][xF].placeFruit();
        }
      }
    }
  } else {
    gameOver();
  }
}

function onSnake(x, y) {
  let ontop = false;
  for (let i = 0; i < player.length; i++) {
    if (player[i][0] == x && player[i][1] == y) {
      ontop = true;
    }
  }
  return ontop;
}

function gameOver() {
  //background(0);
  fill(255);
  textSize(20);
  text("you died", 200, 200);
}

function keyPressed() {
  switch (key) {
    case 'a':
      direction = 4;
      break;
    case 's':
      direction = 3;
      break;
    case 'd':
      direction = 2;
      break;
    case 'w':
      direction = 1;
      break;
  }
}

class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hasPlayer = false;
    this.hasFruit = false;
  }

  drawTile() {
    if (this.hasPlayer) {
      fill(255);
    } else if (this.hasFruit) {
      fill(15, 65, 175);
    } else {
      fill(0);
    }
    let tileX = map(this.x, 0, totalTiles, 0, width);
    let tileY = map(this.y, 0, totalTiles, 0, height);
    rect(tileX, tileY, tileSize, tileSize);
  }

  placePlayer() {
    this.hasPlayer = true;
  }

  removePlayer() {
    this.hasPlayer = false;
  }

  placeFruit() {
    this.hasFruit = true;
  }

  removeFruit() {
    this.hasFruit = false;
  }
}