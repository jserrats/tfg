const express = require('express');
var path = require('path');
const app = express();
app.use(express.static('..'));

app.get('/', function (req, res) {
        let timer = req.query.timer;
        if (timer) {
            res.header('X-XSS-Protection', 0);
            res.send("<!doctype html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <script src=\"/static/game-frame.js\"></script>\n" +
                "    <link rel=\"stylesheet\" href=\"/static/game-frame-styles.css\"/>\n" +
                "\n" +
                "    <script>\n" +
                "        function startTimer(seconds) {\n" +
                "            seconds = parseInt(seconds) || 3;\n" +
                "            setTimeout(function () {\n" +
                "                window.confirm(\"Time is up!\");\n" +
                "                window.history.back();\n" +
                "            }, seconds * 1000);\n" +
                "        }\n" +
                "    </script>\n" +
                "</head>\n" +
                "<body id=\"level4\">\n" +
                "<img src=\"/static/logos/level4.png\"/>\n" +
                "<br>\n" +
                "<img src=\"/static/loading.gif\" onload=\"startTimer(" + timer + ");\"/>\n" +
                "<br>\n" +
                "<div id=\"message\">Your timer will execute in " + timer + " seconds.</div>\n" +
                "</body>\n" +
                "</html>")
        } else {
            res.sendFile(path.join(__dirname + '/index.html'))
        }
    }
);

app.listen(8000, () => console.log('Example app listening on port 8000!'));