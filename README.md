# Africa Bank Data

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#contributing)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](#contributing)
[![Open Source](https://img.shields.io/badge/open%20source-yes-orange.svg)](#)
[![Africa Fintech](https://img.shields.io/badge/built%20for-African%20fintech-black.svg)](#)

> **Open dataset of African banks for developers building fintech apps and payment systems.
**

Africa Bank Data is an open, structured, developer-friendly dataset of banks across African countries. It is designed for fintech products, onboarding flows, payout systems, transfer forms, internal tools, and any application that needs a reliable bank directory.

## Why this project exists

Developers building financial products in Africa constantly need to:

- show a bank selector in forms and apps
- map bank codes to bank names
- search institutions consistently
- support multiple countries with one schema
- enrich bank records with useful metadata such as USSD, website, and support email

Most teams rebuild this privately. This project exists to make that dataset open, reusable, and easier to maintain together.

## What this repository includes

- country-based datasets in `data/<country-code>/banks.json`
- country metadata in `data/<country-code>/metadata.json`
- a top-level country index in `data/index.json`
- starter JS SDK in `packages/js-sdk`
- starter API in `api/`
- validation scripts in `scripts/`
- contributor documentation and GitHub templates

## Repository structure

```text
africa-bank-data/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── PULL_REQUEST_TEMPLATE.md
├── api/
├── assets/
├── data/
│   ├── EG/
│   ├── GH/
│   ├── KE/
│   ├── NG/
│   ├── RW/
│   ├── ZA/
│   └── index.json
├── docs/
├── logos/
├── packages/
│   └── js-sdk/
├── scripts/
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## Data model

### `data/index.json`
Contains the list of supported countries.

### `data/<country-code>/metadata.json`
Contains basic information about the country dataset.

### `data/<country-code>/banks.json`
Contains the bank records for one country.

## Bank object schema

Each bank object may contain the following fields:

- `name` — official institution name
- `code` — bank or institution code used locally
- `slug` — URL-friendly identifier
- `short_name` — short display name
- `ussd` — USSD code when available
- `website` — official website
- `support_email` — public support email when available
- `type` — for example `commercial`, `merchant`, `microfinance`, `digital`
- `aliases` — alternative names or search aliases

Example:

```json
{
  "name": "Access Bank",
  "code": "044",
  "slug": "access-bank",
  "short_name": "Access",
  "ussd": "*901#",
  "website": "https://www.accessbankplc.com",
  "support_email": "contactcenter@accessbankplc.com",
  "type": "commercial",
  "aliases": ["access", "access bank plc"]
}
```

## Supported countries in this starter repo

- Nigeria (`NG`)
- Kenya (`KE`)
- Ghana (`GH`)
- South Africa (`ZA`)
- Rwanda (`RW`)
- Egypt (`EG`)

## Quick start

### Clone the repository

```bash
git clone https://github.com/<your-username>/africa-bank-data.git
cd africa-bank-data
```

### Validate the data

```bash
node scripts/validate-data.js
```

### Run the starter API

```bash
cd api
npm install
npm start
```

### Use the starter JS SDK

```bash
cd packages/js-sdk
npm install
node -e "import('./src/index.js').then(m => console.log(m.getBanksByCountry('NG').slice(0,2)))"
```

## How to contribute

The contribution guide is in [CONTRIBUTING.md](./CONTRIBUTING.md). It covers:

- adding a new country
- editing an existing bank list
- data quality rules
- naming conventions
- pull request expectations
- validation steps before opening a PR

## Contribution principles

We want this repository to be:

- easy to understand
- easy to extend country by country
- strict enough to stay clean
- flexible enough for incomplete but useful metadata

## Data quality rules

Before submitting changes, please make sure:

- institution names use the official or widely accepted public name
- codes are stored as strings, not numbers
- slugs are lowercase and hyphenated
- websites point to the official institution domain when available
- support emails are public-facing emails only
- optional fields can be omitted if they are unknown
- JSON stays properly formatted

## Roadmap

- expand country coverage
- add more verified institutions per country
- add logos with a standard naming convention
- improve validation scripts
- publish an npm package
- host a public read-only API
- add more language SDKs

## Community

- Star the repo if it helps you
- Open an issue if your country is missing
- Submit a PR if you can verify data
- Share it with other African fintech builders

## License

MIT
