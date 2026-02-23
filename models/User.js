
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Student / Freelancer', 'College Admin', 'Agency Partner']
    },
    // For 'Student / Freelancer' role
    enrolledCourses: [{
        type: String // Using the course 'id' field for simplicity with seeder
    }],
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio'
    },
    // For 'Agency Partner' role
    companyProfile: {
        tagline: String,
        logoUrl: String,
        description: String,
        industry: String,
        website: String,
        phone: String,
        address: String
    }
}, {
    timestamps: true
});

// Method to compare entered password with the hashed password in the DB
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Middleware to hash password before saving a new user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
