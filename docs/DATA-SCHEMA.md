# Data Schema

## Country index

`data/index.json`

```json
{
  "countries": [
    { "code": "NG", "name": "Nigeria" }
  ]
}
```

## Country metadata

`data/<country-code>/metadata.json`

```json
{
  "country": "NG",
  "country_name": "Nigeria",
  "currency": "NGN",
  "central_bank": "Central Bank of Nigeria",
  "last_updated": "2026-04-01"
}
```

## Country banks

`data/<country-code>/banks.json`

```json
{
  "country": "NG",
  "banks": []
}
```

## Brand registry

`data/brands.json`

```json
{
  "brands": [
    {
      "slug": "ecobank",
      "name": "Ecobank",
      "domain": "ecobank.com"
    }
  ]
}
```

Brand fields:

- `slug`: string, required
- `name`: string, required
- `domain`: string, required — used to build Brandfetch logo URLs at runtime

## Bank fields

- `name`: string, required
- `code`: string, required
- `slug`: string, required
- `brand_slug`: string, optional — links to a shared brand in `data/brands.json`
- `short_name`: string, optional
- `ussd`: string, optional
- `website`: string, optional
- `support_email`: string, optional
- `type`: string, optional
- `aliases`: string[], optional
