const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    author: { type: String, requierd: true },
    texts: [{ type: Types.ObjectId, ref: "Text", requierd: true }],
    quizzes: [{ type: Types.ObjectId, ref: "Quiz", requierd: true }],
});

module.exports = model("Exercise", schema);
