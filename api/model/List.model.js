const mongoose = require('mongoose');
const { Schema } = mongoose;
const ListSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
    },
    genre: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('List', ListSchema);