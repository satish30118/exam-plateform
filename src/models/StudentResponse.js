import mongoose from 'mongoose';

const studentResponseSchema = new mongoose.Schema({
  studentId: {
    type: Number, // Reference to a student model
    required: true,
  },
  examPaperId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'examPaperType',  // Dynamic reference based on exam paper type
  },
  examPaperType: {
    type: String,
    required: true,
    enum: ['MCQExamPaper', 'PracticalExamPaper'], // Add more types if needed
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Each response is tied to a specific question
      },
      selectedOption: {
        type: String,  // Stores selected answer or response
        required: false,  // Optional for practical exams, required for MCQs
      },
      answerType: {
        type: String,  // Can store information like 'MCQ', 'Practical', etc.
        required: true,
      }
    }
  ],
  score: {
    type: Number,  // Store calculated score (optional)
  }
}, { timestamps: true });

const StudentResponse = mongoose.models.StudentResponse || mongoose.model('StudentResponse', studentResponseSchema);

export default StudentResponse;
