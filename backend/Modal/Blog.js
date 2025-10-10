const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  title: { type: String },
  description:{type: String  },
  content: { type: String, required: true }, 
  mainImage: { type: String },
  embeddedImages: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);