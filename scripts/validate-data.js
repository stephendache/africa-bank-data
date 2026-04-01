import fs from 'fs';
import path from 'path';

const root = path.resolve('data');
const indexPath = path.join(root, 'index.json');
const problems = [];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
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
          if (bank.aliases && !Array.isArray(bank.aliases)) problems.push(`Aliases must be an array for ${bank.name || 'unknown'} in ${code}`);
        }
      }
    }
  }
}

if (problems.length) {
  console.error('Validation failed:\n');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log('Dataset validation passed.');
