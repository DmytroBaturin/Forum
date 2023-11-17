const { Schema } = require("mongoose")
const mongoose = require("mongoose");

const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    }],
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

module.exports = mongoose.model("Topic", topicSchema)