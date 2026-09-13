import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(currentDir, "../../../data");

function readJson(...segments) {
  return JSON.parse(fs.readFileSync(path.join(root, ...segments), "utf8"));
}

export function getSupportedCountries() {
  return readJson("index.json").countries;
}

export function getBanksByCountry(countryCode) {
  return readJson(countryCode.toUpperCase(), "banks.json").banks;
}
