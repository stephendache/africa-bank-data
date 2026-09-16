# Contributing

You can contribute by adding a new country, updating or correcting bank records, improving the validation scripts, or fixing the docs. Single-country fixes are welcome.

## Project structure

See the [repository structure](./README.md#repository-structure) in the README.

All datasets live in `data/`. Each country has a folder named with its ISO 3166-1 alpha-2 code, containing `banks.json` (the bank records) and `metadata.json` (country details). Supported countries are listed in `data/index.json`.

## Dataset format

Each `data/<country-code>/banks.json` file looks like this:

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

The `country` value must match the folder name. See [`docs/DATA-SCHEMA.md`](./docs/DATA-SCHEMA.md) for all required and optional fields.

## Adding a country

1. Create `data/<CODE>/` with `banks.json` and `metadata.json`.
2. Add the banks and fill in the metadata.
3. Add the country to `data/index.json`.
4. Run `node scripts/validate-data.js` and make sure it passes.
5. Open a pull request.

## Adding a bank

Add an entry to the `banks` array in the country's `data/<CODE>/banks.json`:

```json
{
  "name": "PremiumTrust Bank",
  "code": "105",
  "slug": "premiumtrust-bank"
}
```

## Naming conventions

Slugs use lowercase letters and hyphens: `first-bank`, not `FirstBank`, `first_bank`, or `first bank`.

## Data quality rules

- use the official or widely accepted public name
- store codes as strings, not numbers
- keep slugs lowercase and hyphenated
- link to the official institution domain when available
- use public-facing support emails only
- omit optional fields you can't verify
- keep the JSON valid and formatted

## Data accuracy

Verify entries against trusted sources such as central bank directories and official bank websites. Don't guess or use outdated information. If you're unsure about a field, open an issue instead.

## Submitting a pull request

1. Fork the repo and create a branch.
2. Make and commit your changes.
3. Push the branch and open a pull request with a short description.

## Reporting issues

Open an issue for incorrect or missing data. Include the country, the bank name, the wrong field, and the correct value if you have it.

## Code of conduct

Please read and follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
