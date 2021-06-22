class Board {
    constructor(width, height, rows, cols, cells = []) {
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.cols = cols;
        this.cells = cells;
        this.colScale = width / cols;
        this.rowScale = height / rows;
    }

    populate(cells, forceDimensions = false) {
        this.cells = cells;
        if (forceDimensions) {
            this.rows = cells.length;
            this.cols = cells[0].length;
            this.colScale = this.width / this.cols;
            this.rowScale = this.height / this.rows;
        }
    }

    show() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // Cells display
                if (this.cells[i][j].value) {
                    text(this.cells[i][j].value, j * this.colScale + this.colScale * 0.5, i * this.rowScale + this.rowScale * 0.5);
                }
                // Vertical line diplay
                line(j * this.colScale, 0, j * this.colScale, height);
                // Horizontal line display
                line(0, i * this.rowScale, width, i * this.rowScale);
            }
        }
    }

    getNextPosition(i, j) {
        if (j == this.cols - 1) return {
            i: i + 1,
            j: 0
        };
        return {
            i: i,
            j: j + 1
        }
    }

    getPreviousPosition(i, j) {
        if (j == 0) return {
            i: i - 1,
            j: this.cols - 1
        };
        return {
            i: i,
            j: j - 1
        }
    }
}