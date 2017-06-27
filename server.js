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
app.get('/artists', function (req, res) {
    Artist.find(handler(res));
});

// 2 - Add Chain + Setting Option to Necklace DB
app.post('/artists', function (req, res) {
    var chain1 = 'https://cdn.shopify.com/s/files/1/1056/2378/products/31vlYRk46ML.jpg';
    var chain2 = 'https://ae01.alicdn.com/kf/HTB1pqkbLXXXXXX.aXXXq6xXFXXXO/2016-Hot-New-Top-Quality-Silver-Plated-4MM-Twisted-font-b-String-b-font-Chains-font.jpg';
    var chain3 = 'http://www.fashionlady.in/wp-content/uploads/2016/10/types-of-necklace-chains.jpg';
    var setting1 = 'http://beadsnice.com/bn/product/201506/23/03/47140_fbx.jpg"  class="img-responsive';
    var setting2 = 'https://s-media-cache-ak0.pinimg.com/736x/a9/a5/8e/a9a58ecb6790a899259a4c3d4e9c8e68.jpg';
    var setting3 = '"http://www.dhresource.com/260x260s/f2-albu-g3-M00-49-75-rBVaHVYqqO-AbBz8AAJ-XqgvD_k084.jpg/wholesale-10x12mm-oval-solid-14k-gold-natural.jpg';
    var newArtist = new Artist({
        name: 'Irad',
        bio: 'Jewish Jeweler',
        email: 'Irad16@gmail.com',
        chains: [chain1, chain2, chain3],
        settings: [setting1, setting2, setting3]
    });
    newArtist.save(handler(res));
});


app.listen(8000, function () {
    console.log("Go To localhost:8000 !!!)");
});
