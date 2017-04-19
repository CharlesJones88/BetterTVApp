let express = require('express');
let app = express();
//TODO: Move to config file
const ip = '127.0.0.1';
const port = 8080;
require('colors').enabled = true;
let logger = require('morgan');
let compression = require('compression');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let winston = require('winston');
let showApi = require('./ShowResource');
let movieApi = require('./MovieResource');
let WEB = __dirname;

app.use(logger('dev'));
app.use(compression());
app.use(favicon(`${WEB}/favicon.ico`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/v1/shows', showApi);
app.use('/api/v1/movies', movieApi);
app.use(express.static(WEB));


app.get('*', function(req, res) {
    res.status(404).sendFile(`${WEB}/404.html`);
});

app.listen(port, ip);

winston.info(`Now listening at http://${ip}:${port}`.blue);