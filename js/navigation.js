/**
 * KORA SPA — Navigation Component Manager
 */

const SiteNav = {
  init() {
    this.nav = document.querySelector('.site-nav');
    this.toggle = document.querySelector('.nav-toggle');
    this.menu = document.querySelector('.mobile-menu');
    this.links = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this._scrollY = 0;

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
        this.setMenuOpen(!this.menu.classList.contains('active'));
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
          this.setMenuOpen(false);
        }
      }
    });

    // Close mobile menu when clicking any mobile link
    if (this.menu) {
      this.menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          this.setMenuOpen(false);
        });
      });
    }

    // Close on Escape and when the viewport returns to desktop
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu && this.menu.classList.contains('active')) {
        this.setMenuOpen(false);
        if (this.toggle) this.toggle.focus();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1025px)');
    const handleDesktop = (e) => {
      if (e.matches) this.setMenuOpen(false);
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleDesktop);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleDesktop);
    }

    // Synchronize Auth button in nav if user is logged in
    this.updateNavAuth();
  },

  setMenuOpen(open) {
    if (!this.menu || !this.toggle) return;
    const isOpen = this.menu.classList.contains('active');
    if (open === isOpen) return;

    this.menu.classList.toggle('active', open);
    this.toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);

    if (open) {
      this.lockBodyScroll();
    } else {
      this.unlockBodyScroll();
    }
  },

  lockBodyScroll() {
    this._scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${this._scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  },

  unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';

    // Restore instantly even when the site uses smooth scrolling.
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, this._scrollY || 0);
    html.style.scrollBehavior = previousBehavior;
  },

  updateNavAuth() {
    const authBtn = document.getElementById('navAuthBtn');
    if (!authBtn || typeof Auth === 'undefined') return;

    if (Auth.isLoggedIn()) {
      authBtn.textContent = 'Dashboard';
      authBtn.href = pageUrl('dashboard.html');
    } else {
      authBtn.textContent = 'Book Now';
      authBtn.href = pageUrl('login.html');
    }
  }
};
