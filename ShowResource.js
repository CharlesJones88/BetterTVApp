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
    Guidebox.shows.list({limit: limit, offset: offset})
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function (e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send('Unable to get data');
    });
});

// ShowClient.get('/genre', function(req, res) {
//     let genre = req.query.genre;
//     Guidebox.shows.list({tag: genre})
//     .then(function(data) {
//         res.status(200).send(data.results);
//     })
//     .catch(function(e) {
//         console.log(`${e._response.body.error}`.red);
//         res.status(500).send('Unable to get data');
//     });
// });

exports = module.exports = ShowClient;