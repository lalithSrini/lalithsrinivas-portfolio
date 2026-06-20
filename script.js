/**
 * ================================================
 * LALITH SRINIVAS PORTFOLIO – MAIN JAVASCRIPT
 * ================================================
 */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  // Init EmailJS
  emailjs.init('AsgVGPO4HYAS1gTFL');

  initNavbar();
  initMobileMenu();
  initTypingAnimation();
  initScrollReveal();
  initCounterAnimations();
  initProgressBars();
  initContactForm();
  initBackToTop();
  initActiveNavHighlight();
  initSmoothScroll();
});

/* ================================================
   NAVBAR – scroll detection
================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

/* ================================================
   MOBILE MENU
================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  menu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

const navbar = document.getElementById('navbar');

/* ================================================
   TYPING ANIMATION
================================================ */
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Software Developer',
    'Android Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'Problem Solver',
    'Java Developer',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let isPaused   = false;

  const TYPE_SPEED   = 85;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER  = 1800;
  const PAUSE_BEFORE = 400;

  function tick() {
    const currentPhrase = phrases[phraseIdx];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      charIdx++;
      el.textContent = currentPhrase.slice(0, charIdx);

      if (charIdx === currentPhrase.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          loop();
        }, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting
      charIdx--;
      el.textContent = currentPhrase.slice(0, charIdx);

      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        isPaused   = true;
        setTimeout(() => {
          isPaused = false;
          loop();
        }, PAUSE_BEFORE);
        return;
      }
    }

    loop();
  }

  function loop() {
    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    setTimeout(tick, speed);
  }

  loop();
}

/* ================================================
   SCROLL REVEAL
================================================ */
function initScrollReveal() {
  const selectors = [
    '.reveal-fade',
    '.reveal-up',
    '.reveal-left',
    '.reveal-right',
  ];

  const targets = document.querySelectorAll(selectors.join(','));
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = Array.from(
            entry.target.parentElement?.querySelectorAll(selectors.join(',')) || []
          );
          const index = siblings.indexOf(entry.target);
          const delay = Math.min(index * 80, 400);

          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ================================================
   COUNTER ANIMATIONS (Hero Stats)
================================================ */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const decimal = parseInt(el.dataset.decimal || '0', 10);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = eased * target;

    el.textContent = prefix + current.toFixed(decimal) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target.toFixed(decimal) + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ================================================
   PROGRESS BARS (Education Timeline Scores)
================================================ */
function initProgressBars() {
  const bars = document.querySelectorAll('.score-bar[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const w   = parseFloat(bar.dataset.width);
          setTimeout(() => {
            bar.style.width = `${w}%`;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ================================================
   CONTACT FORM VALIDATION
================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('contact-name'),         errEl: document.getElementById('name-error'),    validate: (v) => v.trim().length >= 2 ? '' : 'Please enter your full name.' },
    email:   { el: document.getElementById('contact-email-input'), errEl: document.getElementById('email-error'),   validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.' },
    subject: { el: document.getElementById('contact-subject'),      errEl: document.getElementById('subject-error'), validate: (v) => v.trim().length >= 3 ? '' : 'Please enter a subject.' },
    message: { el: document.getElementById('contact-message'),      errEl: document.getElementById('message-error'), validate: (v) => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
  };

  // Live validation
  Object.values(fields).forEach(({ el, errEl, validate }) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      const err = validate(el.value);
      errEl.textContent = err;
      el.classList.toggle('error', Boolean(err));
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const err = validate(el.value);
        errEl.textContent = err;
        el.classList.toggle('error', Boolean(err));
      }
    });
  });

  const submitBtn = document.getElementById('form-submit-btn');
  const successEl = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasError = false;
    Object.values(fields).forEach(({ el, errEl, validate }) => {
      if (!el) return;
      const err = validate(el.value);
      errEl.textContent = err;
      el.classList.toggle('error', Boolean(err));
      if (err) hasError = true;
    });

    if (hasError) return;

    // Show sending state
    const btnText = submitBtn.querySelector('.btn-text');
    const original = btnText.textContent;
    submitBtn.disabled = true;
    btnText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';

    // Send via EmailJS
    emailjs.sendForm('service_0123tls', 'template_wdpfii9', form)
      .then(() => {
        // Success
        submitBtn.disabled = false;
        btnText.textContent = original;
        submitBtn.style.opacity = '';
        form.reset();
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => { successEl.hidden = true; }, 5000);
      })
      .catch((error) => {
        // Error
        submitBtn.disabled = false;
        btnText.textContent = original;
        submitBtn.style.opacity = '';
        console.error('EmailJS error:', error);
        const errMsg = document.createElement('div');
        errMsg.className = 'form-success';
        errMsg.style.cssText = 'background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.3);color:#EF4444;';
        errMsg.textContent = '❌ Failed to send. Please email me directly at lalithsrinivas.t@gmail.com';
        form.appendChild(errMsg);
        setTimeout(() => errMsg.remove(), 6000);
      });
  });
}

/* ================================================
   BACK TO TOP BUTTON
================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================
   ACTIVE NAV LINK HIGHLIGHT (ScrollSpy)
================================================ */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const map = {};
  navLinks.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    map[id] = link;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map[entry.target.id];
        if (!link) return;
        link.classList.toggle('active', entry.isIntersecting);
      });
    },
    {
      rootMargin: `-${getNavHeight()}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function getNavHeight() {
  const nav = document.getElementById('navbar');
  return nav ? nav.offsetHeight : 72;
}

/* ================================================
   SMOOTH SCROLL (for older browsers)
================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = getNavHeight() + 20;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================
   PARTICLE HOVER EFFECT on Project Cards
================================================ */
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const xPct   = (x / rect.width  - 0.5) * 2;
    const yPct   = (y / rect.height - 0.5) * 2;

    card.style.transform = `
      translateY(-8px)
      rotateX(${yPct * -3}deg)
      rotateY(${xPct * 3}deg)
    `;
    card.style.transformOrigin = 'center center';
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

/* ================================================
   SKILL TAG HOVER RIPPLE EFFECT
================================================ */
document.querySelectorAll('.skill-tag').forEach((tag) => {
  tag.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.2);
      transform: scale(0);
      animation: ripple 0.5s linear;
      pointer-events: none;
      width: 60px; height: 60px;
      left: ${e.offsetX - 30}px;
      top: ${e.offsetY - 30}px;
    `;
    tag.style.position = 'relative';
    tag.style.overflow = 'hidden';
    tag.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Inject ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(3); opacity: 0; } }`;
document.head.appendChild(style);

/* ================================================
   CERT CARD SPARKLE on focus/hover
================================================ */
document.querySelectorAll('.cert-card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    card.style.setProperty('--cert-shine', '1');
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--cert-shine');
  });
});

/* ================================================
   PRINT / DOWNLOAD RESUME TRACKING (optional UX)
================================================ */
const resumeBtn = document.getElementById('resume-download-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', () => {
    console.log('[Portfolio] Resume download triggered.');
    // Future: analytics tracking here
  });
}
