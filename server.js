var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jewelApp', function () {
    console.log("DB connection established !!!");
})

var Artist = require('./models/artistModel.js');
var Necklace = require('./models/necklaceModel.js');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handles Success / Failure , and Returns data
var handler = function (res) {
    return function (err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
    }
}

// 1 - Get All Necklace Data
app.get('/artists', function (req, res) {
    Artist.find(handler(res));
});

// 2 - Add Chain + Setting Option to Necklace DB
app.post('/artists', function (req, res) {
    var newArtist = new Artist({
        name: req.body.name,
        bio: req.body.bio,
        email: req.body.email,
        profile_pic: req.body.profile_pic,
        chains: req.body['chains[]'],
        settings: req.body['settings[]'],
        theme: req.body.theme
    });
    newArtist.save(handler(res));
});

// 3 - Delete Artist
app.delete('/artist/:artistEmail', function (req, res) {
    Artist.findOne({ email: req.params.artistEmail }).remove().exec(handler(res));
});

app.listen(8000, function () {
    console.log("Go To localhost:8000 !!!)");
});
