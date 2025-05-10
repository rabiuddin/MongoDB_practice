import express from "express";
import userRouter from "./user.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

export { app };
