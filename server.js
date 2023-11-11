const express = require('express');
const routes = require('./routes');
const reqsLogger = require('./middlewares/log');

const PORT = 8080;
const app = express();

app.use(express.json()); // v4.16+
// app.use(bodyParser.urlencoded()); // deprecated
app.use(express.urlencoded({ extended: true })); // v4.16+

app.use(express.static(__dirname + '/public'));

app.use(reqsLogger);

app.use(routes);

app.listen(PORT, () => console.log(`port ${PORT} is listening...`));
