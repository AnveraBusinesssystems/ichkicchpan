(() => {
  const reservationForm = document.querySelector('#reservationForm');
  const expenseForm = document.querySelector('#expenseForm');
  if (!reservationForm || !expenseForm) return;

  const originalEnrich = window.enrich;
  window.enrich = function reservationEnrichment(reservation) {
    const base = typeof originalEnrich === 'function' ? originalEnrich(reservation) : { ...reservation };
    const total = Number(reservation.reservationAmount || 0) + Number(reservation.cleaningFee || 0);
    return {
      ...base,
      total,
      balance: Math.max(0, total - Number(reservation.amountReceived || 0)),
      net: total - Number(reservation.commission || 0) - Number(reservation.taxes || 0)
    };
  };

  const platform = reservationForm.elements.platform;
  const agencyName = reservationForm.elements.agencyName;
  const recordType = reservationForm.elements.recordType;
  const completion = reservationForm.elements.dataComplete;
  const financialNames = ['reservationAmount', 'amountReceived', 'cleaningFee', 'commission', 'taxes'];

  function setFieldAvailability() {
    const isAgency = platform.value === 'Agency';
    agencyName.disabled = !isAgency;
    agencyName.required = isAgency;
    if (!isAgency) agencyName.value = '';

    const isBlock = recordType.value === 'Calendar Block';
    financialNames.forEach(name => {
      const input = reservationForm.elements[name];
      input.disabled = isBlock;
      if (isBlock) input.value = '';
    });
    reservationForm.elements.guests.disabled = isBlock;
    reservationForm.elements.cleaningStatus.disabled = isBlock;
    if (isBlock) {
      reservationForm.elements.guests.value = 0;
      reservationForm.elements.cleaningStatus.value = 'Not Required';
      reservationForm.elements.status.value = 'Confirmed';
    } else {
      if (Number(reservationForm.elements.guests.value || 0) < 1) reservationForm.elements.guests.value = 2;
      if (reservationForm.elements.cleaningStatus.value === 'Not Required') reservationForm.elements.cleaningStatus.value = 'Pending';
    }
    updateCompletionStatus();
  }

  function updateCompletionStatus() {
    const isBlock = recordType.value === 'Calendar Block';
    if (isBlock) {
      completion.value = 'Complete';
      return;
    }
    const required = [
      reservationForm.elements.guestName.value.trim(),
      reservationForm.elements.checkIn.value,
      reservationForm.elements.checkOut.value,
      Number(reservationForm.elements.guests.value || 0) > 0,
      platform.value
    ];
    completion.value = required.every(Boolean) ? 'Complete' : 'Information Pending';
  }

  function validateReservation(event) {
    const isBlock = recordType.value === 'Calendar Block';
    const checkIn = reservationForm.elements.checkIn.value;
    const checkOut = reservationForm.elements.checkOut.value;

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.toast?.('Check-out must be after check-in');
      return;
    }
    if (!isBlock && !reservationForm.elements.guestName.value.trim()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.toast?.('Guest name is required');
      return;
    }
    if (platform.value === 'Agency' && !agencyName.value.trim()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.toast?.('Agency name is required');
      return;
    }
    updateCompletionStatus();
  }

  platform.addEventListener('change', setFieldAvailability);
  recordType.addEventListener('change', setFieldAvailability);
  reservationForm.addEventListener('input', updateCompletionStatus);
  reservationForm.addEventListener('submit', validateReservation, true);

  const originalOpenReservation = window.openReservation;
  if (typeof originalOpenReservation === 'function') {
    window.openReservation = function enhancedOpenReservation(reservation) {
      originalOpenReservation(reservation);
      if (!reservationForm.elements.recordType.value) reservationForm.elements.recordType.value = 'Reservation';
      if (!reservationForm.elements.dataComplete.value) reservationForm.elements.dataComplete.value = 'Information Pending';
      setFieldAvailability();
    };
  }

  expenseForm.addEventListener('submit', event => {
    const amount = Number(expenseForm.elements.amount.value || 0);
    if (amount <= 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.toast?.('Expense amount must be greater than zero');
    }
  }, true);

  function addCompletenessBadges() {
    document.querySelectorAll('#reservationsTableBody tr').forEach(row => {
      const editButton = row.querySelector('[data-edit-res]');
      if (!editButton || row.querySelector('.completion-indicator')) return;
      const reservation = window.state?.reservations?.find(item => item.id === editButton.dataset.editRes);
      if (!reservation) return;
      const status = reservation.dataComplete || 'Information Pending';
      const indicator = document.createElement('div');
      indicator.className = `completion-indicator ${status === 'Complete' ? 'complete' : 'pending'}`;
      indicator.textContent = status;
      row.cells[0]?.appendChild(indicator);
    });
  }

  const tableObserver = new MutationObserver(addCompletenessBadges);
  const tableBody = document.querySelector('#reservationsTableBody');
  if (tableBody) tableObserver.observe(tableBody, { childList: true });

  const style = document.createElement('style');
  style.textContent = `
    .form-section-title{grid-column:1/-1;margin:8px 0 0;padding-top:12px;border-top:1px solid var(--line);font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
    .field-help{display:block;margin-top:4px;font-size:10px;line-height:1.35;color:var(--muted);font-weight:400}
    .completion-indicator{display:inline-block;margin-top:5px;padding:3px 6px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;border:1px solid}
    .completion-indicator.complete{color:#216047;background:#edf6f1;border-color:#b9d8c8}
    .completion-indicator.pending{color:#8b5b0b;background:#fff7df;border-color:#ead49a}
    input:disabled,select:disabled,textarea:disabled{background:#f1f3f2;color:#869088;cursor:not-allowed}
  `;
  document.head.appendChild(style);

  setFieldAvailability();
  setTimeout(() => {
    if (typeof window.renderAll === 'function' && !document.querySelector('#appView')?.hidden) window.renderAll();
  }, 0);
})();