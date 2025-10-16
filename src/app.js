import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Cuci Sepatu API OK" });
});

app.use("/items", itemsRouter);

export default app;