const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    activity: String,
    emoji: String
});

module.exports = mongoose.model('Activity', ActivitySchema);