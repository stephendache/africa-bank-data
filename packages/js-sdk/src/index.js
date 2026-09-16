import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(currentDir, "../../../data");
import {
  buildBrandfetchLogoUrl,
  extractDomain,
  getBankLogoUrl,
  getBrandLogoUrl,
  resolveBrandDomain,
} from "./logos.js";

const packageDataRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../data"
);

function getDataRoot() {
  if (process.env.AFRICA_BANK_DATA_ROOT) {
    return path.resolve(process.env.AFRICA_BANK_DATA_ROOT);
  }

  if (fs.existsSync(packageDataRoot)) {
    return packageDataRoot;
  }

  return path.resolve(process.cwd(), "data");
}

const root = getDataRoot();

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getBrandsIndex() {
  const brands = readJson(path.join(root, "brands.json")).brands;
  return new Map(brands.map((brand) => [brand.slug, brand]));
}

function readJson(...segments) {
  return JSON.parse(fs.readFileSync(path.join(root, ...segments), "utf8"));
}

export function getSupportedCountries() {
  return readJson("index.json").countries;
}

export function getBanksByCountry(countryCode) {
  return readJson(countryCode.toUpperCase(), "banks.json").banks;
}

export function getBanksByCountryWithLogos(countryCode, options = {}) {
  const brandsBySlug = options.brandsBySlug ?? getBrandsIndex();
  return getBanksByCountry(countryCode).map((bank) =>
    enrichBankWithLogo(bank, { ...options, brandsBySlug })
  );
}

export {
  buildBrandfetchLogoUrl,
  extractDomain,
  getBankLogoUrl,
  getBrandLogoUrl,
  resolveBrandDomain,
};
