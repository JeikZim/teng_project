const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    index: { type: Number, required: true }, 
    width: { type: Number, default: '100px' },
    placeholder: { type: String, requierd: true },
    answers: [{ type: String, required: true }]
});

module.exports = model("Quiz", schema);
