const apiKey = 'b37b08fb343f638926ca022a85e8554a078f50c1';
let Guidebox = require('guidebox')(apiKey);
let express = require('express');

let MovieClient = express.Router();

MovieClient.get('/all', function(req, res) {
    Guidebox.movies.list({source: 'hulu'})
    .then(function(data) {
        res.status(200).send(data.results);
    })
    .catch(function (e) {
        console.log(`${e}`.red);
    });
});

exports = module.exports = MovieClient;