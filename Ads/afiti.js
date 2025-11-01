const MKADS_LIBRARY = {
  default: [
    {
      img: "https://raw.githubusercontent.com/madi10/MANTANKODE/refs/heads/master/Ads/2VjWyw0WSW.webp",
      alt: "Tas Gunung / Carrier Atmos 60 Liter",
      url: "https://s.shopee.co.id/2VjWyw0WSW"
    },
    {
      img: "https://raw.githubusercontent.com/madi10/MANTANKODE/refs/heads/master/Ads/8ANtl8EBxS.webp",
      alt: "Jas Hujan Ponco+Celana Ponco Kalalawar Waterproof",
      url: "https://s.shopee.co.id/8ANtl8EBxS"
    }
  ]
};

function mkadsPickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mkadsRenderSlot(slotEl) {
  const bucketName = slotEl.getAttribute('data-mkads') || 'default';
  const list = MKADS_LIBRARY[bucketName];
  if (!Array.isArray(list) || list.length === 0) {
    slotEl.innerHTML = '<div class="mkads-error">Belum ada data iklan.</div>';
    return;
  }

  const pick = mkadsPickRandom(list);

  const link = document.createElement('a');
  link.className = 'mkads-link';
  link.href = pick.url;
  link.target = '_blank';
  link.rel = 'sponsored noopener';
  link.setAttribute('aria-label', pick.alt || 'Iklan');

  const media = document.createElement('div');
  media.className = 'mkads-media';

  const badge = document.createElement('div');
  badge.className = 'mkads-badge';
  badge.textContent = 'Ads';

  const caption = document.createElement('div');
  caption.className = 'mkads-caption';
  caption.textContent = pick.alt || '';

  const skel = document.createElement('div');
  skel.className = 'mkads-skel';

  const img = document.createElement('img');
  img.className = 'mkads-img';
  img.loading = 'lazy';
  img.decoding = 'async';
  img.alt = pick.alt || '';

  const loader = new Image();
  loader.onload = () => {
    img.src = pick.img;            img.classList.add('is-ready');
    skel.remove();               };
  loader.onerror = () => {
    skel.remove();
    const err = document.createElement('div');
    err.className = 'mkads-error';
    err.textContent = 'Gagal memuat gambar iklan.';
    media.appendChild(err);
  };
  loader.src = pick.img;

  media.appendChild(skel);
  media.appendChild(img);
  link.appendChild(badge);
  link.appendChild(media);
  link.appendChild(caption);

  slotEl.innerHTML = '';
  slotEl.appendChild(link);
}

function mkadsInitAll() {
  document.querySelectorAll('.mkads-slot').forEach(mkadsRenderSlot);
}

document.addEventListener('DOMContentLoaded', mkadsInitAll);
