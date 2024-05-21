export const DOMAIN_URL: 'https://tyeon-portfolio.vercel.app' = JSON.parse(
  JSON.stringify(process.env.domainURL)
);

export const BASE64_PLACEHOLDER: `data:image/${string}` = JSON.parse(
  JSON.stringify(process.env.base64Placeholder)
);
