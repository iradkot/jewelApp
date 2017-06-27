var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var artistSchema = new Schema({
    name: String,
    bio: String,
    email: String,
    profile_pic: String,
    //necklace_chains: [],
    //necklace_settings: []
});

var Artist = mongoose.model('Artist', artistSchema);


module.exports = Artist;