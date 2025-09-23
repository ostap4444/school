
async function loadSchedule() {
  const res = await fetch('rozklad.json');
  const SCHEDULE = await res.json();
  const classSelect = document.getElementById('classSelect');
  classSelect.innerHTML = '';
  Object.keys(SCHEDULE).forEach(k=>{
    let opt=document.createElement('option');opt.value=k;opt.textContent=k;classSelect.appendChild(opt);
  });

  document.getElementById('showSchedule').onclick = ()=>{
    const cls = classSelect.value;
    const day = document.getElementById('daySelect').value;
    const schedule = SCHEDULE[cls] && SCHEDULE[cls][day];
    const container = document.getElementById('scheduleContainer');
    container.innerHTML='';
    if(!schedule){container.innerHTML='<p>Немає розкладу</p>';return;}
    let tbl = document.createElement('table');
    tbl.innerHTML='<thead><tr><th>№</th><th>Урок</th></tr></thead>';
    let tb = document.createElement('tbody');
    schedule.forEach((lesson,i)=>{
      let tr=document.createElement('tr');
      tr.innerHTML='<td>'+(i+1)+'</td><td>'+lesson+'</td>';
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);container.appendChild(tbl);
  };
}
function showView(id){
  ['home','rozklad','bells','support'].forEach(x=>document.getElementById(x).classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
window.onload=()=>{loadSchedule();showView('home');}
