const express = require('express');
const router = express.Router();
const DataManager = require('../model/dataManager');


router.get('/', function(req, res, next) {
    DataManager.size(data => {
        res.render('index', { title: 'To the RESTcue', items:  data});
    });
});

module.exports = router;
