const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, trim: true, required: true },
  done: { type: Boolean, default: false }
})

module.exports = mongoose.model('Todo', TodoSchema);