const SPREADSHEET_ID = '1GNCTg0jyz50Noro6cw4cvDaKdbXKtJA7FM1JhTiJUxg';
const APP_PASSWORD = 'ICHICH';

function doGet(e) {
  const action = (e.parameter.action || 'getAll').trim();
  if (action === 'getAll') return json_({ reservations: readReservations_(), expenses: readExpenses_() });
  return json_({ error: 'Unknown action' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.password !== APP_PASSWORD) return json_({ ok: false, error: 'Unauthorized' });
    const p = body.payload || {};
    if (body.action === 'saveReservation') upsertReservation_(p);
    else if (body.action === 'deleteReservation') deleteById_('Reservations', p.id);
    else if (body.action === 'saveExpense') upsertExpense_(p);
    else if (body.action === 'deleteExpense') deleteById_('Expenses', p.id);
    else return json_({ ok: false, error: 'Unknown action' });
    return json_({ ok: true });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}

function readReservations_() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Reservations');
  const values = sh.getDataRange().getValues(); if (values.length < 2) return [];
  return values.slice(1).filter(r => r[0]).map(r => ({
    id:r[0], confirmationNumber:r[1], guestName:r[2], platform:r[3], agencyName:r[4],
    checkIn:dateIso_(r[5]), checkOut:dateIso_(r[6]), guests:r[7], reservationAmount:r[8],
    cleaningFee:r[9], commission:r[10], taxes:r[11], amountReceived:r[12], status:r[13],
    cleaningStatus:r[14], notes:r[15], source:r[16]
  }));
}

function readExpenses_() {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Expenses');
  const values = sh.getDataRange().getValues(); if (values.length < 2) return [];
  return values.slice(1).filter(r => r[0]).map(r => ({ id:r[0], date:dateIso_(r[1]), category:r[2], vendor:r[3], description:r[4], reservationId:r[5], amount:r[6], paymentMethod:r[7], receiptLink:r[8], notes:r[9] }));
}

function upsertReservation_(p) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Reservations');
  const row = findRow_(sh, p.id);
  const vals = [[p.id,p.confirmationNumber||'',p.guestName||'',p.platform||'',p.agencyName||'',new Date(p.checkIn+'T12:00:00'),new Date(p.checkOut+'T12:00:00'),Number(p.guests||0),Number(p.reservationAmount||0),Number(p.cleaningFee||0),Number(p.commission||0),Number(p.taxes||0),Number(p.amountReceived||0),p.status||'Confirmed',p.cleaningStatus||'Pending',p.notes||'','Website',new Date()]];
  if (row) sh.getRange(row,1,1,18).setValues(vals); else sh.getRange(sh.getLastRow()+1,1,1,18).setValues(vals);
}

function upsertExpense_(p) {
  const sh = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Expenses');
  const row = findRow_(sh,p.id);
  const vals=[[p.id,new Date(p.date+'T12:00:00'),p.category||'',p.vendor||'',p.description||'',p.reservationId||'',Number(p.amount||0),p.paymentMethod||'',p.receiptLink||'',p.notes||'',new Date()]];
  if(row) sh.getRange(row,1,1,11).setValues(vals); else sh.getRange(sh.getLastRow()+1,1,1,11).setValues(vals);
}

function deleteById_(sheetName,id){const sh=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);const row=findRow_(sh,id);if(row)sh.deleteRow(row)}
function findRow_(sh,id){if(!id||sh.getLastRow()<2)return 0;const vals=sh.getRange(2,1,sh.getLastRow()-1,1).getValues().flat();const i=vals.indexOf(id);return i<0?0:i+2}
function dateIso_(v){if(!v)return '';return Utilities.formatDate(new Date(v),'America/Cancun','yyyy-MM-dd')}
function json_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)}

function sendTwoDayAlerts() {
  const ss=SpreadsheetApp.openById(SPREADSHEET_ID), sh=ss.getSheetByName('Reservations'), log=ss.getSheetByName('Alerts Log');
  const rows=sh.getDataRange().getValues().slice(1), emails=['newrduenas14@gmail.com','Maggie-79@live.com','misuenosholbox199207@gmail.com'];
  const today=new Date(); today.setHours(0,0,0,0);
  rows.filter(r=>r[0]&&r[13]!=='Cancelled').forEach(r=>{const checkIn=new Date(r[5]);checkIn.setHours(0,0,0,0);const diff=Math.round((checkIn-today)/86400000);const alertId=`${r[0]}-2DAY`;if(diff===2&&!alertExists_(log,alertId)){const balance=Math.max(0,Number(r[8]||0)-Number(r[12]||0));const subject=`Ichkiichpan check-in in 2 days — ${r[2]}`;const body=`Guest: ${r[2]}\nPlatform: ${r[3]}\nCheck-in: ${Utilities.formatDate(checkIn,'America/Cancun','MMM d, yyyy')} at 3:00 PM\nCheck-out: ${Utilities.formatDate(new Date(r[6]),'America/Cancun','MMM d, yyyy')} at 11:00 AM\nGuests: ${r[7]}\nBalance pending: $${balance.toFixed(2)} MXN\nCleaning: ${r[14]}\nNotes: ${r[15]||'None'}`;GmailApp.sendEmail(emails.join(','),subject,body);log.appendRow([alertId,r[0],'2-day check-in',emails.join(', '),new Date(),'Sent',''])}})
}
function alertExists_(log,id){if(log.getLastRow()<2)return false;return log.getRange(2,1,log.getLastRow()-1,1).getValues().flat().includes(id)}
