const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/json', (req, res, next) => {
    console.log(req.body)
    res.status(201).redirect('/');

});

module.exports = router;
