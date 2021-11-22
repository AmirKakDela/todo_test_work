import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const schema = new Schema({
    title: { type: String, required: true, minlength: 2 },
    status: { type: Boolean, default: false },
})

export default model('Todo', schema)