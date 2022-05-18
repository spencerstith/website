var Transform = require('stream').Transform;
var parser = new Transform();
var express = require('express');
var path = require('path');
const app = require('../app');
var router = express.Router();

parser._transform = function(data, encoding, done) {
  let str = data.toString();
  str = str.replace("<script id=\"proj\"></script>", "<script src=\"maze.js\"></script>");
  this.push(str);
  done();
}

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

router.get('/development', (req, res) => {
  res.sendFile(path.join(__dirname, '../pages/development.html'));
});

module.exports = router;