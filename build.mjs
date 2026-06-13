// Build de SATORI: concatena satori-shared.jsx + page-*.jsx por pagina,
// transpila el JSX con esbuild y empaqueta React 18 de produccion.
// Ademas inyecta SEO (OG/Twitter/canonical/JSON-LD), genera robots.txt y
// sitemap.xml, y usa nombres con hash para cache inmutable. Salida en dist/.
import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SRC = 'deploy';
const OUT = 'dist';
const SITE = 'https://satorimkt.com';
const OG_IMAGE = `${SITE}/assets/og-cover.jpg`;

// Google Ads / gtag — se inyecta en TODAS las paginas (antes solo en privacidad)
const GTAG_ID = 'AW-18155927624';
const GTAG_INLINE = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GTAG_ID}');`;
const GTAG = `<script async src="https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}"></script>\n<script>${GTAG_INLINE}</script>\n`;

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

// ---- PRE-RENDER (SSG) ----
// Shims minimos del navegador para que renderToStaticMarkup no truene al leer
// window/document/localStorage en los inicializadores. Los efectos (useEffect)
// NO corren en el render servidor, asi que canvas/animaciones no se tocan aqui.
const noopMQ = () => ({ matches: false, media: '', onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; } });
global.localStorage = { getItem: () => null, setItem() {}, removeItem() {}, clear() {} };
global.window = {
  innerWidth: 1366, innerHeight: 768, devicePixelRatio: 1, scrollY: 0, pageYOffset: 0,
  location: { href: SITE + '/', origin: SITE, pathname: '/', search: '', hash: '' },
  localStorage: global.localStorage, matchMedia: noopMQ,
  scrollTo() {}, scrollBy() {}, addEventListener() {}, removeEventListener() {},
  requestAnimationFrame: () => 0, cancelAnimationFrame() {},
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
};
const styleObj = () => new Proxy({}, { get: () => '', set: () => true });
global.document = {
  getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
  createElement: () => ({ style: styleObj(), setAttribute() {}, appendChild() {}, getContext: () => null, classList: { add() {}, remove() {} } }),
  addEventListener() {}, removeEventListener() {}, cookie: '',
  documentElement: { style: styleObj(), classList: { add() {}, remove() {}, toggle() {}, contains: () => false }, scrollTop: 0 },
  body: { style: styleObj(), classList: { add() {}, remove() {} }, appendChild() {} },
  head: { appendChild() {} },
};
global.matchMedia = noopMQ;
global.requestAnimationFrame = () => 0;
global.cancelAnimationFrame = () => {};

const SSR_DIR = join(OUT, '.ssr');
mkdirSync(SSR_DIR, { recursive: true });

// Renderiza una pagina a HTML estatico. Devuelve '' si algo falla (fallback seguro).
async function prerender(pageCode, jsxName) {
  try {
    const serverCode = pageCode.replace(/ReactDOM\.createRoot\([\s\S]*?\)\.render\([\s\S]*?\);?/, '');
    const entry = [
      `import * as React from 'react';`,
      `import * as ReactDOMServer from 'react-dom/server';`,
      `const { useState, useEffect, useRef, useMemo, useCallback } = React;`,
      shared, serverCode,
      `globalThis.__SSR_HTML__ = ReactDOMServer.renderToStaticMarkup(React.createElement(App));`,
    ].join('\n');
    const built = await esbuild.build({
      stdin: { contents: entry, resolveDir: process.cwd(), loader: 'jsx', sourcefile: jsxName },
      bundle: true, format: 'esm', platform: 'node', target: ['node18'],
      external: ['react', 'react-dom', 'react-dom/server'],
      jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment',
      write: false, logLevel: 'silent',
    });
    const tmp = join(SSR_DIR, jsxName.replace(/\.jsx$/, '.mjs'));
    writeFileSync(tmp, built.outputFiles[0].text);
    globalThis.__SSR_HTML__ = '';
    await import(pathToFileURL(tmp).href);
    return globalThis.__SSR_HTML__ || '';
  } catch (e) {
    console.log(`  ⚠ pre-render de ${jsxName} falló (queda CSR): ${e.message.split('\n')[0]}`);
    return '';
  }
}

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
  html = html.replace('</head>', `${GTAG}</head>`); // Google Ads en todas las paginas

  // Pre-render: inyecta el HTML real en #root (el cliente luego re-monta)
  const ssr = await prerender(pageCode, p.jsx);
  if (ssr) html = html.replace('<div id="root"></div>', () => `<div id="root">${ssr}</div>`);
  writeFileSync(join(OUT, p.html), html);
  console.log(`  ✓ ${p.html}  ->  js/${jsName}${ssr ? `  (pre-render ${(ssr.length / 1024).toFixed(0)}KB)` : ''}`);
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

rmSync(SSR_DIR, { recursive: true, force: true });
console.log('  ✓ robots.txt + sitemap.xml');
console.log('Build OK -> dist/');
