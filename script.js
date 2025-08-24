// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav on link click (mobile)
siteNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => siteNav.classList.remove('open'));
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// FAQ accordion
document.querySelectorAll('.acc-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = btn.nextElementSibling;
    panel.style.maxHeight = expanded ? '0px' : panel.scrollHeight + 'px';
  });
});

// Simple form handler (front-end only)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation
  const data = new FormData(form);
  const name = data.get('name')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const message = data.get('message')?.toString().trim();

  if (!name || !email || !message) {
    formMsg.textContent = 'Please fill all fields.';
    formMsg.style.color = 'var(--danger)';
    return;
  }

  // Pretend to send — replace with your endpoint later (e.g., Vercel serverless or Formspree)
  formMsg.textContent = 'Sending…';
  setTimeout(() => {
    form.reset();
    formMsg.textContent = 'Thanks! I will get back to you.';
    formMsg.style.color = 'var(--accent)';
  }, 800);
});

// Matrix-style background (lightweight)
const canvas = document.getElementById('bgMatrix');
const ctx = canvas.getContext('2d');
let w, h, cols, ypos;

function resize() {
  w = canvas.width = canvas.offsetWidth;
  h = canvas.height = canvas.offsetHeight;
  cols = Math.floor(w / 16);
  ypos = Array(cols).fill(0);
}
window.addEventListener('resize', resize);
resize();

function matrix() {
  ctx.fillStyle = 'rgba(10,15,13,0.08)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#00ff88';
  ctx.font = '14px Fira Code';

  ypos.forEach((y, i) => {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    const x = i * 16;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[i] = 0;
    else ypos[i] = y + 14;
  });

  requestAnimationFrame(matrix);
}
matrix();
