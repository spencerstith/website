var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
*/
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/projects.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/about.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/contact.html'));
});

module.exports = router;