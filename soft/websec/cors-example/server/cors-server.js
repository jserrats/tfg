const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors());

app.get('/', function (req, res) {
        res.send("ok")
    }
);
app.put('/', function (req, res) {
        res.send("ok")
    }
);


app.listen(8000, () => console.log('Example app listening on port 8000!'));