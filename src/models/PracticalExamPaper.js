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
      questionImage: {
        type: String,
      },
      assets: {
        image: {
          type: [String],
          default: ["https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=600"],
        },
        audio: {
          type: [String],
          default: [],
        },
        video: {
          type: [String],
          default: ["https://videos.pexels.com/video-files/3571264/3571264-sd_640_360_30fps.mp4", "https://videos.pexels.com/video-files/6394054/6394054-sd_960_480_24fps.mp4", "https://videos.pexels.com/video-files/3173312/3173312-sd_640_360_30fps.mp4", "https://videos.pexels.com/video-files/2098989/2098989-sd_640_360_30fps.mp4"],
        },
        url: {
          type: [String],
          default: ["https://exam.akriticomputer.xyz/exams/olevel","https://exam.akriticomputer.xyz/exams/alevel", "https://exam.akriticomputer.xyz/exams/adca" ],
        },
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

const PracticalExamPaper = mongoose.models.PracticalExamPaper || mongoose.model('PracticalExamPaper', examPaperSchema);

export default PracticalExamPaper;
