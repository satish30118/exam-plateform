import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema({
  studentId: {  // Reference to the student's ID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model for students
    required: true,
  },
  examPaperId: {  // Reference to the exam paper taken
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamPaper',  // Assuming this is the model for exam papers
    required: true,
  },
  marksObtained: {  // Marks scored by the student
    type: Number,
    required: true,
  },
  totalMarks: {  // Total marks for the exam
    type: Number,
    required: true,
  },
  date: {  // Date the test was taken
    type: Date,
    default: Date.now,
  },
  answers: [  // Optional: Store answers provided by the student
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',  // Assuming you have a Question model
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    }
  ],
});

const ExamResult = mongoose.model('examResult', examResultSchema);

export default ExamResult;
