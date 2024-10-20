import mongoose from 'mongoose';

const examPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {  // Type of exam (Theoretical or Practical)
    type: String,
    enum: ['theoretical', 'practical'], // Restrict to specific values
    required: true,
  },
  chapter: {  // Chapter associated with the exam
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true,
      },
      options: [
        {
          type: String,
        }
      ],
      correctAnswer: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        default: 1,
      },
    }
  ],
  duration:{
    type:Number
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  }, {timestamps:true});

const ExamPaper = mongoose.models.ExamPaper || mongoose.model('ExamPaper', examPaperSchema);

export default ExamPaper;
