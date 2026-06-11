// Build de SATORI: concatena satori-shared.jsx + page-*.jsx por pagina,
// transpila el JSX con esbuild y empaqueta React 18 de produccion.
// Resultado en dist/ — sin Babel en el navegador, sin React de desarrollo.
import esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'deploy';
const OUT = 'dist';

// HTML React -> su archivo de pagina
const PAGES = [
  { html: 'index.html',        jsx: 'page-home.jsx' },
  { html: 'servicios.html',    jsx: 'page-servicios.jsx' },
  { html: 'proyectos.html',    jsx: 'page-proyectos.jsx' },
  { html: 'blog.html',         jsx: 'page-blog.jsx' },
  { html: 'sobre-rodrigo.html', jsx: 'page-sobre.jsx' },
];

// HTML estatico (sin React) que solo se copia
const STATIC_HTML = ['privacidad.html'];

// --- limpiar y preparar dist/ ---
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'js'), { recursive: true });

// --- copiar estaticos ---
cpSync(join(SRC, 'assets'), join(OUT, 'assets'), { recursive: true });
cpSync(join(SRC, 'satori-shared.css'), join(OUT, 'satori-shared.css'));
cpSync(join(SRC, 'favicon.ico'), join(OUT, 'favicon.ico'));
for (const h of STATIC_HTML) cpSync(join(SRC, h), join(OUT, h));

// Los archivos repiten `const { useState, ... } = React;` (uno por <script>).
// En un solo modulo eso es redeclaracion: lo quitamos y declaramos los hooks
// una vez en el preambulo. No se tocan los archivos originales en disco.
const stripReactHooks = (code) => code.replace(/const\s*\{[^}]*\}\s*=\s*React\s*;?/g, '');
const shared = stripReactHooks(readFileSync(join(SRC, 'satori-shared.jsx'), 'utf8'));

for (const p of PAGES) {
  const pageCode = stripReactHooks(readFileSync(join(SRC, p.jsx), 'utf8'));

  // Entry: React/ReactDOM como en el navegador (React global), luego shared + pagina
  // en un mismo ambito (igual que los <script> compartian scope).
  const entry = [
    `import * as React from 'react';`,
    `import * as ReactDOM from 'react-dom/client';`,
    `const { useState, useEffect, useRef, useMemo, useCallback } = React;`,
    shared,
    pageCode,
  ].join('\n');

  const outName = p.jsx.replace(/\.jsx$/, '.js');
  await esbuild.build({
    stdin: { contents: entry, resolveDir: process.cwd(), loader: 'jsx', sourcefile: p.jsx },
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2019'],
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    outfile: join(OUT, 'js', outName),
    logLevel: 'info',
  });

  // HTML: quitar React dev + ReactDOM dev + Babel + los <script babel>,
  // y dejar un solo bundle de produccion.
  let html = readFileSync(join(SRC, p.html), 'utf8');
  html = html
    .replace(/<script[^>]*unpkg\.com[^>]*><\/script>\s*/g, '')      // react/reactdom/babel CDN
    .replace(/<script type="text\/babel"[^>]*><\/script>\s*/g, '')   // shared + page babel
    .replace('</body>', `<script src="js/${outName}"></script>\n</body>`);
  writeFileSync(join(OUT, p.html), html);
  console.log(`  ✓ ${p.html}  ->  js/${outName}`);
}

console.log('Build OK -> dist/');
