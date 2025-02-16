import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { writeData, readData, deleteData, updateData, refreshData } from '../database/mongoConnection.js';
const router = Router();
const currentTime = moment().tz("Asia/Manila").format("YYYY-MM-DD-HH:mm:ss");

router.post('/create', verifyToken, async (req, res) => {
    const { className, section, schedule, description } = req.body;

    if (!className || !section || !schedule || !description) {
        return res.status(400).json({ status: 'failed', message: 'Please enter all fields' });
    }

    try {
        const users = await readData("users");
        const user = users.find((user) => user.userId === req.userId);

        const classData = {
            classId: uuidv4(),
            data: { className, section, schedule, description },
            userId: user.userId,
            created_at: currentTime,
        };

        await writeData("classes", classData);
        res.status(201).json({ status: 'success', message: 'Class created successfully' });
        refreshData();
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' });
        refreshData();
    }
});

router.get('/view' , verifyToken, async (req, res) => {
    try {
        const classes = await readData("classes");
        const users = await readData("users");
        const user = users.find((user) => user.userId === req.userId);

        const userClasses = classes.filter((classData) => classData.userId === user.userId);
        res.status(200).json({ status: 'success', data: userClasses });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' });
    }
});

export default router;