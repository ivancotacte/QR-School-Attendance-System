import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { connectMongoDB } from "./database/mongoConnection.js";

connectMongoDB();
const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
