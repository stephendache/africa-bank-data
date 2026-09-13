import express from "express";
import {
  getSupportedCountries,
  getBanksByCountry,
} from "../../packages/js-sdk/src/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.get("/countries", (_req, res) => {
  res.json({ countries: getSupportedCountries() });
});

app.get("/banks", (req, res) => {
  const country = String(req.query.country || "NG").toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) {
    return res.status(400).json({ error: `Invalid country code '${country}'` });
  }
  const isSupported = getSupportedCountries().some((c) => c.code === country);
  if (!isSupported) {
    return res.status(404).json({ error: `No data for country '${country}'` });
  }
  res.json({ country, banks: getBanksByCountry(country) });
});

app.listen(port, () => console.log(`Africa Bank Data API running on :${port}`));
