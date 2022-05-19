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

router.get('/display', (req, res) => {
  // Get the URL parameters
  var query = req.url.split('?').splice(1);
  var proj;
  // Determine which project is being requested
  query.forEach(q => {
    var split = q.split('=');
    if(split[0] == 'proj') {
      proj = split[1]
    }
  })
  
  // Get the project's information
  var show = projectList.filter(p => p.name == proj)[0];
  res.render('display', {page: 'Display', menuId: 'display', project: show});
});

module.exports = router;