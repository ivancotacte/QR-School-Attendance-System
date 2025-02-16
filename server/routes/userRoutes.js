import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
    writeData,
    readData,
    deleteData,
    updateData,
    refreshData,
} from "../database/mongoConnection.js";
const router = Router();

router.get("/", verifyToken, async (req, res) => {
    console.log("Authenticated UserID:", req.userId);

    const users = await readData("users");
    const user = users.find((user) => user.userId === req.userId);

    res.status(200).json({ 
        status: "success", 
        data: {
            userId: user.userId,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.email,
            banned: user.banned,
        } 
    });
});

router.post("/profile", verifyToken, async (req, res) => {
    const { firstName, lastName } = req.body;

    const users = await readData("users");
    const user = users.find((user) => user.userId === req.userId);

    res.status(200).json({ 
        status: "success", 
        data: {
            userId: user.userId,
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.email,
            banned: user.banned,
        } 
    });
});

export default router;