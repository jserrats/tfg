var express = require('express');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');

var app = express();

app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

db = [];

app.get('/', function (req, res) {
    list = "<ul>";
    for (var i = 0; i < db.length; i++) {
        list += "<li>" + sanitizeHtml(db[i].user) + " said: " + sanitizeHtml(db[i].comment, {
            allowedTags: ['b', 'i', 'em', 'strong', 'h1']
        }) + "</li>"
    }
    list += "</ul>";

    res.send('<html>' +
        '<head>' +
        '<title>The cat forum</title>' +
        '</head>' +
        '<body>' +
        "<h1>The Cat Forum. A place to talk about cats. </h1>" +
        list +
        "<form action=\"/comment\" method=\"POST\"><div><label>User</label><input type=\"text\" name=\"user\"/></div><div><label>Comment</label><input type=\"text\" name=\"comment\"/></div><div><input type=\"submit\" value=\"Post your comment\" size=\"100\"/></div></form>" +
        '</body>' +
        '</html>')
});

app.post('/comment', function (req, res) {
    db.push({comment: req.body.comment, user: req.body.user});
    res.redirect("/");
});

app.listen(8000, () => console.log('Listening on 8000'));