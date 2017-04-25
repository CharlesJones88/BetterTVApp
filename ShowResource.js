let express = require('express');
let nconf = require('nconf');
let omdb = require('omdb');
let _ = require('lodash');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let ShowClient = express.Router();

ShowClient.get('/show', function(req, res){
    let id = req.query.id;
    let fullPlot = req.query.fullPlot;
    omdb.get(id, {fullPlot: fullPlot}, function(err, info){
        res.status(200).send(info);
    });
});

ShowClient.get('/all', function(req, res) {
    let source = req.query.source;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let fullPlot = req.query.fullPlot;
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
                    if (err) {
                        console.log(`${err}`.red);
                        reject(err);
                    } else {
                        show.rating = info.rated;
                        show.genres = info.genres;
                        show.plot = info.plot;
                        show.rated = info.imdb.rating;
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
            res.status(500).send(`${e._response.body.error}`.red);
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