/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing also feeds
 * ChatGPT search, Copilot and DuckDuckGo) that the site's pages changed, so
 * they crawl them within hours instead of weeks. Google does not use IndexNow;
 * submit the sitemap in Google Search Console for Google.
 *
 * Reads the URL list from the live sitemap, so it must run after deployment.
 * The key in public/indexnow-key.txt is public by design: search engines fetch
 * it from the site to confirm the request comes from the site owner.
 *
 * Usage: node scripts/indexnow.mjs   (env SITE_URL overrides the origin)
 */
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = (process.env.SITE_URL ?? 'https://ppsolarenergy.in').replace(/\/$/, '');
const endpoint = 'https://api.indexnow.org/indexnow';
const timeoutMs = 20_000;
const here = dirname(fileURLToPath(import.meta.url));

async function fetchWithTimeout(url, options = {}) {
  return fetch(url, { ...options, signal: AbortSignal.timeout(timeoutMs) });
}

async function main() {
  const key = (await readFile(resolve(here, '../public/indexnow-key.txt'), 'utf8')).trim();
  if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('public/indexnow-key.txt must hold a 32-character hex key.');

  const keyLocation = `${siteUrl}/indexnow-key.txt`;
  const liveKey = await fetchWithTimeout(keyLocation);
  if (!liveKey.ok || (await liveKey.text()).trim() !== key) {
    throw new Error(`${keyLocation} is not live yet or does not match; deploy the site first.`);
  }

  const sitemap = await fetchWithTimeout(`${siteUrl}/sitemap.xml`);
  if (!sitemap.ok) throw new Error(`Could not read ${siteUrl}/sitemap.xml (HTTP ${sitemap.status}).`);
  const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (urlList.length === 0) throw new Error('The sitemap lists no URLs.');

  const response = await fetchWithTimeout(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(siteUrl).host, key, keyLocation, urlList }),
  });
  // 200 = accepted, 202 = accepted and the key will be verified later.
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow rejected the submission (HTTP ${response.status}): ${(await response.text()).slice(0, 300)}`);
  }
  console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
}

main().catch((error) => {
  console.error(`IndexNow submission failed: ${error.message}`);
  process.exitCode = 1;
});
