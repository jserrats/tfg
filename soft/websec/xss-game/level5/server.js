const express = require('express');
const app = express();
app.use(express.static('..'));
app.use(function (req, res, next) {
    res.header('X-XSS-Protection', '0');
    next();
});
app.get('/', function (req, res) {

        res.send("<!doctype html>\n" +
            "<html>\n" +
            "  <head>\n" +
            "    <!-- Internal game scripts/styles, mostly boring stuff -->\n" +
            "    <script src=\"/static/game-frame.js\"></script>\n" +
            "    <link rel=\"stylesheet\" href=\"/static/game-frame-styles.css\" />\n" +
            "  </head>\n" +
            " \n" + "  <body id=\"level5\">\n    Welcome! Today we are announcing the much anticipated<br><br>\n" +
            "    <img src=\"/static/logos/level5.png\" /><br><br>\n" +
            " \n" +
            "    <a href=\"/signup?next=confirm\">Sign up</a> \n" +
            "    for an exclusive Beta.\n" +
            "  </body>\n" +
            "</html>")
    }
);

app.get('/signup', function (req, res) {
    let next = req.query.next;
    res.send('<!doctype html>\n' +
        '<html>\n' +
        '  <head>\n' +
        '    <!-- Internal game scripts/styles, mostly boring stuff -->\n' +
        '    <script src="/static/game-frame.js"></script>\n' +
        '    <link rel="stylesheet" href="/static/game-frame-styles.css" />\n' +
        '  </head>\n' +
        ' \n' +
        '  <body id="level5">\n' +
        '    <img src="/static/logos/level5.png" /><br><br>\n' +
        '    <!-- We\'re ignoring the email, but the poor user will never know! -->\n' +
        '    Enter email: <input id="reader-email" name="email" value="">\n' +
        ' \n' +
        '    <br><br>\n' +
        '    <a href="' + next + '">Next >></a>\n' +
        '  </body>\n' +
        '</html>')
});
app.get('/confirm', function (req, res) {
    let next = req.query.next;
    res.send('<!doctype html>\n' +
        '<html>\n' +
        '  <head>\n' +
        '    <!-- Internal game scripts/styles, mostly boring stuff -->\n' +
        '    <script src="/static/game-frame.js"></script>\n' +
        '    <link rel="stylesheet" href="/static/game-frame-styles.css" />\n' +
        '  </head>\n' +
        ' \n' +
        '  <body id="level5">\n' +
        '    <img src="/static/logos/level5.png" /><br><br>\n' +
        '    Thanks for signing up, you will be redirected soon...\n' +
        '    <script>\n' +
        '      setTimeout(function() { window.location = \'' + "/" + '\'; }, 5000);\n' +
        '    </script>\n' +
        '  </body>\n' +
        '</html>')
});


app.listen(8000, () => console.log('Example app listening on port 8000!'));