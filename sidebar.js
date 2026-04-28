/* ============================================================
   SIDEBAR VÉRTICE IMÓVEIS — componente reutilizável
   ============================================================ */

const SIDEBAR_CSS = `
  .sidebar{position:fixed;top:56px;left:0;bottom:0;width:220px;background:#0f0f0f;border-right:0.5px solid rgba(201,151,58,0.15);z-index:90;overflow:hidden;transition:width 0.25s ease;display:flex;flex-direction:column;}
  .sidebar.collapsed{width:56px;}
  .sidebar-inner{flex:1;overflow-y:auto;overflow-x:hidden;padding:12px 0;}
  .sidebar-inner::-webkit-scrollbar{width:3px;}
  .sidebar-inner::-webkit-scrollbar-thumb{background:rgba(201,151,58,0.2);border-radius:2px;}

  /* Toggle button */
  .sidebar-toggle{display:flex;align-items:center;justify-content:center;height:40px;border-top:0.5px solid rgba(201,151,58,0.1);cursor:pointer;color:rgba(201,151,58,0.4);font-size:16px;transition:color 0.2s;flex-shrink:0;background:none;border-left:none;border-right:none;border-bottom:none;width:100%;}
  .sidebar-toggle:hover{color:rgba(201,151,58,0.8);}

  /* Grupo */
  .nav-group{margin-bottom:2px;}
  .nav-group-header{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;transition:all 0.15s;user-select:none;position:relative;}
  .nav-group-header:hover{background:rgba(201,151,58,0.05);}
  .nav-group-icon{font-size:18px;width:24px;text-align:center;flex-shrink:0;}
  .nav-group-label{font-size:11px;font-weight:500;letter-spacing:1.5px;color:rgba(201,151,58,0.5);text-transform:uppercase;white-space:nowrap;overflow:hidden;transition:opacity 0.2s;}
  .nav-group-arrow{margin-left:auto;font-size:10px;color:rgba(201,151,58,0.3);transition:transform 0.2s;flex-shrink:0;}
  .nav-group.open .nav-group-arrow{transform:rotate(90deg);}
  .sidebar.collapsed .nav-group-label{opacity:0;pointer-events:none;width:0;}
  .sidebar.collapsed .nav-group-arrow{opacity:0;width:0;}

  /* Itens */
  .nav-items{overflow:hidden;max-height:0;transition:max-height 0.25s ease;}
  .nav-group.open .nav-items{max-height:300px;}
  .sidebar.collapsed .nav-items{max-height:0!important;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:8px 16px 8px 28px;font-size:12px;color:#6a6050;cursor:pointer;transition:all 0.15s;border-left:2px solid transparent;text-decoration:none;white-space:nowrap;}
  .nav-item:hover{color:#E8E0D0;background:rgba(201,151,58,0.05);}
  .nav-item.active{color:#C9973A;border-left-color:#C9973A;background:rgba(201,151,58,0.08);}
  .nav-item-icon{font-size:14px;width:20px;text-align:center;flex-shrink:0;}
  .nav-item-label{overflow:hidden;transition:opacity 0.2s;white-space:nowrap;}
  .sidebar.collapsed .nav-item-label{opacity:0;width:0;}

  /* Item direto (Dashboard) */
  .nav-direct{display:flex;align-items:center;gap:10px;padding:9px 16px;font-size:12px;color:#6a6050;cursor:pointer;transition:all 0.15s;border-left:2px solid transparent;text-decoration:none;white-space:nowrap;margin-bottom:4px;}
  .nav-direct:hover{color:#E8E0D0;background:rgba(201,151,58,0.05);}
  .nav-direct.active{color:#C9973A;border-left-color:#C9973A;background:rgba(201,151,58,0.08);}
  .nav-direct-icon{font-size:18px;width:24px;text-align:center;flex-shrink:0;}
  .nav-direct-label{overflow:hidden;transition:opacity 0.2s;white-space:nowrap;}
  .sidebar.collapsed .nav-direct-label{opacity:0;width:0;}

  /* Ícone ativo no modo collapsed — destaque roxo igual ao print */
  .sidebar.collapsed .nav-direct.active .nav-direct-icon,
  .sidebar.collapsed .nav-group-header.active-group .nav-group-icon {
    background:rgba(201,151,58,0.2);
    border-radius:8px;
    padding:4px;
  }

  /* Tooltip no modo collapsed */
  .nav-tooltip{position:fixed;left:66px;background:#1a1a1a;border:0.5px solid rgba(201,151,58,0.35);border-radius:4px;padding:5px 12px;font-size:11px;color:#E8E0D0;letter-spacing:0.5px;white-space:nowrap;pointer-events:none;z-index:9999;opacity:0;transition:opacity 0.15s;}
  .nav-tooltip.show{opacity:1;}

  /* Main ajuste */
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
      <div class="sidebar-inner">

        <a class="nav-direct ${paginaAtiva==='dashboard'?'active':''}" href="dashboard.html"
          onmouseenter="showTip(this,'Dashboard')" onmouseleave="hideTip()">
          <span class="nav-direct-icon">🏠</span>
          <span class="nav-direct-label">Dashboard</span>
        </a>

        <div class="nav-group ${grupoAtivo==='cadastros'?'open':''}" id="grp-cadastros">
          <div class="nav-group-header ${grupoAtivo==='cadastros'?'active-group':''}" onclick="toggleGrupo('grp-cadastros')"
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
          <div class="nav-group-header ${grupoAtivo==='vendas'?'active-group':''}" onclick="toggleGrupo('grp-vendas')"
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
          <div class="nav-group-header ${grupoAtivo==='gestao'?'active-group':''}" onclick="toggleGrupo('grp-gestao')"
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
      <button class="sidebar-toggle" onclick="toggleSidebar()" id="sidebar-toggle" title="Expandir menu">⟩</button>
    </div>
  `;

  const main = document.querySelector('.main');
  if (main) main.insertAdjacentHTML('beforebegin', html);

  const tip = document.createElement('div');
  tip.className = 'nav-tooltip';
  tip.id = 'nav-tooltip';
  document.body.appendChild(tip);

  // Estado padrão: MINIMIZADO
  // Só expande se o usuário tiver clicado em expandir antes
  const savedState = localStorage.getItem('sidebar_collapsed');
  const deveCollapse = savedState === null || savedState === 'true';

  if (deveCollapse) {
    document.getElementById('sidebar').classList.add('collapsed');
    document.getElementById('sidebar-toggle').textContent = '⟩';
    document.getElementById('sidebar-toggle').title = 'Expandir menu';
    // Remove transition inicial para evitar flash
    const sb = document.getElementById('sidebar');
    sb.style.transition = 'none';
    if (main) main.style.marginLeft = '56px';
    requestAnimationFrame(() => { sb.style.transition = ''; });
  } else {
    document.getElementById('sidebar-toggle').textContent = '⟨';
    document.getElementById('sidebar-toggle').title = 'Minimizar menu';
    if (main) main.style.marginLeft = '220px';
  }
}

function toggleGrupo(id) {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('collapsed')) {
    // Ao clicar num grupo minimizado, expande o menu e abre o grupo
    sidebar.classList.remove('collapsed');
    const btn = document.getElementById('sidebar-toggle');
    btn.textContent = '⟨';
    btn.title = 'Minimizar menu';
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
  const btn = document.getElementById('sidebar-toggle');
  const main = document.querySelector('.main');
  const collapsed = sidebar.classList.toggle('collapsed');

  if (collapsed) {
    btn.textContent = '⟩';
    btn.title = 'Expandir menu';
    if (main) main.style.marginLeft = '56px';
    document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
  } else {
    btn.textContent = '⟨';
    btn.title = 'Minimizar menu';
    if (main) main.style.marginLeft = '220px';
  }

  localStorage.setItem('sidebar_collapsed', collapsed);
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