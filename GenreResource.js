let express = require('express');
let nconf = require('nconf');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let GenreResource = express.Router();

GenreResource.get('/', function(req, res) {
    Guidebox.genres.list().then(function(genres) {
        res.status(200).send(genres.results);
    });
    
});

exports = module.exports = GenreResource;