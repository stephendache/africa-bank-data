# JS SDK Starter

This is a minimal starter SDK for consuming the local dataset.

## Usage

```js
import {
  getSupportedCountries,
  getBanksByCountry,
  getBrands,
  getBanksByCountryWithLogos,
} from "africa-bank-data";

const countries = getSupportedCountries();
const banks = getBanksByCountry("NG");
const brands = getBrands();

const banksWithLogos = getBanksByCountryWithLogos("NG");
console.log(banksWithLogos[0].logo_url);
```

See [docs/LOGOS.md](../../docs/LOGOS.md) for logo integration details.
