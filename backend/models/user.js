const { Schema } = require("mongoose")
const mongoose = require("mongoose");

const userScheme = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: Object,
        ref: 'Role'
    }]
})

module.exports = mongoose.model("User", userScheme)