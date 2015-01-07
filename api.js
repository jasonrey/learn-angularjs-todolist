var express = require('express');
var router = express.Router();
var fs = require('fs');

// Mandatory middleware for all router to go through to ensure that data.json file is there
router.use(function(req, res, next) {
    if (!fs.existsSync('./data.json')) {
        fs.writeFileSync('./data.json', '[]');
    }

    next();
});

// For this sample, we use filesystem to read/store data to data.json
// This can be easily changed to database
router.get('/items', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data);
});

router.put('/items', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    data.push(req.body);

    fs.writeFileSync('./data.json', JSON.stringify(data));

    res.json(req.body);
});

router.get('/items/:id', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data[req.params.id]);
});

module.exports = router;