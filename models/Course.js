import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    level: { type: String, default: 'Beginner' },
    duration: { type: String, default: '0 hours' },
    category: { type: String, default: 'Development' },
    description: { type: String, default: '' },
    curriculum: { type: mongoose.Schema.Types.Mixed, default: [] }
}, { timestamps: true });

// We transform _id to id to match frontend
courseSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
