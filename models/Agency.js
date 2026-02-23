
import mongoose from 'mongoose';

const agencySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    partnershipDate: { type: Date, default: Date.now },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive', 'Pending'],
        default: 'Pending'
    },
    // This could be a virtual or calculated field in a real app
    jobPostings: { type: Number, default: 0 },
}, {
    timestamps: true
});

const Agency = mongoose.model('Agency', agencySchema);

export default Agency;
