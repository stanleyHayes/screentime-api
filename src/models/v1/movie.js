const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    release_year: {
        type: Number,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Director'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
