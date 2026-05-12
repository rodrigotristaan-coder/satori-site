# SATORI — Sitio web (deploy)

Listo para publicar. HTML estático + React vía CDN. **No requiere build.**

```
deploy/
├── index.html              ← landing principal
├── privacidad.html         ← Aviso de Privacidad (ES/EN, noindex)
├── components-v5.jsx       ← componentes React
├── tweaks-panel.jsx        ← panel de ajustes (opcional, puedes borrarlo)
├── favicon.ico
└── assets/
    ├── enso.png · enso-blanco.png
    ├── logo.png
    ├── marca-propia.png
    ├── marketing-ia.png
    ├── mexico.svg
    ├── posicionamiento.png
    ├── rodrigo.png
    └── whatsapp.png
```

## Publicar

**Vercel / Netlify / GitHub Pages / Hostinger / cualquier hosting estático:**
sube TODO el contenido de `deploy/` a la raíz del sitio.

**Vercel CLI:**
```bash
cd deploy
vercel --prod
```

## Páginas

- `/` → `index.html` (landing bilingüe)
- `/privacidad.html` → Aviso de Privacidad ES/EN (LFPDPPP México, `noindex`)

## Contacto / enlaces (editables en `components-v5.jsx`)

- WhatsApp: `+52 56 2501 8281`
- Calendly: `https://calendly.com/rodrigo-tristaan`
- Email: `hola@satorimkt.com`

## Pendientes recomendados antes de tráfico pagado

1. **Google Analytics 4** — pegar `gtag.js` en el `<head>` de `index.html` y `privacidad.html`.
2. **Google Ads** — pegar tag global + tag de conversiones (botones WhatsApp / Calendly / mailto).
3. **Banner de consentimiento de cookies** — recomendado antes de cargar GA4/Ads (Consent Mode v2).
4. **Sitemap + robots.txt** — incluir `index.html`; excluir `privacidad.html` del sitemap (ya tiene `noindex`).
