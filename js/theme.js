/**
 * KORA SPA — Theme & RTL Direction Manager
 */

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
        labelSpan.textContent = theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode';
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
