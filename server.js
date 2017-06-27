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

// Handles Success / Failure , and returns data
var handler = function (res) {
    return function (err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
    }
}

// 1 - Get All Necklace Data
app.get('/necklaces', function (req, res) {
    Necklace.find(handler(res));
});

// 2 - Add Chain + Setting Option to Necklace DB
app.post('/necklaces', function (req, res) {
    var temp = 'https://s-media-cache-ak0.pinimg.com/736x/57/bd/82/57bd822ea5fa3c8c3b43580e8a5bba52.jpg';
    var myNecklace = new Necklace({
        chains: [temp, temp, temp],
        settings: [temp, temp, temp]
    });
    myNecklace.save(handler(res));
});


app.listen(8000, function () {
    console.log("Go To localhost:8000 !!!)");
});
