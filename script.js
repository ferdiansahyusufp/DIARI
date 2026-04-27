/* ============================================================
   DIARI TRAVEL — script.js
   Pure Static Generation · Elegant Interactions
   ============================================================ */

(function () {
  'use strict';

  // ── 1. Database Statis Diari Travel ──────────────────────
  const DIARI_CATALOG = [
    {
      id: 'pkg-01',
      category: 'asia',
      title: 'Ketenangan Musim Gugur Kyoto',
      destination: 'Kyoto, Osaka, Nara',
      duration: '6 Hari 5 Malam',
      description: 'Menyusuri jalanan berbatu di Gion, menyesap matcha hangat, dan mengagumi dedaunan merah yang berguguran di kuil-kuil kuno.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
      price: 18500000,
      itinerary: [
        'Hari 1: Tiba di Kansai, meluncur pelan ke Kyoto.',
        'Hari 2: Menikmati pagi sunyi di Arashiyama & Kuil Tenryuji.',
        'Hari 3: Menyusuri Fushimi Inari dan senja di Gion.',
        'Hari 4: Menyapa rusa di Nara & kuliner Dotonbori, Osaka.',
        'Hari 5: Hari bebas untuk bereksplorasi di kafe-kafe lokal Osaka.',
        'Hari 6: Perjalanan pulang dengan memori manis.'
      ],
      includes: 'Penerbangan PP, Boutique Hotel, Lokal Transport (JR Pass lokal), Kurator Perjalanan',
      excludes: 'Visa Jepang, Asuransi Perjalanan, Makan Siang & Malam'
    },
    {
      id: 'pkg-02',
      category: 'europe',
      title: 'Romansa Klasik Swiss',
      destination: 'Zurich, Lucerne, Interlaken',
      duration: '8 Hari 7 Malam',
      description: 'Bernapas lega di depan danau jernih berlatar pegunungan Alpen yang diselimuti salju abadi. Perjalanan santai menggunakan kereta panoramik.',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
      price: 32000000,
      itinerary: [
        'Hari 1: Tiba di Zurich, berjalan menyusuri danau.',
        'Hari 2: Kereta menuju Lucerne, eksplorasi kota tua.',
        'Hari 3: Mount Titlis dengan kereta gantung pemandangan 360.',
        'Hari 4: Interlaken, bersantai di antara dua danau biru.',
        'Hari 5: Desa Jungfraujoch, atap Eropa.',
        'Hari 6: Grindelwald, menikmati teh di pegunungan.',
        'Hari 7: Kembali ke Zurich untuk belanja suvenir elegan.',
        'Hari 8: Kembali pulang.'
      ],
      includes: 'Penerbangan PP, Hotel Bintang 4, Swiss Travel Pass, Kurator Perjalanan',
      excludes: 'Visa Schengen, Asuransi, Pengeluaran Pribadi'
    },
    {
      id: 'pkg-03',
      category: 'asia',
      title: 'Eksotisme Musim Dingin Seoul',
      destination: 'Seoul, Nami Island',
      duration: '5 Hari 4 Malam',
      description: 'Kopi hangat di Bukchon Hanok Village dan menyusuri istana tua yang tertutup salju putih nan bersih.',
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=800&auto=format&fit=crop',
      price: 12500000,
      itinerary: [
        'Hari 1: Tiba di Incheon, menuju pusat kota Seoul.',
        'Hari 2: Menikmati salju di Nami Island & Petite France.',
        'Hari 3: Hanbok experience di Gyeongbokgung & kafe Bukchon.',
        'Hari 4: Belanja santai di Myeongdong dan Hongdae.',
        'Hari 5: Penerbangan kembali.'
      ],
      includes: 'Penerbangan PP, Boutique Guest House, T-Money Card, Kurator Perjalanan',
      excludes: 'K-ETA / Visa Korea, Makan pribadi'
    }
  ];

  // ── 2. Format Harga ───────────────────────────────────────
  function formatPrice(amount) {
    return 'Rp ' + Number(amount).toLocaleString('id-ID');
  }

  // ── 3. Render Kartu Paket ─────────────────────────────────
  const grid = document.getElementById('packages');
  
  function renderCatalog(category = 'all') {
    if (!grid) return;
    grid.innerHTML = '';
    
    const items = category === 'all' 
      ? DIARI_CATALOG 
      : DIARI_CATALOG.filter(p => p.category === category);

    if (items.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color:var(--color-text-muted); grid-column:1/-1;">Belum ada jurnal perjalanan di kategori ini.</p>';
      return;
    }

    items.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'pkg-card';
      card.innerHTML = `
        <div class="pkg-card-img-wrap">
          <img class="pkg-card-img" src="${pkg.image}" alt="${pkg.title}">
        </div>
        <div class="pkg-card-body">
          <span class="pkg-category-badge">${pkg.destination}</span>
          <h3 class="pkg-card-title">${pkg.title}</h3>
          <p class="pkg-card-desc">${pkg.description}</p>
          <div class="pkg-card-footer">
            <div>
              <span class="pkg-price-label">Mulai dari</span>
              <strong class="pkg-price">${formatPrice(pkg.price)}</strong>
            </div>
            <span class="pkg-detail-btn">Lihat Jurnal</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(pkg));
      grid.appendChild(card);
    });
  }

  // ── 4. Logika Modal Statis ────────────────────────────────
  function buildModal() {
    if (document.getElementById('diariModal')) return;
    const modal = document.createElement('div');
    modal.id = 'diariModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-container">
        <button class="modal-close" onclick="closeModal()">✕</button>
        <img id="modalImg" class="modal-img" src="" alt="Cover">
        <div class="modal-content">
          <h2 id="modalTitle" class="modal-title"></h2>
          <div class="modal-meta">
            <span id="modalDest"><i data-lucide="map-pin"></i> Destinasi</span>
            <span id="modalDur"><i data-lucide="clock"></i> Durasi</span>
          </div>
          <p id="modalDesc" class="modal-desc"></p>
          <strong id="modalPrice" class="modal-price"></strong>
          
          <h4 class="modal-section-title">Alur Cerita (Itinerary)</h4>
          <ul id="modalItin" class="modal-list"></ul>

          <h4 class="modal-section-title">Sudah Termasuk</h4>
          <p id="modalInc" class="modal-list" style="list-style:none; padding-left:0;"></p>

          <a id="modalWaBtn" href="#" class="btn btn--primary" style="width:100%; justify-content:center; margin-top:20px;" target="_blank">
            Pesan Perjalanan Ini
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }

  window.openModal = function(pkg) {
    buildModal();
    document.getElementById('modalImg').src = pkg.image;
    document.getElementById('modalTitle').textContent = pkg.title;
    document.getElementById('modalDest').innerHTML = `<i data-lucide="map-pin"></i> ${pkg.destination}`;
    document.getElementById('modalDur').innerHTML = `<i data-lucide="clock"></i> ${pkg.duration}`;
    document.getElementById('modalDesc').textContent = pkg.description;
    document.getElementById('modalPrice').textContent = formatPrice(pkg.price) + ' / pax';
    
    const itinHtml = pkg.itinerary.map(day => `<li>${day}</li>`).join('');
    document.getElementById('modalItin').innerHTML = itinHtml;
    
    document.getElementById('modalInc').textContent = pkg.includes;
    
    const waText = `Halo Diari Travel, saya ingin menanyakan jurnal perjalanan: ${pkg.title}.`;
    document.getElementById('modalWaBtn').href = `https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`;

    if (window.lucide) lucide.createIcons();
    const modal = document.getElementById('diariModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    const modal = document.getElementById('diariModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // ── 5. Interaksi UI Lainnya (Filter & Navigasi) ───────────
  function initUI() {
    // Nav Scroll Effect
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Mobile Drawer Toggle
    const navToggle = document.getElementById('navToggle');
    const navDrawer = document.getElementById('navDrawer');
    if (navToggle && navDrawer) {
      navToggle.addEventListener('click', () => {
        const isOpen = navDrawer.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });
      document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => {
          navDrawer.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Filter Tabs
    const filterContainer = document.getElementById('filterContainer');
    if (filterContainer) {
      filterContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        
        filterContainer.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        
        renderCatalog(tab.dataset.category);
      });
    }
  }

  // ── 6. Inisialisasi Saat Dimuat ───────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initUI();
    renderCatalog('all'); // Render data statis pertama kali
  });

})();
