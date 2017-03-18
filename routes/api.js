const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const jsonModel = require("../model/jsonModel");
const DataManager = require('../model/dataManager');

router.get('/json', (req, res, next) => {
    res.redirect('/');
});

router.post('/json', (req, res, next) => {
    try {
        const jsonObject = JSON.parse(req.body.json);
        const jsonModel = DataManager.newModel()(randomstring.generate(5), jsonObject);
        res.status(201).render('generated', {url: `/api/json/${jsonModel.key}`, jsonData: JSON.stringify(jsonModel.jsonString, null, '\t')})
    } catch (e){
        res.redirect('/');
    }
});

router.get('/json/:key', (req, res) => {
    const key = req.params.key;
    res.set('Content-Type', 'application/json');
    DataManager.has(key, (hasData) => {
        if (hasData){
            DataManager.get(key, (data) => {
                res.send(data).end();
            });
        } else {
            res.status(404).end();
        }
    })
});


router.post('/json/:key', (req, res) => {
    const key = req.params.key;
    res.set('Content-Type', 'application/json');
    DataManager.has(key, (hasData) => {
        if (hasData){
                res.status(201).end();
        } else {
            res.status(404).end();
        }
    })
});

module.exports = router;
