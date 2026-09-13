# Bank Logos

Logos are resolved through the [Brandfetch Logo API](https://docs.brandfetch.com/logo-api/overview) using each brand's canonical `domain`. The dataset stores domains only — never your client ID.

## Why not store logo files or URLs in git?

Brandfetch is designed for **hotlinking**, not bulk downloading. Their usage guidelines prohibit programmatic scraping of logo images. That means the safe options are:

1. Keep `domain` in the dataset and resolve logos at runtime
2. Keep the client ID in server environment variables, not in committed files

## Data model

### `data/brands.json`

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

### Bank `brand_slug`

```json
{
  "name": "Ecobank Nigeria",
  "slug": "ecobank-nigeria",
  "brand_slug": "ecobank",
  "website": "https://www.ecobank.com/ng/personal-banking"
}
```

Ecobank Nigeria and Ecobank Ghana both use `brand_slug: "ecobank"` and resolve to the same domain.

## Option 1: Use the starter API (recommended for apps)

Put your client ID in the API environment only:

```bash
# api/.env
BRANDFETCH_CLIENT_ID=your-client-id
```

```bash
cd api
npm install
npm start
```

```bash
curl "http://localhost:3000/banks?country=NG"
```

The API builds `logo_url` server-side. Your client ID never appears in the repository.

## Option 2: Use the SDK with your own client ID

Each developer can register for a free Brandfetch client ID and pass it at runtime:

```js
import { getBanksByCountryWithLogos } from "africa-bank-data";

const banks = getBanksByCountryWithLogos("NG", {
  clientId: process.env.BRANDFETCH_CLIENT_ID,
});

console.log(banks[0].logo_url);
// https://cdn.brandfetch.io/domain/accessbankplc.com?c=...
```

Or set `BRANDFETCH_CLIENT_ID` in your environment and omit the option.

## Option 3: Build the URL yourself

```js
const logoUrl = `https://cdn.brandfetch.io/domain/${brand.domain}?c=${clientId}`;
```

Use the result directly in an `<img>` tag. Brandfetch requires logos to be embedded, not scraped.

## Getting a client ID

Register for free at the [Brandfetch Developer Portal](https://developers.brandfetch.com/register).

- Store it in `.env` (gitignored)
- Never commit it to `data/brands.json` or any tracked file
- For production APIs, use your hosting provider's secret manager

## Fallback behavior

If no client ID is available, `logo_url` will be `null`. Applications should render a placeholder such as bank initials.
