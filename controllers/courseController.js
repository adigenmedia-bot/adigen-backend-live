import Course from '../models/Course.js';

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching courses" });
    }
};

export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: "Server error creating course" });
    }
};

export const seedCourses = async (req, res) => {
    try {
        const count = await Course.countDocuments();
        if (count === 0) {
            const initialCourses = req.body.courses || [];
            if (initialCourses.length > 0) {
                await Course.insertMany(initialCourses);
            }
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Server error seeding courses" });
    }
};
