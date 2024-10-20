import mongoose from 'mongoose';

const studentResponseSchema = new mongoose.Schema({
  studentId: {
    type: Number, // Link to the student model (if you have a student model)
    required: true,
  },
  examPaperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamPaper',
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
    }
  ],
  score: {
    type: Number,  // Store the calculated score (optional)
  }
}, { timestamps: true });

const StudentResponse =  mongoose.models.StudentResponse || mongoose.model('StudentResponse', studentResponseSchema);

export default StudentResponse;
