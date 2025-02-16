import { Router } from "express";
import { verifyToken } from '../middleware/authMiddleware.js';
import { readData, writeData } from '../database/mongoConnection.js';
import moment from "moment-timezone";
const router = Router();
const currentTime = moment().tz("Asia/Manila").format("YYYY-MM-DD-HH:mm:ss");
router.post("/attendance/mark", verifyToken, async (req, res) => {
    try {
        const { data, classId } = req.body;

        if (!Array.isArray(data) || data.length === 0 || !data[0]?.rawValue) {
            return res.status(400).json({ error: "Invalid attendance data" });
        }

        if (!classId) {
            return res.status(400).json({ error: "Class ID is required" });
        }

        const classes = await readData("classes");
        const selectedClass = classes.find((classData) => classData.classId === classId);

        if (!selectedClass) {
            return res.status(404).json({ error: "Class not found" });
        }

        const users = await readData("users");
        const professor = users.find((user) => user.userId === req.userId);
        if (!professor) {
            return res.status(404).json({ error: "Professor not found" });
        }

        const rawValue = data[0].rawValue;
        const values = rawValue.split("|");
        const headers = ['ID', 'FirstName', 'LastName', 'Course', 'Email'];

        const record = {};
        headers.forEach((key, index) => {
            record[key] = values[index] || null;
        });

        const attendanceData = {
            studentId: record.ID,
            firstName: record.FirstName,
            lastName: record.LastName,
            course: record.Course,
            email: record.Email,
            classId: selectedClass.classId,
            professorId: professor.userId,
            attendanceDate: currentTime,
            status: "present"
        };

        await writeData("attendance", attendanceData);

        res.status(200).json({
            message: "Attendance marked successfully",
            data: attendanceData
        });

    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ error: "Failed to mark attendance" });
    }
});

export default router;
