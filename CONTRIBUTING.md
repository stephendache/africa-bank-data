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

Example:

```
data/NG/banks.json
data/NG/metadata.json
data/KE/banks.json
data/KE/metadata.json
```

---

# Dataset Format

Each `data/<country-code>/banks.json` file must follow this format:

```json
{
  "country": "NG",
  "banks": [
    {
      "name": "Access Bank",
      "code": "044",
      "slug": "access-bank",
      "ussd": "*901#"
    }
  ]
}
```

The `country` value must match the folder's country code.

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

---

# Adding a New Bank

1️⃣ Open the country dataset.

Example:

```
data/NG/banks.json
```

2️⃣ Add the bank inside the `banks` array.

Example:

```json
{
  "name": "PremiumTrust Bank",
  "code": "105",
  "slug": "premiumtrust-bank"
}
```

3️⃣ Submit a Pull Request.

---

# Naming Conventions

Please follow these rules.

### Slug format

Use lowercase and hyphens.

Correct:

```
first-bank
access-bank
zenith-bank
```

Incorrect:

```
FirstBank
first_bank
first bank
```

---

# Data Accuracy

Before submitting data, please verify it using trusted sources such as:

* central bank directories
* official bank websites
* payment infrastructure providers
* reputable fintech APIs

Avoid guessing or using outdated information.

If you're unsure about a field, open an issue instead.

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
* add logos

Look for issues labeled:

```
good first issue
help wanted
```

---

# Code of Conduct

We want Africa Bank Data to be **welcoming and inclusive**.

Please:

* be respectful
* be constructive
* support new contributors
* focus on improving the dataset

---

# Maintainers

Maintained by contributors across the African developer community.

---

# Thank You

By contributing, you're helping build **open fintech infrastructure for Africa**.

⭐ If you find this project useful, please star the repository and share it with other developers.
