import mongoose from 'mongoose';

const examPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  syllabus: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  chapter: {
    type: String,
  },
  topic: {
    type: String,
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
      negative: {
        type: Number,
        default: 0,
      },
    }
  ],
  duration: {
    type: Number,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  adminEmail: {
    type: String,
  },
  examDate: {
    type: Date,
    required: true,
    default: Date.now
  },  
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const MCQExamPaper = mongoose.models.MCQExamPaper || mongoose.model('MCQExamPaper', examPaperSchema);

export default MCQExamPaper;
