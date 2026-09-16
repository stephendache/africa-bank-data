import express from "express";
import {
  getSupportedCountries,
  getBanksByCountry,
} from "../../packages/js-sdk/src/index.js";

const app = express();
const port = process.env.PORT || 3000;
const dataRoot = path.resolve(process.cwd(), "../data");
const clientId = process.env.BRANDFETCH_CLIENT_ID ?? null;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getBrandsIndex() {
  const brands = readJson(path.join(dataRoot, "brands.json")).brands;
  return new Map(brands.map((brand) => [brand.slug, brand]));
}

function buildLogoUrl(domain) {
  if (!domain || !clientId) return null;
  return `https://cdn.brandfetch.io/domain/${domain}?c=${encodeURIComponent(clientId)}`;
}

function resolveBrandDomain(bank, brandsBySlug) {
  if (bank.brand_slug && brandsBySlug.has(bank.brand_slug)) {
    return brandsBySlug.get(bank.brand_slug).domain;
  }

  if (!bank.website) return null;

  try {
    const { hostname } = new URL(bank.website);
    return hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function enrichBank(bank, brandsBySlug) {
  const brand = bank.brand_slug ? brandsBySlug.get(bank.brand_slug) ?? null : null;
  const brandDomain = resolveBrandDomain(bank, brandsBySlug);
  const logoUrl = buildLogoUrl(brandDomain);

  return {
    ...bank,
    brand_domain: brandDomain,
    logo_url: logoUrl,
    brand: brand
      ? {
          slug: brand.slug,
          name: brand.name,
          domain: brand.domain,
          logo_url: buildLogoUrl(brand.domain),
        }
      : null,
  };
}

app.get("/countries", (_req, res) => {
  const data = readJson(path.join(dataRoot, "index.json"));
  res.json(data);
});

app.get("/brands", (_req, res) => {
  const data = readJson(path.join(dataRoot, "brands.json"));
  const brands = data.brands.map((brand) => ({
    ...brand,
    logo_url: buildLogoUrl(brand.domain),
  }));

  res.json({ brands });
});

app.get("/banks", (req, res) => {
  const country = String(req.query.country || "NG").toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) {
    return res.status(400).json({ error: `Invalid country code '${country}'` });
  }
  const isSupported = getSupportedCountries().some((c) => c.code === country);
  if (!isSupported) {
    return res.status(404).json({ error: `No data for country '${country}'` });
  }
  res.json({ country, banks: getBanksByCountry(country) });
});

app.listen(port, () => console.log(`Africa Bank Data API running on :${port}`));
  const data = readJson(file);
  const brandsBySlug = getBrandsIndex();

  res.json({
    country: data.country,
    banks: data.banks.map((bank) => enrichBank(bank, brandsBySlug)),
  });
});

app.listen(3000, () => {
  console.log("Africa Bank Data API running on :3000");
  if (!clientId) {
    console.log("Set BRANDFETCH_CLIENT_ID to include logo_url in API responses.");
  }
});
