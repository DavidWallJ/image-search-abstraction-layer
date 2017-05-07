/**
 * Created by david on 5/7/17.
 */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var searchSchema = new Schema({
    searchVal: String,
    searchDate: Date
}, {timestamp: true});

var Search = mongoose.model('search', searchSchema);

module.exports = Search;