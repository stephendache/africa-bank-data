import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "data");

export function getSupportedCountries() {
  const file = path.join(root, "index.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).countries;
}

export function getBanksByCountry(countryCode) {
  const file = path.join(root, countryCode.toUpperCase(), "banks.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).banks;
}
