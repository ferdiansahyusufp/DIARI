/* ============================================================
   DIARI TRAVEL — dark-mode.js (FIXED)
   Logika Double-Click yang lebih solid untuk Text Logo.
   ============================================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'diari-theme';
  const html        = document.documentElement;
  const logoLink    = document.getElementById('logoLink'); // Element <a>
  const toast       = document.getElementById('darkModeToast');
  const toastMsg    = document.getElementById('toastMsg');

  let toastTimer = null;

  // 1. Fungsi Terapkan Tema
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // 2. Fungsi Toggle & Animasi
  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    const next    = current === 'dark' ? 'light' : 'dark';
    
    applyTheme(next);
    showToast(next === 'dark' ? 'Estetika Malam Aktif' : 'Estetika Siang Aktif');
    
    // Animasi pendaran pada teks logo
    const text = document.getElementById('logoText');
    if (text) {
      text.classList.remove('text-pulse');
      void text.offsetWidth; // Trigger reflow untuk reset animasi
      text.classList.add('text-pulse');
    }
  }

  // 3. Notifikasi Toast
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.hidden = false;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.hidden = true; }, 300);
    }, 2000);
  }

  // 4. Deteksi Double Click yang Presisi
  if (logoLink) {
    let lastClickTime = 0;
    
    logoLink.addEventListener('click', function (e) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - lastClickTime;

      // Jika jarak antar klik kurang dari 300ms, anggap Double Click
      if (timeDiff < 300 && timeDiff > 0) {
        e.preventDefault(); // Mencegah loncat ke top page (#)
        toggleTheme();
        lastClickTime = 0; // Reset
      } else {
        lastClickTime = currentTime;
      }
    });
  }

  // 5. Inisialisasi saat halaman dibuka
  (function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  })();

})();
