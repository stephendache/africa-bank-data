import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const dataRoot = path.resolve(currentDir, "../../data");
const port = process.env.PORT || 3000;

app.get("/countries", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(dataRoot, "index.json"), "utf8"));
  res.json(data);
});

app.get("/banks", (req, res) => {
  const country = String(req.query.country || "NG").toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) {
    return res.status(400).json({ error: `Invalid country code '${country}'` });
  }
  const file = path.join(dataRoot, country, "banks.json");
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: `No data for country '${country}'` });
  }
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  res.json(data);
});

app.listen(port, () => console.log(`Africa Bank Data API running on :${port}`));
