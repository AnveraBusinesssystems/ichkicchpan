(() => {
  const STORAGE_KEY = 'ichkiichpanReservations';
  const roles = {
    housekeeper: {
      label: 'Housekeeper',
      description: 'Arrivals, departures, guest notes, and cleaning workflow.',
      nav: ['dashboard', 'calendar', 'reservations'],
      eyebrow: 'HOUSEKEEPING OPERATIONS'
    },
    manager: {
      label: 'Manager',
      description: 'Reservations, payments, cleaning, and monthly performance.',
      nav: ['dashboard', 'calendar', 'reservations', 'expenses', 'reports'],
      eyebrow: 'PROPERTY MANAGEMENT'
    },
    owner: {
      label: 'Owner',
      description: 'Full operational control with daily, monthly, and yearly reporting.',
      nav: ['dashboard', 'calendar', 'reservations', 'expenses', 'reports', 'settings'],
      eyebrow: 'OWNER OVERVIEW'
    }
  };

  let selectedRole = sessionStorage.getItem('ichRole') || 'owner';
  const loginForm = document.querySelector('#loginForm');
  const passwordLabel = document.querySelector('#passwordInput')?.closest('label');

  injectStyles();

  if (loginForm && passwordLabel) {
    const chooser = document.createElement('div');
    chooser.className = 'role-selector';
    chooser.innerHTML = `
      <div class="role-selector-head">
        <span>Access view</span>
        <small>Preview only</small>
      </div>
      <div class="role-options">
        ${Object.entries(roles).map(([key, role]) => `
          <button class="role-option ${key === selectedRole ? 'selected' : ''}" type="button" data-role="${key}">
            <span class="role-option-title">${role.label}</span>
            <span class="role-option-copy">${role.description}</span>
          </button>
        `).join('')}
      </div>`;
    loginForm.insertBefore(chooser, passwordLabel);

    chooser.addEventListener('click', (event) => {
      const button = event.target.closest('[data-role]');
      if (!button) return;
      selectedRole = button.dataset.role;
      sessionStorage.setItem('ichRole', selectedRole);
      chooser.querySelectorAll('.role-option').forEach(item => item.classList.toggle('selected', item === button));
    });
  }

  function currentRole() {
    return sessionStorage.getItem('ichRole') || selectedRole;
  }

  function localDateISO() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
  }

  function getReservations() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveReservations(reservations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  }

  function checkInGuest(id) {
    const reservations = getReservations();
    const index = reservations.findIndex(item => item.id === id);
    if (index < 0) return;
    reservations[index].checkedInAt = new Date().toISOString();
    reservations[index].operationalStatus = 'Checked In';
    saveReservations(reservations);
    renderHousekeeperOperations();
    sanitizeHousekeeperView();
    showRoleToast(`${reservations[index].guestName || 'Guest'} checked in`);
  }

  function updateCleaning(id, status) {
    const reservations = getReservations();
    const index = reservations.findIndex(item => item.id === id);
    if (index < 0) return;
    reservations[index].cleaningStatus = status;
    saveReservations(reservations);
    renderHousekeeperOperations();
    showRoleToast(`Cleaning marked ${status.toLowerCase()}`);
  }

  function renderHousekeeperOperations() {
    const dashboard = document.querySelector('#dashboardView');
    if (!dashboard || currentRole() !== 'housekeeper') return;

    let section = document.querySelector('#housekeeperOperations');
    if (!section) {
      section = document.createElement('section');
      section.id = 'housekeeperOperations';
      section.className = 'panel hk-operations';
      dashboard.prepend(section);
    }

    const today = localDateISO();
    const reservations = getReservations().filter(r => r.status !== 'Cancelled');
    const arrivals = reservations.filter(r => r.checkIn === today);
    const departures = reservations.filter(r => r.checkOut === today);
    const upcomingCleaning = reservations
      .filter(r => r.checkIn >= today && r.cleaningStatus !== 'Completed')
      .sort((a, b) => a.checkIn.localeCompare(b.checkIn))
      .slice(0, 6);

    section.innerHTML = `
      <div class="panel-head hk-title-row">
        <div>
          <p class="eyebrow">TODAY'S OPERATIONS</p>
          <h3>${new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</h3>
        </div>
        <span class="hk-count">${arrivals.length} arrival${arrivals.length === 1 ? '' : 's'} · ${departures.length} departure${departures.length === 1 ? '' : 's'}</span>
      </div>
      <div class="hk-grid">
        <div class="hk-column">
          <div class="hk-section-label">Arrivals today</div>
          ${arrivals.length ? arrivals.map(r => `
            <article class="hk-operation-card">
              <div class="hk-card-main">
                <strong>${escapeHTML(r.guestName || 'Guest')}</strong>
                <span>${Number(r.guests || 0)} guests · Check-in 3:00 PM</span>
                ${r.notes ? `<p>${escapeHTML(r.notes)}</p>` : ''}
              </div>
              <div class="hk-card-actions">
                ${r.checkedInAt || r.operationalStatus === 'Checked In'
                  ? '<span class="hk-complete">Checked in</span>'
                  : `<button class="primary hk-checkin" data-checkin="${escapeHTML(r.id)}">Check in guest</button>`}
              </div>
            </article>`).join('') : '<div class="hk-empty">No arrivals scheduled today.</div>'}
        </div>
        <div class="hk-column">
          <div class="hk-section-label">Departures today</div>
          ${departures.length ? departures.map(r => `
            <article class="hk-operation-card">
              <div class="hk-card-main">
                <strong>${escapeHTML(r.guestName || 'Guest')}</strong>
                <span>${Number(r.guests || 0)} guests · Checkout 11:00 AM</span>
                ${r.notes ? `<p>${escapeHTML(r.notes)}</p>` : ''}
              </div>
              <div class="hk-card-actions">
                <button class="secondary" data-cleaning="${escapeHTML(r.id)}" data-status="Scheduled">Schedule cleaning</button>
                <button class="primary" data-cleaning="${escapeHTML(r.id)}" data-status="Completed">Mark cleaned</button>
              </div>
            </article>`).join('') : '<div class="hk-empty">No departures scheduled today.</div>'}
        </div>
      </div>
      <div class="hk-upcoming">
        <div class="hk-section-label">Upcoming cleaning preparation</div>
        <div class="hk-prep-list">
          ${upcomingCleaning.length ? upcomingCleaning.map(r => `
            <div class="hk-prep-row">
              <div><strong>${escapeHTML(r.guestName || 'Guest')}</strong><span>${formatDate(r.checkIn)} · ${Number(r.guests || 0)} guests</span></div>
              <span class="badge ${r.cleaningStatus === 'Pending' ? 'pending' : ''}">${escapeHTML(r.cleaningStatus || 'Pending')}</span>
            </div>`).join('') : '<div class="hk-empty">No cleaning preparation is pending.</div>'}
        </div>
      </div>`;

    section.querySelectorAll('[data-checkin]').forEach(button => {
      button.addEventListener('click', () => checkInGuest(button.dataset.checkin));
    });
    section.querySelectorAll('[data-cleaning]').forEach(button => {
      button.addEventListener('click', () => updateCleaning(button.dataset.cleaning, button.dataset.status));
    });
  }

  function sanitizeHousekeeperView() {
    const isHousekeeper = currentRole() === 'housekeeper';
    document.body.classList.toggle('housekeeper-mode', isHousekeeper);
    if (!isHousekeeper) return;

    // Hide owner/manager actions and all financial summaries.
    document.querySelector('#newReservationBtn')?.setAttribute('hidden', '');
    document.querySelector('#syncButton')?.setAttribute('hidden', '');
    document.querySelector('#pendingList')?.closest('.panel')?.setAttribute('hidden', '');

    document.querySelectorAll('.metric-card').forEach(card => {
      const label = (card.querySelector('.label')?.textContent || '').toLowerCase();
      if (/revenue|net|balance|income|expense|profit|nightly rate|commission|tax/.test(label)) {
        card.setAttribute('hidden', '');
      }
    });

    // Reservation table: hide total and balance columns, and suppress edit access.
    document.querySelectorAll('#reservationsView table tr').forEach(row => {
      [4, 5].forEach(index => row.children[index]?.setAttribute('hidden', ''));
      const actionCell = row.children[8];
      if (actionCell) {
        const id = actionCell.querySelector('[onclick*="editReservation"]')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        const reservation = getReservations().find(r => r.id === id);
        if (reservation?.checkIn === localDateISO() && !reservation.checkedInAt) {
          actionCell.innerHTML = `<button class="action-button hk-table-checkin" data-checkin="${escapeHTML(id)}">Check in</button>`;
          actionCell.querySelector('button')?.addEventListener('click', () => checkInGuest(id));
        } else {
          actionCell.innerHTML = reservation?.checkedInAt ? '<span class="badge">Checked in</span>' : '';
        }
      }
    });

    // Hide all monetary inputs in the reservation dialog in case it is opened indirectly.
    ['reservationAmount', 'amountReceived', 'cleaningFee', 'commission', 'taxes'].forEach(name => {
      document.querySelector(`[name="${name}"]`)?.closest('label')?.setAttribute('hidden', '');
    });
    document.querySelector('#deleteReservationBtn')?.setAttribute('hidden', '');
  }

  function applyRole() {
    const roleKey = currentRole();
    const role = roles[roleKey] || roles.owner;
    document.body.dataset.role = roleKey;

    document.querySelectorAll('.nav-item').forEach(item => {
      item.hidden = !role.nav.includes(item.dataset.view);
    });

    const eyebrow = document.querySelector('.topbar .eyebrow');
    if (eyebrow) eyebrow.textContent = role.eyebrow;

    let badge = document.querySelector('#roleBadge');
    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'roleBadge';
      badge.className = 'role-badge';
      document.querySelector('.top-actions')?.prepend(badge);
    }
    badge.textContent = `${role.label} view`;

    const sidebarBrand = document.querySelector('.sidebar-brand div:last-child');
    if (sidebarBrand) {
      let roleLine = sidebarBrand.querySelector('.sidebar-role');
      if (!roleLine) {
        roleLine = document.createElement('span');
        roleLine.className = 'sidebar-role';
        sidebarBrand.appendChild(roleLine);
      }
      roleLine.textContent = role.label;
    }

    if (roleKey === 'housekeeper') {
      renderHousekeeperOperations();
      sanitizeHousekeeperView();
    } else {
      document.querySelector('#housekeeperOperations')?.remove();
      document.body.classList.remove('housekeeper-mode');
      document.querySelector('#newReservationBtn')?.removeAttribute('hidden');
      document.querySelector('#syncButton')?.removeAttribute('hidden');
    }
  }

  function formatDate(value) {
    if (!value) return 'Date unavailable';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${value}T12:00:00`));
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function showRoleToast(message) {
    const toast = document.querySelector('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(showRoleToast.timer);
    showRoleToast.timer = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  function injectStyles() {
    if (document.querySelector('#roleOperationalStyles')) return;
    const style = document.createElement('style');
    style.id = 'roleOperationalStyles';
    style.textContent = `
      .hk-operations{margin-bottom:16px;border-top:3px solid var(--green)}
      .hk-title-row{align-items:flex-end}.hk-count{font-size:11px;font-weight:700;color:var(--muted)}
      .hk-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.hk-column{min-width:0}
      .hk-section-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:800;color:#59675f;margin-bottom:8px}
      .hk-operation-card{border:1px solid var(--line);padding:14px;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;gap:14px;background:#fff}
      .hk-card-main{display:grid;gap:4px}.hk-card-main strong{font-size:14px}.hk-card-main span,.hk-card-main p{font-size:11px;color:var(--muted);margin:0}
      .hk-card-actions{display:flex;gap:7px;align-items:center;flex-wrap:wrap;justify-content:flex-end}.hk-card-actions button{white-space:nowrap}
      .hk-complete{font-size:11px;font-weight:800;color:#1d684d;border-left:3px solid #1d684d;padding:6px 8px;background:#eaf4ef}
      .hk-empty{border:1px dashed #ccd5cf;padding:18px;font-size:12px;color:var(--muted);background:#fafbfa}
      .hk-upcoming{margin-top:18px;padding-top:14px;border-top:1px solid var(--line)}.hk-prep-list{display:grid;grid-template-columns:1fr 1fr;gap:7px 14px}
      .hk-prep-row{border-bottom:1px solid #e6ebe8;padding:9px 0;display:flex;justify-content:space-between;align-items:center;gap:12px}.hk-prep-row>div{display:grid;gap:3px}.hk-prep-row strong{font-size:12px}.hk-prep-row span{font-size:10px;color:var(--muted)}
      body.housekeeper-mode #reportsView,body.housekeeper-mode #expensesView,body.housekeeper-mode #settingsView{display:none!important}
      body.housekeeper-mode #dashboardView .dashboard-grid.lower .panel:last-child{display:none!important}
      body.housekeeper-mode #reservationsView th:nth-child(5),body.housekeeper-mode #reservationsView td:nth-child(5),body.housekeeper-mode #reservationsView th:nth-child(6),body.housekeeper-mode #reservationsView td:nth-child(6){display:none!important}
      @media(max-width:760px){.hk-grid,.hk-prep-list{grid-template-columns:1fr}.hk-operation-card{align-items:flex-start;display:grid}.hk-card-actions{justify-content:flex-start}}
    `;
    document.head.appendChild(style);
  }

  const observer = new MutationObserver(() => {
    if (currentRole() === 'housekeeper') sanitizeHousekeeperView();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.querySelector('#loginForm')?.addEventListener('submit', () => setTimeout(applyRole, 0));
  window.addEventListener('load', applyRole);
  setTimeout(applyRole, 0);
})();