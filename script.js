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