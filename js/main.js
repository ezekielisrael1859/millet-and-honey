/* ==========================================================================
   MILLET & HONEY — Main JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const WHATSAPP_NUMBER = '2349033601859'; // placeholder — replace with real number

  /* ---------- Nav scroll blur ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu__tab');
  const grids = document.querySelectorAll('.menu__grid');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      grids.forEach(g => g.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.getElementById(tab.dataset.target).classList.add('is-active');
    });
  });

  /* ---------- Process scroll progress bar ---------- */
  const processSection = document.querySelector('.process');
  const processFill = document.getElementById('processFill');
  if (processSection && processFill) {
    const onProcessScroll = () => {
      const rect = processSection.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      let pct = (scrolled / total) * 100;
      pct = Math.max(0, Math.min(100, pct));
      processFill.style.width = pct + '%';
    };
    window.addEventListener('scroll', onProcessScroll, { passive: true });
    onProcessScroll();
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq__q');
    const a = item.querySelector('.faq__a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.faq__a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Order form -> WhatsApp ---------- */
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('ofName').value.trim();
      const phone = document.getElementById('ofPhone').value.trim();
      const type = document.getElementById('ofType').value;
      const details = document.getElementById('ofDetails').value.trim();

      const message =
        `Hello Millet & Honey! I'd like to place an order.%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Order Type: ${type}%0A` +
        `Details: ${details || 'N/A'}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(url, '_blank');
    });
  }

});