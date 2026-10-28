/* ==========================================================================
   RADARPROMO - LÓGICA DO PORTAL & SIMULAÇÃO DOS 5 AGENTES DE IA
   ========================================================================== */

// 1. BASE DE DADOS DE OFERTAS AUDITADAS (TECH, MODA, BUGS, TIKTOK)
const dealsData = [
  {
    id: 1,
    title: "Headphone Sony WH-1000XM5 com Cancelamento de Ruído Ativo (Preto)",
    marketplace: "amazon",
    marketplaceName: "Amazon",
    category: "bugs",
    tags: ["tech", "bugs"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    oldPrice: 2499.00,
    currentPrice: 799.90,
    discountPercent: 68,
    auditScore: "best",
    auditText: "MÍNIMA HISTÓRICA COMPROVADA (-68%)",
    couponCode: "SONYGLITCH60",
    isGlitch: true,
    affiliateSlug: "sony-wh1000xm5-glitch",
    stockStatus: "🚨 Apenas 4 unidades restantes no estoque",
    paymentCondition: "ou 10x de R$ 79,99 sem juros",
    views: 4520,
    createdAt: new Date(Date.now() - 4 * 60 * 1000) // 4 min atrás
  },
  {
    id: 2,
    title: "Jaqueta Puffer Streetwear Oversized Térmica Impermeável Unissex",
    marketplace: "shopee",
    marketplaceName: "Shopee",
    category: "fashion",
    tags: ["fashion", "tiktok"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    oldPrice: 389.90,
    currentPrice: 139.90,
    discountPercent: 64,
    auditScore: "best",
    auditText: "VIRAL NO TIKTOK (3.4M VIEWS)",
    couponCode: "PUFFERVIBE",
    isGlitch: false,
    affiliateSlug: "jaqueta-puffer-viral-shopee",
    stockStatus: "Estoque médio no centro de distribuição",
    paymentCondition: "Frete Grátis com Cupom Shopee",
    views: 8930,
    createdAt: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: 3,
    title: "Apple iPhone 15 Pro (128 GB) Titânio Natural - Tela Super Retina XDR",
    marketplace: "mercadolivre",
    marketplaceName: "Mercado Livre",
    category: "tech",
    tags: ["tech"],
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    oldPrice: 7299.00,
    currentPrice: 5399.10,
    discountPercent: 26,
    auditScore: "best",
    auditText: "MENOR PREÇO EM 180 DIAS",
    couponCode: "APPLEOFF10",
    isGlitch: false,
    affiliateSlug: "iphone-15-pro-titanio-ml",
    stockStatus: "Vendido pela Loja Oficial Apple",
    paymentCondition: "Em 10x de R$ 539,91 sem juros no cartão",
    views: 12400,
    createdAt: new Date(Date.now() - 32 * 60 * 1000)
  },
  {
    id: 4,
    title: "Air Fryer Forno 12L Digital com Visor Transparente Mondial",
    marketplace: "magalu",
    marketplaceName: "Magalu",
    category: "home",
    tags: ["home"],
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    oldPrice: 799.00,
    currentPrice: 399.90,
    discountPercent: 50,
    auditScore: "normal",
    auditText: "DESCONTO REAL AUDITADO (-50%)",
    couponCode: "MAGALU50",
    isGlitch: false,
    affiliateSlug: "airfryer-mondial-12l-magalu",
    stockStatus: "Entrega Rápida Magalu",
    paymentCondition: "À vista no Pix com 10% adicional",
    views: 3120,
    createdAt: new Date(Date.now() - 50 * 60 * 1000)
  },
  {
    id: 5,
    title: "Console PlayStation 5 Slim Edição Digital + 2 Jogos Exclusivos",
    marketplace: "amazon",
    marketplaceName: "Amazon",
    category: "games",
    tags: ["games", "tech"],
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
    oldPrice: 3999.00,
    currentPrice: 3199.00,
    discountPercent: 20,
    auditScore: "best",
    auditText: "MÍNIMA HISTÓRICA COMPROVADA",
    couponCode: "PS5SLIMAMAZON",
    isGlitch: false,
    affiliateSlug: "ps5-slim-digital-amazon",
    stockStatus: "Envio Imediato Amazon Prime",
    paymentCondition: "Em até 10x sem juros",
    views: 9400,
    createdAt: new Date(Date.now() - 65 * 60 * 1000)
  },
  {
    id: 6,
    title: "Vestido Midi Canelado Manga Longa Minimalista Chic (Estilo Old Money)",
    marketplace: "shopee",
    marketplaceName: "Shopee",
    category: "fashion",
    tags: ["fashion", "tiktok"],
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
    oldPrice: 199.90,
    currentPrice: 69.90,
    discountPercent: 65,
    auditScore: "best",
    auditText: "TREND TIKTOK #OLDMONEY",
    couponCode: "CHICSTYLE",
    isGlitch: false,
    affiliateSlug: "vestido-midi-old-money-shopee",
    stockStatus: "Avaliação 4.9/5 estrelas (2.800 vendas)",
    paymentCondition: "Frete Grátis acima de R$ 39",
    views: 6720,
    createdAt: new Date(Date.now() - 80 * 60 * 1000)
  },
  {
    id: 7,
    title: "Teclado Mecânico Gamer Sem Fio RGB Hot-Swap 75% Switch Red",
    marketplace: "aliexpress",
    marketplaceName: "AliExpress",
    category: "tech",
    tags: ["tech", "games", "tiktok"],
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    oldPrice: 380.00,
    currentPrice: 145.00,
    discountPercent: 62,
    auditScore: "best",
    auditText: "REMESSA CONFORME JÁ INCLUSA",
    couponCode: "ALISETUP30",
    isGlitch: false,
    affiliateSlug: "teclado-mecanico-aliexpress",
    stockStatus: "Estoque no Brasil sem taxa extra",
    paymentCondition: "Em até 3x sem juros",
    views: 5210,
    createdAt: new Date(Date.now() - 95 * 60 * 1000)
  },
  {
    id: 8,
    title: "Robô Aspirador de Pó Inteligente com Mapeamento Laser e Passa Pano",
    marketplace: "mercadolivre",
    marketplaceName: "Mercado Livre",
    category: "home",
    tags: ["home", "tech"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    oldPrice: 1899.00,
    currentPrice: 1199.00,
    discountPercent: 37,
    auditScore: "normal",
    auditText: "MENOR PREÇO DO MÊS",
    couponCode: "ROBOTCLEAN",
    isGlitch: false,
    affiliateSlug: "robo-aspirador-ml",
    stockStatus: "Entrega FULL amanhã",
    paymentCondition: "12x de R$ 99,91 sem juros",
    views: 4100,
    createdAt: new Date(Date.now() - 110 * 60 * 1000)
  },
  {
    id: 9,
    title: "Tênis Esportivo Casual Amortecimento Nuvem Ultra Conforto",
    marketplace: "shopee",
    marketplaceName: "Shopee",
    category: "fashion",
    tags: ["fashion"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    oldPrice: 249.90,
    currentPrice: 89.90,
    discountPercent: 64,
    auditScore: "best",
    auditText: "PROMOÇÃO RELÂMPAGO SHOPEE",
    couponCode: "TENISNUVEM",
    isGlitch: false,
    affiliateSlug: "tenis-esportivo-shopee",
    stockStatus: "Mais de 10.000 pares vendidos",
    paymentCondition: "Parcelamento disponível",
    views: 7300,
    createdAt: new Date(Date.now() - 120 * 60 * 1000)
  }
];

// 2. DADOS DO RADAR DE TENDÊNCIAS (TIKTOK & GOOGLE TRENDS)
const trendsData = [
  {
    id: "t1",
    tag: "#SetupMinimalista • +420% no TikTok",
    productName: "Luminária Barra de LED para Monitor com Sensor",
    metric: "Monitorado por Agente de Tendências • 1.2M menções",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "t2",
    tag: "#OldMoney • Moda Viral",
    productName: "Camisa Linho Manga Curta Gola Padre",
    metric: "Pico de buscas no Google Trends Brasil",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "t3",
    tag: "#AchadinhosShopee • 5.1M Views",
    productName: "Garrafa Térmica Inteligente com Display Digital",
    metric: "Conversão de cliques acima de 24%",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "t4",
    tag: "#TechReview • Trending no YouTube",
    productName: "Microfone Condensador USB para Podcast/Stream",
    metric: "Menor preço encontrado no AliExpress",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&auto=format&fit=crop&q=80"
  }
];

// 3. ESTADO DA APLICAÇÃO
let currentCategory = "all";
let currentMarketplace = "all";
let currentSearchQuery = "";
let currentSort = "recent";
let activeAlertProduct = null;

// ==========================================================================
// 4. INICIALIZAÇÃO
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Renderizar ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // Renderizar elementos iniciais
  renderDeals();
  renderTrends();
  setupEventListeners();
  startAutonomousAgentSimulation();
  updateGlitchBanner();
});

// ==========================================================================
// 5. RENDERIZADOR DO GRID DE OFERTAS
// ==========================================================================
function renderDeals() {
  const dealsGrid = document.getElementById("deals-grid");
  const emptyState = document.getElementById("empty-state");
  const dealsCountLabel = document.getElementById("deals-count-label");

  // Filtragem
  let filtered = dealsData.filter(deal => {
    // Filtro de Categoria
    if (currentCategory === "bugs") {
      if (!deal.isGlitch && !deal.tags.includes("bugs")) return false;
    } else if (currentCategory === "tiktok") {
      if (!deal.tags.includes("tiktok")) return false;
    } else if (currentCategory !== "all" && !deal.tags.includes(currentCategory)) {
      return false;
    }

    // Filtro de Marketplace
    if (currentMarketplace !== "all" && deal.marketplace !== currentMarketplace) {
      return false;
    }

    // Busca textual
    if (currentSearchQuery.trim() !== "") {
      const q = currentSearchQuery.toLowerCase();
      const matchTitle = deal.title.toLowerCase().includes(q);
      const matchStore = deal.marketplaceName.toLowerCase().includes(q);
      const matchCoupon = deal.couponCode && deal.couponCode.toLowerCase().includes(q);
      if (!matchTitle && !matchStore && !matchCoupon) return false;
    }

    return true;
  });

  // Ordenação
  if (currentSort === "discount") {
    filtered.sort((a, b) => b.discountPercent - a.discountPercent);
  } else if (currentSort === "lowest-price") {
    filtered.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (currentSort === "views") {
    filtered.sort((a, b) => b.views - a.views);
  } else {
    // Recent
    filtered.sort((a, b) => b.createdAt - a.createdAt);
  }

  dealsCountLabel.textContent = `Exibindo ${filtered.length} promoções auditadas`;

  if (filtered.length === 0) {
    dealsGrid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  dealsGrid.innerHTML = filtered.map(deal => createDealCardHTML(deal)).join("");

  // Recriar ícones Lucide nos novos cards
  if (window.lucide) {
    lucide.createIcons();
  }

  // Vincular eventos dos cards
  bindDealCardEvents();
}

function createDealCardHTML(deal) {
  const formattedOldPrice = deal.oldPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  const formattedPrice = deal.currentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

  let auditClass = "audit-best";
  let auditIcon = "shield-check";
  if (deal.auditScore === "normal") {
    auditClass = "audit-normal";
    auditIcon = "check";
  } else if (deal.auditScore === "warning") {
    auditClass = "audit-warning";
    auditIcon = "alert-triangle";
  }

  return `
    <article class="deal-card ${deal.isGlitch ? 'is-glitch' : ''}" data-id="${deal.id}">
      
      <!-- Badges do Topo -->
      <div class="card-badges-top">
        <span class="marketplace-badge">
          <i data-lucide="shopping-bag"></i> ${deal.marketplaceName}
        </span>
        <span class="discount-tag">-${deal.discountPercent}% OFF</span>
      </div>

      <!-- Mídia / Foto -->
      <div class="card-media">
        <img src="${deal.image}" alt="${deal.title}" loading="lazy">
      </div>

      <!-- Barra de Auditoria de Preço com IA -->
      <div class="price-audit-bar ${auditClass}">
        <i data-lucide="${auditIcon}"></i>
        <span>${deal.auditText}</span>
      </div>

      <!-- Conteúdo do Produto -->
      <div class="card-content">
        <h4 class="product-title" title="${deal.title}">${deal.title}</h4>

        <div class="price-box">
          <span class="old-price">R$ ${formattedOldPrice}</span>
          <div class="current-price-wrap">
            <span class="currency">R$</span>
            <span class="main-price">${formattedPrice}</span>
          </div>
          <span class="payment-condition">${deal.paymentCondition}</span>
        </div>

        ${deal.couponCode ? `
          <div class="coupon-tag-box">
            <span>Cupom verificado:</span>
            <span class="coupon-code">${deal.couponCode}</span>
          </div>
        ` : ''}

        <!-- Ações do Card -->
        <div class="card-actions">
          <button class="btn-grab-deal" data-affiliate="${deal.affiliateSlug}" data-title="${deal.title}" data-store="${deal.marketplaceName}">
            <i data-lucide="external-link"></i>
            <span>Pegar Promoção</span>
          </button>
          
          <button class="btn-alert-deal" data-id="${deal.id}" title="Criar Sniper de Preço para este produto">
            <i data-lucide="bell"></i>
          </button>
        </div>

      </div>
    </article>
  `;
}

// ==========================================================================
// 6. RENDERIZADOR DE TENDÊNCIAS
// ==========================================================================
function renderTrends() {
  const container = document.getElementById("trends-container");
  container.innerHTML = trendsData.map(trend => `
    <div class="trend-card">
      <div class="trend-img-wrap">
        <img src="${trend.image}" alt="${trend.productName}">
      </div>
      <div class="trend-info">
        <span class="trend-tag">${trend.tag}</span>
        <h5 class="trend-product-name">${trend.productName}</h5>
        <span class="trend-metric">${trend.metric}</span>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// 7. EVENT LISTENERS & INTERAÇÕES
// ==========================================================================
function setupEventListeners() {
  // 1. Filtro de Categorias (Pills)
  const categoryPills = document.querySelectorAll(".category-pill");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderDeals();
    });
  });

  // 2. Filtro de Marketplaces (Chips)
  const marketplaceChips = document.querySelectorAll(".chip");
  marketplaceChips.forEach(chip => {
    chip.addEventListener("click", () => {
      marketplaceChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentMarketplace = chip.dataset.marketplace;
      renderDeals();
    });
  });

  // 3. Busca em Tempo Real
  const searchInput = document.getElementById("main-search-input");
  const clearBtn = document.getElementById("clear-search-btn");

  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    clearBtn.style.display = currentSearchQuery ? "flex" : "none";
    renderDeals();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentSearchQuery = "";
    clearBtn.style.display = "none";
    renderDeals();
    searchInput.focus();
  });

  // Atalho de Teclado Ctrl + K
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // 4. Seletor de Ordenação
  const sortSelect = document.getElementById("sort-select");
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderDeals();
  });

  // 5. Botão Reset Filters
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentCategory = "all";
      currentMarketplace = "all";
      currentSearchQuery = "";
      searchInput.value = "";
      clearBtn.style.display = "none";
      
      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      document.querySelector(".category-pill[data-category='all']").classList.add("active");

      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      document.querySelector(".chip[data-marketplace='all']").classList.add("active");

      renderDeals();
    });
  }

  // 6. Drawer dos 5 Agentes
  const toggleDrawerBtn = document.getElementById("toggle-agents-drawer");
  const closeDrawerBtn = document.getElementById("close-agents-drawer");
  const drawer = document.getElementById("agents-drawer");
  const overlay = document.getElementById("agents-overlay");

  toggleDrawerBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    overlay.classList.add("open");
  });

  const closeDrawer = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
  };

  closeDrawerBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // 7. Modais (VIP)
  const openVipBtn = document.getElementById("open-vip-modal");
  const openVipFooterBtn = document.getElementById("open-vip-footer");
  const closeVipBtn = document.getElementById("close-vip-modal");
  const vipModal = document.getElementById("vip-modal");

  const openVip = () => { vipModal.style.display = "flex"; };
  const closeVip = () => { vipModal.style.display = "none"; };

  openVipBtn.addEventListener("click", openVip);
  if (openVipFooterBtn) openVipFooterBtn.addEventListener("click", openVip);
  closeVipBtn.addEventListener("click", closeVip);
  vipModal.addEventListener("click", (e) => {
    if (e.target === vipModal) closeVip();
  });

  // 8. Modal de Alerta de Preço
  const closeAlertModalBtn = document.getElementById("close-alert-modal");
  const alertModal = document.getElementById("alert-modal");
  const priceAlertForm = document.getElementById("price-alert-form");

  closeAlertModalBtn.addEventListener("click", () => {
    alertModal.style.display = "none";
  });

  alertModal.addEventListener("click", (e) => {
    if (e.target === alertModal) alertModal.style.display = "none";
  });

  priceAlertForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const targetPrice = document.getElementById("target-price-input").value;
    const phone = document.getElementById("lead-whatsapp").value;

    alertModal.style.display = "none";

    // Adiciona log no Agente de Funil
    addAgentLog("funnel-log", `🔔 Novo lead cadastrado: Alerta para "${activeAlertProduct.title.substring(0, 30)}..." abaixo de R$ ${targetPrice} via ${phone}`);

    // Feedback visual para o usuário
    showToast(
      "Sniper de Preço Ativado!", 
      `Confirmado para o WhatsApp ${phone}. Você receberá o link assim que o preço atingir R$ ${targetPrice}.`
    );
  });

  // 9. Toast Fechamento
  document.getElementById("close-toast").addEventListener("click", () => {
    document.getElementById("live-toast").style.display = "none";
  });

  // 10. Botão Atualizar Tendências
  document.getElementById("refresh-trends-btn").addEventListener("click", () => {
    addAgentLog("trends-log", "Buscando novas tendências virais no TikTok e Google Trends...");
    showToast("Tendências Atualizadas!", "O Agente de Tendências encontrou novos virais em Moda e Tech.");
  });
}

function bindDealCardEvents() {
  // Botão Pegar Promoção (Simula injeção de Tag e Redirecionador)
  document.querySelectorAll(".btn-grab-deal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slug = btn.dataset.affiliate;
      const title = btn.dataset.title;
      const store = btn.dataset.store;

      // Log no Agente de Backend
      addAgentLog("backend-log", `⚡ Clique registrado: /ir/${slug} ➔ Tag de Afiliado injetada com sucesso.`);

      // Notificação ao usuário
      showToast(
        `Redirecionando para ${store}...`, 
        `Aplicando cupom e ativando sua garantia de melhor preço.`
      );

      // Simulação de abertura do link após 1 segundo
      setTimeout(() => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(title + " " + store)}`, "_blank");
      }, 900);
    });
  });

  // Botão Criar Alerta de Preço
  document.querySelectorAll(".btn-alert-deal").forEach(btn => {
    btn.addEventListener("click", () => {
      const dealId = parseInt(btn.dataset.id);
      const deal = dealsData.find(d => d.id === dealId);
      if (!deal) return;

      activeAlertProduct = deal;
      openAlertModal(deal);
    });
  });
}

function openAlertModal(deal) {
  const modal = document.getElementById("alert-modal");
  const titleElem = document.getElementById("alert-product-title");
  const previewContainer = document.getElementById("alert-mini-preview");
  const targetPriceInput = document.getElementById("target-price-input");

  titleElem.textContent = deal.title;
  previewContainer.innerHTML = `
    <img src="${deal.image}" alt="${deal.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
    <div>
      <strong style="color: #fff; font-size: 0.85rem; display: block;">Preço Atual: R$ ${deal.currentPrice.toFixed(2)}</strong>
      <span style="color: #94A3B8; font-size: 0.75rem;">Loja: ${deal.marketplaceName}</span>
    </div>
  `;

  // Sugere um preço 15% menor
  const suggestedPrice = (deal.currentPrice * 0.85).toFixed(2);
  targetPriceInput.value = suggestedPrice;

  modal.style.display = "flex";
}

// ==========================================================================
// 8. SIMULADOR DOS 5 AGENTES AUTÔNOMOS EM SEGUNDO PLANO
// ==========================================================================
function startAutonomousAgentSimulation() {
  const simulatedEvents = [
    {
      agent: "scout-log",
      text: "Varrendo fórum Promobit & Pelando: 14 novas postagens detectadas.",
      toast: false
    },
    {
      agent: "backend-log",
      text: "Verificação de estoque: Fone Sony XM5 com 2 unidades vendidas.",
      toast: false
    },
    {
      agent: "trends-log",
      text: "Novo pico detectado: #EstiloMinimalista cresceu +88% em 2 horas.",
      toast: false
    },
    {
      agent: "funnel-log",
      text: "Automação: 18 novos inscritos no canal do Telegram nesta última hora.",
      toast: false
    },
    {
      agent: "frontend-log",
      text: "Otimização de imagem: CDN carregando miniaturas WebP em 45ms.",
      toast: false
    },
    {
      agent: "scout-log",
      text: "🚨 NOVO BUG: Cafeteira Nespresso com 70% de desconto na Amazon!",
      toast: true,
      title: "🚨 Novo Bug Detectado!",
      desc: "Cafeteira Nespresso Vertuo por R$ 189 na Amazon. Corra antes de cair!"
    }
  ];

  let eventIndex = 0;
  setInterval(() => {
    const current = simulatedEvents[eventIndex % simulatedEvents.length];
    addAgentLog(current.agent, current.text);

    if (current.toast) {
      showToast(current.title, current.desc);
      updateGlitchBanner(current.desc);
    }

    eventIndex++;
  }, 12000); // A cada 12 segundos executa uma tarefa dos agentes
}

function addAgentLog(logContainerId, text) {
  const container = document.getElementById(logContainerId);
  if (!container) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(" ")[0];

  const p = document.createElement("p");
  p.className = "log-line";
  p.innerHTML = `<span>${timeStr}</span> ${text}`;

  container.prepend(p);

  // Mantém no máximo 6 linhas
  if (container.children.length > 6) {
    container.removeChild(container.lastChild);
  }
}

function updateGlitchBanner(customText) {
  const glitchText = document.getElementById("glitch-text");
  if (customText) {
    glitchText.textContent = customText;
    return;
  }
  glitchText.textContent = "Fone Sony WH-1000XM5 com 68% de desconto na Amazon (Preço Mínimo)";
}

function showToast(title, desc) {
  const toast = document.getElementById("live-toast");
  document.getElementById("toast-title").textContent = title;
  document.getElementById("toast-desc").textContent = desc;

  toast.style.display = "flex";

  // Esconder após 6 segundos
  setTimeout(() => {
    toast.style.display = "none";
  }, 6000);
}
