var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('./public'));

// Split api/REST calls to a separate file
var api = require('./api');
app.use('/api', api);

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

app.use('/', function(req, res, next) {
    res.render('index');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
