var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

//var sendpulse = require("sendpulse-api");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://iradkot:nirnir16@ds147497.mlab.com:47497/jewelsynth', function () {
    console.log("DB connection established !!!");
})

var Artist = require('./models/artistModel.js');

//var Necklace = require('./models/necklaceModel.js');

var app = express();

app.use(express.static('public'));
app.use(express.static('arrows'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// sendPulse email
// var API_USER_ID = "5719cf761b0d532c695fd016cc5d906d"
// var API_SECRET = "6778dbd22f4fad54ba1dd5f65c5105d3"
// var TOKEN_STORAGE = "./tmp/"
// sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE);
// var answerGetter = function answerGetter(data) {
//     console.log(data);
// }
// var email = {
//     "html": "<h1>Example text</h1>",
//     "text": "Example text",
//     "subject": "Example subject",
//     "from": {
//         "name": "moshe",
//         "email": "mosh7890@gmail.com"
//     },
//     "to": [
//         {
//             "name": "Irad",
//             "email": "irad16@gmail.com"
//         }
//     ]
// };
// sendpulse.smtpAddDomain(answerGetter, 'mosh7890@gmail.com');
// sendpulse.smtpSendMail(answerGetter, email);

// nodemailer Email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'elevationmosh@gmail.com',
        pass: 'Elevation358'
    }
});

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
        theme: req.body.theme,
        score: 0
    });
    newArtist.save(handler(res));
});

// 3 - Delete Artist
app.delete('/artist/:artistEmail', function (req, res) {
    Artist.findOne({ email: req.params.artistEmail }).remove().exec(handler(res));
});

// 4 - Edit Artist
// Put Request
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
    Artist.findOneAndUpdate({ email: req.params.email }, update, { new: true }, handler(res));
});

// Get Customer Order and Send out Emails
app.post('/order', function (req, res) {
    var a = req.body;
    var mailOptions1 = {
        from: 'elevationmosh@gmail.com',
        to: a.artist_email,
        subject: 'New Order',
        text: a.customer_name + '(' + a.customer_email + ') has ordered: ' + a.chain + ' and ' + a.setting + '.'
    };

    var mailOptions2 = {
        from: 'elevationmosh@gmail.com',
        to: a.customer_email,
        subject: 'New Order',
        text: a.customer_name + '(' + a.customer_email + '), your order of ' + a.chain + ' and ' + a.setting + ' has been sent!. Ty!.'
    };

    transporter.sendMail(mailOptions1, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    transporter.sendMail(mailOptions2, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    Artist.findOne({ email: a.artist_email }, function (err, data) {
        if (err) { return console.error(err); }
        var update = { $set: { score: data.score + 1 } };
        Artist.findOneAndUpdate({ email: a.artist_email }, update, { new: true }, handler(res));
    });
});


app.listen(process.env.PORT || '8080');