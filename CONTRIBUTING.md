# Contributing to Africa Bank Data

First of all, **thank you for contributing** to Africa Bank Data. 🎉

This project aims to build an **open, reliable dataset of African banks** that developers can use when building fintech applications, payment systems, and financial tools across the continent.

Because Africa has many countries and financial institutions, **community contributions are essential** to keep the data accurate and up to date.

Again, thank you for contributing.

This repository is designed to be easy to contribute to, even if you only want to add or fix data for one country.

---

# Ways You Can Contribute

You can contribute by:

* Adding banks for a new country
* Updating existing bank information
* Fixing incorrect bank codes
* Adding `ussd`, `website`, and `support_email` - where available
* Adding bank logos
* improving validation scripts
* Reporting data errors
* Building SDKs or APIs using the dataset


Even small contributions are valuable.

---

# Project Structure

```
africa-bank-data/
│
├── data/
│   ├── index.json
│   ├── NG/
│   │   ├── banks.json
│   │   └── metadata.json
│   ├── KE/
│   │   ├── banks.json
│   │   └── metadata.json
│   └── GH/
│       ├── banks.json
│       └── metadata.json
│
├── logos/
│   ├── NG/
│   ├── KE/
│   └── GH/
│
├── packages/
│   ├── js-sdk/
│   └── python-sdk/
│
├── api/
│   └── src/
│
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

All country datasets live inside the **`data/` directory**.

Each country uses the **ISO 3166-1 alpha-2 country code** as its folder name.

Example:

```
data/NG/
data/KE/
data/GH/
```

---

## Adding a new country

1. Create a new folder under `data/<country-code>/`
2. Add a `metadata.json`
3. Add a `banks.json`
4. Update `data/index.json`
5. Run the validator
6. Open a pull request

Example:

```text
data/UG/
├── banks.json
└── metadata.json
```

## `metadata.json` format

```json
{
  "country": "UG",
  "country_name": "Uganda",
  "currency": "UGX",
  "central_bank": "Bank of Uganda",
  "last_updated": "2026-04-01"
}
```

## `banks.json` format

```json
{
  "country": "UG",
  "banks": [
    {
      "name": "Example Bank",
      "code": "001",
      "slug": "example-bank",
      "short_name": "Example",
      "website": "https://www.examplebank.ug",
      "support_email": "support@examplebank.ug",
      "type": "commercial",
      "aliases": ["example"]
    }
  ]
}
```

## Rules for data contributions

### Required Fields

| Field | Description                 |
| ----- | --------------------------- |
| name  | Official bank name          |
| code  | Bank code used in transfers |
| slug  | URL-friendly identifier     |

### Optional Fields

| Field | Description |
|------|------------|
| short_name | Short display name |
| ussd | USSD banking code |
| website | Official website |
| support_email | Customer support email |
| type | Bank type (e.g. commercial, microfinance) |
| aliases | Alternative names |
| nip_code | NIP institution code |

---

### Formatting Rules

- `code` must be a string
- `slug` must be lowercase and hyphen-separated
- `aliases` must be an array of strings
- do not use trailing commas in JSON
- keep banks sorted alphabetically by `name` where practical

---

## Data Source & Verification

When adding or editing data:

- Prefer official bank websites and public directories
- Avoid unverified or scraped data when possible
- If unsure, open an issue first
- Include your data source in the pull request description

---
## Validation Before Opening a PR

Run:

```bash
node scripts/validate-data.js
```

Fix any errors before submitting your pull request.

---

## Pull Request Checklist

Before opening a PR, ensure:

- [ ] I updated `data/index.json` (if adding a new country)
- [ ] JSON is valid
- [ ] Codes are stored as strings
- [ ] Slugs are lowercase and hyphenated
- [ ] I ran `node scripts/validate-data.js`
- [ ] I included data sources or verification notes

---

## Naming Conventions

- Country folders use uppercase ISO codes (`NG`, `KE`, `GH`)
- Logo folders must match country folders (`logos/NG/`)
- Logo file names must match bank slug (`access-bank.png`)

---

## Good First Contributions

- Add missing support emails
- Add missing official websites
- Improve aliases
- Add metadata for a new country
- Fix formatting issues

---

# Thank You

By contributing, you're helping build **open fintech infrastructure for Africa**.

⭐ If you find this project useful, please star the repository and share it with other developers.
