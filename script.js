// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Active nav highlight on scroll
const navAs = document.querySelectorAll('.nav-links a');
const targets = document.querySelectorAll('section[id]');

function updateActiveNav() {
const scrollY = window.scrollY;
const navHeight = document.getElementById('navbar').offsetHeight;
let current = '';

targets.forEach(section => {
if (scrollY >= section.offsetTop - navHeight - 80) {
current = section.id;
}
});

navAs.forEach(a => {
a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
});
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Contact form — Formspree via fetch (no redirect)
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
contactForm.addEventListener('submit', async (e) => {
e.preventDefault();
formSuccess.style.display = 'none';
formError.style.display = 'none';

try {
const res = await fetch(contactForm.action, {
method: 'POST',
body: new FormData(contactForm),
headers: { 'Accept': 'application/json' }
});

if (res.ok) {
formSuccess.style.display = 'block';
contactForm.reset();
} else {
formError.style.display = 'block';
}
} catch {
formError.style.display = 'block';
}
});
}const filterBtns = document.querySelectorAll('.proj-filter');
const projCards = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');

const filter = btn.dataset.filter;
projCards.forEach(card => {
const match = filter === 'all' || card.dataset.company === filter;
card.classList.toggle('hidden', !match);
});
});
});

// ── SCROLL REVEAL ─────────────────────────
const revealSelectors = [
'.skill-card', '.tl-item', '.cert-card',
'.edu-card', '.extra-card', '.proj-card',
'.about-card', '.about-text'
];

revealSelectors.forEach(sel => {
document.querySelectorAll(sel).forEach((el, i) => {
el.classList.add('reveal');
el.style.setProperty('--reveal-delay', `${(i % 5) * 0.07}s`);
});
});

const revealObserver = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('visible');
revealObserver.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── ANIMATED STAT COUNTERS ────────────────
function runCounter(el) {
const raw = el.textContent.trim();
const match = raw.match(/^([£$€]?)(\d+)(.*)$/);
if (!match) return; // non-numeric (MSc, PMP) — leave as-is
const [, pre, numStr, suf] = match;
const target = parseInt(numStr, 10);
const duration = 1400;
const startTime = performance.now();

function tick(now) {
const t = Math.min((now - startTime) / duration, 1);
const ease = 1 - Math.pow(1 - t, 3);
el.textContent = pre + Math.floor(ease * target) + suf;
if (t < 1) requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
let counted = false;
new IntersectionObserver(([entry]) => {
if (entry.isIntersecting && !counted) {
counted = true;
heroStats.querySelectorAll('.stat-val').forEach(runCounter);
}
}, { threshold: 0.5 }).observe(heroStats);
}