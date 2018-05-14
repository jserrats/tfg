var express = require('express');
var htmlencode = require('htmlencode');
var app = express();

db = {
    "apples": 2,
    "watermelons": 5,
    "pineapples": 3
};

app.get('/', function (req, res) {
    res.send("<html><head>" +
        "<title>Fruit stock tracker</title></head>" +
        "<body><h1>Write the name of the fruit to know how many we have</h1>" +
        "<div><form action=\"/search\" method=\"GET\">" +
        "<input type=\"text\" name=\"searchquery\"/>" +
        "<input type=\"submit\" value=\"Submit\"/>" +
        "</form></div>" +
        "</body></html>")
});


app.get('/search', function (req, res) {
    var query = req.query.searchquery;
    var result = db[query];
    res.send('<html>' +
        '<head>' +
        '<title>Fruit stock tracker</title>' +
        '</head>' +
        '<body>' +
        'We have ' + result + ' ' + htmlencode.htmlEncode(query) +
        '</body>' +
        '</html>')
});
app.listen(8000, () => console.log('Listening on 8000'));