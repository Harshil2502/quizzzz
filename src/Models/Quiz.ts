import mongoose, { Schema } from 'mongoose';

const quizSchema = new Schema({
  question: String,
  options: Array,
  rightAnswer: Number,
  startDate: Date,
  endDate: Date,
  status: String
});

export default mongoose.model('Quiz', quizSchema);
