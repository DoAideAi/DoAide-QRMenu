#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * Post-build script that injects SEO-critical HTML into dist/index.html
 * so that crawlers see real content instead of an empty <div id="root">.
 *
 * What it adds inside <div id="root">:
 *   - Visible <h1> matching routeMeta
 *   - <noscript> fallback with feature summary
 *   - Hidden semantic content for crawlers
 *
 * The React app hydrates over this content on load — the injected HTML
 * is replaced as soon as JS runs, so users see no flash.
 *
 * Usage:  node scripts/prerender-routes.mjs
 * Run after: vite build
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '..', 'dist');

// Inline routeMeta to avoid import issues with .js extension in ESM
const BASE_URL = 'https://qrmenu.doaide.com';

const routeMeta = {
  '/': {
    title: 'DoAide QRMenu — Free Digital Menu Maker for Restaurants',
    description:
      'DoAide QRMenu — Free digital menu maker for restaurants. Create QR code menus instantly with 12+ themes, WhatsApp sharing, and PDF export. No signup required.',
    canonical: `${BASE_URL}/`,
    h1: 'DoAide QRMenu — Free Digital Menu Maker',
    ogImage: `${BASE_URL}/og-image.png`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide QRMenu',
      url: `${BASE_URL}/`,
      description:
        'Free digital menu maker for restaurants. Create QR code menus instantly with 12+ themes, WhatsApp sharing, and PDF export. No signup required.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      author: {
        '@type': 'Organization',
        name: 'DoAide',
        url: 'https://doaide.com',
      },
      featureList: [
        'QR code menu generation',
        '12+ restaurant themes',
        'PDF menu export',
        'WhatsApp menu sharing',
        'Veg/Non-veg indicators',
        'Multi-language support (English, Hindi)',
        'No signup required',
      ],
    },
  },
};

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function prerenderRoute(html, route) {
  const meta = routeMeta[route];
  if (!meta) {
    console.warn(`No routeMeta for ${route}, skipping.`);
    return html;
  }

  // Build the prerendered inner HTML for <div id="root">
  const prerenderedContent = `
    <div id="seo-shell" style="font-family:system-ui,sans-serif;background:#1a1a2e;color:#e8e8e8;min-height:100vh;">
      <header style="text-align:center;padding:48px 16px 24px;">
        <h1 style="font-size:2.5rem;font-weight:700;margin:0;">
          <span style="color:#0D9488;">DoAide</span>
          <span style="color:#6b7280;margin:0 8px;">|</span>
          <span style="color:#fff;">QRMenu</span>
        </h1>
        <p style="font-size:1.25rem;color:#9ca3af;margin:12px 0 0;">Free Digital Menu Maker for Restaurants</p>
        <p style="color:#6b7280;margin:8px auto 0;max-width:480px;">
          Create beautiful QR code menus instantly — no signup required.
          12+ themes, WhatsApp sharing, PDF export.
        </p>
      </header>
      <main style="max-width:640px;margin:0 auto;padding:0 16px 48px;">
        <section>
          <h2 style="color:#0D9488;font-size:1.25rem;margin:24px 0 12px;">Features</h2>
          <ul style="list-style:none;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <li style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
              <strong>No Signup Needed</strong><br/><span style="color:#9ca3af;font-size:0.875rem;">Start building your menu instantly</span>
            </li>
            <li style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
              <strong>10+ Beautiful Themes</strong><br/><span style="color:#9ca3af;font-size:0.875rem;">Match your restaurant's vibe</span>
            </li>
            <li style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
              <strong>Instant QR Code</strong><br/><span style="color:#9ca3af;font-size:0.875rem;">Print and place on tables</span>
            </li>
            <li style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
              <strong>Share Anywhere</strong><br/><span style="color:#9ca3af;font-size:0.875rem;">WhatsApp, PDF, or web link</span>
            </li>
          </ul>
        </section>
      </main>
      <noscript>
        <div style="text-align:center;padding:24px;background:#0D9488;color:#fff;">
          <p><strong>DoAide QRMenu</strong> requires JavaScript to create and preview menus.</p>
          <p>Please enable JavaScript in your browser to use this free digital menu maker.</p>
        </div>
      </noscript>
    </div>`.trim();

  // Inject prerendered content into <div id="root">
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderedContent}</div>`
  );

  console.log(`  Prerendered ${route}`);
  return html;
}

// --- Main ---
console.log('Prerendering routes...');
const indexPath = resolve(DIST, 'index.html');
let html = readFileSync(indexPath, 'utf-8');

for (const route of Object.keys(routeMeta)) {
  html = prerenderRoute(html, route);
}

writeFileSync(indexPath, html, 'utf-8');
console.log(`Done. Wrote ${indexPath}`);
