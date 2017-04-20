let express = require('express');
let nconf = require('nconf');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let MovieClient = express.Router();

MovieClient.get('/all', function(req, res) {
    let source = req.query.source;
    let limit = req.query.limit;
    let offset = req.query.offset;
    var params = {
        sources: source,
        limit: limit,
        offset: offset
    };
    Guidebox.movies.list(params)
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function (e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send(`${e._response.body.error}`);
    });
});

MovieClient.get('/sources', function(req, res) {
    Guidebox.sources.list({filter: 'movie'})
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function(e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send(`${e._response.body.error}`);
    });
});

exports = module.exports = MovieClient;