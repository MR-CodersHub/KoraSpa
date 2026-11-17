/**
 * KORA SPA — Multi-Step Booking Flow Manager
 */

const BookingManager = {
  currentStep: 1,
  totalSteps: 5,
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth(),

  booking: {
    treatment: null,
    therapist: null,
    date: null,
    time: null,
    duration: null,
    price: null,
    reference: null,
    notes: ''
  },

  init() {
    this.renderCalendar(this.currentYear, this.currentMonth);
    this.attachEventListeners();
    this.updateStepIndicator();
  },

  reset() {
    this.booking = {
      treatment: null,
      therapist: null,
      date: null,
      time: null,
      duration: null,
      price: null,
      reference: null,
      notes: ''
    };
    this.currentStep = 1;
    this.goToStep(1);
  },

  goToStep(step) {
    if (step < 1) step = 1;
    if (step > this.totalSteps) step = this.totalSteps;

    document.querySelectorAll('.booking-step').forEach((s, i) => {
      s.classList.toggle('active', i + 1 === step);
    });

    this.currentStep = step;
    this.updateStepIndicator();

    // Scroll booking container into view smoothly
    const bookingContainer = document.querySelector('.booking-container') || document.querySelector('.booking-step.active');
    if (bookingContainer) {
      bookingContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  updateStepIndicator() {
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
      const stepNum = i + 1;
      dot.classList.toggle('completed', stepNum < this.currentStep);
      dot.classList.toggle('active', stepNum === this.currentStep);
    });

    document.querySelectorAll('.step-line').forEach((line, i) => {
      line.classList.toggle('completed', i + 1 < this.currentStep);
    });
  },

  selectTreatment(treatmentId) {
    if (!window.SpaData || !SpaData.treatments) return;
    const treatment = SpaData.treatments.find(t => t.id === treatmentId);
    if (!treatment) return;

    this.booking.treatment = treatment;
    this.booking.price = treatment.price;
    this.booking.duration = treatment.duration[0];

    // Highlight selected card
    document.querySelectorAll('[data-treatment-id]').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-treatment-id') === treatmentId);
    });

    this.goToStep(2);
  },

  selectTherapist(therapistId) {
    if (therapistId === 'any') {
      this.booking.therapist = {
        id: 'any',
        name: 'Any Available Specialist',
        role: 'Assigned upon arrival based on optimal specialty fit',
        photo: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80'
      };
    } else {
      if (!window.SpaData || !SpaData.therapists) return;
      const therapist = SpaData.therapists.find(t => t.id === therapistId);
      if (!therapist) return;
      this.booking.therapist = therapist;
    }

    document.querySelectorAll('[data-therapist-id]').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-therapist-id') === therapistId);
    });

    this.goToStep(3);
  },

  renderCalendar(year, month) {
    const calendarContainer = document.querySelector('.calendar-grid');
    const monthLabel = document.querySelector('.calendar-month-label');
    if (!calendarContainer) return;

    this.currentYear = year;
    this.currentMonth = month;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (monthLabel) {
      monthLabel.textContent = `${monthNames[month]} ${year}`;
    }

    calendarContainer.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Padding blank days before the 1st
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      calendarContainer.appendChild(emptyCell);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayButton = document.createElement('button');
      dayButton.type = 'button';
      dayButton.className = 'calendar-day';
      dayButton.textContent = day;

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dayButton.setAttribute('data-date', dateStr);

      // Check if today
      if (dayDate.getTime() === today.getTime()) {
        dayButton.classList.add('today');
      }

      // Disable past dates
      if (dayDate < today) {
        dayButton.classList.add('unavailable');
        dayButton.disabled = true;
      } else {
        dayButton.classList.add('available');
        dayButton.addEventListener('click', () => {
          document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
          dayButton.classList.add('selected');
          this.selectDate(dateStr);
        });
      }

      // Check if previously selected
      if (this.booking.date === dateStr) {
        dayButton.classList.add('selected');
      }

      calendarContainer.appendChild(dayButton);
    }
  },

  prevMonth() {
    let m = this.currentMonth - 1;
    let y = this.currentYear;
    if (m < 0) {
      m = 11;
      y--;
    }
    this.renderCalendar(y, m);
  },

  nextMonth() {
    let m = this.currentMonth + 1;
    let y = this.currentYear;
    if (m > 11) {
      m = 0;
      y++;
    }
    this.renderCalendar(y, m);
  },

  selectDate(date) {
    this.booking.date = date;
    this.renderTimeSlots(date);
  },

  renderTimeSlots(date) {
    const slotsContainer = document.querySelector('.time-slots-grid');
    if (!slotsContainer) return;

    slotsContainer.innerHTML = '';
    const slots = (window.SpaData && SpaData.timeSlots) ? SpaData.timeSlots : [
      '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'
    ];

    // Simulate occasional booked slots
    const seed = date ? date.split('-').reduce((acc, v) => acc + parseInt(v, 10), 0) : 1;

    slots.forEach((time, idx) => {
      const slotBtn = document.createElement('button');
      slotBtn.type = 'button';
      slotBtn.className = 'time-slot';
      slotBtn.textContent = time;

      // Deterministically mark ~20% of slots as taken
      const isUnavailable = (seed + idx) % 5 === 0;

      if (isUnavailable) {
        slotBtn.classList.add('unavailable');
        slotBtn.title = 'Slot unavailable';
        slotBtn.disabled = true;
      } else {
        slotBtn.addEventListener('click', () => {
          document.querySelectorAll('.time-slot.selected').forEach(s => s.classList.remove('selected'));
          slotBtn.classList.add('selected');
          this.selectTime(time);
        });
      }

      if (this.booking.time === time) {
        slotBtn.classList.add('selected');
      }

      slotsContainer.appendChild(slotBtn);
    });
  },

  selectTime(time) {
    this.booking.time = time;
    this.goToStep(4);
    this.renderSummary();
  },

  renderSummary() {
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;

    // Apply member discount if applicable
    let discountPct = 0;
    if (user && user.membershipStatus === 'active') {
      if (user.membershipPlan === 'radiance') discountPct = 0.15;
      else if (user.membershipPlan === 'sanctuary') discountPct = 0.25;
      else if (user.membershipPlan === 'serenity') discountPct = 0.10;
    }

    const basePrice = this.booking.price || (this.booking.treatment ? this.booking.treatment.price : 140);
    const discountAmount = basePrice * discountPct;
    const finalPrice = basePrice - discountAmount;

    // Populate summary element IDs
    const elTreatment = document.getElementById('summary-treatment');
    const elTherapist = document.getElementById('summary-therapist');
    const elDate = document.getElementById('summary-date');
    const elTime = document.getElementById('summary-time');
    const elDuration = document.getElementById('summary-duration');
    const elPrice = document.getElementById('summary-price');
    const elDiscount = document.getElementById('summary-discount');
    const elTotal = document.getElementById('summary-total');

    if (elTreatment) elTreatment.textContent = this.booking.treatment?.name || 'Selected Treatment';
    if (elTherapist) elTherapist.textContent = this.booking.therapist?.name || 'Any Specialist';
    if (elDate) elDate.textContent = typeof formatDate === 'function' ? formatDate(this.booking.date) : this.booking.date;
    if (elTime) elTime.textContent = this.booking.time || '--';
    if (elDuration) elDuration.textContent = this.booking.duration || '60 min';
    if (elPrice) elPrice.textContent = typeof formatCurrency === 'function' ? formatCurrency(basePrice) : `$${basePrice}`;

    if (elDiscount) {
      if (discountPct > 0) {
        elDiscount.parentElement.style.display = 'flex';
        elDiscount.textContent = `-${typeof formatCurrency === 'function' ? formatCurrency(discountAmount) : '$' + discountAmount} (${discountPct * 100}% Member)`;
      } else {
        elDiscount.parentElement.style.display = 'none';
      }
    }

    if (elTotal) elTotal.textContent = typeof formatCurrency === 'function' ? formatCurrency(finalPrice) : `$${finalPrice}`;
  },

  confirmBooking() {
    const ref = typeof generateBookingRef === 'function' ? generateBookingRef() : 'KSP-' + Math.floor(100000 + Math.random() * 900000);
    this.booking.reference = ref;

    const notesInput = document.getElementById('booking-notes');
    if (notesInput) {
      this.booking.notes = notesInput.value.trim();
    }

    // Persist to localStorage
    const existingBookings = (typeof Storage !== 'undefined' ? Storage.get('spa-bookings') : null) ||
      (window.SpaData ? [...SpaData.sampleBookings] : []);

    const newBookingItem = {
      id: ref,
      treatment: this.booking.treatment ? this.booking.treatment.name : 'Holistic Treatment',
      treatmentId: this.booking.treatment?.id || 'relaxation-massage',
      therapist: this.booking.therapist ? this.booking.therapist.name : 'Specialist',
      therapistId: this.booking.therapist?.id || 'sarah-chen',
      date: this.booking.date || new Date().toISOString().split('T')[0],
      time: this.booking.time || '10:00 AM',
      duration: this.booking.duration || '60 min',
      price: this.booking.price || 140,
      status: 'confirmed',
      notes: this.booking.notes || ''
    };

    existingBookings.unshift(newBookingItem);
    if (typeof Storage !== 'undefined') {
      Storage.set('spa-bookings', existingBookings);
    }

    // Notification insertion
    const notifications = (typeof Storage !== 'undefined' ? Storage.get('spa-notifications') : null) ||
      (window.SpaData ? [...SpaData.notifications] : []);

    notifications.unshift({
      id: 'notif-' + Date.now(),
      type: 'confirmation',
      title: 'Booking Confirmed',
      message: `Your ${newBookingItem.treatment} on ${newBookingItem.date} at ${newBookingItem.time} is confirmed. Ref: ${ref}`,
      date: new Date().toISOString().split('T')[0],
      read: false
    });

    if (typeof Storage !== 'undefined') {
      Storage.set('spa-notifications', notifications);
    }

    // Transition to step 5 confirmation
    this.goToStep(5);

    const refElements = document.querySelectorAll('.booking-ref-display, #booking-ref');
    refElements.forEach(el => el.textContent = ref);

    if (typeof showToast === 'function') {
      showToast(`Appointment confirmed! Reference: ${ref}`, 'success');
    }
  },

  attachEventListeners() {
    // Month navigation buttons
    document.querySelectorAll('.calendar-prev').forEach(b => {
      b.addEventListener('click', () => this.prevMonth());
    });
    document.querySelectorAll('.calendar-next').forEach(b => {
      b.addEventListener('click', () => this.nextMonth());
    });

    // Step navigation buttons
    document.querySelectorAll('[data-next-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStep = parseInt(btn.getAttribute('data-next-step'), 10);
        this.goToStep(targetStep);
      });
    });

    document.querySelectorAll('[data-prev-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStep = parseInt(btn.getAttribute('data-prev-step'), 10);
        this.goToStep(targetStep);
      });
    });

    // Confirm button
    const confirmBtn = document.getElementById('btn-confirm-booking');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => this.confirmBooking());
    }
  }
};
