/* =============================================================
   MAISON TABLE — script.js
   No backend, no external API calls, no data is stored or sent.
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header background on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const toggleHeaderBg = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  toggleHeaderBg();
  window.addEventListener('scroll', toggleHeaderBg, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  const closeMenu = () => {
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  };

  const openMenu = () => {
    mainNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  /* Close mobile menu whenever a nav link is used */
  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* Close mobile menu with the Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Smooth scrolling for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return; // ignore bare "#"
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* ---------- Scroll-reveal for sections ---------- */
  const revealTargets = document.querySelectorAll(
    '.section-heading, .story-media, .story-copy, .dish-card, .feature, .gallery-item, .reserve-inner, .contact-grid'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Reservation form (demo only — no backend) ---------- */
  const reserveForm = document.getElementById('reserveForm');
  const formNote = document.getElementById('formNote');

  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = reserveForm.elements['name'].value.trim();
      const date = reserveForm.elements['date'].value;
      const time = reserveForm.elements['time'].value;
      const guests = reserveForm.elements['guests'].value;

      if (!name || !date || !time || !guests) {
        formNote.textContent = 'Please fill in every required field.';
        formNote.style.color = '#D97757';
        return;
      }

      // No data is sent anywhere — this only confirms the interaction locally.
      formNote.style.color = '#C9A24A';
      formNote.textContent = `Thank you, ${name}. Your request for ${guests} guest(s) on ${date} at ${time} has been noted (demo only — no reservation was actually made).`;

      reserveForm.reset();
    });
  }

});
