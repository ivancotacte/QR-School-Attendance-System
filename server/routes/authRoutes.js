import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import { generateToken, verifyToken } from "../middleware/authMiddleware.js";
import {
  writeData,
  readData,
  refreshData,
} from "../database/mongoConnection.js";
const router = Router();

const currentTime = moment().tz("Asia/Manila").format("YYYY-MM-DD-HH:mm:ss");
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ status: "failed", message: "Please enter all fields" });
  }

  // Format names: capitalize first letter, rest lowercase
  const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  try {
    const users = await readData("users");
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      return res
        .status(409)
        .json({ status: "failed", message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      userId: uuidv4(),
      data: { firstName: formattedFirstName, lastName: formattedLastName },
      email,
      password: hashedPassword,
      banned: false,
      created_at: currentTime,
    };
    await writeData("users", userData);
    const token = generateToken(userData.userId);
    res.cookie("token", token, {
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
    });

    res
      .status(201)
      .json({ status: "success", message: "User registered successfully" });
    refreshData();
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Something went wrong" });
    refreshData();
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "failed", message: "Please enter all fields" });
  }

  try {
    const users = await readData("users");
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "User does not exist" });
    }

    if (user.banned) {
      return res
        .status(403)
        .json({ status: "failed", message: "User is banned" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    const token = generateToken(user.userId);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "User logged in successfully",
        token,
      });
    refreshData();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: "Something went wrong" });
    refreshData();
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ status: "success", message: "User logged out successfully" });
});

router.get("/verify", verifyToken, async (req, res) => {
  const users = await readData("users");
  const user = users.find((user) => user.userId === req.userId);

  res.status(200).json({ status: "success", user });
});

export default router;