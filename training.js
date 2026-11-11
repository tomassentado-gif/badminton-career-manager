const originalPageContent = pageContent;
pageContent = function(){
  ensureProgress();
  if(activePage !== 'treino') return originalPageContent();
  const a=career.attributes, t=career.training;
  const card=(key,label,desc)=>'<div class="card"><div class="tag">'+label+'</div><h3>'+desc+'</h3><div class="list-row"><span>Desenvolve</span><strong>'+key+' +3</strong></div><button class="btn train-btn" data-training="'+key+'" '+(t.sessions>=3?'disabled':'')+'>Realizar sessão</button></div>';
  return '<div class="welcome"><div><div class="tag">PLANO DE DESENVOLVIMENTO · SEMANA '+t.week+'</div><h1>Centro de treino</h1><p>Escolhe o foco de cada sessão e gere a recuperação do atleta.</p></div><span class="pill">'+t.sessions+'/3 sessões</span></div>'
  +'<div class="grid">'+[['Técnica',a.tecnica],['Físico',a.fisico],['Mental',a.mental],['Fadiga',t.fatigue]].map(x=>'<div class="card"><div class="metric-label">'+x[0]+'</div><div class="metric">'+x[1]+'<span class="muted" style="font-size:12px"> / 100</span></div><div class="progress"><i style="width:'+x[1]+'%"></i></div></div>').join('')+'</div>'
  +'<div class="section-head"><h2>Escolher sessão</h2><span>Máximo de 3 por semana</span></div><div class="grid training-grid">'
  +card('tecnica','01 · CAMPO','Treino técnico')+card('fisico','02 · CONDIÇÃO','Preparação física')+card('mental','03 · PERFORMANCE','Treino mental')+'</div>'
  +'<div class="two-col"><div><div class="section-head"><h2>Recuperação</h2></div><div class="card"><p class="muted">Reduz a fadiga acumulada para preparar as próximas sessões.</p><button class="btn secondary" data-action="bcm-recover">Dia de recuperação · -35 fadiga</button></div></div><div><div class="section-head"><h2>Avançar semana</h2></div><div class="card"><p class="muted">Inicia uma nova semana e recupera parte da fadiga.</p><button class="btn secondary" data-action="bcm-week">Começar semana seguinte</button></div></div></div>';
};
function bcmTrain(type){
  ensureProgress(); const t=career.training;
  if(t.sessions>=3){toast('Já concluíste as 3 sessões desta semana.');return;}
  if(t.fatigue>=85){toast('Fadiga elevada. Faz recuperação antes de treinar.');return;}
  const gain=t.fatigue>=60?2:3; career.attributes[type]=Math.min(100,career.attributes[type]+gain);
  t.fatigue=Math.min(100,t.fatigue+20);t.sessions++;t.total=(t.total||0)+1;
  const names={tecnica:'Treino técnico',fisico:'Preparação física',mental:'Treino mental'};
  career.history=career.history||[];career.history.push({label:names[type],detail:'+'+gain+' pontos · Semana '+t.week});
  saveCareer();render();toast(names[type]+' concluído! +'+gain+' pontos.');
}
document.getElementById('page-content').addEventListener('click',function(e){
  const b=e.target.closest('[data-training],[data-action="bcm-recover"],[data-action="bcm-week"]');if(!b)return;
  if(b.dataset.training){bcmTrain(b.dataset.training);return;}
  ensureProgress();const t=career.training;career.history=career.history||[];
  if(b.dataset.action==='bcm-recover'){const old=t.fatigue;t.fatigue=Math.max(0,t.fatigue-35);career.history.push({label:'Dia de recuperação',detail:'Fadiga '+old+'% → '+t.fatigue+'%'});toast('Recuperação concluída.');}
  if(b.dataset.action==='bcm-week'){t.week++;t.sessions=0;t.fatigue=Math.max(0,t.fatigue-25);toast('Semana '+t.week+' iniciada.');}
  saveCareer();render();
});
function ensureProgress(){ if(!career)return; if(!career.attributes)career.attributes={tecnica:45,fisico:45,mental:45}; if(!career.training)career.training={fatigue:0,sessions:0,week:1,total:0}; if(typeof career.training.fatigue!=='number')career.training.fatigue=0; if(typeof career.training.sessions!=='number')career.training.sessions=0; if(typeof career.training.week!=='number')career.training.week=1; if(typeof career.training.total!=='number')career.training.total=0; if(!career.history)career.history=[]; if(typeof career.budget!=='number')career.budget=1500; for(const k of ['tecnica','fisico','mental'])if(typeof career.attributes[k]!=='number')career.attributes[k]=45; }
if(career){ensureProgress();saveCareer();}

render();
