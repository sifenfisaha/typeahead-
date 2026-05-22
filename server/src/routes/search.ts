import { Router } from "express";
import { items } from "../data.ts";

const router = Router();

router.get("/", (req, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();

  if (!q) {
    return res.json({ query: q, count: items.length, results: items });
  }

  const results = items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.capital.toLowerCase().includes(q),
  );

  res.json({ query: q, count: results.length, results });
});

export default router;
