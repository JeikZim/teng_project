const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    exercises: [{ type: Types.ObjectId, ref: "Exercise" }],
});

module.exports = model("User", schema);
