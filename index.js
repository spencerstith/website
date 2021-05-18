const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

app.get('/', (req, res) => {
    res.send("You are on home. Welcome to the site")
});

app.get('/construction', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/projects.html'));
});

app.get('/', (req, res) => {
    res.send("you are at home!");
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/about.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});