import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// GET all items from a dynamically given collection
router.get('/:collectionName', async (req, res) => {
    try {
        const { collectionName } = req.params;
        const db = mongoose.connection.db;
        const items = await db.collection(collectionName).find({}).toArray();
        res.json(items);
    } catch (error) {
        console.error("Dynamic GET Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// POST to sync (replace) a full collection or update it
router.post('/:collectionName/sync', async (req, res) => {
    try {
        const { collectionName } = req.params;
        const bodyData = Array.isArray(req.body) ? req.body : [req.body];
        
        const db = mongoose.connection.db;
        
        // Clear previous cache/dummy data in db
        await db.collection(collectionName).deleteMany({});
        
        // Insert new synced data
        if (bodyData.length > 0) {
            await db.collection(collectionName).insertMany(bodyData);
        }
        
        res.json({ success: true, count: bodyData.length });
    } catch (error) {
        console.error("Dynamic SYNC Error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
