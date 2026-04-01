import express from "express";
import fs from "node:fs";
import path from "node:path";

const app = express();
const dataRoot = path.resolve(process.cwd(), "../data");

app.get("/countries", (_req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(dataRoot, "index.json"), "utf8"));
  res.json(data);
});

app.get("/banks", (req, res) => {
  const country = String(req.query.country || "NG").toUpperCase();
  const file = path.join(dataRoot, country, "banks.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  res.json(data);
});

app.listen(3000, () => console.log("Africa Bank Data API running on :3000"));
