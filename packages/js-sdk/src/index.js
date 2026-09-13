import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(currentDir, "../../../data");

export function getSupportedCountries() {
  const file = path.join(root, "index.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).countries;
}

export function getBanksByCountry(countryCode) {
  const file = path.join(root, countryCode.toUpperCase(), "banks.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).banks;
}
