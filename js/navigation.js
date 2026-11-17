/**
 * KORA SPA — Navigation Component Manager
 */

const SiteNav = {
  init() {
    this.nav = document.querySelector('.site-nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.mobile-menu');
    this.links = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Scroll state: add .nav-scrolled class
    const handleScroll = () => {
      if (!this.nav) return;
      if (window.scrollY > 40) {
        this.nav.classList.add('nav-scrolled');
      } else {
        this.nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Hamburger Toggle
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = this.menu.classList.contains('active');
        this.menu.classList.toggle('active', !isOpen);
        this.toggle.setAttribute('aria-expanded', !isOpen);
      });
    }

    // Active Link Detection based on pathname
    const pathParts = window.location.pathname.split('/');
    let currentPage = pathParts.pop() || 'index.html';
    if (!currentPage || currentPage === '') currentPage = 'index.html';

    this.links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop().split('?')[0].split('#')[0];
        if (linkPage === currentPage) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      }
    });

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (this.menu && this.menu.classList.contains('active')) {
        if (!this.nav.contains(e.target)) {
          this.menu.classList.remove('active');
          if (this.toggle) {
            this.toggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });

    // Close mobile menu when clicking any mobile link
    if (this.menu) {
      this.menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          this.menu.classList.remove('active');
          if (this.toggle) {
            this.toggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    // Synchronize Auth button in nav if user is logged in
    this.updateNavAuth();
  },

  updateNavAuth() {
    const authBtn = document.getElementById('navAuthBtn');
    if (!authBtn || typeof Auth === 'undefined') return;

    if (Auth.isLoggedIn()) {
      authBtn.textContent = 'Dashboard';
      authBtn.href = 'dashboard.html';
    } else {
      authBtn.textContent = 'Book Now';
      authBtn.href = 'booking.html';
    }
  }
};
