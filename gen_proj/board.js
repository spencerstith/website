const { text } = require("express");

class Board {
    constructor(width, height, rows, cols, data = []) {
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.cols = cols;
        this.data = data;
        this.rowScale = width / rows;
        this.colScale = height / cols;
    }

    populate(data) {
        this.data = data;
    }

    show() {
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < i; j++) {
                text(j * this.rowScale, i * this.colScale, data[i][j]);
            }
        }
    }
}