// This will house My back-end implementation in NodeJS-Express-Postgres
import express from "express";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./Routes/users.route.js";
import groupRouter from "./Routes/groups.route.js";
import messageRouter from "./Routes/messages.route.js";

const App = express();
const PORT = process.env.PORT1 || process.env.PORT2;
const HP = process.env.HP;
const HOST = process.env.HOST;

// Middleware........
App.use(cors());
App.use(helmet());
App.use(morgan("dev"));
App.use(express.json());

App.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Hello, welcome to PostIT" });
});

App.use(userRouter);
App.use(groupRouter);
App.use(messageRouter);

App.listen(PORT, () => {
  console.log(`${HP} ${HOST}:${PORT}`);
});