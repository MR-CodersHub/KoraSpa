/**
 * KORA SPA — Theme & RTL Direction Manager
 */

const SUN_ICON = "<svg class=\"inline-icon\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41\"/></svg>";
const MOON_ICON = "<svg class=\"inline-icon\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"/></svg>";

const ThemeManager = {
  init() {
    const savedTheme = (typeof Storage !== 'undefined' ? Storage.get('spa-theme') : null) || 'light';
    const savedDir = (typeof Storage !== 'undefined' ? Storage.get('spa-dir') : null) || 'ltr';

    this.setTheme(savedTheme);
    this.setDir(savedDir);

    // Bind all theme toggles across page (desktop, mobile menu, dashboard topbar)
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    // Bind all direction toggles
    document.querySelectorAll('.dir-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleDir();
      });
    });
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-theme', theme);
    }

    // Update aria labels & text for screen readers or buttons with text
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      // If button has text child
      const labelSpan = btn.querySelector('.theme-label');
      if (labelSpan) {
        labelSpan.innerHTML = theme === 'dark' ? SUN_ICON + ' Light Mode' : MOON_ICON + ' Dark Mode';
      }
    });

    // Dispatch custom event for modules that need to adjust canvases/charts
    window.dispatchEvent(new CustomEvent('spa-theme-change', { detail: { theme } }));
  },

  toggleDir() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    this.setDir(nextDir);
  },

  setDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-dir', dir);
    }

    document.querySelectorAll('.dir-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', dir === 'rtl');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
      const labelSpan = btn.querySelector('.dir-label');
      if (labelSpan) {
        labelSpan.textContent = dir === 'rtl' ? 'LTR Layout' : 'RTL Layout';
      }
    });

    window.dispatchEvent(new CustomEvent('spa-dir-change', { detail: { dir } }));
  }
};
