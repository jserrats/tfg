const express = require('express');
var path = require('path');
const app = express();
app.use(express.static('..'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

app.listen(8000, () => console.log('Example app listening on port 8000!'));