const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  description: String,

  completed: {
    type: Boolean,
    default: false,
  },

  priority: {
    type: String,
    default: "Medium",
  },

  dueDate: Date,

});

module.exports = mongoose.model("Task", taskSchema);