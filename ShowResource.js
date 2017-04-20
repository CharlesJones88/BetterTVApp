let express = require('express');
let nconf = require('nconf');
let omdb = require('omdb');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let ShowClient = express.Router();

ShowClient.get('/all', function(req, res) {
    let source = req.query.source;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let params = {
        sources: source,
        limit: limit,
        offset: offset
    };
    Guidebox.shows.list(params)
    .then(function(data) {
        let promiseArray = [];
        data.results.forEach(show => {
            let promise = new Promise((resolve, reject) => {
                omdb.get(show.imdb_id, {tomatoes: true}, function (err, info) {
                    if (err) reject(err);
                    show.rating = info.rated;
                    show.genres = info.genres;
                    show.plot = info.plot;
                    show.rated = info.imdb.rating;
                    resolve();
                });
            });
            promiseArray.push(promise);
        });
        Promise.all(promiseArray).then(function () {
            res.status(200).send(data.results);
        });
    })
    .catch(function (e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send(`${e._response.body.error}`);
    });
});

ShowClient.get('/sources', function(req, res) {
    // let genre = req.query.genre;
    Guidebox.sources.list({filter: 'show'})
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function(e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send(`${e._response.body.error}`);
    });
});

exports = module.exports = ShowClient;