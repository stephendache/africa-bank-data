const BRANDFETCH_CDN = "https://cdn.brandfetch.io";

export function extractDomain(url) {
  if (!url || typeof url !== "string") return null;

  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function buildBrandfetchLogoUrl(domain, { clientId, width, height, theme } = {}) {
  if (!domain || !clientId) return null;

  const params = new URLSearchParams({ c: clientId });
  if (width) params.set("w", String(width));
  if (height) params.set("h", String(height));
  if (theme) params.set("theme", theme);

  return `${BRANDFETCH_CDN}/domain/${domain}?${params.toString()}`;
}

export function resolveBrandDomain(bank, brandsBySlug = new Map()) {
  if (bank.brand_slug && brandsBySlug.has(bank.brand_slug)) {
    return brandsBySlug.get(bank.brand_slug).domain;
  }

  return extractDomain(bank.website);
}

export function getBrandLogoUrl(brand, options = {}) {
  const clientId = options.clientId ?? process.env.BRANDFETCH_CLIENT_ID ?? null;
  return buildBrandfetchLogoUrl(brand?.domain, { ...options, clientId });
}

export function getBankLogoUrl(bank, options = {}) {
  const { brandsBySlug = new Map() } = options;
  const clientId = options.clientId ?? process.env.BRANDFETCH_CLIENT_ID ?? null;
  const domain = resolveBrandDomain(bank, brandsBySlug);
  return buildBrandfetchLogoUrl(domain, { ...options, clientId });
}
