let express = require('express');
let nconf = require('nconf');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let ShowClient = express.Router();

ShowClient.get('/all', function(req, res) {
    let limit = req.query.limit;
    let offset = req.query.offset;
    Guidebox.shows.list({source: source, limit: limit, offset: offset})
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function (e) {
        console.log(`${e}`.red);
    });
});

exports = module.exports = ShowClient;