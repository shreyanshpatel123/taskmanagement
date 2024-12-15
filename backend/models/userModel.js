const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' } // Reference to Task model
});

module.exports = mongoose.model('User', userSchema);