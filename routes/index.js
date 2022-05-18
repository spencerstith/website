var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {page: 'Home', menuId: 'home'});
})

router.get('/projects', (req, res) => {
  res.render('projects', {page: 'Projects', menuId: 'projects'});
});

router.get('/contact', (req, res) => {
  res.render('contact', {page: 'Contact', menuId: 'contact'});
});

router.get('/generative', (req, res) => {
  res.render('generative', {page: 'Generative', menuId: 'generative'});
});

router.get('/development', (req, res) => {
  res.render('development', {page: 'Development', menuId: 'development'});
});

module.exports = router;