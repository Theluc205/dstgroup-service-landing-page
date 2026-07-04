
const progress = document.querySelector('.progress');
const nav = document.querySelector('.nav');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (scrolled / height) * 100)}%`;
  nav.classList.toggle('is-scrolled', scrolled > 20);
});
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let start = 0;
    const duration = 1300;
    const started = performance.now();
    function tick(now){
      const p = Math.min(1, (now-started)/duration);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(end*eased) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.6});
counters.forEach(c => counterObserver.observe(c));

// gentle tilt only for desktop pointers
if (matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.service-card, .mini-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `translateY(-7px) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*2).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}
