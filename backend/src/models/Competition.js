const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  activities: [{
    type: {
      type: String,
      required: true
    },
    value: Number,
    points: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  totalPoints: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);