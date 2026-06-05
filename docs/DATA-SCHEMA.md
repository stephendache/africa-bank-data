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

## Bank fields

- `name`: string, required
- `code`: string, required
- `slug`: string, required
- `short_name`: string, optional
- `ussd`: string, optional
- `website`: string, optional
- `support_email`: string, optional
- `type`: string, optional
- `aliases`: string[], optional

## Bank logos

Optional logos may be added under `logos/<country-code>/`.
Use the bank slug for the filename, for example:


```json
{
  "logos": [
    "logos/GH/absa-bank-ghana.png",
    "logos/GH/standard-chartered-bank-ghana.svg"
  ]
}
```
