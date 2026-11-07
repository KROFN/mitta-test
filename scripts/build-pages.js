#!/usr/bin/env node
'use strict';

// Static HTML generation from the existing client templates and catalog data.
// No duplicate product database, browser dependency, or backend required.
// Usage:
//   node scripts/build-pages.js
//   SITE_URL=https://your-domain.example node scripts/build-pages.js
// Keep INDEXABLE unset until facts/photos/rights are approved for production.

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'page-template.html'), 'utf8');
const CLIENT = fs.readFileSync(path.join(ROOT, 'assets', 'site.js'), 'utf8');
const APP_MARKER = '<div id="app"></div>';
const compiled = new vm.Script(CLIENT, { filename: 'assets/site.js' });

const rawSiteUrl = (process.env.SITE_URL || '').trim();
const siteUrl = rawSiteUrl ? new URL(rawSiteUrl.endsWith('/') ? rawSiteUrl : rawSiteUrl + '/') : null;
const indexable = process.env.INDEXABLE === '1';
if (siteUrl && siteUrl.protocol !== 'https:') throw new Error('SITE_URL must use HTTPS');
if (indexable && !siteUrl) throw new Error('INDEXABLE=1 requires an approved HTTPS SITE_URL');
if (!TEMPLATE.includes(APP_MARKER)) throw new Error('Invalid page-template.html: missing empty #app');

const productsDir = path.join(ROOT, 'product');
const slugs = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();
const pagePaths = ['', 'catalog', 'store', 'delivery-payment', 'contacts', ...slugs.map(s => `product/${s}`)];

function htmlEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
}
function safeJson(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
function absoluteUrl(relative) {
  return siteUrl ? new URL(String(relative).replace(/^\/+/, ''), siteUrl).href : null;
}
function sitePageUrl(route) {
  return siteUrl ? new URL(route.replace(/^\/+/, ''), siteUrl).href : null;
}
function resourcePath(url, depth) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const suffix = '../'.repeat(depth);
  return suffix + url.slice(1) || './';
}
function rewriteRootRelativeUrls(html, depth) {
  // Relative navigation and media paths work both under / and /mitta-test/.
  return html.replace(/\b(href|src|data-src|poster)=(["'])(\/(?!\/)[^"']*)\2/g,
    (_match, attr, quote, url) => `${attr}=${quote}${resourcePath(url, depth)}${quote}`);
}
function productForRoute(products, route) {
  const slug = route.startsWith('product/') ? route.slice('product/'.length) : null;
  return slug ? products.find(p => p.slug === (slug === 'vendetta' ? 'vendetta-1600' : slug)) : null;
}
function evaluate(route) {
  const pathname = `/${route}${route ? '/' : ''}`;
  const app = { innerHTML: '', dataset: {} };
  let description = '';
  const doc = {
    currentScript: { src: 'https://preview.invalid/assets/site.js' },
    title: '',
    querySelector(selector) {
      return selector === 'meta[name="description"]'
        ? { setAttribute(name, value) { if (name === 'content') description = String(value); } }
        : null;
    },
    getElementById(id) { return id === 'app' ? app : null; },
    querySelectorAll() { return []; }
  };
  const location = {
    href: `https://preview.invalid${pathname}`,
    pathname,
    hash: '',
    search: ''
  };
  const sandbox = vm.createContext({
    document: doc,
    location,
    window: { __MITTA_BUILD__: true },
    URL,
    URLSearchParams,
    Intl
  });
  compiled.runInContext(sandbox, { timeout: 3000 });
  const products = JSON.parse(vm.runInContext('JSON.stringify(products)', sandbox));
  if (!app.innerHTML.includes('<main')) throw new Error(`No rendered <main> for ${pathname}`);
  return { html: app.innerHTML, title: doc.title, description, products };
}

function buildPage(route) {
  const pathname = `/${route}${route ? '/' : ''}`;
  const normalizedPath = `/${route}` || '/';
  const depth = route ? route.split('/').length : 0;
  const data = evaluate(route);
  const product = productForRoute(data.products, route);
  if (route.startsWith('product/') && !product) throw new Error(`Unknown product ${route}`);
  const canonicalRoute = product ? `product/${product.slug}/` : route ? `${route}/` : '';
  const canonical = sitePageUrl(canonicalRoute);
  const photo = product && product.images.length ? product.images[0] : null;
  if (photo) {
    const localPhoto = path.join(ROOT, photo.replace(/^\/+/, ''));
    if (!fs.existsSync(localPhoto)) throw new Error(`Image missing for ${route}: ${photo}`);
  }
  const absolutePhoto = photo ? absoluteUrl(photo) : null;

  const rendered = rewriteRootRelativeUrls(data.html, depth);
  const assetPrefix = '../'.repeat(depth);
  let output = TEMPLATE.replace(/\b(href|src)="(assets\/|favicon\.ico|favicon\.png|apple-touch-icon\.png|site\.webmanifest)/g,
    (_full, attr, res) => `${attr}="${assetPrefix}${res}`);
  output = output.replace(/<title>[\s\S]*?<\/title>/, `<title>${htmlEscape(data.title)}</title>`);
  output = output.replace(/<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${htmlEscape(data.description)}">`);
  if (indexable) output = output.replace('content="noindex,nofollow,noarchive"', 'content="index,follow"');

  const meta = [
    `<meta property="og:type" content="${product ? 'product' : 'website'}">`,
    '<meta property="og:site_name" content="МИТТА">',
    `<meta property="og:title" content="${htmlEscape(data.title)}">`,
    `<meta property="og:description" content="${htmlEscape(data.description)}">`,
    `<meta name="twitter:card" content="${absolutePhoto ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:title" content="${htmlEscape(data.title)}">`
  ];
  if (canonical) {
    meta.push(`<link rel="canonical" href="${htmlEscape(canonical)}">`);
    meta.push(`<meta property="og:url" content="${htmlEscape(canonical)}">`);
  }
  if (absolutePhoto) {
    meta.push(`<meta property="og:image" content="${htmlEscape(absolutePhoto)}">`);
    meta.push(`<meta name="twitter:image" content="${htmlEscape(absolutePhoto)}">`);
  }
  if (product) {
    const structured = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description || product.tagline,
      category: product.cat,
      ...(product.article ? { sku: product.article } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(absolutePhoto ? { image: absolutePhoto } : {})
      // Deliberately omit Offer/price: demo catalog has historical/unverified prices.
    };
    meta.push(`<script type="application/ld+json">${safeJson(structured)}</script>`);
  }
  output = output.replace('</head>', `${meta.join('')}</head>`);
  output = output.replace(APP_MARKER,
    `<div id="app" data-mitta-ssg="${htmlEscape(normalizedPath)}">${rendered}</div>`);
  if (!output.includes('data-mitta-ssg=')) throw new Error(`Missing static body: ${pathname}`);
  const dest = path.join(ROOT, route, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, output, 'utf8');
  return { route: pathname, bytes: Buffer.byteLength(output), product: !!product, photo: !!photo };
}

const outputs = pagePaths.map(buildPage);
console.log(JSON.stringify({
  ok: true,
  count: outputs.length,
  productPages: outputs.filter(p => p.product).length,
  siteUrl: siteUrl ? siteUrl.href : null,
  indexed: indexable,
  pages: outputs
}, null, 2));
