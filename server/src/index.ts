import express from "express";
import cors from "cors";
import searchRouter from "./routes/search.ts";

const app = express();
const PORT = Number(process.env.PORT) || 8001;

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
