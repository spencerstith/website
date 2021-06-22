let board;

function setup() {
    createCanvas(600, 600);
    board = new Board(width, height, 15, 15);
    board.populate(
        Array(15).fill(
            Array(15).fill(
                new Cell(100, 3)
            )
        )
    );
}

function draw() {
    background(0);
    board.show();
}