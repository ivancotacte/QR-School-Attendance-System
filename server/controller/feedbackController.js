import moment from "moment-timezone";
import { writeData, refreshData } from "../database/mongoConnection.js";
const currentTime = moment().tz("Asia/Manila").format("YYYY-MM-DD-HH:mm:ss");
const Feedback = async (req, res) => {
    const { feedback, category } = req.body;

    if (!feedback || !category) {
        return res
            .status(400)
            .json({ status: "failed", message: "Please enter all fields" });
    }

    try {
        const feedbackData = {
            feedback,
            category,
            created_at: currentTime,
        };

        await writeData("feedbacks", feedbackData);

        res
            .status(201)
            .json({ status: "success", message: "Feedback submitted successfully" });
        refreshData();
    } catch (error) {
        res.status(500).json({ status: "failed", message: "Something went wrong" });
        refreshData();
    }
};

export default Feedback;