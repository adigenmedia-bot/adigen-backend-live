
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: { type: String, enum: ['video', 'quiz'] },
    duration: String,
    videoUrl: String,
});

const quizQuestionSchema = new mongoose.Schema({
    id: String,
    question: String,
    options: [String],
    correctAnswerIndex: Number,
});

const quizSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: { type: String, enum: ['quiz'] },
    questions: [quizQuestionSchema],
});

const curriculumItemSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: { type: String, enum: ['video', 'quiz'] },
    duration: String,
    videoUrl: String,
    questions: [quizQuestionSchema]
});

const chapterSchema = new mongoose.Schema({
    id: String,
    title: String,
    items: [curriculumItemSchema],
});


const courseSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    description: { type: String, required: true },
    whatYoullLearn: [String],
    curriculum: [chapterSchema],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
