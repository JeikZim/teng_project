const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    index: { type: Number, required: true },
    content: { type: String, requierd: true },
});

module.exports = model("Text", schema);
