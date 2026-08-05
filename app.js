const PASSWORD='ICHICH';
const KEYS={reservations:'ichkiichpanReservations',expenses:'ichkiichpanExpenses'};
const state={reservations:[],expenses:[],currentMonth:new Date()};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(Number(n||0));
const localDate=s=>new Date(`${s}T12:00:00`);
const dateFmt=(s,o={month:'short',day:'numeric'})=>s?new Intl.DateTimeFormat('en-US',o).format(localDate(s)):'—';
const iso=d=>{const x=new Date(d);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)};
const isoOffset=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)};
const daysBetween=(a,b)=>Math.round((localDate(b)-localDate(a))/86400000);
const uid=p=>`${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`.toUpperCase();
const escapeHtml=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function load(){
  try{state.reservations=JSON.parse(localStorage.getItem(KEYS.reservations)||'[]');state.expenses=JSON.parse(localStorage.getItem(KEYS.expenses)||'[]')}catch{state.reservations=[];state.expenses=[]}
}
function save(){localStorage.setItem(KEYS.reservations,JSON.stringify(state.reservations));localStorage.setItem(KEYS.expenses,JSON.stringify(state.expenses));}
function enrich(r){
  const nights=Math.max(0,daysBetween(r.checkIn,r.checkOut));
  const balance=Math.max(0,Number(r.reservationAmount||0)-Number(r.amountReceived||0));
  const net=Number(r.reservationAmount||0)-Number(r.commission||0)-Number(r.taxes||0);
  const now=localDate(iso(new Date())),cin=localDate(r.checkIn),cout=localDate(r.checkOut);
  const stayStatus=r.status==='Cancelled'?'Cancelled':now<cin?'Upcoming':now<cout?'Checked In':'Completed';
  return {...r,nights,balance,net,daysUntil:daysBetween(iso(new Date()),r.checkIn),stayStatus};
}
function platformClass(p){return p==='Airbnb'?'airbnb':p==='Vrbo'?'vrbo':p==='Booking.com'?'booking':'agency'}
function toast(msg){const el=$('#toast');el.textContent=msg;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2200)}
function openApp(){load();$('#loginView').hidden=true;$('#appView').hidden=false;renderAll();}

$('#loginForm').addEventListener('submit',e=>{e.preventDefault();if($('#passwordInput').value===PASSWORD){sessionStorage.setItem('ichAuth','1');openApp()}else{$('#loginError').hidden=false;$('#passwordInput').focus()}});
$('#passwordInput').addEventListener('input',()=>$('#loginError').hidden=true);
$('#logoutButton').addEventListener('click',()=>{sessionStorage.removeItem('ichAuth');location.reload()});
if(sessionStorage.getItem('ichAuth')==='1')openApp();

$$('.nav-item').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
$$('[data-go]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.go)));
function switchView(name){
  $$('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.view===name));
  $$('.view').forEach(v=>v.classList.remove('active'));
  const view=$(`#${name}View`);if(!view)return;view.classList.add('active');
  $('#viewTitle').textContent=name[0].toUpperCase()+name.slice(1);
  if(name==='calendar')renderCalendar();
}

function renderAll(){renderDashboard();renderReservations();renderExpenses();renderReports();renderCalendar();renderSettings();$('#syncStatus').textContent='Saved locally';}
function renderDashboard(){
  const rs=state.reservations.map(enrich).filter(r=>r.status!=='Cancelled');
  const month=new Date().getMonth(),year=new Date().getFullYear();
  const rm=rs.filter(r=>{const d=localDate(r.checkIn);return d.getMonth()===month&&d.getFullYear()===year});
  const em=state.expenses.filter(x=>{const d=localDate(x.date);return d.getMonth()===month&&d.getFullYear()===year});
  const gross=rm.reduce((s,r)=>s+Number(r.reservationAmount||0),0),expenses=em.reduce((s,x)=>s+Number(x.amount||0),0);
  const occupied=rm.reduce((s,r)=>s+r.nights,0),days=new Date(year,month+1,0).getDate();
  const upcoming=rs.filter(r=>r.daysUntil>=0).sort((a,b)=>a.daysUntil-b.daysUntil),next=upcoming[0];
  const current=rs.find(r=>r.stayStatus==='Checked In');
  const metrics=[
    ['Current guest',current?.guestName||'None','Live stay'],['Next check-in',next?dateFmt(next.checkIn):'—',next?.guestName||'No upcoming stay'],
    ['Occupancy',`${Math.min(100,Math.round(occupied/days*100))}%`,`${occupied} booked nights`],['Gross revenue',money(gross),'This month'],
    ['Operating result',money(gross-expenses),'Revenue minus expenses'],['Pending balances',money(rs.reduce((s,r)=>s+r.balance,0)),'All active reservations'],
    ['Cleaning due',rs.filter(r=>r.daysUntil>=0&&r.daysUntil<=2&&r.cleaningStatus!=='Completed').length,'Within 2 days'],['Conflicts',findConflicts(rs).size,'Overlapping stays']
  ];
  $('#metricsGrid').innerHTML=metrics.map(([l,v,h])=>`<article class="metric-card"><div class="label">${escapeHtml(l)}</div><div class="value">${escapeHtml(v)}</div><div class="hint">${escapeHtml(h)}</div></article>`).join('');
  renderMiniCalendar();renderPriority(rs);renderUpcoming(upcoming);renderPending(rs);
}
function renderPriority(rs){
  const items=[];
  rs.forEach(r=>{if(r.balance>0&&r.daysUntil>=0&&r.daysUntil<=2)items.push(['danger',`Payment pending: ${r.guestName}`,`${money(r.balance)} due before ${dateFmt(r.checkIn)}`]);if(r.cleaningStatus!=='Completed'&&r.daysUntil>=0&&r.daysUntil<=1)items.push(['warn','Cleaning not complete',`${r.guestName} checks in ${r.daysUntil===0?'today':'tomorrow'}`])});
  findConflicts(rs).forEach(id=>{const r=rs.find(x=>x.id===id);items.push(['danger','Reservation conflict',`Review ${r?.guestName||id}`])});
  $('#priorityList').innerHTML=items.length?items.slice(0,6).map(([t,a,b])=>`<div class="priority-item ${t}"><div><strong>${escapeHtml(a)}</strong><div class="muted small">${escapeHtml(b)}</div></div></div>`).join(''):'<p class="muted">Nothing urgent right now.</p>';
}
function renderUpcoming(list){$('#upcomingList').innerHTML=list.slice(0,5).map(r=>`<div class="reservation-card"><div><strong>${escapeHtml(r.guestName)}</strong><div class="muted small">${dateFmt(r.checkIn)}–${dateFmt(r.checkOut)} · ${r.guests} guests · ${escapeHtml(r.platform)}</div></div><button data-edit-res="${r.id}">Edit</button></div>`).join('')||'<p class="muted">No upcoming reservations.</p>';}
function renderPending(rs){const list=rs.filter(r=>r.balance>0).sort((a,b)=>b.balance-a.balance).slice(0,5);$('#pendingList').innerHTML=list.map(r=>`<div class="pending-item"><div><strong>${escapeHtml(r.guestName)}</strong><div class="muted small">${dateFmt(r.checkIn)} · ${escapeHtml(r.platform)}</div></div><div><strong>${money(r.balance)}</strong><button data-edit-res="${r.id}">Update</button></div></div>`).join('')||'<p class="muted">No pending balances.</p>';}

function renderMiniCalendar(){const d=new Date();$('#miniCalendar').innerHTML=calendarHTML(d.getFullYear(),d.getMonth(),false)}
function renderCalendar(){const d=state.currentMonth;$('#calendarTitle').textContent=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(d);$('#fullCalendar').innerHTML=calendarHTML(d.getFullYear(),d.getMonth(),true)}
function calendarHTML(year,month,full){
  const heads=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(x=>`<div class="day-number">${x}</div>`).join('');
  const start=new Date(year,month,1-new Date(year,month,1).getDay()),cells=[];
  for(let i=0;i<42;i++){const day=new Date(start);day.setDate(start.getDate()+i);const dayIso=iso(day);const bookings=state.reservations.filter(r=>r.status!=='Cancelled'&&dayIso>=r.checkIn&&dayIso<r.checkOut);const limit=full?3:2;cells.push(`<div class="calendar-cell ${day.getMonth()!==month?'outside':''}"><div class="day-number">${day.getDate()}</div>${bookings.slice(0,limit).map(r=>`<button class="booking-chip ${platformClass(r.platform)}" data-edit-res="${r.id}" title="${escapeHtml(r.guestName)}">${escapeHtml(r.guestName)}</button>`).join('')}${bookings.length>limit?`<div class="muted small">+${bookings.length-limit} more</div>`:''}</div>`)}
  return heads+cells.join('');
}
$('#prevMonth').onclick=()=>{state.currentMonth=new Date(state.currentMonth.getFullYear(),state.currentMonth.getMonth()-1,1);renderCalendar()};
$('#nextMonth').onclick=()=>{state.currentMonth=new Date(state.currentMonth.getFullYear(),state.currentMonth.getMonth()+1,1);renderCalendar()};

function renderReservations(){
  const q=($('#reservationSearch')?.value||'').trim().toLowerCase(),filter=$('#reservationFilter')?.value||'all';
  const rows=state.reservations.map(enrich).filter(r=>{const text=`${r.guestName} ${r.confirmationNumber} ${r.platform}`.toLowerCase();if(q&&!text.includes(q))return false;if(filter==='upcoming'&&r.stayStatus!=='Upcoming')return false;if(filter==='checked-in'&&r.stayStatus!=='Checked In')return false;if(filter==='pending-payment'&&r.balance<=0)return false;if(filter==='cleaning'&&r.cleaningStatus==='Completed')return false;if(filter==='cancelled'&&r.status!=='Cancelled')return false;return true}).sort((a,b)=>a.checkIn.localeCompare(b.checkIn));
  $('#reservationsTableBody').innerHTML=rows.map(r=>`<tr><td><strong>${escapeHtml(r.guestName)}</strong><div class="muted small">${escapeHtml(r.confirmationNumber||r.id)}</div></td><td><span class="badge ${platformClass(r.platform)}">${escapeHtml(r.platform)}</span></td><td>${dateFmt(r.checkIn)}–${dateFmt(r.checkOut)}<div class="muted small">${r.nights} nights</div></td><td>${r.guests}</td><td>${money(r.reservationAmount)}</td><td>${money(r.balance)}</td><td><span class="badge ${r.cleaningStatus==='Pending'?'pending':''}">${escapeHtml(r.cleaningStatus)}</span></td><td><span class="badge ${r.status==='Cancelled'?'cancelled':''}">${escapeHtml(r.stayStatus)}</span></td><td><button class="action-button" data-edit-res="${r.id}">Edit</button></td></tr>`).join('')||'<tr><td colspan="9" class="muted">No reservations found.</td></tr>';
}
$('#reservationSearch').addEventListener('input',renderReservations);$('#reservationFilter').addEventListener('change',renderReservations);

function renderExpenses(){const names=Object.fromEntries(state.reservations.map(r=>[r.id,r.guestName]));$('#expensesTableBody').innerHTML=[...state.expenses].sort((a,b)=>b.date.localeCompare(a.date)).map(x=>`<tr><td>${dateFmt(x.date,{year:'numeric',month:'short',day:'numeric'})}</td><td>${escapeHtml(x.category)}</td><td>${escapeHtml(x.vendor||'—')}</td><td>${escapeHtml(x.description||'—')}</td><td>${escapeHtml(names[x.reservationId]||'—')}</td><td>${money(x.amount)}</td><td><button class="action-button" data-delete-exp="${x.id}">Delete</button></td></tr>`).join('')||'<tr><td colspan="7" class="muted">No expenses.</td></tr>';}
function renderReports(){
  const rs=state.reservations.map(enrich).filter(r=>r.status!=='Cancelled'),gross=rs.reduce((s,r)=>s+Number(r.reservationAmount||0),0),net=rs.reduce((s,r)=>s+r.net,0),exp=state.expenses.reduce((s,x)=>s+Number(x.amount||0),0),nights=rs.reduce((s,r)=>s+r.nights,0);
  const metrics=[['Total revenue',money(gross)],['Net after fees/tax',money(net)],['Operating expenses',money(exp)],['Estimated profit',money(net-exp)],['Average nightly rate',money(nights?gross/nights:0)]];
  $('#reportsGrid').innerHTML=metrics.map(([l,v])=>`<article class="metric-card"><div class="label">${l}</div><div class="value">${v}</div></article>`).join('');renderBars('#platformReport',groupSum(rs,'platform','reservationAmount'));renderBars('#expenseReport',groupSum(state.expenses,'category','amount'));
}
function groupSum(arr,key,val){return Object.entries(arr.reduce((o,x)=>(o[x[key]]=(o[x[key]]||0)+Number(x[val]||0),o),{})).sort((a,b)=>b[1]-a[1])}
function renderBars(sel,data){const max=Math.max(1,...data.map(x=>x[1]));$(sel).innerHTML=data.map(([k,v])=>`<div class="bar-row"><span>${escapeHtml(k)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${money(v)}</strong></div>`).join('')||'<p class="muted">No data yet.</p>'}
function findConflicts(rs){const ids=new Set();for(let i=0;i<rs.length;i++)for(let j=i+1;j<rs.length;j++)if(rs[i].checkIn<rs[j].checkOut&&rs[i].checkOut>rs[j].checkIn){ids.add(rs[i].id);ids.add(rs[j].id)}return ids}

const rDialog=$('#reservationDialog'),rForm=$('#reservationForm');
$('#newReservationBtn').onclick=()=>openReservation();$$('.close-modal').forEach(b=>b.onclick=()=>rDialog.close());
function openReservation(r=null){rForm.reset();$('#deleteReservationBtn').hidden=!r;$('#reservationModalTitle').textContent=r?'Edit reservation':'New reservation';const data=r||{id:'',platform:'Airbnb',guests:2,status:'Confirmed',cleaningStatus:'Pending',checkIn:isoOffset(1),checkOut:isoOffset(3)};Object.entries(data).forEach(([k,v])=>{if(rForm.elements[k])rForm.elements[k].value=v??''});rDialog.showModal()}
rForm.addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(rForm));['guests','reservationAmount','cleaningFee','commission','taxes','amountReceived'].forEach(k=>fd[k]=Number(fd[k]||0));if(!fd.guestName.trim())return toast('Guest name is required');if(fd.checkOut<=fd.checkIn)return toast('Check-out must be after check-in');fd.id=fd.id||uid('RES');const idx=state.reservations.findIndex(r=>r.id===fd.id);idx>=0?state.reservations[idx]=fd:state.reservations.push(fd);save();rDialog.close();renderAll();toast('Reservation saved locally')});
$('#deleteReservationBtn').onclick=()=>{const id=rForm.elements.id.value;if(!id)return;if(confirm('Delete this reservation?')){state.reservations=state.reservations.filter(r=>r.id!==id);state.expenses=state.expenses.map(x=>x.reservationId===id?{...x,reservationId:''}:x);save();rDialog.close();renderAll();toast('Reservation deleted')}};

const eDialog=$('#expenseDialog'),eForm=$('#expenseForm');
$('#newExpenseBtn').onclick=()=>{eForm.reset();eForm.elements.date.value=iso(new Date());populateExpenseReservations();eDialog.showModal()};$$('.close-expense').forEach(b=>b.onclick=()=>eDialog.close());
function populateExpenseReservations(){const selected=eForm.elements.reservationId.value;$('#expenseReservationSelect').innerHTML='<option value="">Not linked</option>'+state.reservations.map(r=>`<option value="${r.id}">${escapeHtml(r.guestName)} — ${dateFmt(r.checkIn)}</option>`).join('');eForm.elements.reservationId.value=selected;}
eForm.addEventListener('submit',e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(eForm));fd.id=fd.id||uid('EXP');fd.amount=Number(fd.amount||0);state.expenses.push(fd);save();eDialog.close();renderAll();toast('Expense saved locally')});

document.addEventListener('click',e=>{const edit=e.target.closest('[data-edit-res]');if(edit)openReservation(state.reservations.find(r=>r.id===edit.dataset.editRes));const del=e.target.closest('[data-delete-exp]');if(del&&confirm('Delete this expense?')){state.expenses=state.expenses.filter(x=>x.id!==del.dataset.deleteExp);save();renderAll();toast('Expense deleted')}});

function renderSettings(){
  const api=$('#apiUrlInput');if(api){api.value='Local browser storage';api.disabled=true;}
  const saveBtn=$('#saveSettingsBtn');if(saveBtn){saveBtn.textContent='Download backup';saveBtn.onclick=downloadBackup;}
  const sync=$('#syncButton');if(sync){sync.textContent='Download backup';sync.onclick=downloadBackup;}
}
function downloadBackup(){const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),reservations:state.reservations,expenses:state.expenses},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`ichkiichpan-backup-${iso(new Date())}.json`;a.click();URL.revokeObjectURL(a.href);toast('Backup downloaded')}
