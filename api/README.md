# Starter API

This folder contains a small starter API for reading the dataset.

## Run

```bash
npm install
```

Create `api/.env`:

```bash
BRANDFETCH_CLIENT_ID=your-client-id
```

```bash
npm start
```

## Endpoints

- `GET /countries` — list supported countries
- `GET /brands` — list shared brand registry with `logo_url` when `BRANDFETCH_CLIENT_ID` is set
- `GET /banks?country=NG` — list banks for a country, including `logo_url` per bank

The client ID is read from the environment only and is never stored in the dataset.

See [docs/LOGOS.md](../docs/LOGOS.md) for logo integration details.
