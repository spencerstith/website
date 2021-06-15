class Board {
    constructor(width, height, rows, cols, data = []) {
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.cols = cols;
        this.data = data;
        this.colScale = width / cols;
        this.rowScale = height / rows;
    }

    populate(data, forceDimensions = false) {
        this.data = data;
        if (forceDimensions) {
            this.rows = data.length;
            this.cols = data[0].length;
            this.colScale = this.width / this.cols;
            this.rowScale = this.height / this.rows;
        }
    }

    show() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                // Data display
                if (this.data[i][j]) {
                    text(this.data[i][j], j * this.colScale + this.colScale * 0.5, i * this.rowScale + this.rowScale * 0.5);
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