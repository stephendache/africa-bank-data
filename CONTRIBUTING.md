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

Each country uses the **ISO 3166-1 alpha-2 country code** as the filename.

Example:

```
data/NG.json
data/KE.json
data/GH.json
```

---

# Dataset Format

Each dataset must follow this format:

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

### Required Fields

| Field | Description                 |
| ----- | --------------------------- |
| name  | Official bank name          |
| code  | Bank code used in transfers |
| slug  | URL-friendly identifier     |

### Optional Fields

| Field    | Description            |
| -------- | ---------------------- |
| ussd     | USSD banking code      |
| nip_code | NIP institution code   |
| aliases  | Alternative bank names |

---

# Adding a New Country

1️⃣ Create a new file in `data/` using the **ISO country code**.

Example:

```
data/KE.json
```

2️⃣ Add the banks using the standard format.

3️⃣ Verify that:

* bank names are correct
* bank codes are accurate
* slugs are unique

4️⃣ Submit a Pull Request.

---

# Adding a New Bank

1️⃣ Open the country dataset.

Example:

```
data/NG.json
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
