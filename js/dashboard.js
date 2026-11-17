/**
 * KORA SPA — Dashboard Controller
 * Handles section navigation, reactive data rendering, profile management, and appointment controls.
 */

const Dashboard = {
  currentSection: 'overview',

  init() {
    if (typeof Auth !== 'undefined') {
      Auth.requireAuth();
    }

    this.setupNavigation();
    this.updateUserDisplay();
    this.loadSection('overview');
    this.setupProfileForm();
  },

  setupNavigation() {
    // Desktop & Sidebar links
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        if (section === 'logout') {
          if (typeof Auth !== 'undefined') Auth.logout();
          return;
        }
        if (section) this.loadSection(section);
      });
    });

    // Mobile Bottom Navigation
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        if (section) this.loadSection(section);
      });
    });

    // Sidebar Mobile Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
      // Close when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }

    // Direct section link triggers (e.g. "View all appointments" button in overview)
    document.querySelectorAll('[data-switch-section]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sec = btn.getAttribute('data-switch-section');
        if (sec) this.loadSection(sec);
      });
    });
  },

  loadSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));

    // Show selected section
    const targetSection = document.getElementById('section-' + sectionName);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update active state across sidebar & bottom nav
    document.querySelectorAll('.sidebar-nav-item, .bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.section === sectionName);
    });

    this.currentSection = sectionName;

    // Update Topbar Title
    const topbarTitle = document.querySelector('.topbar-title');
    if (topbarTitle) {
      const titles = {
        overview: 'Welcome Alexandra',
        book: 'Schedule an Appointment',
        appointments: 'My Appointments',
        history: 'Treatment History',
        membership: 'Membership & Benefits',
        plans: 'Membership Plans',
        notifications: 'Notifications & Updates',
        profile: 'Account Settings'
      };
      topbarTitle.textContent = titles[sectionName] || 'Dashboard';
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }

    // Section-specific rendering
    switch (sectionName) {
      case 'overview':
        this.renderOverview();
        break;
      case 'book':
        if (typeof BookingManager !== 'undefined') {
          BookingManager.init();
          BookingManager.goToStep(1);
        }
        break;
      case 'appointments':
        this.renderAppointments();
        break;
      case 'history':
        this.renderHistory();
        break;
      case 'membership':
        this.renderMembership();
        break;
      case 'plans':
        this.renderPlans();
        break;
      case 'notifications':
        this.renderNotifications();
        break;
      case 'profile':
        this.renderProfile();
        break;
    }
  },

  updateUserDisplay() {
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;
    if (!user) return;

    document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
    document.querySelectorAll('.user-email').forEach(el => el.textContent = user.email);
    document.querySelectorAll('.user-plan-badge').forEach(el => el.textContent = user.membershipPlanName || 'Standard');

    document.querySelectorAll('.user-avatar').forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = user.avatar;
        el.alt = user.name;
      }
    });

    // Update unread notification count badge in topbar
    const notifications = (typeof Storage !== 'undefined' ? Storage.get('spa-notifications') : null) ||
      (window.SpaData ? SpaData.notifications : []);
    const unreadCount = notifications.filter(n => !n.read).length;

    const notifBadge = document.querySelector('.topbar-notif-badge');
    if (notifBadge) {
      if (unreadCount > 0) {
        notifBadge.textContent = unreadCount;
        notifBadge.style.display = 'flex';
      } else {
        notifBadge.style.display = 'none';
      }
    }
  },

  renderOverview() {
    const bookings = (typeof Storage !== 'undefined' ? Storage.get('spa-bookings') : null) ||
      (window.SpaData ? SpaData.sampleBookings : []);
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;

    // Up-to-date stat cards
    const statBookings = document.getElementById('stat-active-bookings');
    if (statBookings) {
      const activeCount = bookings.filter(b => b.status === 'confirmed').length;
      statBookings.textContent = activeCount;
    }

    const statPlan = document.getElementById('stat-membership-plan');
    if (statPlan && user) {
      statPlan.textContent = user.membershipPlanName || 'Active';
    }

    // Render upcoming list snippet (top 2 bookings)
    const upcomingContainer = document.getElementById('overview-upcoming-list');
    if (upcomingContainer) {
      const upcoming = bookings.filter(b => b.status === 'confirmed').slice(0, 2);
      if (upcoming.length === 0) {
        upcomingContainer.innerHTML = `
          <div class="empty-state" style="padding: 2rem;">
            <p class="text-muted">No upcoming appointments scheduled.</p>
            <button class="btn-primary btn-sm" onclick="Dashboard.loadSection('book')">Book a Session</button>
          </div>
        `;
      } else {
        upcomingContainer.innerHTML = upcoming.map(b => `
          <div class="booking-card mb-md">
            <div class="booking-card-body">
              <div class="booking-card-header">
                <div>
                  <h4 class="booking-treatment-name">${b.treatment}</h4>
                  <div class="booking-therapist">with ${b.therapist}</div>
                </div>
                <span class="badge badge-confirmed">Confirmed</span>
              </div>
              <div class="booking-meta">
                <span class="booking-meta-item">📅 ${typeof formatDate === 'function' ? formatDate(b.date) : b.date}</span>
                <span class="booking-meta-item">⏰ ${b.time} (${b.duration})</span>
                <span class="booking-meta-item">🔖 Ref: ${b.id}</span>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  },

  renderAppointments() {
    const container = document.getElementById('appointments-container');
    if (!container) return;

    const bookings = (typeof Storage !== 'undefined' ? Storage.get('spa-bookings') : null) ||
      (window.SpaData ? SpaData.sampleBookings : []);

    if (bookings.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🌿</div>
          <h3 class="empty-state-title">No Appointments Yet</h3>
          <p class="empty-state-desc">You do not have any upcoming wellness sessions reserved.</p>
          <button class="btn-primary" onclick="Dashboard.loadSection('book')">Schedule Your First Treatment</button>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings.map(b => {
      const statusBadgeClass = b.status === 'confirmed' ? 'badge-confirmed' :
        b.status === 'completed' ? 'badge-completed' :
        b.status === 'cancelled' ? 'badge-cancelled' : 'badge-pending';

      return `
        <div class="booking-card mb-md" id="card-${b.id}">
          <div class="booking-card-body">
            <div class="booking-card-header">
              <div>
                <h3 class="booking-treatment-name">${b.treatment}</h3>
                <div class="booking-therapist">Therapist: <strong>${b.therapist}</strong></div>
              </div>
              <span class="badge ${statusBadgeClass}">${b.status.toUpperCase()}</span>
            </div>
            <div class="booking-meta">
              <span class="booking-meta-item">📅 ${typeof formatDate === 'function' ? formatDate(b.date) : b.date}</span>
              <span class="booking-meta-item">⏰ ${b.time}</span>
              <span class="booking-meta-item">⌛ ${b.duration}</span>
              <span class="booking-meta-item">💰 ${typeof formatCurrency === 'function' ? formatCurrency(b.price) : '$' + b.price}</span>
              <span class="booking-meta-item">🔖 Ref: ${b.id}</span>
            </div>
            ${b.notes ? `<p class="text-muted" style="font-size:0.85rem;margin-top:0.4rem;"><em>Note: ${b.notes}</em></p>` : ''}
            <div class="booking-actions mt-sm">
              ${b.status === 'confirmed' ? `
                <button class="btn-secondary btn-sm" onclick="Dashboard.rescheduleBooking('${b.id}')">Reschedule</button>
                <button class="btn-ghost btn-sm" style="color:var(--color-error);" onclick="Dashboard.cancelBooking('${b.id}')">Cancel Booking</button>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  rescheduleBooking(refId) {
    if (typeof showToast === 'function') {
      showToast('Please pick a new date and time for ref ' + refId, 'info');
    }
    this.loadSection('book');
  },

  cancelBooking(refId) {
    if (!confirm('Are you sure you wish to cancel this appointment?')) return;

    let bookings = (typeof Storage !== 'undefined' ? Storage.get('spa-bookings') : null) ||
      (window.SpaData ? SpaData.sampleBookings : []);

    bookings = bookings.map(b => {
      if (b.id === refId) {
        return { ...b, status: 'cancelled' };
      }
      return b;
    });

    if (typeof Storage !== 'undefined') {
      Storage.set('spa-bookings', bookings);
    }

    if (typeof showToast === 'function') {
      showToast(`Appointment ${refId} has been cancelled.`, 'info');
    }

    this.renderAppointments();
  },

  renderHistory() {
    const tableBody = document.getElementById('history-table-body');
    if (!tableBody) return;

    const history = (window.SpaData && SpaData.treatmentHistory) ? SpaData.treatmentHistory : [];

    tableBody.innerHTML = history.map(item => `
      <div class="history-row">
        <div>
          <div class="history-treatment-name">${item.treatment}</div>
          <div class="text-muted">${item.id}</div>
        </div>
        <div>${item.therapist}</div>
        <div>${typeof formatDate === 'function' ? formatDate(item.date) : item.date}</div>
        <div>${item.duration}</div>
        <div>${typeof formatCurrency === 'function' ? formatCurrency(item.price) : '$' + item.price}</div>
        <div>
          <span class="badge badge-completed">COMPLETED</span>
        </div>
      </div>
    `).join('');
  },

  renderMembership() {
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;
    const planNameEl = document.getElementById('member-plan-title');
    const renewalEl = document.getElementById('member-renewal-date');
    const memberSinceEl = document.getElementById('member-since-date');

    if (planNameEl && user) planNameEl.textContent = user.membershipPlanName || 'Radiance Tier';
    if (renewalEl && user) renewalEl.textContent = typeof formatDate === 'function' ? formatDate(user.membershipRenewal) : user.membershipRenewal;
    if (memberSinceEl && user) memberSinceEl.textContent = typeof formatDate === 'function' ? formatDate(user.memberSince) : user.memberSince;
  },

  renderPlans() {
    const plansContainer = document.getElementById('membership-plans-list');
    if (!plansContainer || !window.SpaData || !SpaData.membershipPlans) return;

    plansContainer.innerHTML = SpaData.membershipPlans.map(plan => `
      <div class="membership-card ${plan.featured ? 'featured' : ''}">
        ${plan.badge ? `<span class="membership-popular-badge">${plan.badge}</span>` : ''}
        <h3 class="membership-plan-name">${plan.name}</h3>
        <p style="font-size:0.9rem;margin-bottom:1.5rem;opacity:0.8;">${plan.description}</p>
        <div class="membership-price-wrap">
          <span class="membership-price">${typeof formatCurrency === 'function' ? formatCurrency(plan.price) : '$' + plan.price}</span>
          <span class="membership-price-period">/ ${plan.period}</span>
        </div>
        <ul class="membership-features">
          ${plan.features.map(f => `
            <li class="membership-feature">
              <span class="membership-feature-check">✓</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
        <button class="btn-primary w-full" onclick="Dashboard.selectPlan('${plan.id}')">${plan.cta}</button>
      </div>
    `).join('');
  },

  selectPlan(planId) {
    const plan = SpaData.membershipPlans.find(p => p.id === planId);
    if (!plan) return;

    if (typeof Auth !== 'undefined') {
      Auth.updateProfile({
        membershipPlan: plan.id,
        membershipPlanName: plan.name,
        membershipStatus: 'active'
      });
      this.updateUserDisplay();
      if (typeof showToast === 'function') {
        showToast(`You have successfully enrolled in the ${plan.name}!`, 'success');
      }
      this.loadSection('membership');
    }
  },

  renderNotifications() {
    const container = document.getElementById('notifications-container');
    if (!container) return;

    const notifications = (typeof Storage !== 'undefined' ? Storage.get('spa-notifications') : null) ||
      (window.SpaData ? SpaData.notifications : []);

    if (notifications.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="text-muted">You have no notifications at this time.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = notifications.map(n => `
      <div class="notification-item ${!n.read ? 'unread' : ''}" onclick="Dashboard.markNotificationRead('${n.id}')">
        <div class="notification-icon ${n.type}">
          ${n.type === 'confirmation' ? '✓' : n.type === 'reminder' ? '⏰' : n.type === 'promotion' ? '🎁' : 'ℹ'}
        </div>
        <div class="notification-content">
          <div class="notification-title">${n.title}</div>
          <div class="notification-message">${n.message}</div>
          <div class="notification-date">${typeof formatDate === 'function' ? formatDate(n.date) : n.date}</div>
        </div>
      </div>
    `).join('');
  },

  markNotificationRead(notifId) {
    let notifications = (typeof Storage !== 'undefined' ? Storage.get('spa-notifications') : null) ||
      (window.SpaData ? SpaData.notifications : []);

    notifications = notifications.map(n => {
      if (n.id === notifId) return { ...n, read: true };
      return n;
    });

    if (typeof Storage !== 'undefined') {
      Storage.set('spa-notifications', notifications);
    }
    this.updateUserDisplay();
    this.renderNotifications();
  },

  renderProfile() {
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;
    if (!user) return;

    const fieldMap = {
      'profile-name': user.name,
      'profile-email': user.email,
      'profile-phone': user.phone,
      'profile-address': user.address || '',
      'profile-bio': user.bio || ''
    };

    Object.entries(fieldMap).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
  },

  setupProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedData = {
        name: document.getElementById('profile-name')?.value.trim(),
        email: document.getElementById('profile-email')?.value.trim(),
        phone: document.getElementById('profile-phone')?.value.trim(),
        address: document.getElementById('profile-address')?.value.trim(),
        bio: document.getElementById('profile-bio')?.value.trim()
      };

      if (typeof Auth !== 'undefined') {
        Auth.updateProfile(updatedData);
        this.updateUserDisplay();
        if (typeof showToast === 'function') {
          showToast('Profile updated successfully!', 'success');
        }
      }
    });
  }
};
