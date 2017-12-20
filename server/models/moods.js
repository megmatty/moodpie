const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
    mood: String,
    emoji: String
});

module.exports = mongoose.model('Mood', MoodSchema);