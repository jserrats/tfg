const express = require('express');
const app = express();

app.use(express.static('..'));

const page_header = "<!doctype html>" +
    "<html>" +
    "<head>" +
    "<link rel=\"stylesheet\" href=\"/static/game-frame-styles.css\" />" +
    "</head>" +
    "<body id=\"level1\">" +
    "<img src=\"/static/logos/level1.png\">" +
    "<div>";
const main_page_markup =
    "<form action=\"\" method=\"GET\">" +
    "<input id=\"query\" name=\"query\" value=\"Enter query here...\" onfocus=\"this.value=''\">" +
    "<input id=\"button\" type=\"submit\" value=\"Search\">" +
    "</form>";

const page_footer =
    "</div>" +
    "</body>" +
    "</html>";

app.get('/', function (req, res) {
    let q = req.query.query;
    if (q) {
        res.send(page_header +
            "Sorry, no results were found for <b>" + q + "</b></br><a href='?'>Try again</bra>" +
            page_footer)
    } else {
        res.send(page_header + main_page_markup + page_footer)
    }
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));


