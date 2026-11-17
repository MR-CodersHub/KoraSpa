/**
 * KORA SPA — Client & Admin Portal Controller
 * Powers the two new dashboard experiences using the shared demo data.
 */

const Portal = {
  page: 'client',
  booking: { treatmentId: '', therapistId: 'any', date: '', time: '' },
  modalAction: null,
  pendingBookingId: null,

  init() {
    this.page = document.body.dataset.portal || 'client';
    this.bindNavigation();
    this.bindSidebar();
    this.bindSearch();
    this.bindActions();
    this.bindModal();

    if (this.page === 'client') this.initClient();
    if (this.page === 'admin') this.initAdmin();

    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('section-' + hash)) this.showSection(hash);
  },

  /* ── Shared navigation & layout ─────────────────────────── */
  bindNavigation() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-portal-section]');
      if (!trigger) return;
      e.preventDefault();
      this.showSection(trigger.dataset.portalSection);
    });
  },

  showSection(name) {
    document.querySelectorAll('.portal-section').forEach(section => {
      section.classList.toggle('active', section.id === 'section-' + name);
    });
    document.querySelectorAll('[data-portal-section]').forEach(item => {
      item.classList.toggle('active', item.dataset.portalSection === name);
    });

    const titles = {
      overview: ['Overview', this.page === 'admin' ? 'Operations at a glance' : 'Your sanctuary, beautifully organised'],
      treatments: ['Treatments', 'Explore our signature therapies'],
      book: ['Book a Slot', 'Reserve your therapist and preferred time'],
      appointments: ['My Appointments', 'Upcoming therapist sessions'],
      history: ['Treatment History', 'Your restorative archive'],
      membership: ['Membership', 'Your plan, benefits and billing'],
      plans: ['Membership Plans', 'Find your perfect wellness rhythm'],
      account: ['Client Portal', 'Login and profile settings'],
      bookings: ['Bookings', 'Every appointment across the spa'],
      therapists: ['Therapists', 'Our wellness specialists'],
      clients: ['Clients', 'Guest directory and membership standing'],
      treatmentsAdmin: ['Treatments', 'Service catalogue and pricing'],
      plansAdmin: ['Memberships', 'Active tiers and member counts'],
      enquiries: ['Enquiries', 'Guest messages and support desk']
    };
    const meta = titles[name] || [name, 'Kora Spa portal'];
    const titleEl = document.querySelector('[data-portal-title]');
    const subEl = document.querySelector('[data-portal-subtitle]');
    if (titleEl) titleEl.textContent = meta[0];
    if (subEl) subEl.textContent = meta[1];

    this.closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  bindSidebar() {
    const toggle = document.querySelector('.portal-menu-toggle');
    const sidebar = document.querySelector('.portal-sidebar');
    const scrim = document.querySelector('.sidebar-scrim');
    if (toggle) {
      toggle.addEventListener('click', () => {
        sidebar?.classList.toggle('open');
        scrim?.classList.toggle('open');
      });
    }
    scrim?.addEventListener('click', () => this.closeSidebar());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebar();
        this.closeModal();
      }
    });
  },

  closeSidebar() {
    document.querySelector('.portal-sidebar')?.classList.remove('open');
    document.querySelector('.sidebar-scrim')?.classList.remove('open');
  },

  bindSearch() {
    const input = document.querySelector('#portal-search');
    if (!input) return;
    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      const active = document.querySelector('.portal-section.active');
      if (!active) return;
      active.querySelectorAll('[data-searchable]').forEach(el => {
        el.hidden = !!term && !el.textContent.toLowerCase().includes(term);
      });
    });
  },

  bindActions() {
    document.addEventListener('click', (e) => {
      const t = e.target;

      const filter = t.closest('[data-treatment-filter]');
      if (filter) {
        document.querySelectorAll('[data-treatment-filter]').forEach(c => c.classList.toggle('active', c === filter));
        this.renderTreatments(filter.dataset.treatmentFilter);
        return;
      }

      const bookTreatment = t.closest('[data-book-treatment]');
      if (bookTreatment) {
        this.chooseTreatment(bookTreatment.dataset.bookTreatment);
        this.showSection('book');
        return;
      }

      const pickTreatment = t.closest('[data-book-pick-treatment]');
      if (pickTreatment) { this.chooseTreatment(pickTreatment.dataset.bookPickTreatment); return; }

      const pickTherapist = t.closest('[data-book-pick-therapist]');
      if (pickTherapist) { this.chooseTherapist(pickTherapist.dataset.bookPickTherapist); return; }

      const dateSlot = t.closest('[data-date-slot]');
      if (dateSlot) { this.chooseDate(dateSlot.dataset.dateSlot); return; }

      const timeSlot = t.closest('[data-time-slot]');
      if (timeSlot) { this.chooseTime(timeSlot.dataset.timeSlot); return; }

      const next = t.closest('[data-book-next]');
      if (next) { this.goBookStep(parseInt(next.dataset.bookNext, 10)); return; }

      const back = t.closest('[data-book-back]');
      if (back) { this.goBookStep(parseInt(back.dataset.bookBack, 10)); return; }

      if (t.closest('[data-book-confirm]')) { this.confirmBooking(); return; }

      const plan = t.closest('[data-choose-plan]');
      if (plan) { this.choosePlan(plan.dataset.choosePlan); return; }

      const details = t.closest('[data-details-booking]');
      if (details) { this.openBookingDetails(details.dataset.detailsBooking); return; }

      const reschedule = t.closest('[data-reschedule-booking]');
      if (reschedule) { this.openReschedule(reschedule.dataset.rescheduleBooking); return; }

      const cancel = t.closest('[data-cancel-booking]');
      if (cancel) { this.cancelBooking(cancel.dataset.cancelBooking); return; }

      const status = t.closest('[data-admin-status]');
      if (status) { this.updateBookingStatus(status.dataset.adminStatus); return; }

      const action = t.closest('[data-admin-action]');
      if (action) {
        const messages = {
          calendars: 'Calendar view opened for today’s therapist schedule.',
          clients: 'Guest directory is ready for review.',
          treatments: 'Service catalogue is ready for editing.',
          memberships: 'Membership tiers are ready for review.',
          enquiries: 'Support desk queue is up to date.',
          reports: 'Wellness performance report generated.'
        };
        showToast(messages[action.dataset.adminAction] || 'Action completed.', 'success');
      }
    });
  },

  bindModal() {
    this.modal = document.getElementById('portalModal');
    if (!this.modal) return;
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target.closest('[data-modal-close]')) this.closeModal();
    });
    const confirm = document.getElementById('portalModalConfirm');
    confirm?.addEventListener('click', () => {
      if (typeof this.modalAction === 'function') this.modalAction();
      this.closeModal();
    });
  },

  openModal(title, body, confirmLabel) {
    if (!this.modal) return;
    const titleEl = document.getElementById('portalModalTitle');
    const bodyEl = document.getElementById('portalModalBody');
    const confirmEl = document.getElementById('portalModalConfirm');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = body;
    if (confirmEl) {
      confirmEl.hidden = !confirmLabel;
      confirmEl.textContent = confirmLabel || 'Confirm';
    }
    this.modal.classList.add('open');
  },

  closeModal() {
    this.modal?.classList.remove('open');
    this.modalAction = null;
  },

  /* ── Helpers ────────────────────────────────────────────── */
  escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  },

  getBookings() {
    return (typeof Storage !== 'undefined' && Storage.get('spa-bookings')) ||
      (window.SpaData ? SpaData.sampleBookings : []);
  },

  saveBookings(bookings) {
    if (typeof Storage !== 'undefined') Storage.set('spa-bookings', bookings);
  },

  getCurrentPlan() {
    const id = (typeof Storage !== 'undefined' && Storage.get('spa-current-plan')) || 'radiance';
    const plans = window.SpaData ? SpaData.membershipPlans : [];
    return plans.find(p => p.id === id) || plans[0] || { id: 'radiance', name: 'Radiance Tier', price: 219 };
  },

  initials(name) {
    return String(name || 'K').split(/\s+/).slice(0, 2).map(p => p[0]).join('').toUpperCase();
  },

  toISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  nextDates(count) {
    const result = [];
    const base = new Date();
    for (let i = 1; i <= count; i++) {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i);
      result.push({
        iso: this.toISODate(d),
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return result;
  },

  statusBadge(status) {
    const label = String(status || '').charAt(0).toUpperCase() + String(status || '').slice(1);
    return `<span class="portal-badge ${this.escapeHtml(status)}">${this.escapeHtml(label)}</span>`;
  },

  icon(name) {
    const icons = {
      calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
      leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 4 13C4 9 8 4 20 4c0 12-5 16-9 16z"/><path d="M4 20c3-6 7-9 12-11"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.1l-5.9 3 1.2-6.5-4.8-4.6L9.1 8z"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>',
      calendarPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
    };
    return icons[name] || icons.leaf;
  },

  /* ── Client portal ──────────────────────────────────────── */
  initClient() {
    this.renderOverview();
    this.renderTreatments('all');
    this.renderBookingOptions();
    this.renderAppointments();
    this.renderHistory();
    this.renderMembership();
  },

  renderOverview() {
    const bookings = this.getBookings();
    const history = window.SpaData ? SpaData.treatmentHistory : [];
    const active = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
    const plan = this.getCurrentPlan();

    const setValue = (key, value) => {
      const el = document.querySelector(`[data-stat="${key}"]`);
      if (el) el.textContent = value;
    };
    setValue('upcoming', active.length);
    setValue('tier', plan.name.replace(' Tier', '').replace(' Elite', ''));
    setValue('credits', '4 sessions');
    setValue('visits', history.length);

    const upcomingEl = document.getElementById('clientUpcoming');
    if (upcomingEl) {
      const next = active[0];
      if (!next) {
        upcomingEl.innerHTML = `<div class="portal-empty">${this.icon('calendar')}<h4>No sessions scheduled</h4><p>Choose a therapy and reserve your preferred therapist slot.</p></div>`;
      } else {
        upcomingEl.innerHTML = `
          <div class="portal-list-item" data-searchable>
            <div class="portal-avatar">${this.initials(next.therapist)}</div>
            <div class="portal-list-main">
              <p class="portal-list-title">${this.escapeHtml(next.treatment)}</p>
              <p class="portal-list-sub">with ${this.escapeHtml(next.therapist)} · ${this.escapeHtml(next.duration)}</p>
            </div>
            <div class="portal-list-meta">
              ${this.statusBadge(next.status)}
              <strong style="margin-top:0.4rem">${this.escapeHtml(next.time)}</strong>
              <span>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(next.date) : next.date)}</span>
            </div>
          </div>`;
      }
    }

    const therapyEl = document.getElementById('clientSignature');
    if (therapyEl && window.SpaData) {
      therapyEl.innerHTML = SpaData.treatments.slice(0, 3).map(t => `
        <article class="pick-card" data-searchable data-book-treatment="${this.escapeHtml(t.id)}">
          <span class="therapy-card-category">${this.escapeHtml(t.category)}</span>
          <strong style="margin-top:0.4rem">${this.escapeHtml(t.name)}</strong>
          <small>${this.escapeHtml(t.duration[0])} · ${this.escapeHtml(t.shortDesc)}</small>
          <span class="pick-rating">${this.icon('star')} ${t.rating} · ${formatCurrency(t.price)}</span>
        </article>`).join('');
    }

    const historyEl = document.getElementById('clientHistoryMini');
    if (historyEl) {
      historyEl.innerHTML = history.slice(0, 3).map(h => `
        <div class="portal-timeline-item" data-searchable>
          <div class="portal-timeline-time">${this.escapeHtml(typeof formatDate === 'function' ? formatDate(h.date) : h.date)}</div>
          <div class="portal-timeline-title">${this.escapeHtml(h.treatment)}</div>
          <div class="portal-timeline-sub">with ${this.escapeHtml(h.therapist)} · ${this.escapeHtml(h.duration)}</div>
        </div>`).join('');
    }
  },

  treatmentCategory(id) {
    if (['deep-tissue-massage', 'swedish-massage', 'relaxation-massage'].includes(id)) return 'massage';
    if (id === 'hot-stone-therapy') return 'thermal';
    if (id === 'body-treatments') return 'body';
    return 'sensory';
  },

  renderTreatments(filter) {
    const grid = document.getElementById('treatmentGrid');
    if (!grid || !window.SpaData) return;
    const treatments = SpaData.treatments.filter(t => filter === 'all' || this.treatmentCategory(t.id) === filter);
    grid.innerHTML = treatments.map(t => `
      <article class="therapy-card" data-searchable>
        <img data-image="${this.escapeHtml(t.image)}" alt="${this.escapeHtml(t.name)}" loading="lazy">
        <div class="therapy-card-body">
          <span class="therapy-card-category">${this.escapeHtml(t.category)}</span>
          <h4>${this.escapeHtml(t.name)}</h4>
          <p>${this.escapeHtml(t.shortDesc)}</p>
          <div class="therapy-card-foot">
            <span class="therapy-price">${formatCurrency(t.price)} <small>/ ${this.escapeHtml(t.duration[0])}</small></span>
            <button type="button" class="portal-btn sm" data-book-treatment="${this.escapeHtml(t.id)}">Book slot</button>
          </div>
        </div>
      </article>`).join('');
    grid.querySelectorAll('img[data-image]').forEach(img => {
      img.src = img.dataset.image;
    });
  },

  renderBookingOptions() {
    const treatmentWrap = document.getElementById('bookTreatments');
    const therapistWrap = document.getElementById('bookTherapists');
    const dateWrap = document.getElementById('bookDates');
    const timeWrap = document.getElementById('bookTimes');
    if (!window.SpaData) return;

    if (treatmentWrap) {
      treatmentWrap.innerHTML = SpaData.treatments.map(t => `
        <button type="button" class="pick-card" data-book-pick-treatment="${this.escapeHtml(t.id)}" data-searchable>
          <span class="therapy-card-category">${this.escapeHtml(t.duration[0])}</span>
          <strong style="margin-top:0.4rem">${this.escapeHtml(t.name)}</strong>
          <small>${this.escapeHtml(t.category)}</small>
          <span class="pick-rating">${this.icon('star')} ${t.rating} · ${formatCurrency(t.price)}</span>
        </button>`).join('');
    }

    if (therapistWrap) {
      therapistWrap.innerHTML = `
        <button type="button" class="pick-card selected" data-book-pick-therapist="any" data-searchable>
          <div class="pick-avatar">K</div>
          <strong>First available</strong>
          <small>We will match you with the best qualified specialist for your chosen therapy.</small>
        </button>` +
        SpaData.therapists.map(t => `
          <button type="button" class="pick-card" data-book-pick-therapist="${this.escapeHtml(t.id)}" data-searchable>
            <div class="pick-avatar">${this.initials(t.name)}</div>
            <strong>${this.escapeHtml(t.name)}</strong>
            <small>${this.escapeHtml(t.role)}</small>
            <span class="pick-rating">${this.icon('star')} ${t.rating} · ${t.available ? 'Available' : 'Limited'}</span>
          </button>`).join('');
    }

    const dates = this.nextDates(5);
    if (dateWrap) {
      dateWrap.innerHTML = dates.map(d => `
        <button type="button" class="slot" data-date-slot="${d.iso}">
          <strong>${d.day}</strong><br>${d.month} ${d.date}
        </button>`).join('');
    }
    if (timeWrap) {
      const times = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];
      timeWrap.innerHTML = times.map(t => `<button type="button" class="slot" data-time-slot="${t}">${t}</button>`).join('');
    }
    this.updateBookSummary();
  },

  chooseTreatment(id) {
    this.booking.treatmentId = id;
    document.querySelectorAll('[data-book-pick-treatment]').forEach(el => {
      el.classList.toggle('selected', el.dataset.bookPickTreatment === id);
    });
    this.updateBookSummary();
  },

  chooseTherapist(id) {
    this.booking.therapistId = id;
    document.querySelectorAll('[data-book-pick-therapist]').forEach(el => {
      el.classList.toggle('selected', el.dataset.bookPickTherapist === id);
    });
    this.updateBookSummary();
  },

  chooseDate(iso) {
    this.booking.date = iso;
    document.querySelectorAll('[data-date-slot]').forEach(el => {
      el.classList.toggle('selected', el.dataset.dateSlot === iso);
    });
    this.updateBookSummary();
  },

  chooseTime(time) {
    this.booking.time = time;
    document.querySelectorAll('[data-time-slot]').forEach(el => {
      el.classList.toggle('selected', el.dataset.timeSlot === time);
    });
    this.updateBookSummary();
  },

  goBookStep(step) {
    if (!step || step < 1 || step > 3) return;
    if (step === 2 && !this.booking.treatmentId) {
      showToast('Choose a therapy before continuing.', 'warning');
      return;
    }
    if (step === 3 && !this.booking.therapistId) {
      showToast('Choose a therapist or first available.', 'warning');
      return;
    }
    document.querySelectorAll('.book-step').forEach(el => {
      el.classList.toggle('active', el.id === 'bookStep' + step);
    });
    document.querySelectorAll('.book-progress-step').forEach((el, index) => {
      el.classList.toggle('active', index === step - 1);
      el.classList.toggle('done', index < step - 1);
    });
  },

  updateBookSummary() {
    const treatment = (window.SpaData ? SpaData.treatments : []).find(t => t.id === this.booking.treatmentId);
    const therapist = (window.SpaData ? SpaData.therapists : []).find(t => t.id === this.booking.therapistId);
    const set = (key, value) => {
      const el = document.querySelector(`[data-summary="${key}"]`);
      if (el) el.textContent = value;
    };
    const price = treatment ? treatment.price : 0;
    const saving = Math.round(price * 0.2);
    set('treatment', treatment ? treatment.name : 'Select a therapy');
    set('therapist', this.booking.therapistId === 'any' ? 'First available specialist' : (therapist ? therapist.name : 'Select a therapist'));
    set('date', this.booking.date ? (typeof formatDate === 'function' ? formatDate(this.booking.date) : this.booking.date) : 'Choose a date');
    set('time', this.booking.time || 'Choose a time');
    set('duration', treatment ? treatment.duration[0] : '—');
    set('price', formatCurrency(price));
    set('saving', '-' + formatCurrency(saving));
    set('total', formatCurrency(price - saving));
  },

  confirmBooking() {
    if (!this.booking.treatmentId || !this.booking.date || !this.booking.time) {
      showToast('Please choose a therapy, date and time slot.', 'warning');
      return;
    }
    const treatment = SpaData.treatments.find(t => t.id === this.booking.treatmentId);
    const therapist = SpaData.therapists.find(t => t.id === this.booking.therapistId) || SpaData.therapists.find(t => t.available);
    const notesEl = document.getElementById('bookNotes');
    const booking = {
      id: typeof generateBookingRef === 'function' ? generateBookingRef() : 'KSP-' + Date.now().toString().slice(-6),
      treatment: treatment.name,
      treatmentId: treatment.id,
      therapist: therapist.name,
      therapistId: therapist.id,
      date: this.booking.date,
      time: this.booking.time,
      duration: treatment.duration[0],
      price: treatment.price,
      status: 'confirmed',
      notes: notesEl ? notesEl.value.trim() : ''
    };
    const bookings = this.getBookings();
    bookings.unshift(booking);
    this.saveBookings(bookings);
    this.booking = { treatmentId: '', therapistId: 'any', date: '', time: '' };
    document.querySelectorAll('[data-book-pick-treatment]').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('[data-book-pick-therapist]').forEach(el => {
      el.classList.toggle('selected', el.dataset.bookPickTherapist === 'any');
    });
    document.querySelectorAll('.slot.selected').forEach(el => el.classList.remove('selected'));
    if (notesEl) notesEl.value = '';
    this.goBookStep(1);
    this.renderAppointments();
    this.renderOverview();
    this.showSection('appointments');
    showToast('Your therapist slot is reserved. We look forward to welcoming you.', 'success');
  },

  renderAppointments() {
    const list = document.getElementById('appointmentsList');
    if (!list) return;
    const bookings = this.getBookings();
    if (!bookings.length) {
      list.innerHTML = `<div class="portal-empty">${this.icon('calendar')}<h4>No appointments yet</h4><p>Book a therapy to begin your wellness calendar.</p></div>`;
      return;
    }
    list.innerHTML = bookings.map(b => `
      <div class="portal-list-item" data-searchable>
        <div class="portal-avatar">${this.initials(b.therapist)}</div>
        <div class="portal-list-main">
          <p class="portal-list-title">${this.escapeHtml(b.treatment)}</p>
          <p class="portal-list-sub">with ${this.escapeHtml(b.therapist)} · ${this.escapeHtml(b.duration)} · ${this.escapeHtml(b.id)}</p>
        </div>
        <div class="portal-list-meta">
          ${this.statusBadge(b.status)}
          <strong style="margin-top:0.4rem">${this.escapeHtml(b.time)}</strong>
          <span>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(b.date) : b.date)}</span>
        </div>
        <div class="portal-row-actions" style="margin-inline-start:0.5rem">
          <button type="button" class="portal-btn sm secondary" data-details-booking="${this.escapeHtml(b.id)}">Details</button>
          <button type="button" class="portal-btn sm ghost" data-reschedule-booking="${this.escapeHtml(b.id)}">Reschedule</button>
          <button type="button" class="portal-btn sm danger" data-cancel-booking="${this.escapeHtml(b.id)}">Cancel</button>
        </div>
      </div>`).join('');
  },

  openBookingDetails(id) {
    const booking = this.getBookings().find(b => b.id === id);
    if (!booking) return;
    this.openModal('Appointment details', `
      <p class="portal-list-title" style="font-size:1.05rem">${this.escapeHtml(booking.treatment)}</p>
      <p class="portal-list-sub">Reference ${this.escapeHtml(booking.id)} · ${this.statusBadge(booking.status)}</p>
      <div class="book-summary" style="margin-top:1rem">
        <div class="book-summary-row"><span>Therapist</span><strong>${this.escapeHtml(booking.therapist)}</strong></div>
        <div class="book-summary-row"><span>Date</span><strong>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(booking.date) : booking.date)}</strong></div>
        <div class="book-summary-row"><span>Time</span><strong>${this.escapeHtml(booking.time)}</strong></div>
        <div class="book-summary-row"><span>Duration</span><strong>${this.escapeHtml(booking.duration)}</strong></div>
        <div class="book-summary-row"><span>Investment</span><strong>${formatCurrency(booking.price)}</strong></div>
      </div>
      ${booking.notes ? `<p class="portal-list-sub" style="margin-top:1rem"><strong>Your notes:</strong> ${this.escapeHtml(booking.notes)}</p>` : ''}
    `, 'Close');
  },

  openReschedule(id) {
    const booking = this.getBookings().find(b => b.id === id);
    if (!booking) return;
    this.pendingBookingId = id;
    const dates = this.nextDates(5);
    const times = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];
    this.openModal('Reschedule session', `
      <p class="portal-list-sub">Choose a new slot for <strong>${this.escapeHtml(booking.treatment)}</strong>.</p>
      <label class="portal-list-title" for="rescheduleDate" style="display:block;margin-bottom:0.4rem">Preferred date</label>
      <select id="rescheduleDate" class="form-select">
        ${dates.map(d => `<option value="${d.iso}">${d.day}, ${d.month} ${d.date}</option>`).join('')}
      </select>
      <label class="portal-list-title" for="rescheduleTime" style="display:block;margin:0.8rem 0 0.4rem">Preferred time</label>
      <select id="rescheduleTime" class="form-select">
        ${times.map(t => `<option value="${t}" ${t === booking.time ? 'selected' : ''}>${t}</option>`).join('')}
      </select>
    `, 'Confirm new slot');
    this.modalAction = () => {
      const date = document.getElementById('rescheduleDate')?.value;
      const time = document.getElementById('rescheduleTime')?.value;
      if (!date || !time) return;
      const bookings = this.getBookings().map(b => b.id === id ? { ...b, date, time } : b);
      this.saveBookings(bookings);
      this.renderAppointments();
      this.renderOverview();
      if (this.page === 'admin') this.renderAdmin();
      showToast('Appointment moved to your new preferred slot.', 'success');
    };
  },

  cancelBooking(id) {
    if (!window.confirm('Cancel this appointment? You can book a new slot any time.')) return;
    const bookings = this.getBookings().map(b => b.id === id ? { ...b, status: 'cancelled' } : b);
    this.saveBookings(bookings);
    this.renderAppointments();
    this.renderOverview();
    showToast('Appointment cancelled. Your wellness credits are unchanged.', 'info');
  },

  renderHistory() {
    const list = document.getElementById('historyList');
    if (!list) return;
    const history = window.SpaData ? SpaData.treatmentHistory : [];
    list.innerHTML = history.map(h => `
      <div class="portal-list-item" data-searchable>
        <div class="portal-avatar">${this.initials(h.therapist)}</div>
        <div class="portal-list-main">
          <p class="portal-list-title">${this.escapeHtml(h.treatment)}</p>
          <p class="portal-list-sub">with ${this.escapeHtml(h.therapist)} · ${this.escapeHtml(h.duration)}</p>
        </div>
        <div class="portal-list-meta">
          ${this.statusBadge('completed')}
          <strong style="margin-top:0.4rem">${formatCurrency(h.price)}</strong>
          <span>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(h.date) : h.date)}</span>
        </div>
      </div>`).join('');
  },

  choosePlan(id) {
    if (typeof Storage !== 'undefined') Storage.set('spa-current-plan', id);
    this.renderMembership();
    this.renderOverview();
    showToast('Your membership tier has been updated.', 'success');
  },

  renderMembership() {
    const plan = this.getCurrentPlan();
    const nameEl = document.querySelector('[data-current-plan-name]');
    const priceEl = document.querySelector('[data-current-plan-price]');
    if (nameEl) nameEl.textContent = plan.name;
    if (priceEl) priceEl.textContent = formatCurrency(plan.price) + ' / month';
    document.querySelectorAll('[data-current-plan-badge]').forEach(el => {
      el.textContent = plan.name + ' member';
    });

    const grid = document.getElementById('clientPlanGrid');
    if (!grid || !window.SpaData) return;
    grid.innerHTML = SpaData.membershipPlans.map(p => `
      <article class="plan-card ${p.featured ? 'featured' : ''} ${p.id === plan.id ? 'current' : ''}" data-searchable>
        ${p.badge ? `<span class="plan-badge">${this.escapeHtml(p.badge)}</span>` : ''}
        <h4 class="plan-name">${this.escapeHtml(p.name)}</h4>
        <div class="plan-price">${formatCurrency(p.price)} <small>${this.escapeHtml(p.period)}</small></div>
        <p class="plan-desc">${this.escapeHtml(p.description)}</p>
        <ul class="plan-features">
          ${p.features.slice(0, 4).map(f => `<li>${this.icon('check')}<span>${this.escapeHtml(f)}</span></li>`).join('')}
        </ul>
        <button type="button" class="portal-btn ${p.id === plan.id ? 'secondary' : ''}" data-choose-plan="${this.escapeHtml(p.id)}" ${p.id === plan.id ? 'disabled' : ''}>
          ${p.id === plan.id ? 'Current plan' : this.escapeHtml(p.cta)}
        </button>
      </article>`).join('');
  },

  /* ── Admin portal ───────────────────────────────────────── */
  initAdmin() {
    this.renderAdmin();
  },

  renderAdmin() {
    this.renderAdminOverview();
    this.renderAdminBookings();
    this.renderAdminTherapists();
    this.renderAdminClients();
    this.renderAdminTreatments();
    this.renderAdminPlans();
    this.renderAdminEnquiries();
  },

  renderAdminOverview() {
    const bookings = this.getBookings();
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const therapists = window.SpaData ? SpaData.therapists : [];
    const set = (key, value) => {
      const el = document.querySelector(`[data-admin-stat="${key}"]`);
      if (el) el.textContent = value;
    };
    set('bookings', confirmed);
    set('members', '642');
    set('revenue', '$4,280');
    set('team', therapists.filter(t => t.available).length);

    const scheduleEl = document.getElementById('adminSchedule');
    if (scheduleEl) {
      scheduleEl.innerHTML = bookings.slice(0, 5).map(b => `
        <div class="portal-list-item" data-searchable>
          <div class="portal-avatar">${this.initials(b.therapist)}</div>
          <div class="portal-list-main">
            <p class="portal-list-title">${this.escapeHtml(b.treatment)}</p>
            <p class="portal-list-sub">${this.escapeHtml(b.therapist)} · ${this.escapeHtml(b.duration)}</p>
          </div>
          <div class="portal-list-meta">
            <strong>${this.escapeHtml(b.time)}</strong>
            <span>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(b.date) : b.date)}</span>
          </div>
        </div>`).join('');
    }

    const barEl = document.getElementById('adminPlanBars');
    if (barEl && window.SpaData) {
      const counts = { serenity: 58, radiance: 76, sanctuary: 34 };
      barEl.innerHTML = SpaData.membershipPlans.map(p => `
        <div class="bar-row">
          <div class="bar-meta"><span>${this.escapeHtml(p.name)}</span><strong>${counts[p.id] || 22}%</strong></div>
          <div class="bar-track"><div class="bar-fill" style="width:${counts[p.id] || 22}%"></div></div>
        </div>`).join('');
    }
  },

  renderAdminBookings() {
    const table = document.getElementById('adminBookingsBody');
    if (!table) return;
    const bookings = this.getBookings();
    table.innerHTML = bookings.map(b => `
      <tr data-searchable>
        <td><span class="portal-client"><span class="portal-avatar">${this.initials('Alexandra Rivers')}</span>Alexandra Rivers</span></td>
        <td>${this.escapeHtml(b.treatment)}</td>
        <td>${this.escapeHtml(b.therapist)}</td>
        <td>${this.escapeHtml(typeof formatDate === 'function' ? formatDate(b.date) : b.date)}<br><span style="color:var(--color-text-muted)">${this.escapeHtml(b.time)}</span></td>
        <td>${this.statusBadge(b.status)}</td>
        <td>
          <div class="portal-row-actions">
            ${b.status !== 'confirmed' ? `<button type="button" class="portal-btn sm" data-admin-status="${this.escapeHtml(b.id)}:confirmed">Confirm</button>` : ''}
            ${b.status !== 'cancelled' ? `<button type="button" class="portal-btn sm danger" data-admin-status="${this.escapeHtml(b.id)}:cancelled">Cancel</button>` : ''}
          </div>
        </td>
      </tr>`).join('');
  },

  updateBookingStatus(value) {
    const [id, status] = value.split(':');
    if (!id || !status) return;
    const bookings = this.getBookings().map(b => b.id === id ? { ...b, status } : b);
    this.saveBookings(bookings);
    this.renderAdmin();
    showToast('Booking status updated.', 'success');
  },

  renderAdminTherapists() {
    const grid = document.getElementById('adminTherapists');
    if (!grid || !window.SpaData) return;
    grid.innerHTML = SpaData.therapists.map(t => `
      <article class="portal-card pad" data-searchable>
        <div style="display:flex;gap:0.9rem;align-items:flex-start">
          <div class="portal-avatar" style="width:3rem;height:3rem">${this.initials(t.name)}</div>
          <div style="min-width:0">
            <h4 class="portal-list-title" style="font-size:1rem">${this.escapeHtml(t.name)}</h4>
            <p class="portal-list-sub">${this.escapeHtml(t.role)}</p>
            <p class="portal-list-sub">${this.icon('star')} ${t.rating} · ${this.escapeHtml(t.experience)}</p>
          </div>
        </div>
        <p class="portal-list-sub" style="margin-top:0.9rem">${this.escapeHtml(t.specialties.join(' · '))}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-top:1rem">
          ${t.available ? '<span class="portal-badge active">Available</span>' : '<span class="portal-badge pending">Limited</span>'}
          <button type="button" class="portal-btn sm secondary" data-admin-action="calendars">View schedule</button>
        </div>
      </article>`).join('');
  },

  renderAdminClients() {
    const table = document.getElementById('adminClientsBody');
    if (!table) return;
    const clients = [
      { name: 'Alexandra Rivers', tier: 'Radiance', visits: 18, last: 'Nov 28, 2026', status: 'active' },
      { name: 'Jordan Miller', tier: 'Serenity', visits: 6, last: 'Nov 24, 2026', status: 'active' },
      { name: 'Sophia Kim', tier: 'Sanctuary Elite', visits: 32, last: 'Nov 22, 2026', status: 'active' },
      { name: 'Daniel Turner', tier: 'Radiance', visits: 11, last: 'Nov 18, 2026', status: 'pending' },
      { name: 'Emma Laurent', tier: 'Serenity', visits: 3, last: 'Nov 12, 2026', status: 'active' }
    ];
    table.innerHTML = clients.map(c => `
      <tr data-searchable>
        <td><span class="portal-client"><span class="portal-avatar">${this.initials(c.name)}</span>${this.escapeHtml(c.name)}</span></td>
        <td>${this.escapeHtml(c.tier)}</td>
        <td>${c.visits}</td>
        <td>${this.escapeHtml(c.last)}</td>
        <td>${this.statusBadge(c.status)}</td>
      </tr>`).join('');
  },

  renderAdminTreatments() {
    const grid = document.getElementById('adminTreatments');
    if (!grid || !window.SpaData) return;
    grid.innerHTML = SpaData.treatments.map(t => `
      <article class="portal-card pad" data-searchable>
        <span class="therapy-card-category">${this.escapeHtml(t.category)}</span>
        <h4 class="portal-list-title" style="font-size:1rem;margin-top:0.4rem">${this.escapeHtml(t.name)}</h4>
        <p class="portal-list-sub" style="margin-top:0.5rem">${this.escapeHtml(t.duration.join(' · '))} · ${this.icon('star')} ${t.rating}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;margin-top:1rem">
          <strong style="font-family:var(--font-serif);color:var(--color-champagne-dark)">${formatCurrency(t.price)}</strong>
          <button type="button" class="portal-btn sm secondary" data-admin-action="treatments">Manage</button>
        </div>
      </article>`).join('');
  },

  renderAdminPlans() {
    const grid = document.getElementById('adminPlanGrid');
    if (!grid || !window.SpaData) return;
    const active = { serenity: 214, radiance: 288, sanctuary: 140 };
    grid.innerHTML = SpaData.membershipPlans.map(p => `
      <article class="plan-card ${p.featured ? 'featured' : ''}" data-searchable>
        ${p.badge ? `<span class="plan-badge">${this.escapeHtml(p.badge)}</span>` : ''}
        <h4 class="plan-name">${this.escapeHtml(p.name)}</h4>
        <div class="plan-price">${formatCurrency(p.price)} <small>${this.escapeHtml(p.period)}</small></div>
        <p class="plan-desc">${this.escapeHtml(p.description)}</p>
        <div class="book-summary-row"><span>Active members</span><strong>${active[p.id] || 96}</strong></div>
        <div class="book-summary-row"><span>Included sessions</span><strong>${p.features[0]}</strong></div>
        <button type="button" class="portal-btn secondary" data-admin-action="memberships">Manage tier</button>
      </article>`).join('');
  },

  renderAdminEnquiries() {
    const list = document.getElementById('adminEnquiries');
    if (!list) return;
    const enquiries = [
      { name: 'Priya Nair', subject: 'Couples massage availability', time: '12 min ago', status: 'pending' },
      { name: 'Marcus Bell', subject: 'Membership upgrade question', time: '48 min ago', status: 'pending' },
      { name: 'Elena Fox', subject: 'Gift voucher redemption', time: '2 hours ago', status: 'active' },
      { name: 'Noah Reed', subject: 'Accessibility requirements', time: 'Yesterday', status: 'active' }
    ];
    list.innerHTML = enquiries.map(e => `
      <div class="portal-list-item" data-searchable>
        <div class="portal-avatar">${this.initials(e.name)}</div>
        <div class="portal-list-main">
          <p class="portal-list-title">${this.escapeHtml(e.subject)}</p>
          <p class="portal-list-sub">${this.escapeHtml(e.name)} · ${this.escapeHtml(e.time)}</p>
        </div>
        ${this.statusBadge(e.status === 'pending' ? 'pending' : 'completed')}
        <button type="button" class="portal-btn sm secondary" data-admin-action="enquiries" style="margin-inline-start:0.5rem">Reply</button>
      </div>`).join('');
  }
};

document.addEventListener('DOMContentLoaded', () => Portal.init());
