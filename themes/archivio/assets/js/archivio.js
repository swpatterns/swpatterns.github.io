// Archivio — interactive bits.
// (1) Theme toggle: auto / light / dark, stored in localStorage.
// (2) Copy buttons on every <pre> code block.
// (3) Specimen language switcher with URL hash sync (#lang=java).
//
// Vanilla JS, no deps. Loaded with `defer`. Respects prefers-reduced-motion.

(function () {
  'use strict';

  // ─── theme toggle ──────────────────────────────────────────────────
  var STORAGE_KEY = 'archivio-theme';

  function applyTheme(value) {
    if (value === 'light' || value === 'dark') {
      document.documentElement.setAttribute('data-theme', value);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    syncToggleState(value || 'auto');
  }

  function syncToggleState(active) {
    var buttons = document.querySelectorAll('.theme-toggle [data-theme-set]');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.themeSet === active ? 'true' : 'false');
    });
  }

  function initThemeToggle() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    syncToggleState(saved === 'light' || saved === 'dark' ? saved : 'auto');

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-theme-set]');
      if (!btn) return;
      var choice = btn.dataset.themeSet;
      try {
        if (choice === 'auto') {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, choice);
        }
      } catch (e) {}
      applyTheme(choice === 'auto' ? null : choice);
    });
  }

  // ─── copy buttons on pre blocks ────────────────────────────────────
  // Wraps every <pre> with a small toolbar showing the language and a
  // copy button. The button is keyboard-reachable and announces success
  // via aria-live for screen readers.
  function initCopyButtons() {
    var blocks = document.querySelectorAll('main pre');
    blocks.forEach(function (pre) {
      // Skip if already wrapped (e.g. by a custom shortcode).
      if (pre.closest('.code-block')) return;

      var code = pre.querySelector('code');
      var lang = '';
      if (code) {
        var match = (code.className || '').match(/language-([\w+#-]+)/);
        if (match) lang = match[1];
      }

      var wrap = document.createElement('div');
      wrap.className = 'code-block';

      var header = document.createElement('div');
      header.className = 'code-block__header';

      var label = document.createElement('span');
      label.className = 'code-block__lang';
      label.textContent = lang || 'code';
      header.appendChild(label);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-block__copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.textContent = 'Copy';
      header.appendChild(btn);

      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(header);
      wrap.appendChild(pre);

      btn.addEventListener('click', function () {
        var text = (code || pre).innerText;
        var done = function () {
          btn.dataset.state = 'copied';
          btn.textContent = 'Copied';
          setTimeout(function () {
            btn.dataset.state = '';
            btn.textContent = 'Copy';
          }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
        } else {
          fallback(text, done);
        }
      });
    });
  }

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  // ─── specimen tabs ─────────────────────────────────────────────────
  function initSpecimenTabs() {
    var tablist = document.querySelector('.specimens__tabs');
    if (!tablist) return;
    var tabs = tablist.querySelectorAll('[data-specimen-tab]');
    var panels = document.querySelectorAll('[data-specimen-panel]');
    if (!tabs.length || !panels.length) return;

    function show(idx) {
      tabs.forEach(function (t) {
        var on = parseInt(t.dataset.specimenTab, 10) === idx;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      });
      panels.forEach(function (p) {
        var on = parseInt(p.dataset.specimenPanel, 10) === idx;
        if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
      });
    }

    // Restore from URL hash if present (#lang=java).
    var initial = 0;
    var m = location.hash.match(/lang=([\w+#-]+)/i);
    if (m) {
      var want = m[1].toLowerCase();
      tabs.forEach(function (t) {
        if (t.textContent.trim().toLowerCase() === want) initial = parseInt(t.dataset.specimenTab, 10);
      });
    }
    show(initial);

    tablist.addEventListener('click', function (e) {
      var t = e.target.closest('[data-specimen-tab]');
      if (!t) return;
      e.preventDefault();
      var idx = parseInt(t.dataset.specimenTab, 10);
      show(idx);
      try {
        history.replaceState(null, '', '#lang=' + encodeURIComponent(t.textContent.trim().toLowerCase()));
      } catch (err) {}
      t.focus();
    });

    // ←/→ keyboard navigation between tabs (ARIA pattern).
    tablist.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return;
      var current = document.activeElement;
      if (!current || !current.dataset || current.dataset.specimenTab == null) return;
      e.preventDefault();
      var n = tabs.length;
      var i = parseInt(current.dataset.specimenTab, 10);
      var next = e.key === 'ArrowLeft' ? (i - 1 + n) % n
              : e.key === 'ArrowRight' ? (i + 1) % n
              : e.key === 'Home' ? 0 : n - 1;
      tabs[next].click();
      tabs[next].focus();
    });
  }

  // ─── boot ──────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  function boot() {
    initThemeToggle();
    initCopyButtons();
    initSpecimenTabs();
  }
})();
