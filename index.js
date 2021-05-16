const express = require('express');
const app = express();
const port = 3000;

app.get('/about', (req, res) => {
    res.send("hey");
});

app.listen(() => {
    console.log(`Listening on ${port}`);
});