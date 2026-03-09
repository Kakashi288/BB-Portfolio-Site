// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Active nav highlight on scroll
const navAs = document.querySelectorAll('.nav-links a');
const targets = document.querySelectorAll('section[id]');

const io = new IntersectionObserver(entries => {
entries.forEach(e => {
if (e.isIntersecting) {
navAs.forEach(a => a.classList.remove('active'));
const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
if (match) match.classList.add('active');
}
});
}, { threshold: 0.35 });

targets.forEach(t => io.observe(t));

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