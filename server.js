let express = require('express');
let app = express();
const nconf = require('nconf');
nconf.env()
.argv()
.file({file:'config.json'});
require('colors').enabled = true;
const path = require('path');
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let winston = require('winston');
let showApi = require('./ShowResource');
let movieApi = require('./MovieResource');

const ip = nconf.get('IP');
const port = nconf.get('PORT');
const dir = nconf.get('path');

app.use(logger('dev'));
app.use(compression());
app.use(favicon(`${__dirname}/favicon.ico`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/shows', showApi);
app.use('/api/v1/movies', movieApi);
app.use(express.static(path.join(__dirname, dir)));

app.get('*', function(req, res) {
    res.status(404).sendFile(`${__dirname}/404.html`);
});

app.listen(port, ip);

winston.info(`Now listening at http://${ip}:${port}`.blue);