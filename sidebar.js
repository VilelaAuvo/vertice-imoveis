/* ============================================================
   SIDEBAR VÉRTICE IMÓVEIS — componente reutilizável
   ============================================================ */

const SIDEBAR_CSS = `
  .sidebar{position:fixed;top:56px;left:0;bottom:0;width:220px;background:#0f0f0f;border-right:0.5px solid rgba(201,151,58,0.15);z-index:90;overflow:hidden;transition:width 0.25s ease;display:flex;flex-direction:column;}
  .sidebar.collapsed{width:56px;}

  /* Botão do TOPO */
  .sb-top-toggle{display:flex;align-items:center;justify-content:flex-end;padding:8px 14px;border-bottom:0.5px solid rgba(201,151,58,0.1);cursor:pointer;flex-shrink:0;transition:background 0.15s;}
  .sb-top-toggle:hover{background:rgba(201,151,58,0.05);}
  .sb-top-btn{width:24px;height:24px;border-radius:50%;border:0.5px solid rgba(201,151,58,0.25);display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(201,151,58,0.5);transition:all 0.2s;flex-shrink:0;}
  .sb-top-toggle:hover .sb-top-btn{border-color:rgba(201,151,58,0.6);color:rgba(201,151,58,0.9);}
  .sidebar.collapsed .sb-top-toggle{justify-content:center;padding:8px 0;}

  /* Inner */
  .sidebar-inner{flex:1;overflow-y:auto;overflow-x:hidden;padding:10px 0;}
  .sidebar-inner::-webkit-scrollbar{width:3px;}
  .sidebar-inner::-webkit-scrollbar-thumb{background:rgba(201,151,58,0.2);border-radius:2px;}

  /* Botão do RODAPÉ */
  .sidebar-toggle{display:flex;align-items:center;justify-content:flex-end;padding:8px 14px;border-top:0.5px solid rgba(201,151,58,0.1);cursor:pointer;flex-shrink:0;transition:background 0.15s;gap:8px;}
  .sidebar-toggle:hover{background:rgba(201,151,58,0.05);}
  .sidebar-toggle:hover .sb-bot-btn{border-color:rgba(201,151,58,0.6);color:rgba(201,151,58,0.9);}
  .sb-bot-label{font-size:10px;letter-spacing:1px;color:rgba(201,151,58,0.35);text-transform:uppercase;white-space:nowrap;transition:opacity 0.2s;}
  .sb-bot-btn{width:24px;height:24px;border-radius:50%;border:0.5px solid rgba(201,151,58,0.25);display:flex;align-items:center;justify-content:center;font-size:12px;color:rgba(201,151,58,0.5);transition:all 0.2s;flex-shrink:0;}
  .sidebar.collapsed .sidebar-toggle{justify-content:center;padding:8px 0;}
  .sidebar.collapsed .sb-bot-label{opacity:0;width:0;overflow:hidden;}

  /* Grupo */
  .nav-group{margin-bottom:2px;}
  .nav-group-header{display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;transition:all 0.15s;user-select:none;}
  .nav-group-header:hover{background:rgba(201,151,58,0.05);}
  .nav-group-icon{font-size:16px;width:24px;text-align:center;flex-shrink:0;}
  .nav-group-label{font-size:11px;font-weight:500;letter-spacing:1.5px;color:rgba(201,151,58,0.5);text-transform:uppercase;white-space:nowrap;transition:opacity 0.2s;}
  .nav-group-arrow{margin-left:auto;font-size:10px;color:rgba(201,151,58,0.3);transition:transform 0.2s;flex-shrink:0;}
  .nav-group.open .nav-group-arrow{transform:rotate(90deg);}
  .sidebar.collapsed .nav-group-label{opacity:0;width:0;overflow:hidden;}
  .sidebar.collapsed .nav-group-arrow{opacity:0;width:0;}

  /* Itens */
  .nav-items{overflow:hidden;max-height:0;transition:max-height 0.25s ease;}
  .nav-group.open .nav-items{max-height:300px;}
  .sidebar.collapsed .nav-items{max-height:0!important;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 26px;font-size:12px;color:#6a6050;cursor:pointer;transition:all 0.15s;border-left:2px solid transparent;text-decoration:none;white-space:nowrap;}
  .nav-item:hover{color:#E8E0D0;background:rgba(201,151,58,0.05);}
  .nav-item.active{color:#C9973A;border-left-color:#C9973A;background:rgba(201,151,58,0.08);}
  .nav-item-icon{font-size:14px;width:20px;text-align:center;flex-shrink:0;}
  .nav-item-label{overflow:hidden;transition:opacity 0.2s;white-space:nowrap;}
  .sidebar.collapsed .nav-item-label{opacity:0;width:0;}

  /* Item direto */
  .nav-direct{display:flex;align-items:center;gap:10px;padding:9px 14px;font-size:12px;color:#6a6050;cursor:pointer;transition:all 0.15s;border-left:2px solid transparent;text-decoration:none;white-space:nowrap;margin-bottom:4px;}
  .nav-direct:hover{color:#E8E0D0;background:rgba(201,151,58,0.05);}
  .nav-direct.active{color:#C9973A;border-left-color:#C9973A;background:rgba(201,151,58,0.08);}
  .nav-direct-icon{font-size:16px;width:24px;text-align:center;flex-shrink:0;}
  .nav-direct-label{overflow:hidden;transition:opacity 0.2s;white-space:nowrap;}
  .sidebar.collapsed .nav-direct-label{opacity:0;width:0;}

  /* Tooltip */
  .nav-tooltip{position:fixed;left:66px;background:#1a1a1a;border:0.5px solid rgba(201,151,58,0.35);border-radius:4px;padding:5px 12px;font-size:11px;color:#E8E0D0;letter-spacing:0.5px;white-space:nowrap;pointer-events:none;z-index:9999;opacity:0;transition:opacity 0.15s;}
  .nav-tooltip.show{opacity:1;}

  /* Main */
  .main{margin-left:220px;transition:margin-left 0.25s ease;}
  .sidebar.collapsed ~ .main{margin-left:56px;}

  @media(max-width:900px){.sidebar{display:none;}.main{margin-left:0!important;}}
`;

function renderSidebar(paginaAtiva) {
  if (!document.getElementById('sidebar-style')) {
    const style = document.createElement('style');
    style.id = 'sidebar-style';
    style.textContent = SIDEBAR_CSS;
    document.head.appendChild(style);
  }

  const usuario = JSON.parse(sessionStorage.getItem('vertice_usuario') || '{}');
  const perfil = usuario.perfil || '';

  const grupoAtivo = {
    'clientes': 'cadastros',
    'empreendimentos': 'cadastros',
    'vendas': 'vendas',
    'financeiro': 'gestao',
    'comissoes': 'gestao',
    'usuarios': 'gestao',
  }[paginaAtiva] || '';

  const html = `
    <div class="sidebar" id="sidebar">

      <!-- BOTÃO TOPO -->
      <div class="sb-top-toggle" onclick="toggleSidebar()" id="sb-top-toggle" title="Recolher menu">
        <span class="sb-top-btn" id="sb-top-btn">‹</span>
      </div>

      <div class="sidebar-inner">

        <a class="nav-direct ${paginaAtiva==='dashboard'?'active':''}" href="dashboard.html"
          onmouseenter="showTip(this,'Dashboard')" onmouseleave="hideTip()">
          <span class="nav-direct-icon">🏠</span>
          <span class="nav-direct-label">Dashboard</span>
        </a>

        <div class="nav-group ${grupoAtivo==='cadastros'?'open':''}" id="grp-cadastros">
          <div class="nav-group-header" onclick="toggleGrupo('grp-cadastros')"
            onmouseenter="showTip(this,'Cadastros')" onmouseleave="hideTip()">
            <span class="nav-group-icon">📋</span>
            <span class="nav-group-label">Cadastros</span>
            <span class="nav-group-arrow">›</span>
          </div>
          <div class="nav-items">
            <a class="nav-item ${paginaAtiva==='clientes'?'active':''}" href="clientes.html">
              <span class="nav-item-icon">👥</span>
              <span class="nav-item-label">Clientes</span>
            </a>
            <a class="nav-item ${paginaAtiva==='empreendimentos'?'active':''}" href="empreendimentos.html">
              <span class="nav-item-icon">🏢</span>
              <span class="nav-item-label">Empreendimentos</span>
            </a>
          </div>
        </div>

        <div class="nav-group ${grupoAtivo==='vendas'?'open':''}" id="grp-vendas">
          <div class="nav-group-header" onclick="toggleGrupo('grp-vendas')"
            onmouseenter="showTip(this,'Vendas')" onmouseleave="hideTip()">
            <span class="nav-group-icon">💼</span>
            <span class="nav-group-label">Vendas</span>
            <span class="nav-group-arrow">›</span>
          </div>
          <div class="nav-items">
            <a class="nav-item ${paginaAtiva==='vendas'?'active':''}" href="vendas.html">
              <span class="nav-item-icon">📝</span>
              <span class="nav-item-label">Propostas</span>
            </a>
          </div>
        </div>

        <div class="nav-group ${grupoAtivo==='gestao'?'open':''}" id="grp-gestao">
          <div class="nav-group-header" onclick="toggleGrupo('grp-gestao')"
            onmouseenter="showTip(this,'Gestão')" onmouseleave="hideTip()">
            <span class="nav-group-icon">💰</span>
            <span class="nav-group-label">Gestão</span>
            <span class="nav-group-arrow">›</span>
          </div>
          <div class="nav-items">
            <a class="nav-item ${paginaAtiva==='financeiro'?'active':''}" href="financeiro.html">
              <span class="nav-item-icon">📊</span>
              <span class="nav-item-label">Financeiro</span>
            </a>
            ${perfil!=='Corretor'?`
            <a class="nav-item ${paginaAtiva==='comissoes'?'active':''}" href="comissoes.html">
              <span class="nav-item-icon">💵</span>
              <span class="nav-item-label">Comissões</span>
            </a>`:''}
            ${perfil==='Administrador'?`
            <a class="nav-item ${paginaAtiva==='usuarios'?'active':''}" href="usuarios.html">
              <span class="nav-item-icon">👤</span>
              <span class="nav-item-label">Usuários</span>
            </a>`:''}
          </div>
        </div>

      </div>

      <!-- BOTÃO RODAPÉ -->
      <div class="sidebar-toggle" onclick="toggleSidebar()" id="sb-bot-toggle" title="Recolher menu">
        <span class="sb-bot-label" id="sb-bot-label">Minimizar</span>
        <span class="sb-bot-btn" id="sb-bot-btn">‹</span>
      </div>

    </div>
  `;

  const main = document.querySelector('.main');
  if (main) main.insertAdjacentHTML('beforebegin', html);

  const tip = document.createElement('div');
  tip.className = 'nav-tooltip';
  tip.id = 'nav-tooltip';
  document.body.appendChild(tip);

  // Estado: padrão EXPANDIDO
  const savedState = localStorage.getItem('sidebar_collapsed');
  const deveCollapse = savedState === 'true';

  if (deveCollapse) {
    document.getElementById('sidebar').classList.add('collapsed');
    _setCollapsedUI(true);
    const main = document.querySelector('.main');
    const sb = document.getElementById('sidebar');
    sb.style.transition = 'none';
    if (main) main.style.marginLeft = '56px';
    requestAnimationFrame(() => { sb.style.transition = ''; });
  } else {
    _setCollapsedUI(false);
    if (main) main.style.marginLeft = '220px';
  }
}

function _setCollapsedUI(collapsed) {
  const topBtn = document.getElementById('sb-top-btn');
  const botBtn = document.getElementById('sb-bot-btn');
  const botLabel = document.getElementById('sb-bot-label');
  const topToggle = document.getElementById('sb-top-toggle');

  if (collapsed) {
    if (topBtn) topBtn.textContent = '›';
    if (botBtn) botBtn.textContent = '›';
    if (botLabel) botLabel.textContent = '';
    if (topToggle) { topToggle.title = 'Expandir menu'; topToggle.style.justifyContent = 'center'; }
  } else {
    if (topBtn) topBtn.textContent = '‹';
    if (botBtn) botBtn.textContent = '‹';
    if (botLabel) botLabel.textContent = 'Minimizar';
    if (topToggle) { topToggle.title = 'Minimizar menu'; topToggle.style.justifyContent = ''; }
  }
}

function toggleGrupo(id) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
    _setCollapsedUI(false);
    localStorage.setItem('sidebar_collapsed', 'false');
    const main = document.querySelector('.main');
    if (main) main.style.marginLeft = '220px';
    setTimeout(() => {
      const grp = document.getElementById(id);
      if (grp) grp.classList.add('open');
    }, 50);
    return;
  }
  const grp = document.getElementById(id);
  if (grp) grp.classList.toggle('open');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');
  const collapsed = sidebar.classList.toggle('collapsed');

  _setCollapsedUI(collapsed);
  localStorage.setItem('sidebar_collapsed', collapsed);

  if (collapsed) {
    if (main) main.style.marginLeft = '56px';
    document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
  } else {
    if (main) main.style.marginLeft = '220px';
  }
}

function showTip(el, texto) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar.classList.contains('collapsed')) return;
  const tip = document.getElementById('nav-tooltip');
  const rect = el.getBoundingClientRect();
  tip.textContent = texto;
  tip.style.top = (rect.top + rect.height / 2 - 13) + 'px';
  tip.classList.add('show');
}

function hideTip() {
  const tip = document.getElementById('nav-tooltip');
  if (tip) tip.classList.remove('show');
}