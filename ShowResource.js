let express = require('express');
let nconf = require('nconf');
let imdb = require('imdb-api');
let _ = require('lodash');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let ShowClient = express.Router();

ShowClient.get('/show', function(req, res) {
    let id = req.query.id;
    imdb.getById(id).then(function(info) {
        res.status(200).send(info);
    });
});

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
                imdb.getById(show.imdb_id, function (err, info) {
                    if (err) {
                        console.log(`${err}`.red);
                        reject(err);
                    } else {
                        show.rating = info.rated;
                        show.genres = info.genres.split(',');
                        _.each(show.genres, genre => genre = genre.trim());
                        show.plot = info.plot;
                        show.rated = info.rating;
                        resolve();
                    }
                });
            });
            promiseArray.push(promise);
        });
        Promise.all(promiseArray).then(function () {
            let genres = _.uniq(_.flatten(_.map(data.results, (show) => show.genres)));
            res.status(200).send({genres:genres, shows:data.results});
        }, function(err) {
            res.status(500).send(`${err}`.red);
        });
    })
    .catch(function (e) {
        console.log(`${e._response.body.error}`.red);
        res.status(500).send(`${e._response.body.error}`);
    });
});

ShowClient.get('/sources', function(req, res) {
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