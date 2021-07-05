const mongoose = require('mongoose');

const Shema = mongoose.Schema;

const videoSchema = new Shema({
  title: String,
  url: String,
  description: String
});

module.exports = mongoose.model('video', videoSchema, 'videos');
