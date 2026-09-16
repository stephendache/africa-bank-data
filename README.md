# Africa Bank Data

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](#license)

Open dataset of African banks for developers building fintech apps and payment systems. Use it for bank selectors, mapping codes to names, search, and multi-country support with one schema.

## What's included

- country datasets in `data/<country-code>/banks.json`
- country metadata in `data/<country-code>/metadata.json`
- a country index in `data/index.json`
- a starter JS SDK in `packages/js-sdk`
- a starter API in `api/`
- validation scripts in `scripts/`

## Repository structure

```text
africa-bank-data/
├── .github/
│   └── ISSUE_TEMPLATE/
├── api/
├── data/
│   ├── EG/
│   ├── GH/
│   ├── KE/
│   ├── NG/
│   ├── RW/
│   ├── ZA/
│   └── index.json
├── docs/
├── packages/
│   └── js-sdk/
├── scripts/
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

## Data model

The dataset is a country index plus one folder per country:

- `data/index.json` — supported countries
- `data/<country-code>/metadata.json` — country details (currency, central bank, etc.)
- `data/<country-code>/banks.json` — bank records for that country

See [`docs/DATA-SCHEMA.md`](./docs/DATA-SCHEMA.md) for the full schema and an example record.

## Supported countries

See [`data/index.json`](./data/index.json).

## Quick start

Clone the repository:

```bash
git clone https://github.com/<your-username>/africa-bank-data.git
cd africa-bank-data
```

Validate the data:

```bash
node scripts/validate-data.js
```

Run the starter API:

```bash
cd api
npm install
npm start
```

Use the starter JS SDK:

```bash
cd packages/js-sdk
npm install
node -e "import('./src/index.js').then(m => console.log(m.getBanksByCountry('NG').slice(0,2)))"
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a country or bank, the [data quality rules](./CONTRIBUTING.md#data-quality-rules), and the pull request steps.

## License

MIT
