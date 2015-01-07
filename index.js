var express = require('express');
var app = express();
var fs = require('fs');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('./public'));

app.get('/', function(req, res, next) {
    res.render('index');
});

// For this sample, we use filesystem to read/store data to data.json
// This can be easily changed to database
app.get('/api/items', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data);
});

app.get('/api/items/:id', function(req, res, next) {
    var contents = fs.readFileSync('./data.json'),
        data = JSON.parse(contents);

    res.json(data[req.params.id]);
});

// Routes for templates
app.get('/template/:name', function(req, res, next) {
    var name = req.params.name;

    res.render('template/' + name, {}, function(err, html) {
        if (err) {
            return res.send(404, err.message);
        } else {
            res.end(html);
        }
    });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
