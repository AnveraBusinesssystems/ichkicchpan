/*
 * Ichkiichpan Cabin Management API
 * ---------------------------------
 * Google Sheet: 1GNCTg0jyz50Noro6cw4cvDaKdbXKtJA7FM1JhTiJUxg
 * Time zone: America/Cancun
 *
 * The Google Sheet owns the calculations. This script only:
 *  - reads calculated values
 *  - writes reservation/expense input fields
 *  - records operational actions
 *  - imports iCal availability feeds
 *  - sends scheduled email alerts
 *
 * IMPORTANT SETUP
 * Run setupIchkiichpan() once from the Apps Script editor.
 * Then open Project Settings > Script Properties and fill in:
 *   APP_PASSWORD
 *   AIRBNB_ICAL_URL
 *   VRBO_ICAL_URL
 *   BOOKING_ICAL_URL
 *   OWNER_EMAILS
 *   MANAGER_EMAILS
 *   HOUSEKEEPER_EMAILS
 */

const CONFIG = Object.freeze({
  SPREADSHEET_ID: '1GNCTg0jyz50Noro6cw4cvDaKdbXKtJA7FM1JhTiJUxg',
  TIME_ZONE: 'America/Cancun',
  MAX_DATA_ROW: 1000,
  SHEETS: Object.freeze({
    RESERVATIONS: 'Reservations',
    EXPENSES: 'Expenses',
    AGENCIES: 'Agencies',
    ALERTS: 'Alerts Log',
    SETTINGS: 'Settings',
    DASHBOARD: 'Dashboard',
    METRICS: 'Metrics'
  }),
  ROLE_FIELDS: Object.freeze({
    housekeeper: [
      'id', 'confirmationNumber', 'guestName', 'platform', 'agencyName',
      'checkIn', 'checkOut', 'guests', 'status', 'cleaningStatus', 'notes',
      'source', 'lastUpdated', 'nights', 'daysUntilCheckIn', 'stayStatus',
      'conflict', 'checkInConfirmed', 'checkedInAt', 'checkOutConfirmed',
      'checkedOutAt', 'arrivalToday', 'departureToday', 'alertRequired'
    ],
    manager: null,
    owner: null
  })
});

const RESERVATION_COLUMNS = Object.freeze({
  id: 1,
  confirmationNumber: 2,
  guestName: 3,
  platform: 4,
  agencyName: 5,
  checkIn: 6,
  checkOut: 7,
  guests: 8,
  reservationAmount: 9,
  cleaningFee: 10,
  commission: 11,
  taxes: 12,
  amountReceived: 13,
  status: 14,
  cleaningStatus: 15,
  notes: 16,
  source: 17,
  lastUpdated: 18,
  nights: 19,
  balancePending: 20,
  netRevenue: 21,
  daysUntilCheckIn: 22,
  stayStatus: 23,
  conflict: 24,
  checkInConfirmed: 25,
  checkedInAt: 26,
  checkOutConfirmed: 27,
  checkedOutAt: 28,
  arrivalToday: 29,
  departureToday: 30,
  monthKey: 31,
  year: 32,
  alertRequired: 33
});

const EXPENSE_COLUMNS = Object.freeze({
  id: 1,
  date: 2,
  category: 3,
  vendor: 4,
  description: 5,
  reservationId: 6,
  amount: 7,
  paymentMethod: 8,
  receiptLink: 9,
  notes: 10,
  createdAt: 11
});

// -----------------------------------------------------------------------------
// Web API
// -----------------------------------------------------------------------------

function doGet(e) {
  return handleRequest_((e && e.parameter) || {}, null);
}

function doPost(e) {
  let body = {};
  try {
    body = e && e.postData && e.postData.contents
      ? JSON.parse(e.postData.contents)
      : {};
  } catch (error) {
    return json_({ ok: false, error: 'Invalid JSON request body.' });
  }
  return handleRequest_(body, e);
}

function handleRequest_(request) {
  try {
    const action = cleanString_(request.action || 'health');

    if (action === 'health') {
      return json_({
        ok: true,
        service: 'Ichkiichpan Cabin Management API',
        version: '2.0.0',
        timeZone: CONFIG.TIME_ZONE,
        serverTime: formatDateTime_(new Date())
      });
    }

    authenticate_(request);
    const role = normalizeRole_(request.role);
    const payload = request.payload || request;
    let result;

    switch (action) {
      case 'getBootstrap':
        result = getBootstrap_(role, payload);
        break;
      case 'getReservations':
        result = readReservations_(role, payload);
        break;
      case 'getReservation':
        result = getReservationById_(payload.id, role);
        break;
      case 'saveReservation':
        requireRole_(role, ['manager', 'owner']);
        result = saveReservation_(payload);
        break;
      case 'cancelReservation':
        requireRole_(role, ['manager', 'owner']);
        result = cancelReservation_(payload.id, payload.reason);
        break;
      case 'deleteReservation':
        requireRole_(role, ['owner']);
        result = deleteReservation_(payload.id);
        break;
      case 'confirmCheckIn':
        requireRole_(role, ['housekeeper', 'manager', 'owner']);
        result = confirmCheckIn_(payload.id);
        break;
      case 'confirmCheckOut':
        requireRole_(role, ['housekeeper', 'manager', 'owner']);
        result = confirmCheckOut_(payload.id);
        break;
      case 'updateCleaningStatus':
        requireRole_(role, ['housekeeper', 'manager', 'owner']);
        result = updateCleaningStatus_(payload.id, payload.status);
        break;
      case 'getExpenses':
        requireRole_(role, ['manager', 'owner']);
        result = readExpenses_(payload);
        break;
      case 'saveExpense':
        requireRole_(role, ['manager', 'owner']);
        result = saveExpense_(payload);
        break;
      case 'deleteExpense':
        requireRole_(role, ['manager', 'owner']);
        result = deleteExpense_(payload.id);
        break;
      case 'getMetrics':
        result = readMetrics_(role, payload);
        break;
      case 'setMetricPeriod':
        requireRole_(role, ['manager', 'owner']);
        result = setMetricPeriod_(payload);
        break;
      case 'syncCalendars':
        requireRole_(role, ['owner']);
        result = syncICalFeeds();
        break;
      case 'getCalendarStatus':
        requireRole_(role, ['owner']);
        result = getCalendarConfiguration_();
        break;
      case 'sendAlertsNow':
        requireRole_(role, ['owner']);
        result = runScheduledAlerts();
        break;
      default:
        throw new Error('Unknown action: ' + action);
    }

    return json_({ ok: true, action: action, data: result });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return json_({ ok: false, error: error.message || String(error) });
  }
}

function authenticate_(request) {
  const expected = PropertiesService.getScriptProperties().getProperty('APP_PASSWORD') || 'ICHICH';
  const received = cleanString_(request.password);
  if (!received || received !== expected) {
    throw new Error('Unauthorized.');
  }
}

function normalizeRole_(role) {
  const normalized = cleanString_(role || 'owner').toLowerCase();
  return ['housekeeper', 'manager', 'owner'].includes(normalized) ? normalized : 'owner';
}

function requireRole_(role, allowed) {
  if (!allowed.includes(role)) throw new Error('This role is not allowed to perform that action.');
}

// -----------------------------------------------------------------------------
// Bootstrap and reads
// -----------------------------------------------------------------------------

function getBootstrap_(role, payload) {
  const response = {
    role: role,
    settings: readPublicSettings_(),
    reservations: readReservations_(role, payload || {}),
    metrics: readMetrics_(role, payload || {})
  };

  if (role !== 'housekeeper') {
    response.expenses = readExpenses_(payload || {});
  }

  return response;
}

function readReservations_(role, filters) {
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const lastInputRow = lastPopulatedIdRow_(sheet);
  if (lastInputRow < 2) return [];

  const rows = sheet.getRange(2, 1, lastInputRow - 1, 33).getValues();
  let reservations = rows
    .filter(row => cleanString_(row[0]))
    .map(mapReservationRow_);

  const from = parseDateOnly_(filters && filters.from);
  const to = parseDateOnly_(filters && filters.to);
  const status = cleanString_(filters && filters.status);

  if (from) reservations = reservations.filter(item => parseDateOnly_(item.checkOut) >= from);
  if (to) reservations = reservations.filter(item => parseDateOnly_(item.checkIn) <= to);
  if (status) reservations = reservations.filter(item => item.status === status || item.stayStatus === status);

  reservations.sort((a, b) => String(a.checkIn).localeCompare(String(b.checkIn)));
  return reservations.map(item => sanitizeReservationForRole_(item, role));
}

function getReservationById_(id, role) {
  const row = findRowById_(sheet_(CONFIG.SHEETS.RESERVATIONS), id);
  if (!row) throw new Error('Reservation not found.');
  const item = mapReservationRow_(sheet_(CONFIG.SHEETS.RESERVATIONS).getRange(row, 1, 1, 33).getValues()[0]);
  return sanitizeReservationForRole_(item, role);
}

function mapReservationRow_(row) {
  return {
    id: cleanString_(row[0]),
    confirmationNumber: cleanString_(row[1]),
    guestName: cleanString_(row[2]),
    platform: cleanString_(row[3]),
    agencyName: cleanString_(row[4]),
    checkIn: dateIso_(row[5]),
    checkOut: dateIso_(row[6]),
    guests: number_(row[7]),
    reservationAmount: number_(row[8]),
    cleaningFee: number_(row[9]),
    commission: number_(row[10]),
    taxes: number_(row[11]),
    amountReceived: number_(row[12]),
    status: cleanString_(row[13]),
    cleaningStatus: cleanString_(row[14]),
    notes: cleanString_(row[15]),
    source: cleanString_(row[16]),
    lastUpdated: dateTimeIso_(row[17]),
    nights: number_(row[18]),
    balancePending: number_(row[19]),
    netRevenue: number_(row[20]),
    daysUntilCheckIn: row[21] === '' ? null : number_(row[21]),
    stayStatus: cleanString_(row[22]),
    conflict: cleanString_(row[23]),
    checkInConfirmed: cleanString_(row[24]),
    checkedInAt: dateTimeIso_(row[25]),
    checkOutConfirmed: cleanString_(row[26]),
    checkedOutAt: dateTimeIso_(row[27]),
    arrivalToday: Boolean(row[28]),
    departureToday: Boolean(row[29]),
    monthKey: cleanString_(row[30]),
    year: row[31] === '' ? null : number_(row[31]),
    alertRequired: cleanString_(row[32])
  };
}

function sanitizeReservationForRole_(reservation, role) {
  if (role !== 'housekeeper') return reservation;
  const allowed = CONFIG.ROLE_FIELDS.housekeeper;
  return allowed.reduce((result, key) => {
    result[key] = reservation[key];
    return result;
  }, {});
}

function readExpenses_(filters) {
  const sheet = sheet_(CONFIG.SHEETS.EXPENSES);
  const lastRow = lastPopulatedIdRow_(sheet);
  if (lastRow < 2) return [];

  const from = parseDateOnly_(filters && filters.from);
  const to = parseDateOnly_(filters && filters.to);

  return sheet.getRange(2, 1, lastRow - 1, 11).getValues()
    .filter(row => cleanString_(row[0]))
    .map(row => ({
      id: cleanString_(row[0]),
      date: dateIso_(row[1]),
      category: cleanString_(row[2]),
      vendor: cleanString_(row[3]),
      description: cleanString_(row[4]),
      reservationId: cleanString_(row[5]),
      amount: number_(row[6]),
      paymentMethod: cleanString_(row[7]),
      receiptLink: cleanString_(row[8]),
      notes: cleanString_(row[9]),
      createdAt: dateTimeIso_(row[10])
    }))
    .filter(item => !from || parseDateOnly_(item.date) >= from)
    .filter(item => !to || parseDateOnly_(item.date) <= to)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function readMetrics_(role, options) {
  if (options && (options.date || options.month || options.year)) {
    setMetricPeriod_(options);
  }

  SpreadsheetApp.flush();
  const sheet = sheet_(CONFIG.SHEETS.METRICS);
  const rows = sheet.getRange(2, 1, 29, 4).getValues();
  const result = { daily: {}, monthly: {}, yearly: {} };

  rows.forEach(row => {
    const scope = cleanString_(row[0]).toLowerCase();
    const key = cleanString_(row[3]);
    if (!scope || !key || !result[scope]) return;
    result[scope][key] = normalizeCellValue_(row[2]);
  });

  if (role === 'housekeeper') {
    return {
      daily: pick_(result.daily, [
        'daily_date', 'daily_arrivals', 'daily_departures',
        'daily_current_stays', 'daily_cleaning_due'
      ])
    };
  }

  if (role === 'manager') {
    return { daily: result.daily, monthly: result.monthly };
  }

  return result;
}

function setMetricPeriod_(options) {
  const sheet = sheet_(CONFIG.SHEETS.METRICS);
  const updates = [];

  if (options.date) {
    const date = requireDate_(options.date, 'date');
    updates.push({ range: 'G2', value: date });
  }
  if (options.month) {
    const monthDate = monthToDate_(options.month);
    updates.push({ range: 'G3', value: monthDate });
  }
  if (options.year !== undefined && options.year !== null && options.year !== '') {
    const year = Number(options.year);
    if (!Number.isInteger(year) || year < 2000 || year > 2200) throw new Error('Invalid report year.');
    updates.push({ range: 'G4', value: year });
  }

  updates.forEach(item => sheet.getRange(item.range).setValue(item.value));
  SpreadsheetApp.flush();

  return {
    date: dateIso_(sheet.getRange('G2').getValue()),
    month: Utilities.formatDate(sheet.getRange('G3').getValue(), CONFIG.TIME_ZONE, 'yyyy-MM'),
    year: number_(sheet.getRange('G4').getValue())
  };
}

// -----------------------------------------------------------------------------
// Reservation writes
// -----------------------------------------------------------------------------

function saveReservation_(payload) {
  validateReservation_(payload);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
    const id = cleanString_(payload.id) || generateId_('RES');
    let row = findRowById_(sheet, id);
    const isNew = !row;

    if (!row) row = firstBlankIdRow_(sheet);
    if (!row) throw new Error('No blank reservation rows remain. Extend the sheet beyond row ' + CONFIG.MAX_DATA_ROW + '.');

    const existing = isNew ? null : mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
    const values = [[
      id,
      cleanString_(payload.confirmationNumber),
      cleanString_(payload.guestName),
      cleanString_(payload.platform),
      cleanString_(payload.agencyName),
      requireDate_(payload.checkIn, 'check-in'),
      requireDate_(payload.checkOut, 'check-out'),
      number_(payload.guests),
      number_(payload.reservationAmount),
      number_(payload.cleaningFee),
      number_(payload.commission),
      number_(payload.taxes),
      number_(payload.amountReceived),
      cleanString_(payload.status || 'Confirmed'),
      cleanString_(payload.cleaningStatus || 'Pending'),
      cleanString_(payload.notes),
      cleanString_(payload.source || 'Website'),
      new Date()
    ]];

    // Only input columns A:R are written. S:AG remain formula/operational columns.
    sheet.getRange(row, 1, 1, 18).setValues(values);
    SpreadsheetApp.flush();

    const saved = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
    if (isNew) {
      sendReservationEventEmail_('NEW_RESERVATION', saved);
    } else if (existing && existing.status !== 'Cancelled' && saved.status === 'Cancelled') {
      sendReservationEventEmail_('CANCELLATION', saved);
    } else {
      sendReservationEventEmail_('RESERVATION_UPDATED', saved, { quiet: true });
    }
    return saved;
  } finally {
    lock.releaseLock();
  }
}

function validateReservation_(payload) {
  if (!cleanString_(payload.guestName)) throw new Error('Guest name is required.');
  const checkIn = requireDate_(payload.checkIn, 'check-in');
  const checkOut = requireDate_(payload.checkOut, 'check-out');
  if (checkOut <= checkIn) throw new Error('Check-out must be after check-in.');
  if (number_(payload.guests) < 1) throw new Error('Guests must be at least 1.');
}

function cancelReservation_(id, reason) {
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Reservation not found.');

  sheet.getRange(row, RESERVATION_COLUMNS.status).setValue('Cancelled');
  if (reason) {
    const currentNotes = cleanString_(sheet.getRange(row, RESERVATION_COLUMNS.notes).getValue());
    sheet.getRange(row, RESERVATION_COLUMNS.notes).setValue(
      [currentNotes, 'Cancellation: ' + cleanString_(reason)].filter(Boolean).join('\n')
    );
  }
  sheet.getRange(row, RESERVATION_COLUMNS.lastUpdated).setValue(new Date());
  SpreadsheetApp.flush();

  const reservation = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  sendReservationEventEmail_('CANCELLATION', reservation);
  return reservation;
}

function deleteReservation_(id) {
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Reservation not found.');

  // Clear only input/operational values; formulas and formatting remain intact.
  sheet.getRange(row, 1, 1, 18).clearContent();
  sheet.getRange(row, 25, 1, 4).clearContent();
  SpreadsheetApp.flush();
  return { id: id, deleted: true };
}

function confirmCheckIn_(id) {
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Reservation not found.');

  const reservation = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  if (reservation.status === 'Cancelled') throw new Error('A cancelled reservation cannot be checked in.');
  if (reservation.checkIn !== todayIso_()) throw new Error('Check-in can only be confirmed on the reservation check-in date.');

  sheet.getRange(row, RESERVATION_COLUMNS.checkInConfirmed).setValue('Yes');
  sheet.getRange(row, RESERVATION_COLUMNS.checkedInAt).setValue(new Date());
  sheet.getRange(row, RESERVATION_COLUMNS.lastUpdated).setValue(new Date());
  SpreadsheetApp.flush();

  const updated = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  sendReservationEventEmail_('GUEST_CHECKED_IN', updated);
  return updated;
}

function confirmCheckOut_(id) {
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Reservation not found.');

  const reservation = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  if (reservation.status === 'Cancelled') throw new Error('A cancelled reservation cannot be checked out.');
  if (reservation.checkOut !== todayIso_()) throw new Error('Checkout can only be confirmed on the reservation checkout date.');

  sheet.getRange(row, RESERVATION_COLUMNS.checkOutConfirmed).setValue('Yes');
  sheet.getRange(row, RESERVATION_COLUMNS.checkedOutAt).setValue(new Date());
  sheet.getRange(row, RESERVATION_COLUMNS.lastUpdated).setValue(new Date());
  SpreadsheetApp.flush();

  const updated = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  sendReservationEventEmail_('GUEST_CHECKED_OUT', updated);
  return updated;
}

function updateCleaningStatus_(id, status) {
  const allowed = ['Pending', 'Scheduled', 'Completed', 'Not Required'];
  if (!allowed.includes(status)) throw new Error('Invalid cleaning status.');

  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Reservation not found.');

  sheet.getRange(row, RESERVATION_COLUMNS.cleaningStatus).setValue(status);
  sheet.getRange(row, RESERVATION_COLUMNS.lastUpdated).setValue(new Date());
  SpreadsheetApp.flush();

  const updated = mapReservationRow_(sheet.getRange(row, 1, 1, 33).getValues()[0]);
  if (status === 'Completed') sendReservationEventEmail_('CLEANING_COMPLETED', updated, { quiet: true });
  return updated;
}

// -----------------------------------------------------------------------------
// Expense writes
// -----------------------------------------------------------------------------

function saveExpense_(payload) {
  const date = requireDate_(payload.date, 'expense date');
  if (!cleanString_(payload.category)) throw new Error('Expense category is required.');
  if (number_(payload.amount) < 0) throw new Error('Expense amount cannot be negative.');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = sheet_(CONFIG.SHEETS.EXPENSES);
    const id = cleanString_(payload.id) || generateId_('EXP');
    let row = findRowById_(sheet, id);
    if (!row) row = firstBlankIdRow_(sheet);
    if (!row) throw new Error('No blank expense rows remain.');

    sheet.getRange(row, 1, 1, 11).setValues([[
      id,
      date,
      cleanString_(payload.category),
      cleanString_(payload.vendor),
      cleanString_(payload.description),
      cleanString_(payload.reservationId),
      number_(payload.amount),
      cleanString_(payload.paymentMethod),
      cleanString_(payload.receiptLink),
      cleanString_(payload.notes),
      new Date()
    ]]);
    SpreadsheetApp.flush();
    return readExpenseRow_(sheet, row);
  } finally {
    lock.releaseLock();
  }
}

function deleteExpense_(id) {
  const sheet = sheet_(CONFIG.SHEETS.EXPENSES);
  const row = findRowById_(sheet, id);
  if (!row) throw new Error('Expense not found.');
  sheet.getRange(row, 1, 1, 11).clearContent();
  return { id: id, deleted: true };
}

function readExpenseRow_(sheet, row) {
  const values = sheet.getRange(row, 1, 1, 11).getValues()[0];
  return {
    id: cleanString_(values[0]),
    date: dateIso_(values[1]),
    category: cleanString_(values[2]),
    vendor: cleanString_(values[3]),
    description: cleanString_(values[4]),
    reservationId: cleanString_(values[5]),
    amount: number_(values[6]),
    paymentMethod: cleanString_(values[7]),
    receiptLink: cleanString_(values[8]),
    notes: cleanString_(values[9]),
    createdAt: dateTimeIso_(values[10])
  };
}

// -----------------------------------------------------------------------------
// iCal synchronization
// -----------------------------------------------------------------------------

function syncICalFeeds() {
  const properties = PropertiesService.getScriptProperties();
  const sources = [
    { platform: 'Airbnb', key: 'AIRBNB_ICAL_URL' },
    { platform: 'Vrbo', key: 'VRBO_ICAL_URL' },
    { platform: 'Booking.com', key: 'BOOKING_ICAL_URL' }
  ];

  const results = sources.map(source => {
    const url = cleanString_(properties.getProperty(source.key));
    if (!url) return { platform: source.platform, configured: false, imported: 0, updated: 0 };
    try {
      return syncSingleICalFeed_(source.platform, url);
    } catch (error) {
      logAlert_('', 'ICAL_SYNC_ERROR', '', 'Failed', source.platform + ': ' + error.message);
      return { platform: source.platform, configured: true, error: error.message, imported: 0, updated: 0 };
    }
  });

  properties.setProperty('LAST_ICAL_SYNC', new Date().toISOString());
  return { syncedAt: formatDateTime_(new Date()), sources: results };
}

function syncSingleICalFeed_(platform, url) {
  const response = UrlFetchApp.fetch(url, {
    muteHttpExceptions: true,
    followRedirects: true,
    headers: { 'User-Agent': 'Ichkiichpan-Calendar-Sync/2.0' }
  });
  const status = response.getResponseCode();
  if (status < 200 || status >= 300) throw new Error('Calendar returned HTTP ' + status + '.');

  const events = parseICalendar_(response.getContentText());
  let imported = 0;
  let updated = 0;

  events.forEach(event => {
    if (!event.start || !event.end || event.end <= event.start) return;
    const existing = findReservationByConfirmation_(event.uid);
    const payload = {
      id: existing ? existing.id : '',
      confirmationNumber: event.uid,
      guestName: event.summary || platform + ' reservation',
      platform: platform,
      agencyName: '',
      checkIn: dateIso_(event.start),
      checkOut: dateIso_(event.end),
      guests: existing ? existing.guests : 1,
      reservationAmount: existing ? existing.reservationAmount : 0,
      cleaningFee: existing ? existing.cleaningFee : 0,
      commission: existing ? existing.commission : 0,
      taxes: existing ? existing.taxes : 0,
      amountReceived: existing ? existing.amountReceived : 0,
      status: event.cancelled ? 'Cancelled' : (existing ? existing.status : 'Confirmed'),
      cleaningStatus: existing ? existing.cleaningStatus : 'Pending',
      notes: mergeNotes_(existing && existing.notes, event.description),
      source: 'Calendar Import'
    };
    saveReservationWithoutEmail_(payload);
    if (existing) updated += 1; else imported += 1;
  });

  return { platform: platform, configured: true, imported: imported, updated: updated, eventsRead: events.length };
}

function saveReservationWithoutEmail_(payload) {
  validateReservation_(payload);
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const id = cleanString_(payload.id) || generateId_('RES');
  let row = findRowById_(sheet, id);
  if (!row) row = firstBlankIdRow_(sheet);
  if (!row) throw new Error('No blank reservation rows remain.');

  sheet.getRange(row, 1, 1, 18).setValues([[
    id,
    cleanString_(payload.confirmationNumber),
    cleanString_(payload.guestName),
    cleanString_(payload.platform),
    cleanString_(payload.agencyName),
    requireDate_(payload.checkIn, 'check-in'),
    requireDate_(payload.checkOut, 'check-out'),
    number_(payload.guests),
    number_(payload.reservationAmount),
    number_(payload.cleaningFee),
    number_(payload.commission),
    number_(payload.taxes),
    number_(payload.amountReceived),
    cleanString_(payload.status || 'Confirmed'),
    cleanString_(payload.cleaningStatus || 'Pending'),
    cleanString_(payload.notes),
    cleanString_(payload.source || 'Calendar Import'),
    new Date()
  ]]);
  SpreadsheetApp.flush();
}

function parseICalendar_(text) {
  const unfolded = String(text || '').replace(/\r?\n[ \t]/g, '');
  const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];
  return blocks.map(block => {
    const fields = {};
    block.split(/\r?\n/).forEach(line => {
      const colon = line.indexOf(':');
      if (colon < 0) return;
      const rawKey = line.slice(0, colon);
      const key = rawKey.split(';')[0].toUpperCase();
      const value = line.slice(colon + 1);
      fields[key] = value;
    });
    return {
      uid: cleanString_(fields.UID || generateId_('ICAL')),
      summary: decodeICalText_(fields.SUMMARY || ''),
      description: decodeICalText_(fields.DESCRIPTION || ''),
      start: parseICalDate_(fields.DTSTART),
      end: parseICalDate_(fields.DTEND),
      cancelled: cleanString_(fields.STATUS).toUpperCase() === 'CANCELLED'
    };
  });
}

function parseICalDate_(value) {
  const text = cleanString_(value);
  if (!text) return null;
  if (/^\d{8}$/.test(text)) {
    return new Date(Number(text.slice(0, 4)), Number(text.slice(4, 6)) - 1, Number(text.slice(6, 8)), 12, 0, 0);
  }
  if (/^\d{8}T\d{6}Z$/.test(text)) {
    return new Date(Date.UTC(
      Number(text.slice(0, 4)), Number(text.slice(4, 6)) - 1, Number(text.slice(6, 8)),
      Number(text.slice(9, 11)), Number(text.slice(11, 13)), Number(text.slice(13, 15))
    ));
  }
  if (/^\d{8}T\d{6}$/.test(text)) {
    return new Date(
      Number(text.slice(0, 4)), Number(text.slice(4, 6)) - 1, Number(text.slice(6, 8)),
      Number(text.slice(9, 11)), Number(text.slice(11, 13)), Number(text.slice(13, 15))
    );
  }
  return null;
}

function findReservationByConfirmation_(confirmation) {
  if (!confirmation) return null;
  const sheet = sheet_(CONFIG.SHEETS.RESERVATIONS);
  const lastRow = lastPopulatedIdRow_(sheet);
  if (lastRow < 2) return null;
  const rows = sheet.getRange(2, 1, lastRow - 1, 33).getValues();
  const match = rows.find(row => cleanString_(row[1]) === confirmation);
  return match ? mapReservationRow_(match) : null;
}

function getCalendarConfiguration_() {
  const properties = PropertiesService.getScriptProperties();
  return {
    airbnbConfigured: Boolean(cleanString_(properties.getProperty('AIRBNB_ICAL_URL'))),
    vrboConfigured: Boolean(cleanString_(properties.getProperty('VRBO_ICAL_URL'))),
    bookingConfigured: Boolean(cleanString_(properties.getProperty('BOOKING_ICAL_URL'))),
    lastSync: cleanString_(properties.getProperty('LAST_ICAL_SYNC'))
  };
}

// -----------------------------------------------------------------------------
// Automatic email alerts
// -----------------------------------------------------------------------------

function runScheduledAlerts() {
  const reservations = readReservations_('owner', {});
  const today = parseDateOnly_(todayIso_());
  let sent = 0;
  let skipped = 0;

  reservations.filter(item => item.status !== 'Cancelled').forEach(reservation => {
    const checkIn = parseDateOnly_(reservation.checkIn);
    const checkOut = parseDateOnly_(reservation.checkOut);
    const daysToArrival = dateDifferenceDays_(today, checkIn);
    const daysToDeparture = dateDifferenceDays_(today, checkOut);

    const alerts = [];
    if (daysToArrival === 7) alerts.push('ARRIVAL_7_DAYS');
    if (daysToArrival === 2) alerts.push('ARRIVAL_2_DAYS');
    if (daysToArrival === 0 && reservation.checkInConfirmed !== 'Yes') alerts.push('ARRIVAL_TODAY');
    if (daysToDeparture === 0 && reservation.checkOutConfirmed !== 'Yes') alerts.push('CHECKOUT_TODAY');
    if (daysToArrival >= 0 && daysToArrival <= 2 && reservation.balancePending > 0) alerts.push('PAYMENT_DUE');
    if (daysToArrival >= 0 && daysToArrival <= 2 && !['Completed', 'Not Required'].includes(reservation.cleaningStatus)) alerts.push('CLEANING_DUE');
    if (reservation.conflict === 'CONFLICT') alerts.push('RESERVATION_CONFLICT');

    alerts.forEach(type => {
      const alertId = reservation.id + '-' + type + '-' + todayIso_();
      if (alertAlreadyLogged_(alertId)) {
        skipped += 1;
        return;
      }
      sendAlertEmail_(type, reservation, alertId);
      sent += 1;
    });
  });

  return { checked: reservations.length, sent: sent, skipped: skipped, runAt: formatDateTime_(new Date()) };
}

function sendReservationEventEmail_(type, reservation, options) {
  options = options || {};
  if (options.quiet && type === 'RESERVATION_UPDATED') return;
  const alertId = reservation.id + '-' + type + '-' + new Date().getTime();
  sendAlertEmail_(type, reservation, alertId);
}

function sendAlertEmail_(type, reservation, alertId) {
  const recipientGroup = recipientGroupForAlert_(type);
  const recipients = getEmailRecipients_(recipientGroup);
  if (!recipients.length) {
    logAlert_(reservation.id, type, '', 'Skipped', 'No recipient emails configured.');
    return;
  }

  const message = buildEmailMessage_(type, reservation);
  try {
    GmailApp.sendEmail(recipients.join(','), message.subject, message.text, {
      htmlBody: message.html,
      name: 'Ichkiichpan Cabin Management'
    });
    logAlert_(reservation.id, type, recipients.join(', '), 'Sent', message.subject, alertId);
  } catch (error) {
    logAlert_(reservation.id, type, recipients.join(', '), 'Failed', error.message, alertId);
    throw error;
  }
}

function buildEmailMessage_(type, reservation) {
  const labels = {
    NEW_RESERVATION: 'New reservation',
    RESERVATION_UPDATED: 'Reservation updated',
    CANCELLATION: 'Reservation cancelled',
    ARRIVAL_7_DAYS: 'Arrival in 7 days',
    ARRIVAL_2_DAYS: 'Arrival in 2 days',
    ARRIVAL_TODAY: 'Guest arriving today',
    CHECKOUT_TODAY: 'Guest checking out today',
    PAYMENT_DUE: 'Payment pending',
    CLEANING_DUE: 'Cleaning requires attention',
    RESERVATION_CONFLICT: 'Reservation conflict detected',
    GUEST_CHECKED_IN: 'Guest checked in',
    GUEST_CHECKED_OUT: 'Guest checked out',
    CLEANING_COMPLETED: 'Cleaning completed'
  };
  const title = labels[type] || type;
  const subject = '[Ichkiichpan] ' + title + ' — ' + (reservation.guestName || reservation.confirmationNumber || reservation.id);
  const rows = [
    ['Guest', reservation.guestName || 'Not provided'],
    ['Platform', reservation.platform || 'Not provided'],
    ['Confirmation', reservation.confirmationNumber || reservation.id],
    ['Check-in', reservation.checkIn + ' at 3:00 PM'],
    ['Check-out', reservation.checkOut + ' at 11:00 AM'],
    ['Guests', String(reservation.guests || 0)],
    ['Cleaning', reservation.cleaningStatus || 'Pending'],
    ['Balance pending', formatMoney_(reservation.balancePending)],
    ['Status', reservation.stayStatus || reservation.status],
    ['Notes', reservation.notes || 'None']
  ];

  const text = title + '\n\n' + rows.map(row => row[0] + ': ' + row[1]).join('\n');
  const htmlRows = rows.map(row =>
    '<tr><td style="padding:7px 12px;border-bottom:1px solid #e4e8e5;color:#66736c;font-size:12px">' + escapeHtml_(row[0]) + '</td>' +
    '<td style="padding:7px 12px;border-bottom:1px solid #e4e8e5;font-size:13px"><strong>' + escapeHtml_(row[1]) + '</strong></td></tr>'
  ).join('');
  const html = '<div style="font-family:Arial,sans-serif;color:#17211d;max-width:620px">' +
    '<div style="background:#153b2e;color:#fff;padding:18px 22px"><div style="font-size:11px;letter-spacing:1.4px">ICHKIICHPAN</div><h2 style="margin:6px 0 0;font-size:21px">' + escapeHtml_(title) + '</h2></div>' +
    '<table style="width:100%;border-collapse:collapse;border:1px solid #d7ded9">' + htmlRows + '</table>' +
    '<p style="font-size:11px;color:#748078;margin-top:16px">Automatic message from the Ichkiichpan cabin management system.</p></div>';

  return { subject: subject, text: text, html: html };
}

function recipientGroupForAlert_(type) {
  if (['CLEANING_DUE', 'ARRIVAL_TODAY', 'CHECKOUT_TODAY', 'GUEST_CHECKED_IN', 'GUEST_CHECKED_OUT', 'CLEANING_COMPLETED'].includes(type)) {
    return ['HOUSEKEEPER_EMAILS', 'MANAGER_EMAILS', 'OWNER_EMAILS'];
  }
  if (['PAYMENT_DUE', 'NEW_RESERVATION', 'RESERVATION_UPDATED', 'CANCELLATION', 'ARRIVAL_7_DAYS', 'ARRIVAL_2_DAYS'].includes(type)) {
    return ['MANAGER_EMAILS', 'OWNER_EMAILS'];
  }
  return ['OWNER_EMAILS'];
}

function getEmailRecipients_(propertyKeys) {
  const properties = PropertiesService.getScriptProperties();
  const collected = [];
  propertyKeys.forEach(key => {
    splitEmails_(properties.getProperty(key)).forEach(email => collected.push(email));
  });

  if (!collected.length) {
    readAlertEmailsFromSettings_().forEach(email => collected.push(email));
  }
  return [...new Set(collected.filter(isEmail_))];
}

function readAlertEmailsFromSettings_() {
  const sheet = sheet_(CONFIG.SHEETS.SETTINGS);
  const lastRow = Math.max(sheet.getLastRow(), 1);
  return sheet.getRange(1, 1, lastRow, 2).getDisplayValues()
    .filter(row => /^Alert Email/i.test(cleanString_(row[0])))
    .map(row => cleanString_(row[1]))
    .filter(isEmail_);
}

function alertAlreadyLogged_(alertId) {
  const sheet = sheet_(CONFIG.SHEETS.ALERTS);
  const lastRow = lastPopulatedIdRow_(sheet);
  if (lastRow < 2) return false;
  return sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues().flat().includes(alertId);
}

function logAlert_(reservationId, type, sentTo, result, details, forcedId) {
  const sheet = sheet_(CONFIG.SHEETS.ALERTS);
  const row = firstBlankIdRow_(sheet);
  if (!row) return;
  sheet.getRange(row, 1, 1, 7).setValues([[
    forcedId || generateId_('ALT'),
    reservationId || '',
    type || '',
    sentTo || '',
    new Date(),
    result || '',
    details || ''
  ]]);
}

// -----------------------------------------------------------------------------
// Setup and triggers
// -----------------------------------------------------------------------------

function setupIchkiichpan() {
  const properties = PropertiesService.getScriptProperties();
  const existing = properties.getProperties();
  const defaults = {
    APP_PASSWORD: existing.APP_PASSWORD || 'ICHICH',
    AIRBNB_ICAL_URL: existing.AIRBNB_ICAL_URL || '',
    VRBO_ICAL_URL: existing.VRBO_ICAL_URL || '',
    BOOKING_ICAL_URL: existing.BOOKING_ICAL_URL || '',
    OWNER_EMAILS: existing.OWNER_EMAILS || 'newrduenas14@gmail.com',
    MANAGER_EMAILS: existing.MANAGER_EMAILS || 'Maggie-79@live.com',
    HOUSEKEEPER_EMAILS: existing.HOUSEKEEPER_EMAILS || 'misuenosholbox199207@gmail.com'
  };
  properties.setProperties(defaults, false);

  deleteTriggersByHandler_('runScheduledAlerts');
  deleteTriggersByHandler_('syncICalFeeds');

  ScriptApp.newTrigger('runScheduledAlerts')
    .timeBased()
    .everyHours(1)
    .create();

  ScriptApp.newTrigger('syncICalFeeds')
    .timeBased()
    .everyHours(6)
    .create();

  return {
    ok: true,
    message: 'Setup complete. Fill the three iCal URL properties before calendar synchronization.',
    propertiesCreated: Object.keys(defaults),
    alertTrigger: 'Hourly',
    calendarTrigger: 'Every 6 hours'
  };
}

function deleteTriggersByHandler_(handler) {
  ScriptApp.getProjectTriggers()
    .filter(trigger => trigger.getHandlerFunction() === handler)
    .forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

// -----------------------------------------------------------------------------
// Settings and utilities
// -----------------------------------------------------------------------------

function readPublicSettings_() {
  const sheet = sheet_(CONFIG.SHEETS.SETTINGS);
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const settings = {};
  sheet.getRange(2, 1, Math.max(lastRow - 1, 1), 2).getDisplayValues().forEach(row => {
    const key = cleanString_(row[0]);
    if (!key || /Calendar URL|Alert Email/i.test(key)) return;
    settings[key] = row[1];
  });
  return settings;
}

function sheet_(name) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(name);
  if (!sheet) throw new Error('Missing sheet: ' + name);
  return sheet;
}

function lastPopulatedIdRow_(sheet) {
  const maxRow = Math.min(sheet.getMaxRows(), CONFIG.MAX_DATA_ROW);
  if (maxRow < 2) return 1;
  const ids = sheet.getRange(2, 1, maxRow - 1, 1).getDisplayValues().flat();
  for (let index = ids.length - 1; index >= 0; index -= 1) {
    if (cleanString_(ids[index])) return index + 2;
  }
  return 1;
}

function firstBlankIdRow_(sheet) {
  const maxRow = Math.min(sheet.getMaxRows(), CONFIG.MAX_DATA_ROW);
  const ids = sheet.getRange(2, 1, maxRow - 1, 1).getDisplayValues().flat();
  const index = ids.findIndex(value => !cleanString_(value));
  return index < 0 ? 0 : index + 2;
}

function findRowById_(sheet, id) {
  const target = cleanString_(id);
  if (!target) return 0;
  const lastRow = lastPopulatedIdRow_(sheet);
  if (lastRow < 2) return 0;
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues().flat();
  const index = ids.findIndex(value => cleanString_(value) === target);
  return index < 0 ? 0 : index + 2;
}

function requireDate_(value, label) {
  const date = parseDateOnly_(value);
  if (!date || Number.isNaN(date.getTime())) throw new Error('Invalid ' + label + '.');
  return date;
}

function parseDateOnly_(value) {
  if (!value) return null;
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12, 0, 0);
  }
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
}

function monthToDate_(value) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})/);
  if (!match) throw new Error('Month must use YYYY-MM format.');
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) throw new Error('Invalid report month.');
  return new Date(year, month, 0, 12, 0, 0);
}

function dateIso_(value) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Utilities.formatDate(date, CONFIG.TIME_ZONE, 'yyyy-MM-dd');
}

function dateTimeIso_(value) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Utilities.formatDate(date, CONFIG.TIME_ZONE, "yyyy-MM-dd'T'HH:mm:ss");
}

function todayIso_() {
  return Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'yyyy-MM-dd');
}

function formatDateTime_(value) {
  return Utilities.formatDate(value, CONFIG.TIME_ZONE, 'yyyy-MM-dd HH:mm:ss');
}

function dateDifferenceDays_(start, end) {
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

function normalizeCellValue_(value) {
  if (value instanceof Date) return dateIso_(value);
  return value;
}

function number_(value) {
  const number = Number(value || 0);
  return Number.isFinite(number) ? number : 0;
}

function cleanString_(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function generateId_(prefix) {
  return prefix + '-' + Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, 'yyyyMMdd-HHmmss') + '-' + Utilities.getUuid().slice(0, 6).toUpperCase();
}

function pick_(object, keys) {
  return keys.reduce((result, key) => {
    if (Object.prototype.hasOwnProperty.call(object, key)) result[key] = object[key];
    return result;
  }, {});
}

function splitEmails_(value) {
  return cleanString_(value).split(/[;,\s]+/).map(cleanString_).filter(Boolean);
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanString_(value));
}

function mergeNotes_(existing, incoming) {
  const parts = [cleanString_(existing), cleanString_(incoming)].filter(Boolean);
  return [...new Set(parts)].join('\n');
}

function decodeICalText_(value) {
  return cleanString_(value)
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

function formatMoney_(value) {
  return '$' + number_(value).toFixed(2) + ' MXN';
}

function escapeHtml_(value) {
  return cleanString_(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function json_(object) {
  return ContentService
    .createTextOutput(JSON.stringify(object))
    .setMimeType(ContentService.MimeType.JSON);
}
