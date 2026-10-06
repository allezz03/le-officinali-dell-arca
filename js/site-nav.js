// Navigazione comune e menu mobile
(function () {
  const cart = JSON.parse(localStorage.getItem('arcaCart') || '{}');
  const count = document.getElementById('cartCount');
  if (count) {
    count.textContent = Object.values(cart).reduce((a, b) => a + b, 0);
  }

  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileNav');

  if (!btn || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Apri menu');
  };

  const toggleMenu = () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
  };

  btn.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === window.location.pathname.split('/').pop() ||
        (href === 'index.html' && (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html')))) {
      link.classList.add('active');
    }
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !btn.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
})();
