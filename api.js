var express = require('express');
var router = express.Router();
var fs = require('fs');

// For this sample, we use filesystem to read/store data to data.json
// This can be easily changed to database
router.get('/items', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data);
});

router.get('/items/:id', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data[req.params.id]);
});

module.exports = router;