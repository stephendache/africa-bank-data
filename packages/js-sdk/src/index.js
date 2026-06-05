import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

export function getSupportedCountries() {
  return readJson(path.join(root, "index.json")).countries;
}

export function getBrands() {
  return readJson(path.join(root, "brands.json")).brands;
}

export function getBrandBySlug(slug) {
  return getBrands().find((brand) => brand.slug === slug) ?? null;
}

export function getBanksByCountry(countryCode) {
  const file = path.join(root, countryCode.toUpperCase(), "banks.json");
  return readJson(file).banks;
}

export function enrichBankWithLogo(bank, options = {}) {
  const brandsBySlug = options.brandsBySlug ?? getBrandsIndex();
  const brand = bank.brand_slug ? brandsBySlug.get(bank.brand_slug) ?? null : null;
  const brandDomain = resolveBrandDomain(bank, brandsBySlug);
  const logoUrl = getBankLogoUrl(bank, { ...options, brandsBySlug });

  return {
    ...bank,
    brand_domain: brandDomain,
    logo_url: logoUrl,
    brand: brand
      ? {
          slug: brand.slug,
          name: brand.name,
          domain: brand.domain,
          logo_url: getBrandLogoUrl(brand, options),
        }
      : null,
  };
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
