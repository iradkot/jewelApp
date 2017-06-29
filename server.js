var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jewelApp', function () {
    console.log("DB connection established !!!");
})

var Artist = require('./models/artistModel.js');
var Necklace = require('./models/necklaceModel.js');

var app = express();

// var smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//         user: "",
//         pass: ""
//     }
// });

app.use(express.static('public'));
app.use(express.static('arrows'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/order', function (req, res) {
//     var mailOptions = {
//         to: req.query.to,
//         subject: req.query.subject,
//         text: req.query.text
//     }
//     console.log(mailOptions);
//     smtpTransport.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log(error);
//             res.end("error");
//         } else {
//             console.log("Message sent: " + response.message);
//             res.end("sent");
//         }
//     });
// });

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

// 4 - Edit Artist
// Fake Put Request
app.post('/artist/:email/option/:option', function (req, res) {
    var email = req.params.email;
    var option = req.params.option;
    switch (option) {
        case 'profile_pic':
            var update = { $set: { profile_pic: req.body.text } };
            break;
        case 'bio':
            var update = { $set: { bio: req.body.text } };
            break;
        case 'theme':
            var update = { $set: { theme: req.body.text } };
            break;
        case 'chains':
            var update = { $push: { chains: req.body.text } };
            break;
        case 'settings':
            var update = { $push: { settings: req.body.text } };
            break;
        default:
            var update = { $set: {} };
    }
    Artist.findOneAndUpdate(req.params.postId, update, { new: true }, handler(res));
});


// Get Customer Order
app.get('/order', function (req, res) {
    var temp = req.body;
});


app.listen(8000, function () {
    console.log("Go To localhost:8000 !!!)");
});
