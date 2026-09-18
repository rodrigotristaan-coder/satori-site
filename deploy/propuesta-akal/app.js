  // Idioma
  const root = document.documentElement;
  function setLang(l) {
    root.dataset.lang = l; root.lang = l;
    document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.setLang === l));
    document.querySelectorAll('[data-ph-' + l + ']').forEach(i => i.placeholder = i.dataset['ph' + l.charAt(0).toUpperCase() + l.slice(1)]);
    try { localStorage.setItem('akal-lang', l); } catch (e) {}
  }
  document.querySelectorAll('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)));
  try { const saved = localStorage.getItem('akal-lang'); if (saved) setLang(saved); } catch (e) {}

  // Caminos: una faceta abierta a la vez
  const paths = [...document.querySelectorAll('.path')];
  function openPath(p) {
    paths.forEach(x => {
      const on = x === p;
      x.classList.toggle('open', on);
      x.querySelector('.path-tab').setAttribute('aria-expanded', on);
    });
  }
  paths.forEach(p => p.querySelector('.path-tab').addEventListener('click', () => openPath(p)));

  // Formulario de ejemplo
  document.getElementById('join').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    f.querySelector('.row').hidden = true; f.querySelector('.consent').hidden = true;
    f.querySelector('.done').hidden = false;
  });
