let express = require('express');
let nconf = require('nconf');
let omdb = require('omdb');
let _ = require('lodash');
nconf.file({file:'config.json'});

const apiKey = nconf.get('apiKey');
const source = nconf.get('source');
let Guidebox = require('guidebox')(apiKey);

let MovieClient = express.Router();

MovieClient.get('/movie', function(req, res) {
    let id = req.query.id;
    let fullPlot = req.query.fullPlot;
    omdb.get(id, {fullPlot: fullPlot}, function(err, info) {
        res.status(200).send(info);
    });
});

MovieClient.get('/all', function(req, res) {
    let source = req.query.source;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let fullPlot = req.query.fullPlot;
    var params = {
        sources: source,
        limit: limit,
        offset: offset
    };
    Guidebox.movies.list(params)
    .then(function(data) {
        let promiseArray = [];
        data.results.forEach(movie => {
            let promise = new Promise((resolve, reject) => {            
                omdb.get(movie.imdb, {tomatoes: true}, function(err, info) {
                    if(err) {
                        console.log(`${err}`.red);
                        reject(err);
                    } else {
                        movie.runtime = info.runtime;
                        movie.plot = info.plot;
                        movie.genres = info.genres;
                        movie.rated = info.imdb.rating;
                        movie.awards = info.awards;
                        resolve();
                    }
                });
            });
            promiseArray.push(promise);
        });
        Promise.all(promiseArray).then(function() {
            let genres = _.uniq(_.flatten(_.map(data.results, (movie) => movie.genres)));
            res.status(200).send({genres: genres, movies: data.results});
        });
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