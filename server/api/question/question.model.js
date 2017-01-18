'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  content: String,
  answers: [{
      content: String,
  }],
  tags: [{
    text: String,
  }],
  active: Boolean
});

export default mongoose.model('Question', QuestionSchema);
