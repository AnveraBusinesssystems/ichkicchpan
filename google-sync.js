const ICH_API_URL='https://script.google.com/macros/s/AKfycbwV9xD0V-IWbyG68t5aYy9bh1UEhGciPoVNYNb-OCpbwdyByOtr5B88RAmmldApqJ3a-Q/exec';
const ICH_API_PASSWORD='ICHICH';
let ichSyncing=false;

async function ichApi(action,payload={}){
  const response=await fetch(ICH_API_URL,{
    method:'POST',
    headers:{'Content-Type':'text/plain;charset=utf-8'},
    body:JSON.stringify({action,password:ICH_API_PASSWORD,role:'owner',payload})
  });
  if(!response.ok)throw new Error(`Connection failed (${response.status})`);
  const result=await response.json();
  if(!result.ok)throw new Error(result.error||'Unknown backend error');
  return result.data;
}

function ichMetadataNotes(data){
  const metadata={recordType:data.recordType||'Reservation',dataComplete:data.dataComplete||'Information Pending',reservationUrl:data.reservationUrl||'',paymentStatus:data.paymentStatus||'Pending'};
  const cleanNotes=String(data.notes||'').replace(/\n?\[ICH_META\][\s\S]*?\[\/ICH_META\]/g,'').trim();
  return `${cleanNotes}${cleanNotes?'\n':''}[ICH_META]${JSON.stringify(metadata)}[/ICH_META]`;
}

function ichExpandReservation(item){
  const reservation={...item,recordType:'Reservation',dataComplete:'Information Pending',reservationUrl:'',paymentStatus:'Pending'};
  const match=String(item.notes||'').match(/\[ICH_META\]([\s\S]*?)\[\/ICH_META\]/);
  if(match){
    try{Object.assign(reservation,JSON.parse(match[1]))}catch{}
    reservation.notes=String(item.notes||'').replace(/\n?\[ICH_META\][\s\S]*?\[\/ICH_META\]/g,'').trim();
  }else{
    const urlMatch=String(item.notes||'').match(/Reservation URL:\s*(https?:\/\/\S+)/i);
    if(urlMatch)reservation.reservationUrl=urlMatch[1];
    const generic=/^(Reserved|CLOSED - Not available|Airbnb \(Not available\))/i.test(item.guestName||'');
    reservation.recordType=/Not available|CLOSED/i.test(item.guestName||'')?'Calendar Block':'Reservation';
    reservation.dataComplete=generic?'Information Pending':'Complete';
  }
  return reservation;
}

function ichCache(){localStorage.setItem(KEYS.reservations,JSON.stringify(state.reservations));localStorage.setItem(KEYS.expenses,JSON.stringify(state.expenses));}
function ichSetStatus(text,error=false){const status=document.querySelector('#syncStatus');if(status){status.textContent=text;status.classList.toggle('sync-error',error)}}

async function syncFromGoogleSheet(showToast=false){
  if(ichSyncing)return;
  ichSyncing=true;ichSetStatus('Syncing…');
  try{
    const data=await ichApi('getBootstrap',{});
    state.reservations=(data.reservations||[]).map(ichExpandReservation);
    state.expenses=data.expenses||[];
    ichCache();renderAll();ichSetStatus('Google Sheet connected');
    if(showToast)toast('Google Sheet synchronized');
  }catch(error){console.error(error);ichSetStatus('Offline backup',true);if(showToast)toast(`Sync failed: ${error.message}`)}
  finally{ichSyncing=false}
}

function ichFormData(form){const data=Object.fromEntries(new FormData(form));['guests','reservationAmount','cleaningFee','commission','taxes','amountReceived'].forEach(key=>data[key]=Number(data[key]||0));return data;}

const ichReservationForm=document.querySelector('#reservationForm');
ichReservationForm.addEventListener('submit',async event=>{
  event.preventDefault();event.stopImmediatePropagation();
  const data=ichFormData(ichReservationForm),isBlock=data.recordType==='Calendar Block';
  if(data.checkOut<=data.checkIn)return toast('Check-out must be after check-in');
  if(!isBlock&&!String(data.guestName||'').trim())return toast('Guest name is required');
  if(data.platform==='Agency'&&!String(data.agencyName||'').trim())return toast('Agency name is required');
  if(isBlock){data.guestName=data.guestName||'Blocked dates';data.guests=1;data.cleaningStatus='Not Required';data.reservationAmount=0;data.cleaningFee=0;data.commission=0;data.taxes=0;data.amountReceived=0;}
  data.notes=ichMetadataNotes(data);ichSetStatus('Saving…');
  try{
    const saved=ichExpandReservation(await ichApi('saveReservation',data));
    const index=state.reservations.findIndex(item=>item.id===saved.id);
    if(index>=0)state.reservations[index]=saved;else state.reservations.push(saved);
    ichCache();document.querySelector('#reservationDialog').close();renderAll();ichSetStatus('Google Sheet connected');toast('Reservation saved to Google Sheet');
  }catch(error){ichSetStatus('Save failed',true);toast(`Could not save: ${error.message}`)}
},true);

const ichExpenseForm=document.querySelector('#expenseForm');
ichExpenseForm.addEventListener('submit',async event=>{
  event.preventDefault();event.stopImmediatePropagation();
  const data=Object.fromEntries(new FormData(ichExpenseForm));data.amount=Number(data.amount||0);
  if(data.amount<=0)return toast('Expense amount must be greater than zero');
  ichSetStatus('Saving…');
  try{
    const saved=await ichApi('saveExpense',data),index=state.expenses.findIndex(item=>item.id===saved.id);
    if(index>=0)state.expenses[index]=saved;else state.expenses.push(saved);
    ichCache();document.querySelector('#expenseDialog').close();renderAll();ichSetStatus('Google Sheet connected');toast('Expense saved to Google Sheet');
  }catch(error){ichSetStatus('Save failed',true);toast(`Could not save: ${error.message}`)}
},true);

const ichDeleteReservation=document.querySelector('#deleteReservationBtn');
ichDeleteReservation.onclick=async()=>{
  const id=ichReservationForm.elements.id.value;
  if(!id||!confirm('Delete this reservation from the Google Sheet?'))return;
  try{await ichApi('deleteReservation',{id});state.reservations=state.reservations.filter(item=>item.id!==id);state.expenses=state.expenses.map(item=>item.reservationId===id?{...item,reservationId:''}:item);ichCache();document.querySelector('#reservationDialog').close();renderAll();toast('Reservation deleted from Google Sheet')}catch(error){toast(`Could not delete: ${error.message}`)}
};

document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-delete-exp]');if(!button)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(!confirm('Delete this expense from the Google Sheet?'))return;
  try{await ichApi('deleteExpense',{id:button.dataset.deleteExp});state.expenses=state.expenses.filter(item=>item.id!==button.dataset.deleteExp);ichCache();renderAll();toast('Expense deleted from Google Sheet')}catch(error){toast(`Could not delete: ${error.message}`)}
},true);

const ichOriginalRenderAll=renderAll;
renderAll=function(){ichOriginalRenderAll();const sync=document.querySelector('#syncButton');if(sync){sync.textContent='Sync Google Sheet';sync.onclick=()=>syncFromGoogleSheet(true)}ichSetStatus(ichSyncing?'Syncing…':'Google Sheet connected')};

if(sessionStorage.getItem('ichAuth')==='1')syncFromGoogleSheet();
const ichOriginalOpenApp=openApp;
openApp=function(){ichOriginalOpenApp();syncFromGoogleSheet()};
