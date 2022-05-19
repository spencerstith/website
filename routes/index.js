var express = require('express');
var path = require('path');
var router = express.Router();
var projectList = require('../public/scripts/generative.json').projects;

router.get('/', (req, res, next) => {
  res.render('index', {page: 'Home', menuId: 'home'});
})

router.get('/projects', (req, res) => {
  res.render('projects', {page: 'Projects', menuId: 'projects', projects: projectList});
});

router.get('/contact', (req, res) => {
  res.render('contact', {page: 'Contact', menuId: 'contact'});
});

router.get('/generative', (req, res) => {
  res.render('generative', {page: 'Generative', menuId: 'generative'});
});

router.get('/development', (req, res) => {
  res.render('development', {page: 'Development', menuId: 'development', projects: projectList});
});

module.exports = router;