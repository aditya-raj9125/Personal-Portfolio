const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ── CUSTOM CURSOR ────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
if (finePointer && cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();
} else {
  document.body.style.cursor = 'auto';
}

// ── NAVBAR SCROLL ────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE NAV ────────────────────────
const navMenuToggle = document.getElementById('navMenuToggle');
const navLinks = document.getElementById('primaryNavigation');
if (navMenuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    navMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  navMenuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navMenuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}

// ── REVEAL ON SCROLL ────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── PROJECT ACCORDION ────────────────────────
function toggleProject(card) {
  const expanded = card.querySelector('.project-expanded');
  const isOpen = expanded.classList.contains('open');
  // close all
  document.querySelectorAll('.project-expanded.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) expanded.classList.add('open');
}

// ── ACHIEVEMENT CARD TILT ────────────────────────
if (finePointer) {
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease, background 0.3s';
    });
  });
}

// ── COUNTER ANIMATION ────────────────────────
function animateCount(el, target, suffix='', decimals=0) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (eased * target).toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statSections = document.querySelectorAll('#achievements, #education');
if ('IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const nums = e.target.querySelectorAll('.ach-rank, .edu-score');
        nums.forEach(n => {
          const txt = n.textContent.trim();
          if (txt.endsWith('%')) {
            animateCount(n, parseFloat(txt), '%', 2);
          } else if (!isNaN(parseFloat(txt))) {
            animateCount(n, parseFloat(txt), '', txt.includes('.') ? 2 : 0);
          }
        });
        statObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  statSections.forEach(s => statObserver.observe(s));
}

// ── MAGNETIC BUTTONS ────────────────────────
if (finePointer) {
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}