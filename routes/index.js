const express = require('express');
const router = express.Router();
const DataManager = require('../model/dataManager');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'To the RESTcue', items: DataManager.size() });
});

module.exports = router;
