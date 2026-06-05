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

const problems = [];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const indexPath = path.join(dataRoot, 'index.json');
if (!fs.existsSync(indexPath)) {
  problems.push('Missing data/index.json');
  report();
}

const index = readJson(indexPath);
if (!Array.isArray(index.countries)) {
  problems.push('data/index.json must contain a countries array');
  report();
}

for (const country of index.countries) {
  const code = country.code;
  const dir = path.join(dataRoot, code);
  const metadataFile = path.join(dir, 'metadata.json');
  const banksFile = path.join(dir, 'banks.json');

  if (!fs.existsSync(dir)) { problems.push(`Missing folder: data/${code}`); continue; }
  if (!fs.existsSync(metadataFile)) problems.push(`Missing metadata.json for ${code}`);
  if (!fs.existsSync(banksFile)) problems.push(`Missing banks.json for ${code}`);

  if (fs.existsSync(metadataFile)) {
    const metadata = readJson(metadataFile);
    if (!validateMetadata(metadata)) {
      for (const err of validateMetadata.errors) {
        problems.push(`data/${code}/metadata.json${err.instancePath} ${err.message}`);
      }
    }
  }

  if (fs.existsSync(banksFile)) {
    const banksJson = readJson(banksFile);
    if (!Array.isArray(banksJson.banks)) {
      problems.push(`banks must be an array in data/${code}/banks.json`);
      continue;
    }

    const slugsSeen = new Set();
    const codesSeen = new Set();

    for (let i = 0; i < banksJson.banks.length; i++) {
      const bank = banksJson.banks[i];
      const label = `data/${code}/banks.json[${i}] "${bank.name || 'unknown'}"`;

      if (!validateBank(bank)) {
        for (const err of validateBank.errors) {
          problems.push(`${label}${err.instancePath} ${err.message}`);
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
