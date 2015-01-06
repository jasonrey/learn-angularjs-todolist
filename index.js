var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('./public'));

app.get('/', function(req, res, next) {
    res.render('index');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));
