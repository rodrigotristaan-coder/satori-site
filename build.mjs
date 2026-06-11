// Build de SATORI: concatena satori-shared.jsx + page-*.jsx por pagina,
// transpila el JSX con esbuild y empaqueta React 18 de produccion.
// Ademas inyecta SEO (OG/Twitter/canonical/JSON-LD), genera robots.txt y
// sitemap.xml, y usa nombres con hash para cache inmutable. Salida en dist/.
import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const SRC = 'deploy';
const OUT = 'dist';
const SITE = 'https://satorimkt.com';
const OG_IMAGE = `${SITE}/assets/marketing-ia.png`;

// HTML React -> archivo de pagina + ruta canonica
const PAGES = [
  { html: 'index.html',         jsx: 'page-home.jsx',      path: '/' },
  { html: 'servicios.html',     jsx: 'page-servicios.jsx', path: '/servicios.html' },
  { html: 'proyectos.html',     jsx: 'page-proyectos.jsx', path: '/proyectos.html' },
  { html: 'blog.html',          jsx: 'page-blog.jsx',      path: '/blog.html' },
  { html: 'sobre-rodrigo.html', jsx: 'page-sobre.jsx',     path: '/sobre-rodrigo.html' },
];
const STATIC_HTML = [{ html: 'privacidad.html', path: '/privacidad.html' }];

const hash8 = (s) => createHash('sha256').update(s).digest('hex').slice(0, 8);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// --- limpiar dist/ ---
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'js'), { recursive: true });
cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
cpSync(join(SRC, 'favicon.ico'), join(OUT, 'favicon.ico'));

// --- CSS con hash (cache inmutable) ---
const cssRaw = readFileSync(join(SRC, 'satori-shared.css'), 'utf8');
const cssName = `satori-shared.${hash8(cssRaw)}.css`;
writeFileSync(join(OUT, cssName), cssRaw);

const stripReactHooks = (code) => code.replace(/const\s*\{[^}]*\}\s*=\s*React\s*;?/g, '');
const shared = stripReactHooks(readFileSync(join(SRC, 'satori-shared.jsx'), 'utf8'));

// Extrae title/description del shell para construir el SEO
const meta = (html) => ({
  title: (html.match(/<title>([\s\S]*?)<\/title>/) || [, 'SATORI'])[1].trim(),
  desc: (html.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1].trim(),
});

// Bloque SEO por pagina (OG + Twitter + canonical) y, en home, JSON-LD
function seoBlock({ title, desc, url, isHome }) {
  const jsonld = isHome ? `
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'SATORI', url: SITE, logo: `${SITE}/assets/logo-satori.png`,
        sameAs: ['https://www.instagram.com/hola.satori/', 'https://www.facebook.com/profile.php?id=61589907217774'] },
      { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'SATORI', publisher: { '@id': `${SITE}/#org` },
        inLanguage: 'es-MX' },
    ],
  })}</script>` : '';
  return `
<link rel="canonical" href="${esc(url)}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="SATORI"/>
<meta property="og:locale" content="es_MX"/>
<meta property="og:locale:alternate" content="en_US"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(desc)}"/>
<meta property="og:url" content="${esc(url)}"/>
<meta property="og:image" content="${esc(OG_IMAGE)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(title)}"/>
<meta name="twitter:description" content="${esc(desc)}"/>
<meta name="twitter:image" content="${esc(OG_IMAGE)}"/>${jsonld}
`;
}

// Inyecta el bloque SEO en <head>, quitando og/twitter/canonical previos
function injectSeo(html, info) {
  html = html
    .replace(/\s*<meta property="og:[^>]*>/g, '')
    .replace(/\s*<meta name="twitter:[^>]*>/g, '')
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    .replace(/\s*<link rel="stylesheet" href="satori-shared\.css"\/?>/g, `\n<link rel="stylesheet" href="${cssName}"/>`);
  return html.replace('</head>', `${seoBlock(info)}</head>`);
}

for (const p of PAGES) {
  const pageCode = stripReactHooks(readFileSync(join(SRC, p.jsx), 'utf8'));
  const entry = [
    `import * as React from 'react';`,
    `import * as ReactDOM from 'react-dom/client';`,
    `const { useState, useEffect, useRef, useMemo, useCallback } = React;`,
    shared, pageCode,
  ].join('\n');

  const built = await esbuild.build({
    stdin: { contents: entry, resolveDir: process.cwd(), loader: 'jsx', sourcefile: p.jsx },
    bundle: true, minify: true, format: 'iife', target: ['es2019'],
    jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
    write: false, logLevel: 'silent',
  });
  const jsCode = built.outputFiles[0].text;
  const jsName = `${p.jsx.replace(/\.jsx$/, '')}.${hash8(jsCode)}.js`;
  writeFileSync(join(OUT, 'js', jsName), jsCode);

  let html = readFileSync(join(SRC, p.html), 'utf8');
  html = html
    .replace(/<script[^>]*unpkg\.com[^>]*><\/script>\s*/g, '')
    .replace(/<script type="text\/babel"[^>]*><\/script>\s*/g, '')
    .replace('</body>', `<script src="js/${jsName}"></script>\n</body>`);
  html = injectSeo(html, { title: meta(html).title, desc: meta(html).desc, url: SITE + p.path, isHome: p.path === '/' });
  writeFileSync(join(OUT, p.html), html);
  console.log(`  ✓ ${p.html}  ->  js/${jsName}`);
}

// HTML estatico (privacidad): canonica + css con hash
for (const s of STATIC_HTML) {
  let html = readFileSync(join(SRC, s.html), 'utf8');
  html = injectSeo(html, { title: meta(html).title, desc: meta(html).desc, url: SITE + s.path, isHome: false });
  writeFileSync(join(OUT, s.html), html);
  console.log(`  ✓ ${s.html} (estatico)`);
}

// robots.txt + sitemap.xml
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const urls = [...PAGES.map(p => p.path), ...STATIC_HTML.map(s => s.path)];
writeFileSync(join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc>${u === '/' ? '<priority>1.0</priority>' : ''}</url>`).join('\n') +
  `\n</urlset>\n`);

console.log('  ✓ robots.txt + sitemap.xml');
console.log('Build OK -> dist/');
