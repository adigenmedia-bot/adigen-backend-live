
import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true }
});

const educationSchema = mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }
});

const portfolioProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String }
});

const portfolioSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    projects: [portfolioProjectSchema],
    rating: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 0 },
    availability: {
        type: String,
        enum: ['Available', 'Available Soon', 'Not Available'],
        default: 'Available'
    }
}, {
    timestamps: true
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
