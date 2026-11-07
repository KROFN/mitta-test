#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const productRoutes = fs.readdirSync(path.join(root, 'product'), { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => `product/${dir.name}`);
const routes = ['', 'catalog', 'store', 'delivery-payment', 'contacts', ...productRoutes];
const publicUrl = process.env.SITE_URL?.replace(/\/+$/, '') || null;
let count = 0;

for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const marker = '/' + route;
  assert.match(html, new RegExp(`data-mitta-ssg="${marker || '/'}"`));
  assert.match(html, /<main\b/);
  assert.match(html, /<h1\b/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+">/);
  assert.match(html, /<meta property="og:title" content="[^"]+">/);
  assert.match(html, /<meta property="og:description" content="[^"]+">/);
  assert.match(html, /<link rel="stylesheet" href="[^"]*assets\/site.css">/);
  assert.match(html, /<script src="[^"]*assets\/site.js"><\/script>/);
  // Links and local images must not escape a GitHub Pages subpath.
  assert.doesNotMatch(html, /\b(?:href|src|data-src)="\/(?!\/)/);
  if (!process.env.INDEXABLE) assert.match(html, /content="noindex,nofollow,noarchive"/);
  if (route.startsWith('product/')) {
    const match = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
    assert.ok(match, `${route}: missing Product JSON-LD`);
    const product = JSON.parse(match[1]);
    assert.equal(product['@type'], 'Product');
    assert.ok(product.name && product.description);
    if (!publicUrl) {
      assert.doesNotMatch(html, /rel="canonical"/);
      assert.doesNotMatch(html, /property="og:image"/);
    } else {
      assert.match(html, /rel="canonical"/);
      assert.ok(html.includes(`https://`), `${route}: URL must be absolute`);
      const canonicalSlug = route === 'product/vendetta' ? 'vendetta-1600' : route.slice(8);
      assert.ok(html.includes(`href="${publicUrl}/product/${canonicalSlug}/"`), `${route}: wrong canonical`);
    }
  }
  count++;
}
console.log(`PASS: ${count} pages (${productRoutes.length} product routes), static content, metadata, local links and JSON-LD`);
