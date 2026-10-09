/* Modèle commun des sites de candidature de Timo.
   Chaque dossier fournit window.SITE (fichier contenu.js) puis charge ce fichier.
   Ne rien mettre ici qui soit propre à une entreprise. */
(() => {
  const SITE = window.SITE || {};
  const BASE = window.BASE_TEXTS || { fr: {}, en: {} };
  const hasGate = !!SITE.accessCode;
  const hasCompany = !!SITE.company;
  const posteCards = SITE.posteCards || 4;
  const companyCards = SITE.companyCards || 3;
  const cv = SITE.cv || 'CV-Timo-Marguerat-Trichard.pdf';
  const mail = 'timomt.pro@gmail.com';

  // Pages dans l'ordre : sert à la numérotation « 02 / 06 ».
  const ROUTES = ['home', 'parcours', 'experiences', 'diplomes', 'poste'].concat(hasCompany ? ['entreprise'] : []);
  const TOTAL = String(ROUTES.length + (hasGate ? 0 : 0)).padStart(2, '0');
  const num = (route) => String(ROUTES.indexOf(route) + 1).padStart(2, '0') + ' / ' + TOTAL;

  const t = (k) => `data-i18n="${k}"`;
  const th = (k) => `data-i18n-html="${k}"`;
  const langBtn = (cls = '') => `<button class="language-toggle ${cls}" type="button" data-lang-toggle aria-label="Passer en anglais" aria-pressed="false"><span data-lang-option="fr">FR</span><span class="language-separator">${cls ? ' | ' : '/'}</span><span data-lang-option="en">EN</span></button>`;
  const kicker = (route, key) => `<div class="kicker"><span data-num="${route}"></span> · <span ${t(key)}></span></div>`;
  const head = (route, kickerKey, titleKey, leadKey) => `
      <div class="page-head">
        <div>
          ${kicker(route, kickerKey)}
          <h1 ${th(titleKey)}></h1>
        </div>
        <p class="page-lead" ${t(leadKey)}></p>
      </div>`;
  const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

  const EXPERIENCES = [
    ['exp1', 'exp1', 'Mars 2026'], ['exp2', 'exp2'], ['exp3', 'exp3'], ['exp4', 'exp4'], ['exp4b', 'exp4', null, 'exp4'], ['exp5', 'exp5']
  ];
  const expCard = (i, k) => {
    const titleKey = k === 'exp4b' ? 'exp4_title' : k + '_title';
    const labelKey = k === 'exp4b' ? 'exp4_label' : k + '_label';
    const open = i === 0;
    return `
        <article class="experience" data-open="${open}">
          <button class="experience-toggle" type="button" aria-expanded="${open}">
            <span class="experience-index">${String(i + 1).padStart(2, '0')}</span>
            <span><span class="experience-title" ${t(titleKey)}></span><span class="experience-role" ${t(k + '_role')}></span><span class="experience-date" ${t(k + '_date')}></span></span>
            <span class="experience-plus" aria-hidden="true">+</span>
          </button>
          <div class="experience-details">
            <div><span class="small-label" ${t(labelKey)}></span><p ${t(k + '_desc')}></p></div>
            <ul><li ${t(k + '_li1')}></li><li ${t(k + '_li2')}></li><li ${t(k + '_li3')}></li></ul>
          </div>
        </article>`;
  };
  const qual = (d, ti, sc) => `<div class="qualification"><div class="qualification-date" ${t(d)}></div><div><strong ${t(ti)}></strong><span ${t(sc)}></span></div></div>`;

  const html = `
${hasGate ? `<section class="access-gate" data-access-gate role="dialog" aria-modal="true" aria-labelledby="access-title">
    <div class="access-gate-header">
      <a class="brand" href="#/" tabindex="-1"><span class="brand-mark"></span>Timo</a>
      ${langBtn()}
    </div>
    <div class="access-gate-inner">
      <div class="landing-kicker" ${t('access_kicker')}></div>
      <h1 class="access-title" id="access-title" ${th('access_title')}></h1>
      <p class="access-intro" ${t('access_intro')}></p>
      <form class="access-form" data-access-form novalidate>
        <label for="access-code" ${t('access_label')}></label>
        <div class="access-form-row">
          <input id="access-code" name="access-code" type="password" autocomplete="off" inputmode="text" required data-access-input data-i18n-placeholder="access_placeholder" placeholder="Votre code">
          <button type="submit" ${t('access_submit')}></button>
        </div>
        <p class="access-error" data-access-error role="alert" hidden ${t('access_error')}></p>
      </form>
      <p class="access-note" ${t('access_note')}></p>
    </div>
    <div class="access-gate-footer"><span data-num="home"></span> · <span ${t('access_footer')}></span></div>
  </section>` : ''}
<header class="site-header" data-gated-content>
    <a class="brand" href="#/"><span class="brand-mark"></span>Timo</a>
    <nav class="site-nav" aria-label="Navigation principale" data-i18n-aria="aria_nav_main">
      <a href="#/parcours" ${t('nav_about')}></a>
      <a href="#/experiences" ${t('nav_experiences')}></a>
      <a href="#/diplomes" ${t('nav_skills')}></a>
      <a href="#/poste" ${t('nav_poste')}></a>
      ${hasCompany ? `<a href="#/entreprise" ${t('nav_company')}></a>` : ''}
      <a class="nav-cv" href="${cv}" data-cv target="_blank" rel="noopener" ${t('nav_cv')}></a>
      ${langBtn()}
    </nav>
  </header>
<div class="page-route" data-route="home" hidden><main class="landing" data-gated-content>
    <div class="landing-inner">
      <div class="landing-kicker" ${t('landing_kicker')}></div>
      <h1 ${th('landing_title')}></h1>
      <div class="landing-bottom">
        <p class="landing-intro" ${t('landing_intro')}></p>
        <p class="landing-pitch" ${t('landing_pitch')}></p>
        <div class="landing-meta">
          <a class="enter-link" href="#/parcours" ${t('landing_enter')}></a>
          <span ${t('landing_meta')}></span>
        </div>
      </div>
    </div>
    <div class="landing-footer" data-num="home"></div>
  </main></div>
<div class="page-route" data-route="parcours" hidden><main class="page">
    <div class="page-inner">${head('parcours', 'about_kicker', 'about_title', 'about_lead')}
      <div class="about-grid">
        <div>
          <h2 ${t('about_heading')}></h2>
          <p ${t('about_p1')}></p>
          <p ${t('about_p2')}></p>
          <p class="quote" ${t('about_quote')}></p>
          <details class="more">
            <summary ${t('more_sum')}></summary>
            <ul><li ${t('more_1')}></li><li ${t('more_2')}></li><li ${t('more_3')}></li></ul>
          </details>
        </div>
        <div class="fact-stack">
          <div class="fact"><span class="number">7+</span><p ${t('about_fact1')}></p></div>
          <div class="fact"><span class="number">10</span><p ${t('about_fact2')}></p></div>
        </div>
      </div>
      <div class="skills-block">
        <aside class="language-panel language-panel--wide">
          <h3 ${t('comp_lang_title')}></h3>
          ${['fr', 'en', 'es', 'pt'].map((l) => `<div class="language-row"><span ${t('comp_lang_' + l)}></span><span ${t('comp_lang_' + l + '_level')}></span></div>`).join('\n          ')}
        </aside>
      </div>
    </div>
  </main></div>
<div class="page-route" data-route="experiences" hidden><main class="page">
    <div class="page-inner">${head('experiences', 'exp_kicker', 'exp_title', 'exp_lead')}
      <div class="experience-list">${EXPERIENCES.map(([k], i) => expCard(i, k)).join('')}
      </div>
    </div>
  </main></div>
<div class="page-route" data-route="diplomes" hidden><main class="page">
    <div class="page-inner">${head('diplomes', 'dip_kicker', 'dip_title', 'dip_lead')}
      <div class="qualifications qualifications--solo">
        <div>
          <div class="qualification-list">
            ${qual('comp_mbs_date', 'comp_mbs_title', 'comp_mbs_school')}
            ${qual('comp_b3_date', 'comp_b3_title', 'comp_b3_school')}
            ${qual('comp_b2_date', 'comp_b2_title', 'comp_b2_school')}
            ${qual('comp_b1_date', 'comp_b1_title', 'comp_b1_school')}
            ${qual('comp_cert_date1', 'comp_cert_title1', 'comp_cert_school1')}
            ${qual('comp_cert_date2', 'comp_cert_title2', 'comp_cert_school2')}
          </div>
          <h2 class="tech-title" ${t('tech_title')} style="margin-top:56px"></h2>
          <div class="qualification-list">
            ${['1', '2', '3', '5', '4'].map((n) => qual('tech_date' + n, 'tech_title' + n, 'tech_desc' + n)).join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  </main></div>
<div class="page-route" data-route="poste" hidden><main class="page">
    <div class="page-inner">${head('poste', 'poste_kicker', 'poste_title', 'poste_lead')}
      <div class="skills-block">
        <div class="competence-grid" data-cgcar tabindex="0" aria-roledescription="carousel">
        ${range(posteCards).map((i) => `<article class="competence-card"><span class="small-label" ${t('poste_c' + i + '_label')}></span><h2 ${t('poste_c' + i + '_title')}></h2><p ${t('poste_c' + i + '_p')}></p></article>`).join('\n        ')}
        </div>
      </div>
      ${hasCompany ? '' : `<div class="letter"><div>
          <h2 ${th('co_letter_title')}></h2>
          <p ${t('co_letter_p')}></p>
          <p class="cta-row"><a class="cta cta--fill" href="${cv}" data-cv target="_blank" rel="noopener" ${t('cta_cv')}></a><a class="cta" data-mail href="mailto:${mail}" ${t('cta_mail')}></a></p>
          <p class="mail-line">${mail} · 07 86 78 23 23</p>
        </div></div>`}
    </div>
  </main></div>
${hasCompany ? `<div class="page-route" data-route="entreprise" hidden><main class="page">
    <div class="page-inner">${head('entreprise', 'co_kicker', 'co_title', 'co_lead')}
      <div class="why-grid">
        ${range(companyCards).map((i) => `<article class="why-card"><h2 ${t('co_card' + i + '_title')}></h2><p ${t('co_card' + i + '_p')}></p></article>`).join('\n        ')}
      </div>
      <div class="letter">
        <div>
          <h2 ${th('co_letter_title')}></h2>
          <p ${t('co_letter_p')}></p>
          <p class="cta-row"><a class="cta cta--fill" href="${cv}" data-cv target="_blank" rel="noopener" ${t('cta_cv')}></a><a class="cta" data-mail href="mailto:${mail}?subject=${encodeURIComponent(SITE.mailSubject || 'Candidature — Timo')}" ${t('cta_mail')}></a></p>
          <p class="mail-line">${mail} · 07 86 78 23 23</p>
        </div>
      </div>
    </div>
  </main></div>` : ''}
<footer class="site-footer" data-gated-content><div class="site-footer-inner"><div class="site-footer-head"><a class="footer-logo" href="#/">Timo</a><span class="footer-dot" aria-hidden="true"></span><button class="footer-top-button" type="button" data-top aria-label="Retour en haut" data-i18n-aria="aria_top">↑</button></div><div class="site-footer-rule"></div><div class="site-footer-grid"><nav class="footer-nav" aria-label="Navigation secondaire" data-i18n-aria="aria_nav_secondary"><a href="#/" ${t('nav_home')}></a><a href="#/parcours" ${t('nav_about')}></a><a href="#/experiences" ${t('nav_experiences')}></a><a href="#/diplomes" ${t('nav_skills')}></a><a href="#/poste" ${t('nav_poste')}></a>${hasCompany ? `<a href="#/entreprise" ${t('nav_application')}></a>` : ''}<a href="mailto:${mail}" ${t('footer_contact')}></a></nav><div><div class="footer-label" ${t('footer_email_label')}></div><a class="footer-value" href="mailto:${mail}">${mail}</a></div><div><div class="footer-label" ${t('footer_location_label')}></div><span class="footer-value" ${t('footer_location_value')}></span></div><div class="footer-copyright" ${t('footer_copyright')}></div></div><div class="site-footer-bottom"><span ${t('footer_portfolio')}></span>${langBtn('footer-language-toggle')}</div></div></footer>`;

  document.body.insertAdjacentHTML('afterbegin', html);
  if (hasGate) document.body.classList.add('access-locked');
  if (hasCompany) document.documentElement.style.setProperty('--company', SITE.company);

  // ---------- Textes : base commune + contenu du site ----------
  const translations = { fr: Object.assign({}, BASE.fr, (SITE.texts || {}).fr), en: Object.assign({}, BASE.en, (SITE.texts || {}).en) };
  const edits = { fr: {}, en: {} };
  window.__i18n = { translations, edits };
  const languageKey = 'timo-language';
  const readStored = () => { try { return localStorage.getItem(languageKey); } catch (e) { return null; } };
  const writeStored = (v) => { try { localStorage.setItem(languageKey, v); } catch (e) {} };
  let currentLanguage = readStored() === 'en' ? 'en' : 'fr';
  let currentRoute = 'home';

  const titleFor = (dict) => {
    if (currentRoute === 'home') return dict.site_title || 'Timo';
    const name = currentRoute === 'entreprise' ? (dict.co_kicker || dict.nav_company) : dict['page_' + currentRoute];
    return (name || 'Timo') + ' — Timo' + (hasCompany ? ' × ' + SITE.company : '');
  };
  const applyLanguage = (language) => {
    const dict = translations[language] || translations.fr;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((el) => { const v = dict[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { const v = dict[el.dataset.i18nHtml]; if (v !== undefined) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { const v = dict[el.dataset.i18nPlaceholder]; if (v !== undefined) el.setAttribute('placeholder', v); });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => { const v = dict[el.dataset.i18nAria]; if (v !== undefined) el.setAttribute('aria-label', v); });
    document.querySelectorAll('[data-num]').forEach((el) => { el.textContent = num(el.dataset.num); });
    document.title = titleFor(dict);
    document.querySelectorAll('[data-lang-option]').forEach((o) => o.classList.toggle('is-active', o.dataset.langOption === language));
    document.querySelectorAll('[data-lang-toggle]').forEach((b) => {
      b.setAttribute('aria-label', language === 'fr' ? 'Switch to English' : 'Passer en français');
      b.setAttribute('aria-pressed', language === 'en' ? 'true' : 'false');
    });
  };
  window.__applyLang = () => applyLanguage(currentLanguage);

  // ---------- Expériences dépliables ----------
  document.querySelectorAll('.experience').forEach((card, i) => {
    const button = card.querySelector('.experience-toggle');
    const panel = card.querySelector('.experience-details');
    panel.id = 'experience-panel-' + (i + 1);
    button.setAttribute('aria-controls', panel.id);
    const set = (open) => { card.dataset.open = String(open); button.setAttribute('aria-expanded', String(open)); };
    button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
  });

  // ---------- Code d'accès (simple filtre côté navigateur, pas une vraie protection) ----------
  const setGated = (locked) => {
    document.body.classList.toggle('access-locked', locked);
    document.querySelectorAll('[data-gated-content]').forEach((el) => { if (locked) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
    const gate = document.querySelector('[data-access-gate]');
    if (gate) { gate.hidden = !locked; gate.setAttribute('aria-hidden', String(!locked)); }
  };
  if (hasGate) {
    setGated(true);
    const form = document.querySelector('[data-access-form]');
    const input = document.querySelector('[data-access-input]');
    const error = document.querySelector('[data-access-error]');
    setTimeout(() => input.focus(), 0);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value.trim().toLocaleLowerCase('fr-FR') === String(SITE.accessCode).toLocaleLowerCase('fr-FR')) {
        input.setAttribute('aria-invalid', 'false'); error.hidden = true; setGated(false);
        setTimeout(() => window.scrollTo(0, 0), 60);
      } else {
        input.setAttribute('aria-invalid', 'true'); error.hidden = false; input.focus(); input.select();
      }
    });
    input.addEventListener('input', () => { input.setAttribute('aria-invalid', 'false'); error.hidden = true; });
  }

  // ---------- Navigation entre pages ----------
  const ALIASES = { competences: 'diplomes', international: 'parcours', finance: 'poste' };
  if (hasCompany) { ALIASES.loopstr = 'entreprise'; ALIASES.hokta = 'entreprise'; ALIASES[String(SITE.company).toLowerCase()] = 'entreprise'; }
  const route = () => {
    let r = location.hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'home';
    r = ALIASES[r] || r;
    if (!ROUTES.includes(r)) r = 'home';
    currentRoute = r;
    document.querySelectorAll('[data-route]').forEach((e) => { e.hidden = e.dataset.route !== r; });
    document.body.classList.toggle('company-page', r === 'entreprise');
    document.querySelectorAll('.site-nav a').forEach((a) => { if (a.getAttribute('href') === '#/' + r) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (hasGate && r !== 'home') setGated(false);
    applyLanguage(currentLanguage);
    window.scrollTo(0, 0);
  };
  window.addEventListener('hashchange', route);
  route();

  document.querySelectorAll('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr'; writeStored(currentLanguage); applyLanguage(currentLanguage);
  }));
  document.querySelectorAll('[data-top]').forEach((b) => b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' })));
  try { history.scrollRestoration = 'manual'; } catch (e) {}

  // ---------- Lien mail : dans un aperçu encadré, afficher l'adresse ----------
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-mail]'); if (!a) return;
    let framed = false; try { framed = window.self !== window.top; } catch (x) { framed = true; }
    if (!framed) return;
    e.preventDefault();
    try { navigator.clipboard.writeText(mail).catch(() => {}); } catch (x) {}
    a.removeAttribute('data-i18n'); a.textContent = mail;
  });

  // ---------- CV : dans l'aperçu Claude, passer par l'enregistrement de fichier ----------
  let dl = null;
  try { if (window.claude && window.claude.use) window.claude.use('downloads').then((d) => { dl = d; }).catch(() => {}); } catch (e) {}
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('[data-cv]'); if (!a || !dl) return;
    e.preventDefault();
    fetch(a.getAttribute('href')).then((r) => r.blob()).then((b) => dl.save({ filename: cv, data: b })).catch(() => {});
  });

  // ---------- Apparition au défilement ----------
  const editing = /[?&]edit\b/.test(location.search);
  const SEL = '.page-head,.about-grid>*,.fact,.skills-block h2,.language-panel,.experience,.why-card,.qualification,.tech-title,.letter>*';
  const els = document.querySelectorAll(SEL);
  els.forEach((el) => { el.classList.add('reveal'); el.style.setProperty('--d', (Math.min([...el.parentNode.children].indexOf(el), 5) * 0.08) + 's'); });
  if (editing || !('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('is-in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
  }

  // ---------- Carrousel « Pour le poste » ----------
  document.querySelectorAll('[data-cgcar]').forEach((tr) => {
    const sl = [...tr.children];
    const ctrl = document.createElement('div'); ctrl.className = 'cg-ctrl';
    ctrl.innerHTML = '<div class="cg-dots" aria-hidden="true"></div><div class="cg-btns"><button type="button" class="cg-btn" data-p aria-label="Précédent">←</button><button type="button" class="cg-btn" data-n aria-label="Suivant">→</button></div>';
    tr.parentNode.insertBefore(ctrl, tr.nextSibling);
    const dots = ctrl.querySelector('.cg-dots'), pv = ctrl.querySelector('[data-p]'), nx = ctrl.querySelector('[data-n]');
    sl.forEach(() => dots.appendChild(document.createElement('span')));
    const step = () => (sl.length > 1 ? sl[1].offsetLeft - sl[0].offsetLeft : tr.clientWidth);
    const upd = () => { const i = Math.round(tr.scrollLeft / (step() || 1)); [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i)); pv.disabled = tr.scrollLeft <= 2; nx.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 2; };
    pv.addEventListener('click', () => tr.scrollBy({ left: -step(), behavior: 'smooth' }));
    nx.addEventListener('click', () => tr.scrollBy({ left: step(), behavior: 'smooth' }));
    tr.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    tr.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); nx.click(); } if (e.key === 'ArrowLeft') { e.preventDefault(); pv.click(); } });
    if ('ResizeObserver' in window) new ResizeObserver(upd).observe(tr);
    window.addEventListener('resize', upd); window.addEventListener('hashchange', () => setTimeout(upd, 80)); upd();
  });

  // ---------- Mode édition (?edit) : modifier les textes puis enregistrer contenu.js ----------
  if (editing) {
    const SKIP = 'nav,.brand,.footer-logo,.language-toggle,[data-edit-ui],.access-gate';
    setGated(false);
    const css = document.createElement('style');
    css.textContent = '[data-editable]{cursor:text;outline:1px dashed transparent;outline-offset:3px}[data-editable]:hover{outline-color:#1f6f68}[data-editable]:focus{outline:2px solid #1f6f68;background:rgba(183,211,242,.22)}.edit-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:60;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:94vw;padding:10px 12px;background:#111;color:#f3f0e9;border:1px solid #b7d3f2;border-radius:14px;font:600 13px/1.2 system-ui,sans-serif}.edit-bar button{padding:9px 13px;border:1px solid #b7d3f2;border-radius:9px;background:#b7d3f2;color:#111;font:inherit;cursor:pointer}';
    document.head.appendChild(css);
    document.querySelectorAll('.experience').forEach((c) => { c.dataset.open = 'true'; });
    document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach((el) => {
      if (el.closest(SKIP)) return;
      el.setAttribute('contenteditable', 'true'); el.setAttribute('data-editable', ''); el.spellcheck = false;
      el.addEventListener('input', () => {
        const isHtml = el.hasAttribute('data-i18n-html'); const key = el.dataset.i18n || el.dataset.i18nHtml;
        const val = isHtml ? el.innerHTML : el.textContent;
        translations[currentLanguage][key] = val; edits[currentLanguage][key] = val;
      });
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
      el.addEventListener('paste', (e) => { e.preventDefault(); document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain')); });
    });
    document.addEventListener('click', (e) => { if (e.target.closest('a[data-editable]')) e.preventDefault(); }, true);
    const bar = document.createElement('div'); bar.className = 'edit-bar'; bar.dataset.editUi = '1';
    bar.innerHTML = '<span>✎ Mode édition</span><button type="button" data-act="save">Enregistrer contenu.js</button>';
    bar.addEventListener('click', (e) => {
      if (e.target.dataset.act !== 'save') return;
      const out = JSON.parse(JSON.stringify(SITE));
      out.texts = out.texts || {};
      ['fr', 'en'].forEach((l) => { out.texts[l] = Object.assign({}, out.texts[l], edits[l]); });
      const blob = new Blob(['window.SITE = ' + JSON.stringify(out, null, 2) + ';\n'], { type: 'text/javascript' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'contenu.js';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    });
    document.body.appendChild(bar);
  }
})();
