const { Schema } = require("mongoose")
const mongoose = require("mongoose");

const Role = new Schema({
    role: {
        type: String,
        unique: true,
        default: 'USER',
    }
}, {strict: "throw"})

module.exports = mongoose.model("Role", Role)