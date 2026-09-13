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
* Adding or updating brand entries for logo support
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
│   ├── brands.json
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
├── packages/
│   └── js-sdk/
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

Each country has its own folder named with the **ISO 3166-1 alpha-2 country code**. Each folder contains a `banks.json` file (the bank records) and a `metadata.json` file (country details). The list of supported countries is tracked in `data/index.json`.
Each country uses the **ISO 3166-1 alpha-2 country code** as its folder name.

Example:

```
data/NG/banks.json
data/NG/metadata.json
data/KE/banks.json
data/KE/metadata.json
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

Each `data/<country-code>/banks.json` file must follow this format:
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

The `country` value must match the folder's country code.
## Rules for data contributions

### Required Fields

| Field | Description                 |
| ----- | --------------------------- |
| name  | Official bank name          |
| code  | Bank code used in transfers |
| slug  | URL-friendly identifier     |

### Optional Fields

| Field         | Description                              |
| ------------- | ---------------------------------------- |
| short_name    | Short display name                       |
| ussd          | USSD banking code                        |
| website       | Official institution website            |
| support_email | Public support email                     |
| type          | Institution type, e.g. `commercial`      |
| aliases       | Alternative names or search aliases      |

---

# Adding a New Country

1️⃣ Create a new folder in `data/` named with the **ISO country code**, and add a `banks.json` and a `metadata.json` file inside it.

Example:

```
data/KE/banks.json
data/KE/metadata.json
```

2️⃣ Add the banks to `banks.json` using the standard format, and fill in `metadata.json`.

3️⃣ Add the country to `data/index.json`.

4️⃣ Verify that:

* bank names are correct
* bank codes are accurate
* slugs are unique

5️⃣ Run `node scripts/validate-data.js` and make sure it passes.

6️⃣ Submit a Pull Request.
| Field       | Description                                      |
| ----------- | ------------------------------------------------ |
| brand_slug  | Shared brand identifier from `data/brands.json`    |
| ussd        | USSD banking code                                |
| nip_code    | NIP institution code                             |
| aliases     | Alternative bank names                           |

### Brand and logo fields

1️⃣ Open the country dataset.

Example:

```
data/NG/banks.json
```

2️⃣ Add the bank inside the `banks` array.
Banks that share a corporate identity across countries should use the same `brand_slug` and point to a single entry in `data/brands.json`. Logo URLs are built at runtime from the brand `domain` using Brandfetch.

Example:

```json
{
  "name": "Ecobank Ghana",
  "slug": "ecobank-ghana",
  "brand_slug": "ecobank"
}
```

Do not commit Brandfetch client IDs to the repository. See [docs/LOGOS.md](./docs/LOGOS.md) for the full guide.
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

# Submitting a Pull Request

1️⃣ Fork the repository
2️⃣ Create a new branch

```
git checkout -b add-ghana-banks
```

3️⃣ Make your changes

4️⃣ Commit your changes

```
git commit -m "Add Ghana banks dataset"
```

5️⃣ Push your branch

```
git push origin add-ghana-banks
```

6️⃣ Open a Pull Request

Please include a short explanation of the change.

---

# Reporting Issues

If you find incorrect or missing data, please open an issue.

Include:

* the country
* the bank name
* the incorrect field
* the correct information if available

---

# Good First Contributions

If you're new to open source, try these:

* add banks for your country
* fix incorrect slugs
* add missing USSD codes
* improve documentation
* add brand entries in `data/brands.json`

Look for issues labeled:

```
good first issue
help wanted
```

---

# Code of Conduct

We want Africa Bank Data to be **welcoming and inclusive**.

Please:
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
