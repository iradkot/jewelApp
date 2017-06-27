var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var necklaceSchema = new Schema({
    chains: [],
    settings: []
});

var Necklace = mongoose.model('Necklace', necklaceSchema);

module.exports = Necklace;