import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const dataRoot = path.join(repoRoot, 'data');
const schemaRoot = path.join(repoRoot, 'schema');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const bankSchema = JSON.parse(fs.readFileSync(path.join(schemaRoot, 'bank.schema.json'), 'utf8'));
const metadataSchema = JSON.parse(fs.readFileSync(path.join(schemaRoot, 'metadata.schema.json'), 'utf8'));
const validateBank = ajv.compile(bankSchema);
const validateMetadata = ajv.compile(metadataSchema);

const root = path.resolve('data');
const indexPath = path.join(root, 'index.json');
const brandsPath = path.join(root, 'brands.json');
const problems = [];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isDomain(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,}$/.test(value);
}

const brandSlugs = new Set();

if (!fs.existsSync(brandsPath)) {
  problems.push('Missing data/brands.json');
} else {
  const brandsJson = readJson(brandsPath);
  if (!Array.isArray(brandsJson.brands)) {
    problems.push('data/brands.json must contain a brands array');
  } else {
    for (const brand of brandsJson.brands) {
      if (!brand.slug || !isSlug(brand.slug)) {
        problems.push(`Invalid brand slug for ${brand.name || 'unknown brand'}`);
      }
      if (!brand.name) {
        problems.push(`Missing brand name for ${brand.slug || 'unknown brand'}`);
      }
      if (!brand.domain || !isDomain(brand.domain)) {
        problems.push(`Invalid domain for brand ${brand.slug || 'unknown brand'}`);
      }
      if (brand.slug) {
        if (brandSlugs.has(brand.slug)) {
          problems.push(`Duplicate brand slug: ${brand.slug}`);
        }
        brandSlugs.add(brand.slug);
      }
    }
  }
}

if (!fs.existsSync(indexPath)) {
  problems.push('Missing data/index.json');
} else {
  const index = readJson(indexPath);
  if (!Array.isArray(index.countries)) {
    problems.push('data/index.json must contain a countries array');
  } else {
    for (const country of index.countries) {
      const code = country.code;
      const dir = path.join(root, code);
      const metadataFile = path.join(dir, 'metadata.json');
      const banksFile = path.join(dir, 'banks.json');

      if (!fs.existsSync(dir)) problems.push(`Missing folder: data/${code}`);
      if (!fs.existsSync(metadataFile)) problems.push(`Missing metadata.json for ${code}`);
      if (!fs.existsSync(banksFile)) problems.push(`Missing banks.json for ${code}`);

      if (fs.existsSync(banksFile)) {
        const banksJson = readJson(banksFile);
        if (banksJson.country !== code) problems.push(`Country mismatch in data/${code}/banks.json`);
        if (!Array.isArray(banksJson.banks)) problems.push(`banks must be an array in data/${code}/banks.json`);

        for (const bank of banksJson.banks || []) {
          if (!bank.name) problems.push(`Missing name in ${code}`);
          if (typeof bank.code !== 'string') problems.push(`Code must be a string for ${bank.name || 'unknown'} in ${code}`);
          if (!bank.slug || !isSlug(bank.slug)) problems.push(`Invalid slug for ${bank.name || 'unknown'} in ${code}`);
          if (bank.brand_slug && !isSlug(bank.brand_slug)) {
            problems.push(`Invalid brand_slug for ${bank.name || 'unknown'} in ${code}`);
          }
          if (bank.brand_slug && brandSlugs.size && !brandSlugs.has(bank.brand_slug)) {
            problems.push(`Unknown brand_slug "${bank.brand_slug}" for ${bank.name || 'unknown'} in ${code}`);
          }
          if (bank.aliases && !Array.isArray(bank.aliases)) problems.push(`Aliases must be an array for ${bank.name || 'unknown'} in ${code}`);
        }
      }

      if (bank.slug) {
        if (slugsSeen.has(bank.slug)) problems.push(`${label} duplicate slug "${bank.slug}"`);
        slugsSeen.add(bank.slug);
      }
      if (bank.code) {
        if (codesSeen.has(bank.code)) problems.push(`${label} duplicate code "${bank.code}"`);
        codesSeen.add(bank.code);
      }
    }
  }
}

report();

function report() {
  if (problems.length) {
    console.error('Validation failed:\n');
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
  }
  console.log('Dataset validation passed.');
  process.exit(0);
}
