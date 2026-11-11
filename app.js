const STORAGE_KEY = "bcm-career-v1";
const pages = {inicio:"Visão geral",jogador:"Jogador",treino:"Treino",calendario:"Calendário",competicoes:"Competições",ranking:"Rankings",financas:"Finanças",historico:"Histórico"};
let career = loadCareer();
let activePage = "inicio";
function loadCareer(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))}catch{return null}}
function saveCareer(){localStorage.setItem(STORAGE_KEY,JSON.stringify(career))}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)}
function initials(name){return name?name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase():"?"}
function setPage(page){activePage=page;document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));document.getElementById("top-title").textContent=pages[page];render()}
function render(){const root=document.getElementById("page-content");document.getElementById("top-avatar").textContent=career?initials(career.name):"?";if(!career){root.innerHTML=setupScreen();return}root.innerHTML=pageContent()}
function setupScreen(){return `
<div class="form-card card">
 <div class="tag">A TUA HISTÓRIA COMEÇA AQUI</div>
 <h1>Cria a tua carreira.</h1>
 <p>Define o teu ponto de partida. Ao longo das épocas vais evoluir, competir, subir nos rankings e construir o teu percurso no badminton. Podes alterar os teus dados mais tarde.</p>
 <form id="career-form">
  <div class="form-grid">
   <div class="field"><label for="name">Nome do jogador *</label><input id="name" name="name" placeholder="Ex.: Alex Silva" required maxlength="40"></div>
   <div class="field"><label for="age">Idade inicial *</label><input id="age" name="age" type="number" min="10" max="40" value="14" required></div>
   <div class="field"><label for="country">Nacionalidade</label><select id="country" name="country"><option>Portugal</option><option>Espanha</option><option>França</option><option>Inglaterra</option><option>Dinamarca</option><option>China</option><option>Japão</option><option>Índia</option><option>Indonésia</option><option>Outro</option></select></div>
   <div class="field"><label for="club">Clube atual</label><input id="club" name="club" placeholder="Sem clube / nome do clube" maxlength="50"></div>
   <div class="field"><label for="discipline">Especialidade</label><select id="discipline" name="discipline"><option value="Todas as disciplinas">Todas as disciplinas</option><option value="Singulares">Singulares</option><option value="Pares">Pares</option><option value="Pares mistos">Pares mistos</option></select></div>
   <div class="field"><label for="hand">Mão dominante</label><select id="hand" name="hand"><option>Direita</option><option>Esquerda</option></select></div>
  </div>
  <div class="form-actions"><button class="btn" type="submit">Começar carreira <span aria-hidden="true">→</span></button></div>
 </form>
</div>`}
function pageContent(){const p=career;const views={
inicio:`<div class="welcome"><div><div class="tag">ÉPOCA 2026 / 27 · PRÉ-ÉPOCA</div><h1>Bem-vindo, ${esc(p.name.split(" ")[0])}.</h1><p>O teu percurso começa agora. Está na hora de preparar a próxima época.</p></div><button class="btn" data-action="train">Planear treino ↗</button></div>
<div class="grid">
 <div class="card"><div class="metric-label">Idade</div><div class="metric">${p.age}</div><div class="metric-note">Anos</div></div>
 <div class="card"><div class="metric-label">Nível geral</div><div class="metric">45 <span class="muted" style="font-size:12px">/ 100</span></div><div class="metric-note">Avaliação inicial</div></div>
 <div class="card"><div class="metric-label">Ranking nacional</div><div class="metric">—</div><div class="metric-note">Ainda sem classificação</div></div>
 <div class="card"><div class="metric-label">Orçamento</div><div class="metric">1.500€</div><div class="metric-note">Saldo inicial</div></div>
</div>
<div class="two-col"><div><div class="section-head"><h2>Preparação da época</h2><span>O teu ponto de partida</span></div><div class="card"><div class="list-row"><span>Perfil</span><strong>${esc(p.discipline)}</strong></div><div class="list-row"><span>Clube</span><strong>${esc(p.club||"Sem clube")}</strong></div><div class="list-row"><span>País</span><strong>${esc(p.country)}</strong></div><div class="list-row"><span>Mão dominante</span><strong>${esc(p.hand)}</strong></div><div class="progress-row"><span>Preparação global</span><strong>0%</strong></div><div class="progress"><i style="width:0%"></i></div></div></div>
<div><div class="section-head"><h2>Próximo passo</h2><span>Recomendado</span></div><div class="card empty-state"><div class="empty-icon">⌁</div><h3>Constrói a tua base</h3><p>Define os teus objetivos e começa a desenvolver os atributos técnicos, físicos e mentais do teu jogador.</p><button class="btn secondary" data-page="treino">Ir para treino</button></div></div></div>`,
jogador:`<div class="welcome"><div><div class="tag">PERFIL DO ATLETA</div><h1>${esc(p.name)}</h1><p>${esc(p.country)} · ${p.age} anos · ${esc(p.club||"Sem clube")}</p></div><span class="pill">Jogador criado</span></div><div class="grid"><div class="card"><div class="metric-label">Técnica</div><div class="metric">45</div><div class="progress"><i style="width:45%"></i></div></div><div class="card"><div class="metric-label">Físico</div><div class="metric">45</div><div class="progress"><i style="width:45%"></i></div></div><div class="card"><div class="metric-label">Mental</div><div class="metric">45</div><div class="progress"><i style="width:45%"></i></div></div><div class="card"><div class="metric-label">Experiência</div><div class="metric">0 XP</div><div class="metric-note">Primeira época</div></div></div><div class="section-head"><h2>Dados pessoais</h2><span>Época de estreia</span></div><div class="card"><div class="list-row"><span>Especialidade</span><strong>${esc(p.discipline)}</strong></div><div class="list-row"><span>Mão dominante</span><strong>${esc(p.hand)}</strong></div><div class="list-row"><span>Clube</span><strong>${esc(p.club||"Sem clube")}</strong></div></div>`,
treino:emptyPage("PLANO DE DESENVOLVIMENTO","Treino","A área de treino vai permitir gerir sessões, desenvolver atributos e equilibrar carga, fadiga e recuperação.","Define o primeiro plano de treino da época."),
calendario:emptyPage("PLANEAMENTO DA ÉPOCA","Calendário","Organiza a tua época com semanas de treino, períodos de preparação e datas de competição.","Ainda não existem eventos no calendário."),
competicoes:emptyPage("CIRCUITO COMPETITIVO","Competições","Entra em torneios nacionais e internacionais, acompanha os quadros e luta por títulos.","O calendário de torneios será anunciado aqui."),
ranking:emptyPage("CLASSIFICAÇÕES","Rankings","Acompanha a tua evolução nos rankings de singulares, pares e pares mistos.","Ainda não tens pontos de ranking."),
financas:emptyPage("GESTÃO DE CARREIRA","Finanças","Controla o orçamento, custos de viagem, equipamento, inscrições e equipa técnica.","Saldo inicial: 1.500€."),
historico:emptyPage("O TEU PERCURSO","Histórico","Regista resultados, títulos, marcos de carreira e evolução ao longo das épocas.","A tua história ainda está por escrever.")
};return views[activePage]||views.inicio}
function emptyPage(kicker,title,description,action){return `<div class="welcome"><div><div class="tag">${kicker}</div><h1>${title}</h1><p>${description}</p></div></div><div class="card empty-state"><div class="empty-icon">◈</div><h3>${action}</h3><p>Esta secção está preparada para receber novas funcionalidades nas próximas versões.</p></div>`}
document.getElementById("main-nav").addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)setPage(b.dataset.page)});
document.getElementById("page-content").addEventListener("click",e=>{const b=e.target.closest("[data-page],[data-action]");if(!b)return;if(b.dataset.page)setPage(b.dataset.page);if(b.dataset.action==="train")setPage("treino")});
document.getElementById("page-content").addEventListener("submit",e=>{if(e.target.id!=="career-form")return;e.preventDefault();const f=new FormData(e.target);career={name:f.get("name").trim(),age:Number(f.get("age")),country:f.get("country"),club:f.get("club").trim(),discipline:f.get("discipline"),hand:f.get("hand"),createdAt:new Date().toISOString()};saveCareer();setPage("inicio");toast("Carreira criada com sucesso!")});
render();
