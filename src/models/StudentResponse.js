import mongoose from 'mongoose';

const studentResponseSchema = new mongoose.Schema({
  studentId: {
    type: Number, 
    required: true,
  },
  examPaperId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'examPaperType',  
  },
  examPaperType: {
    type: String,
    required: true,
    enum: ['MCQExamPaper', 'PracticalExamPaper'], 
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
      },
      selectedOption: {
        type: String,  
        required: false,  
      },
      answerType: {
        type: String, 
        required: true,
      }
    }
  ],
  score: {
    type: Number,  
  }
}, { timestamps: true });

const StudentResponse = mongoose.models.StudentResponse || mongoose.model('StudentResponse', studentResponseSchema);

export default StudentResponse;
