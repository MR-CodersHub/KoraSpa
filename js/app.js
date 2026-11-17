/**
 * KORA SPA — Main Application Bootstrapper
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme & Direction Manager
  if (typeof ThemeManager !== 'undefined') {
    ThemeManager.init();
  }

  // 2. Initialize Navigation Component
  if (typeof SiteNav !== 'undefined') {
    SiteNav.init();
  }

  // 2b. Account Profile Dropdown (User / Admin dashboards)
  const profileMenus = document.querySelectorAll('.profile-menu');
  const closeProfileMenus = (except) => {
    profileMenus.forEach((menu) => {
      if (menu === except) return;
      menu.classList.remove('open');
      const button = menu.querySelector('.profile-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };

  profileMenus.forEach((menu) => {
    const button = menu.querySelector('.profile-toggle');
    if (!button) return;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const shouldOpen = !menu.classList.contains('open');
      closeProfileMenus(menu);
      menu.classList.toggle('open', shouldOpen);
      button.setAttribute('aria-expanded', String(shouldOpen));
    });

    menu.querySelectorAll('.profile-dropdown a').forEach((link) => {
      link.addEventListener('click', () => closeProfileMenus());
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-menu')) closeProfileMenus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProfileMenus();
  });

  // 3. Initialize Shared Interactivity Helpers
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }

  if (typeof initBackToTop === 'function') {
    initBackToTop();
  }

  if (typeof initAccordion === 'function') {
    initAccordion('.accordion');
  }

  if (typeof initLightbox === 'function') {
    initLightbox();
  }

  // 4. Scroll Reading Progress Bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 5. Global Newsletter Form Handlers
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        if (typeof validateEmail === 'function' && !validateEmail(input.value)) {
          if (typeof showToast === 'function') {
            showToast('Please provide a valid email address.', 'error');
          }
          return;
        }
        if (typeof showToast === 'function') {
          showToast('Thank you for subscribing to our wellness journal!', 'success');
        }
        input.value = '';
      }
    });
  });

  // 6. Page-specific lifecycle identification
  const page = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index';
  console.log(`[Kora Spa] System initialized for page: "${page}"`);
});
