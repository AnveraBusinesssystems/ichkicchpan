(() => {
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

  function applyRole() {
    const role = roles[sessionStorage.getItem('ichRole') || selectedRole] || roles.owner;
    document.body.dataset.role = sessionStorage.getItem('ichRole') || selectedRole;

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

    document.querySelectorAll('[data-owner-only]').forEach(el => el.hidden = document.body.dataset.role !== 'owner');
    document.querySelectorAll('[data-finance]').forEach(el => el.hidden = document.body.dataset.role === 'housekeeper');
  }

  document.querySelector('#loginForm')?.addEventListener('submit', () => setTimeout(applyRole, 0));
  window.addEventListener('load', applyRole);
  setTimeout(applyRole, 0);
})();