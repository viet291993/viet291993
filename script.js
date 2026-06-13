gsap.registerPlugin(ScrollTrigger);

/* ══ HERO ENTRANCE ══ */
const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
tl.to('#hero-name-1',  { y: 0, opacity: 1, duration: 1.0 },      0.1)
  .to('#hero-name-2',  { y: 0, opacity: 1, duration: 1.0 },      0.24)
  .to('#hero-pre',     { y: 0, opacity: 1, duration: 0.65 },     0.52)
  .to('#hero-line',    { width: '100%', duration: 0.9, ease: 'power2.inOut' }, 0.78)
  .to('#hero-contact', { y: 0, opacity: 1, duration: 0.6 },      0.88)
  .to('#hero-scroll',  { opacity: 1, duration: 0.5 },            1.15);

/* ══ SECTION LABELS ══ */
gsap.utils.toArray('.sec-label').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 0.6,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

/* ══ ABOUT HEADLINE — word pull-up ══ */
(function() {
  const h = document.querySelector('.about-headline');
  if (!h) return;
  const words = h.textContent.trim().split(/\s+/);
  h.innerHTML = words.map(w =>
    `<span style="display:inline-block; overflow:hidden; vertical-align:bottom; line-height:1.06; margin-right:.3em;"><span class="ah-word" style="display:inline-block; will-change:transform,opacity; transform:translateY(100%); opacity:0;">${w}</span></span>`
  ).join('');

  gsap.to('.ah-word', {
    y: '0%', opacity: 1,
    duration: 0.75, ease: 'power3.out', stagger: 0.055,
    scrollTrigger: { trigger: h, start: 'top 82%', once: true }
  });
})();

/* ══ CHAR REVEAL ══ */
(function() {
  const p = document.querySelector('.char-reveal');
  if (!p) return;
  const raw = p.textContent;
  p.innerHTML = '';
  [...raw].forEach(c => {
    if (c === ' ') { p.appendChild(document.createTextNode(' ')); return; }
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = c;
    p.appendChild(s);
  });

  const chars = p.querySelectorAll('.char');
  const total = chars.length;

  ScrollTrigger.create({
    trigger: p, start: 'top 80%', end: 'bottom 68%',
    onUpdate(self) {
      const pr = self.progress;
      chars.forEach((ch, i) => {
        ch.style.opacity = pr >= i / total ? '1' : '0.14';
      });
    }
  });
})();

/* ══ EXP CARDS ══ */
gsap.to('.exp-card', {
  y: 0, opacity: 1,
  duration: 0.65, ease: 'power3.out', stagger: 0.12,
  scrollTrigger: { trigger: '#experience', start: 'top 76%', once: true }
});

/* ══ PROJECT CARD ══ */
gsap.fromTo('.project-card',
  { y: 48, scale: 0.985 },
  {
    y: 0, opacity: 1, scale: 1,
    duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.project-card', start: 'top 78%', once: true }
  }
);

/* ══ SKILL CHIPS ══ */
gsap.utils.toArray('.skill-group').forEach(g => {
  gsap.fromTo(g.querySelectorAll('.chip'),
    { y: 10, opacity: 0, scale: 0.88 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.38, ease: 'back.out(1.6)', stagger: 0.04,
      scrollTrigger: { trigger: g, start: 'top 86%', once: true }
    }
  );
});

/* ══ FOOTER COLS ══ */
gsap.to('.footer-col', {
  y: 0, opacity: 1,
  duration: 0.62, ease: 'power2.out', stagger: 0.13,
  scrollTrigger: { trigger: '#footer-info', start: 'top 80%', once: true }
});

/* ══ HERO VIDEO FRAME ══ */
(function() {
  const frame = document.getElementById('hero-video-frame');
  if (!frame) return;
  gsap.to(frame, { opacity: 1, duration: 2.2, ease: 'power2.out', delay: 0.7 });
})();

/* ══ PMS DASHBOARD VISUAL ══ */
(function() {
  const visual = document.querySelector('#pms-visual');
  if (!visual) return;

  ScrollTrigger.create({
    trigger: visual,
    start: 'top 80%',
    once: true,
    onEnter() {
      gsap.fromTo('.pms-stat',
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.14 }
      );

      const occEl = document.getElementById('pms-occ');
      if (occEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 84, duration: 1.6, ease: 'power2.out', delay: 0.25,
          onUpdate() { occEl.textContent = Math.round(obj.val); }
        });
      }

      gsap.to('#pms-bar', { width: '84%', duration: 1.5, ease: 'power2.out', delay: 0.25 });

      gsap.delayedCall(0.95, () => {
        gsap.utils.toArray('.pms-stat').forEach((card, i) => {
          gsap.to(card, {
            y: -7, duration: 2.2 + i * 0.5,
            ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.45
          });
        });
      });
    }
  });
})();

/* ══ PRINT FLUSH ══ */
window.addEventListener('beforeprint', () => {
  gsap.set([
    '#hero-name-1','#hero-name-2','#hero-pre','#hero-contact','#hero-scroll',
    '#hero-video-frame',
    '.ah-word','.exp-card','.project-card','.footer-col','.sec-label',
    '.pms-stat',
  ], { clearProps: 'all' });
  document.querySelectorAll('.char').forEach(c => c.style.opacity = '1');
  document.getElementById('hero-line').style.width = '100%';
  const bar = document.getElementById('pms-bar');
  if (bar) bar.style.width = '84%';
});
