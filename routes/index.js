var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
})

router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/projects.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/contact.html'));
});

router.get('/generative', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/generative.html'));
});

module.exports = router;