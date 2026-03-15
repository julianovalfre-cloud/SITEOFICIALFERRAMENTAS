import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "valfre ecommerce api" });
});

app.get("/api/test", (_req, res) => {
  res.status(200).json({ status: "connected", service: "valfre ecommerce api" });
});

app.get("/api/ping", (_req, res) => {
  res.status(200).json({ status: "connected", service: "valfre ecommerce api" });
});

app.use("/api", router);

export default app;
