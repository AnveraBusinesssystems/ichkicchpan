const langButton = document.getElementById('langButton');

const copy = {
  en: {
    title: 'Reservations — Ichkiichpan',
    description: 'Select dates and prepare a reservation for Ichkiichpan, a private lagoon retreat in Bacalar.',
    ogTitle: 'Reservations — Ichkiichpan',
    ogDescription: 'Select your dates and prepare your stay at Ichkiichpan.',
    languageLabel: 'Change language',
    availability: 'Review dates',
    manageReservation: 'Manage my reservation',
    introLabel: 'Reservations · Ichkiichpan',
    introTitle: 'Plan your stay.',
    introBody: 'Select your dates and tell us who is coming. Availability and final pricing are confirmed before secure payment.',
    trustLine: 'Private retreat · Up to 14 guests · Secure payment',
    progressLabel: 'Reservation progress',
    progressStay: 'Your stay',
    progressDetails: 'Your details',
    progressPayment: 'Payment',
    stepOneLabel: '01 · Select your stay',
    stepOneTitle: 'Choose your dates.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    clear: 'Clear',
    calendarLabel: 'Select reservation dates',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    calendarPrompt: 'Select check-in and check-out',
    selected: 'Selected',
    unavailable: 'Unavailable',
    availableDate: 'Available',
    unavailableDate: 'Unavailable',
    selectedCheckIn: 'Selected check-in',
    selectedCheckOut: 'Selected check-out',
    guestsLabel: 'Guests',
    guestsTitle: 'Who is coming?',
    adults: 'Adults',
    adultAges: 'Ages 13+',
    children: 'Children',
    childAges: 'Ages 0–12',
    removeAdult: 'Remove adult',
    addAdult: 'Add adult',
    removeChild: 'Remove child',
    addChild: 'Add child',
    guestLimit: 'Maximum 14 guests.',
    factRetreat: 'Entire retreat',
    factRetreatBody: 'Private for your group',
    factRooms: '5 bedrooms',
    factRoomsBody: 'Up to 14 guests',
    factLagoon: 'Lagoon access',
    factLagoonBody: 'Two docks · kayaks',
    reviewDates: 'Review selected dates',
    dateError: 'Select a check-in and check-out date to continue.',
    selectionStatus: 'Dates selected',
    selectionTitle: 'Review your stay.',
    selectionBody: 'Your dates are ready. Live availability and final pricing will be verified before payment.',
    nights: 'Nights',
    selectionNote: 'No charge is made at this stage.',
    continueReservation: 'Continue with your details',
    stepTwoLabel: '02 · Your details',
    stepTwoTitle: 'Who should we<br><em>welcome?</em>',
    stepTwoBody: 'We will use these details for reservation communication and arrival information.',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    dialCodeLabel: 'Country calling code',
    phoneNumberLabel: 'Phone number',
    northAmerica: 'North America',
    europe: 'Europe',
    country: 'Country',
    preferredLanguage: 'Preferred language',
    requests: 'Anything we should know?',
    optional: 'Optional',
    requestsPlaceholder: 'Arrival notes, special requests, celebrations…',
    policiesPreview: 'Cancellation and house policies will be presented for review before payment.',
    guestError: 'Please complete the required guest information.',
    back: '← Back',
    continuePayment: 'Continue to payment',
    stepThreeLabel: '03 · Secure payment',
    stepThreeTitle: 'Secure your<br><em>reservation.</em>',
    stepThreeBody: 'Your payment details will be handled securely by Stripe and will never be stored on the Ichkiichpan website.',
    totalLabel: 'Reservation total',
    pendingPricing: 'Pending live pricing',
    paymentTotalBody: 'The final rate, taxes and deposit will appear here after live availability is verified.',
    paymentReadyTitle: 'Secure payment area',
    paymentReadyBody: 'Secure card fields and supported digital wallets appear here after verification.',
    stripeSecure: 'Secured by Stripe',
    encrypted: '🔒 Encrypted payment',
    secureCheckout: 'Secure checkout',
    confirmAfterPayment: 'Confirmation only after payment',
    paymentUnavailable: 'Payment available after verification',
    paymentWait: 'No reservation has been created and no payment has been taken.',
    summaryLabel: 'Your stay',
    summarySubtitle: 'Private lagoon retreat · Bacalar',
    pricing: 'Pricing',
    afterVerification: 'After availability verification',
    summaryNote: 'Final rate and payment terms will be shown before any charge.',
    manageLabel: 'Already reserved?',
    manageTitle: 'Manage your stay.',
    manageBody: 'Access your dates, payment status, balance, arrival information and guest requests securely.',
    privateAccess: 'Private guest access',
    noPassword: 'No account or password required.',
    manageInstructions: 'Use the email attached to your reservation and your reservation code. A secure access link verifies your email before opening the stay portal.',
    openManage: 'Open Manage My Stay',
    selectDate: 'Select date',
    chooseDate: 'Choose date',
    guestOne: 'guest',
    guestMany: 'guests',
    nightOne: 'night',
    nightMany: 'nights',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdayShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  },
  es: {
    title: 'Reservaciones — Ichkiichpan',
    description: 'Selecciona fechas y prepara una reservación para Ichkiichpan, un retiro privado junto a la laguna en Bacalar.',
    ogTitle: 'Reservaciones — Ichkiichpan',
    ogDescription: 'Selecciona tus fechas y prepara tu estancia en Ichkiichpan.',
    languageLabel: 'Cambiar idioma',
    availability: 'Revisar fechas',
    manageReservation: 'Gestionar mi reservación',
    introLabel: 'Reservaciones · Ichkiichpan',
    introTitle: 'Planea tu estancia.',
    introBody: 'Selecciona tus fechas y dinos quién viene. La disponibilidad y el precio final se confirman antes del pago seguro.',
    trustLine: 'Retiro privado · Hasta 14 huéspedes · Pago seguro',
    progressLabel: 'Progreso de la reservación',
    progressStay: 'Tu estancia',
    progressDetails: 'Tus datos',
    progressPayment: 'Pago',
    stepOneLabel: '01 · Selecciona tu estancia',
    stepOneTitle: 'Elige tus fechas.',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    clear: 'Borrar',
    calendarLabel: 'Seleccionar fechas de reservación',
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    calendarPrompt: 'Selecciona llegada y salida',
    selected: 'Seleccionada',
    unavailable: 'No disponible',
    availableDate: 'Disponible',
    unavailableDate: 'No disponible',
    selectedCheckIn: 'Llegada seleccionada',
    selectedCheckOut: 'Salida seleccionada',
    guestsLabel: 'Huéspedes',
    guestsTitle: '¿Quién viene?',
    adults: 'Adultos',
    adultAges: 'Mayores de 13 años',
    children: 'Niños',
    childAges: 'De 0 a 12 años',
    removeAdult: 'Quitar adulto',
    addAdult: 'Agregar adulto',
    removeChild: 'Quitar niño',
    addChild: 'Agregar niño',
    guestLimit: 'Máximo 14 huéspedes.',
    factRetreat: 'Retiro completo',
    factRetreatBody: 'Privado para tu grupo',
    factRooms: '5 habitaciones',
    factRoomsBody: 'Hasta 14 huéspedes',
    factLagoon: 'Acceso a la laguna',
    factLagoonBody: 'Dos muelles · kayaks',
    reviewDates: 'Revisar fechas seleccionadas',
    dateError: 'Selecciona una fecha de llegada y una de salida para continuar.',
    selectionStatus: 'Fechas seleccionadas',
    selectionTitle: 'Revisa tu estancia.',
    selectionBody: 'Tus fechas están listas. La disponibilidad en vivo y el precio final se verificarán antes del pago.',
    nights: 'Noches',
    selectionNote: 'En esta etapa no se realiza ningún cargo.',
    continueReservation: 'Continuar con tus datos',
    stepTwoLabel: '02 · Tus datos',
    stepTwoTitle: '¿A quién<br><em>recibiremos?</em>',
    stepTwoBody: 'Usaremos estos datos para comunicarnos sobre tu reservación y compartir la información de llegada.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    dialCodeLabel: 'Código telefónico del país',
    phoneNumberLabel: 'Número de teléfono',
    northAmerica: 'Norteamérica',
    europe: 'Europa',
    country: 'País',
    preferredLanguage: 'Idioma preferido',
    requests: '¿Hay algo que debamos saber?',
    optional: 'Opcional',
    requestsPlaceholder: 'Hora de llegada, solicitudes especiales, celebraciones…',
    policiesPreview: 'Las políticas de cancelación y de la casa se presentarán para tu revisión antes del pago.',
    guestError: 'Completa los datos obligatorios del huésped.',
    back: '← Regresar',
    continuePayment: 'Continuar al pago',
    stepThreeLabel: '03 · Pago seguro',
    stepThreeTitle: 'Asegura tu<br><em>reservación.</em>',
    stepThreeBody: 'Stripe procesará tus datos de pago de forma segura; nunca se almacenarán en el sitio web de Ichkiichpan.',
    totalLabel: 'Total de la reservación',
    pendingPricing: 'Precio pendiente',
    paymentTotalBody: 'La tarifa final, los impuestos y el depósito aparecerán aquí después de verificar la disponibilidad en vivo.',
    paymentReadyTitle: 'Área de pago seguro',
    paymentReadyBody: 'Los campos de pago seguro y las carteras digitales compatibles aparecerán aquí después de la verificación.',
    stripeSecure: 'Protegido por Stripe',
    encrypted: '🔒 Pago cifrado',
    secureCheckout: 'Proceso de pago seguro',
    confirmAfterPayment: 'Confirmación únicamente después del pago',
    paymentUnavailable: 'Pago disponible después de verificar',
    paymentWait: 'No se ha creado ninguna reservación ni se ha realizado ningún cargo.',
    summaryLabel: 'Tu estancia',
    summarySubtitle: 'Retiro privado junto a la laguna · Bacalar',
    pricing: 'Precio',
    afterVerification: 'Después de verificar disponibilidad',
    summaryNote: 'La tarifa final y las condiciones de pago se mostrarán antes de cualquier cargo.',
    manageLabel: '¿Ya reservaste?',
    manageTitle: 'Gestiona tu estancia.',
    manageBody: 'Consulta de forma segura tus fechas, pagos, saldo, información de llegada y solicitudes.',
    privateAccess: 'Acceso privado para huéspedes',
    noPassword: 'No necesitas cuenta ni contraseña.',
    manageInstructions: 'Usa el correo asociado con tu reservación y tu código de reservación. Un enlace seguro verificará tu correo antes de abrir el portal.',
    openManage: 'Abrir Gestionar mi estancia',
    selectDate: 'Selecciona fecha',
    chooseDate: 'Elige fecha',
    guestOne: 'huésped',
    guestMany: 'huéspedes',
    nightOne: 'noche',
    nightMany: 'noches',
    weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    weekdayShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  }
};

const callingCodeGroups = [
  {
    labelKey: 'northAmerica',
    countries: [
      { iso: 'MX', code: '+52', en: 'Mexico', es: 'México' },
      { iso: 'CA', code: '+1', en: 'Canada', es: 'Canadá' },
      { iso: 'US', code: '+1', en: 'United States', es: 'Estados Unidos' }
    ]
  },
  {
    labelKey: 'europe',
    countries: [
      { iso: 'AL', code: '+355', en: 'Albania', es: 'Albania' },
      { iso: 'AD', code: '+376', en: 'Andorra', es: 'Andorra' },
      { iso: 'AM', code: '+374', en: 'Armenia', es: 'Armenia' },
      { iso: 'AT', code: '+43', en: 'Austria', es: 'Austria' },
      { iso: 'AZ', code: '+994', en: 'Azerbaijan', es: 'Azerbaiyán' },
      { iso: 'BY', code: '+375', en: 'Belarus', es: 'Bielorrusia' },
      { iso: 'BE', code: '+32', en: 'Belgium', es: 'Bélgica' },
      { iso: 'BA', code: '+387', en: 'Bosnia and Herzegovina', es: 'Bosnia y Herzegovina' },
      { iso: 'BG', code: '+359', en: 'Bulgaria', es: 'Bulgaria' },
      { iso: 'HR', code: '+385', en: 'Croatia', es: 'Croacia' },
      { iso: 'CY', code: '+357', en: 'Cyprus', es: 'Chipre' },
      { iso: 'CZ', code: '+420', en: 'Czechia', es: 'Chequia' },
      { iso: 'DK', code: '+45', en: 'Denmark', es: 'Dinamarca' },
      { iso: 'EE', code: '+372', en: 'Estonia', es: 'Estonia' },
      { iso: 'FI', code: '+358', en: 'Finland', es: 'Finlandia' },
      { iso: 'FR', code: '+33', en: 'France', es: 'Francia' },
      { iso: 'GE', code: '+995', en: 'Georgia', es: 'Georgia' },
      { iso: 'DE', code: '+49', en: 'Germany', es: 'Alemania' },
      { iso: 'GR', code: '+30', en: 'Greece', es: 'Grecia' },
      { iso: 'HU', code: '+36', en: 'Hungary', es: 'Hungría' },
      { iso: 'IS', code: '+354', en: 'Iceland', es: 'Islandia' },
      { iso: 'IE', code: '+353', en: 'Ireland', es: 'Irlanda' },
      { iso: 'IT', code: '+39', en: 'Italy', es: 'Italia' },
      { iso: 'KZ', code: '+7', en: 'Kazakhstan', es: 'Kazajistán' },
      { iso: 'XK', code: '+383', en: 'Kosovo', es: 'Kosovo' },
      { iso: 'LV', code: '+371', en: 'Latvia', es: 'Letonia' },
      { iso: 'LI', code: '+423', en: 'Liechtenstein', es: 'Liechtenstein' },
      { iso: 'LT', code: '+370', en: 'Lithuania', es: 'Lituania' },
      { iso: 'LU', code: '+352', en: 'Luxembourg', es: 'Luxemburgo' },
      { iso: 'MT', code: '+356', en: 'Malta', es: 'Malta' },
      { iso: 'MD', code: '+373', en: 'Moldova', es: 'Moldavia' },
      { iso: 'MC', code: '+377', en: 'Monaco', es: 'Mónaco' },
      { iso: 'ME', code: '+382', en: 'Montenegro', es: 'Montenegro' },
      { iso: 'NL', code: '+31', en: 'Netherlands', es: 'Países Bajos' },
      { iso: 'MK', code: '+389', en: 'North Macedonia', es: 'Macedonia del Norte' },
      { iso: 'NO', code: '+47', en: 'Norway', es: 'Noruega' },
      { iso: 'PL', code: '+48', en: 'Poland', es: 'Polonia' },
      { iso: 'PT', code: '+351', en: 'Portugal', es: 'Portugal' },
      { iso: 'RO', code: '+40', en: 'Romania', es: 'Rumania' },
      { iso: 'RU', code: '+7', en: 'Russia', es: 'Rusia' },
      { iso: 'SM', code: '+378', en: 'San Marino', es: 'San Marino' },
      { iso: 'RS', code: '+381', en: 'Serbia', es: 'Serbia' },
      { iso: 'SK', code: '+421', en: 'Slovakia', es: 'Eslovaquia' },
      { iso: 'SI', code: '+386', en: 'Slovenia', es: 'Eslovenia' },
      { iso: 'ES', code: '+34', en: 'Spain', es: 'España' },
      { iso: 'SE', code: '+46', en: 'Sweden', es: 'Suecia' },
      { iso: 'CH', code: '+41', en: 'Switzerland', es: 'Suiza' },
      { iso: 'TR', code: '+90', en: 'Turkey', es: 'Turquía' },
      { iso: 'UA', code: '+380', en: 'Ukraine', es: 'Ucrania' },
      { iso: 'GB', code: '+44', en: 'United Kingdom', es: 'Reino Unido' },
      { iso: 'VA', code: '+39', en: 'Vatican City', es: 'Ciudad del Vaticano' }
    ]
  }
];

let language = copy[localStorage.getItem('ichkiichpan-language')] ? localStorage.getItem('ichkiichpan-language') : 'en';
const state = { step: 1, maxStep: 1, checkIn: '', checkOut: '', adults: 2, children: 0, nights: 0, guest: {}, calendarStart: null };
const steps = [...document.querySelectorAll('.booking-step')];
const progressButtons = [...document.querySelectorAll('[data-step-button]')];
const calendarMonths = document.getElementById('calendarMonths');
const dateMessage = document.getElementById('dateMessage');
const availabilityResult = document.getElementById('availabilityResult');
const guestForm = document.getElementById('guestForm');
const guestMessage = document.getElementById('guestMessage');
const mobileBookingBar = document.getElementById('mobileBookingBar');

function currentCopy() { return copy[language]; }

function renderCallingCodes() {
  const select = document.getElementById('dialCode');
  if (!select) return;
  const selectedValue = select.value || 'MX|+52';
  select.innerHTML = callingCodeGroups.map(group => {
    const options = group.countries.map(country => `<option value="${country.iso}|${country.code}">${country[language]} · ${country.code}</option>`).join('');
    return `<optgroup label="${currentCopy()[group.labelKey]}">${options}</optgroup>`;
  }).join('');
  select.value = [...select.options].some(option => option.value === selectedValue) ? selectedValue : 'MX|+52';
}
function isoToday() { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; }
function toIso(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function fromIso(value) { return new Date(`${value}T12:00:00`); }
function nightCount(start, end) { return start && end ? Math.round((fromIso(end) - fromIso(start)) / 86400000) : 0; }
function guestCount() { return state.adults + state.children; }
function isPast(iso) { return iso < isoToday(); }
function isInSelection(iso) { return state.checkIn && state.checkOut && iso > state.checkIn && iso < state.checkOut; }

function formatDate(value, short = false) {
  if (!value) return short ? currentCopy().selectDate : currentCopy().chooseDate;
  return new Intl.DateTimeFormat(language === 'es' ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric', year: short ? undefined : 'numeric' }).format(fromIso(value));
}

function monthName(date) {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-MX' : 'en-US', { month: 'long', year: 'numeric' }).format(date);
}

function guestLabel(total) { return `${total} ${total === 1 ? currentCopy().guestOne : currentCopy().guestMany}`; }
function nightLabel(total) { return `${total} ${total === 1 ? currentCopy().nightOne : currentCopy().nightMany}`; }

function updateReview() {
  document.getElementById('reviewCheckIn').textContent = state.checkIn ? formatDate(state.checkIn) : '—';
  document.getElementById('reviewCheckOut').textContent = state.checkOut ? formatDate(state.checkOut) : '—';
  document.getElementById('reviewNights').textContent = state.nights ? nightLabel(state.nights) : '—';
  document.getElementById('reviewGuests').textContent = guestLabel(guestCount());
}

function updateSummary() {
  const total = guestCount();
  state.nights = nightCount(state.checkIn, state.checkOut);
  document.getElementById('selectedCheckIn').textContent = formatDate(state.checkIn, true);
  document.getElementById('selectedCheckOut').textContent = formatDate(state.checkOut, true);
  document.getElementById('summaryCheckIn').textContent = formatDate(state.checkIn);
  document.getElementById('summaryCheckOut').textContent = formatDate(state.checkOut);
  document.getElementById('summaryGuests').textContent = guestLabel(total);
  document.getElementById('summaryNights').textContent = state.nights ? nightLabel(state.nights) : '—';
  document.getElementById('guestTotal').textContent = guestLabel(total);
  document.getElementById('adultCount').textContent = state.adults;
  document.getElementById('childCount').textContent = state.children;
  updateReview();
}

function renderMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const cells = [];
  for (let index = 0; index < first.getDay(); index += 1) cells.push('<span class="calendar-day empty" aria-hidden="true"></span>');
  for (let day = 1; day <= last.getDate(); day += 1) {
    const iso = toIso(new Date(year, month, day));
    const classes = ['calendar-day'];
    if (isPast(iso)) classes.push('disabled');
    if (iso === state.checkIn) classes.push('selected', 'check-in');
    if (iso === state.checkOut) classes.push('selected', 'check-out');
    if (isInSelection(iso)) classes.push('in-range');
    let status = isPast(iso) ? currentCopy().unavailableDate : currentCopy().availableDate;
    if (iso === state.checkIn) status = currentCopy().selectedCheckIn;
    if (iso === state.checkOut) status = currentCopy().selectedCheckOut;
    const label = `${formatDate(iso)} · ${status}`;
    cells.push(`<button type="button" class="${classes.join(' ')}" data-date="${iso}" aria-label="${label}" ${isPast(iso) ? 'disabled' : ''}>${day}</button>`);
  }
  const weekdays = currentCopy().weekdayShort.map((short, index) => `<span title="${currentCopy().weekdays[index]}">${short}</span>`).join('');
  return `<section class="calendar-month"><h3>${monthName(date)}</h3><div class="calendar-weekdays">${weekdays}</div><div class="calendar-grid">${cells.join('')}</div></section>`;
}

function renderCalendars() {
  if (!calendarMonths) return;
  if (!state.calendarStart) {
    const now = new Date();
    state.calendarStart = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  const second = new Date(state.calendarStart.getFullYear(), state.calendarStart.getMonth() + 1, 1);
  calendarMonths.innerHTML = renderMonth(state.calendarStart) + renderMonth(second);
  calendarMonths.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => selectDate(button.dataset.date)));
}

function selectDate(iso) {
  if (!state.checkIn || state.checkOut || iso < state.checkIn) {
    state.checkIn = iso;
    state.checkOut = '';
  } else if (iso === state.checkIn) {
    state.checkIn = '';
    state.checkOut = '';
  } else {
    state.checkOut = iso;
  }
  availabilityResult.hidden = true;
  dateMessage.textContent = '';
  updateSummary();
  renderCalendars();
}

function goToStep(step) {
  if (step < 1 || step > 3 || step > state.maxStep) return;
  state.step = step;
  document.body.dataset.bookingStep = String(step);
  steps.forEach(section => {
    const active = Number(section.dataset.step) === step;
    section.hidden = !active;
    section.classList.toggle('active', active);
  });
  progressButtons.forEach(button => {
    const number = Number(button.dataset.stepButton);
    button.disabled = number > state.maxStep;
    button.classList.toggle('active', number === step);
    if (number === step) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  if (mobileBookingBar) {
    mobileBookingBar.textContent = currentCopy().availability;
    mobileBookingBar.style.display = step === 1 ? '' : 'none';
  }
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function unlockStep(step) {
  state.maxStep = Math.max(state.maxStep, step);
  progressButtons.forEach(button => { button.disabled = Number(button.dataset.stepButton) > state.maxStep; });
}

function applyLanguage(lang) {
  language = copy[lang] ? lang : 'en';
  const translated = currentCopy();
  document.documentElement.lang = language;
  document.title = translated.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', translated.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', translated.ogTitle);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', translated.ogDescription);
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = translated[element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const value = translated[element.dataset.i18nAria];
    if (value) element.setAttribute('aria-label', value);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const value = translated[element.dataset.i18nPlaceholder];
    if (value) element.setAttribute('placeholder', value);
  });
  langButton?.setAttribute('aria-label', translated.languageLabel);
  if (langButton) langButton.innerHTML = language === 'en' ? 'EN <span>·</span> ES' : 'ES <span>·</span> EN';
  const preferredLanguage = guestForm?.elements.preferredLanguage;
  if (preferredLanguage) preferredLanguage.value = language === 'es' ? 'Español' : 'English';
  renderCallingCodes();
  if (dateMessage.textContent) dateMessage.textContent = translated.dateError;
  if (guestMessage.textContent) guestMessage.textContent = translated.guestError;
  localStorage.setItem('ichkiichpan-language', language);
  renderCalendars();
  updateSummary();
}

langButton?.addEventListener('click', () => applyLanguage(language === 'en' ? 'es' : 'en'));
progressButtons.forEach(button => button.addEventListener('click', () => goToStep(Number(button.dataset.stepButton))));
document.querySelectorAll('[data-back]').forEach(button => button.addEventListener('click', () => goToStep(Number(button.dataset.back))));

document.getElementById('calendarPrev')?.addEventListener('click', () => {
  const now = new Date();
  const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const previous = new Date(state.calendarStart.getFullYear(), state.calendarStart.getMonth() - 1, 1);
  if (previous >= currentMonth) { state.calendarStart = previous; renderCalendars(); }
});

document.getElementById('calendarNext')?.addEventListener('click', () => {
  state.calendarStart = new Date(state.calendarStart.getFullYear(), state.calendarStart.getMonth() + 1, 1);
  renderCalendars();
});

document.getElementById('clearDates')?.addEventListener('click', () => {
  state.checkIn = '';
  state.checkOut = '';
  availabilityResult.hidden = true;
  dateMessage.textContent = '';
  updateSummary();
  renderCalendars();
});

document.querySelectorAll('[data-counter]').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.counter;
  const change = Number(button.dataset.change);
  if (change > 0 && guestCount() >= 14) return;
  if (key === 'adults') state.adults = Math.max(1, state.adults + change);
  if (key === 'children') state.children = Math.max(0, state.children + change);
  updateSummary();
}));

document.getElementById('reviewDatesButton')?.addEventListener('click', () => {
  updateSummary();
  if (!state.checkIn || !state.checkOut || state.nights < 1) {
    dateMessage.textContent = currentCopy().dateError;
    availabilityResult.hidden = true;
    return;
  }
  dateMessage.textContent = '';
  updateReview();
  availabilityResult.hidden = false;
  availabilityResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('continueFromAvailability')?.addEventListener('click', () => {
  unlockStep(2);
  goToStep(2);
});

guestForm?.addEventListener('submit', event => {
  event.preventDefault();
  const firstInvalid = [...guestForm.elements].find(field => typeof field.checkValidity === 'function' && !field.checkValidity());
  if (firstInvalid) {
    guestMessage.textContent = currentCopy().guestError;
    firstInvalid.focus();
    return;
  }
  guestMessage.textContent = '';
  state.guest = Object.fromEntries(new FormData(guestForm));
  unlockStep(3);
  goToStep(3);
});

renderCalendars();
updateSummary();
applyLanguage(language);
document.body.dataset.bookingStep = '1';
