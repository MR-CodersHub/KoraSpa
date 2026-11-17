/**
 * KORA SPA — Authentication & User State Service
 */

const Auth = {
  demoUser: {
    id: 'demo-001',
    name: 'Alexandra Rivers',
    email: 'alexandra@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    membershipPlan: 'radiance',
    membershipPlanName: 'Radiance Tier',
    membershipStatus: 'active',
    memberSince: '2026-03-15',
    membershipRenewal: '2026-12-15',
    preferredTherapist: 'sarah-chen',
    preferredTherapistName: 'Sarah Chen, LMT',
    preferredTreatments: ['relaxation-massage', 'hot-stone-therapy'],
    bio: 'Dedicated advocate of somatic mindfulness, hydrotherapy routines, and organic holistic living.',
    address: '742 Evergreen Terrace, Apt 4B, New York, NY 10001'
  },

  login(email, password) {
    const user = {
      ...this.demoUser,
      email: email || this.demoUser.email,
      loginTime: Date.now()
    };
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-user', user);
      Storage.set('spa-auth', true);
    }
    return user;
  },

  logout() {
    if (typeof Storage !== 'undefined') {
      Storage.remove('spa-user');
      Storage.remove('spa-auth');
    }
    window.location.href = pageUrl('login.html');
  },

  register(userData = {}) {
    const user = {
      ...this.demoUser,
      ...userData,
      id: 'user-' + Date.now(),
      membershipPlan: 'none',
      membershipPlanName: 'Standard Guest',
      membershipStatus: 'none',
      memberSince: new Date().toISOString().split('T')[0],
      loginTime: Date.now()
    };
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-user', user);
      Storage.set('spa-auth', true);
    }
    return user;
  },

  isLoggedIn() {
    if (typeof Storage === 'undefined') return false;
    return Boolean(Storage.get('spa-auth'));
  },

  getUser() {
    if (typeof Storage !== 'undefined') {
      const stored = Storage.get('spa-user');
      if (stored) return stored;
    }
    return this.demoUser;
  },

  updateProfile(data) {
    const current = this.getUser();
    const updated = { ...current, ...data };
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-user', updated);
    }
    return updated;
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      const currentUrl = window.location.href;
      window.location.href = pageUrl('login.html') + '?redirect=' + encodeURIComponent(currentUrl);
    }
  }
};
