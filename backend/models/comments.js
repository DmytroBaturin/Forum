const { Schema } = require("mongoose")
const mongoose = require("mongoose");

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comments", commentSchema)