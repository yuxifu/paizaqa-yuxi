'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  answers: [{
    content: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [{
    text: String,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  active: Boolean
});

QuestionSchema.pre('find', function(next) {
  this.populate('user', 'name');
  this.populate('answers.user', 'name');
  next();
});

QuestionSchema.pre('findOne', function(next) {
  this.populate('user', 'name');
  this.populate('answers.user', 'name');
  next();
});

export default mongoose.model('Question', QuestionSchema);
