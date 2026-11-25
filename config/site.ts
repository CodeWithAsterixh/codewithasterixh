const configuredSiteUrl = process.env.NEXT_PUBLIC_URL;

if (!configuredSiteUrl) {
  throw new Error('NEXT_PUBLIC_URL must be set');
}

export const siteUrl = new URL(configuredSiteUrl).origin;
export const siteDomain = new URL(siteUrl).host;
