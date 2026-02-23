import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../db.js';

dotenv.config();

// We need an absolute path to the data folder
const dataDir = path.resolve('../data');

const importAllData = async () => {
    try {
        await connectDB();

        const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

        for (const file of files) {
            // we use dynamic import
            const modulePath = `file://${path.join(dataDir, file).replace(/\\/g, '/')}`;
            console.log(`Importing ${file}...`);

            try {
                // dynamically import the TypeScript file. tsx handles transpilation.
                const module = await import(modulePath);

                // We will look for exported arrays. Most are named like 'talentData', etc.
                for (const key of Object.keys(module)) {
                    const exportedData = module[key];
                    if (Array.isArray(exportedData)) {
                        console.log(`   Found array export '${key}' in ${file} with ${exportedData.length} items`);

                        const collectionName = file.replace('.ts', '');

                        const db = mongoose.connection.db;
                        const collection = db.collection(collectionName);

                        // Clear old mock data
                        await collection.deleteMany({});

                        // Insert new mock data
                        if (exportedData.length > 0) {
                            await collection.insertMany(exportedData);
                            console.log(`   Seeded ${exportedData.length} records into '${collectionName}' collection.`);
                        }
                    }
                }
            } catch (err) {
                console.log(`Failed to process ${file}: ${err.message}`);
            }
        }

        console.log("Migration complete!");
        process.exit();
    } catch (err) {
        console.error("Migration fatal error:", err);
        process.exit(1);
    }
};

importAllData();
