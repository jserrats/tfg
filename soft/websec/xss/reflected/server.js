var express = require('express');
var app = express();

app.set('view engine', 'pug');

db = {
    "apples": 2,
    "watermelons": 5,
    "pineapples": 3
};

app.get('/', function (req, res) {
    res.render('index', {title: 'Fruit stock tracker', message: 'Write the name of the fruit to know how many we have'})
});


app.get('/search', function (req, res) {
    var query = req.query.searchquery;
    var result = db[query];
    res.send('<html>' +
        '<head>' +
        '<title>Fruit stock tracker</title>' +
        '</head>' +
        '<body>' +
        'We have ' + result + ' ' + query +
        '</body>' +
        '</html>')
});
app.listen(8000, () => console.log('Listening on 8000'));