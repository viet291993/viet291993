gsap.registerPlugin(ScrollTrigger);

/* ══ HERO ENTRANCE ══ */
const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
tl.to('#hero-name-1',  { y: 0, opacity: 1, duration: 1.0 },      0.1)
  .to('#hero-name-2',  { y: 0, opacity: 1, duration: 1.0 },      0.24)
  .to('#hero-pre',     { y: 0, opacity: 1, duration: 0.65 },     0.52)
  .to('#hero-line',    { width: '100%', duration: 0.9, ease: 'power2.inOut' }, 0.78)
  .to('#hero-contact', { y: 0, opacity: 1, duration: 0.6 },      0.88)
  .to('#hero-cta',     { y: 0, opacity: 1, duration: 0.6, ease: 'cubic-bezier(0.22,1,0.36,1)' }, 1.05)
  .to('#hero-scroll',  { opacity: 1, duration: 0.5 },            1.15);

/* ══ SECTION LABELS ══ */
gsap.utils.toArray('.sec-label').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 0.6,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

/* ══ ABOUT HEADLINE — word pull-up multi-style ══ */
(function() {
  const h = document.querySelector('.about-headline');
  if (!h) return;
  h.querySelectorAll('.ah-seg').forEach(seg => {
    const words = seg.textContent.split(/\s+/).filter(w => w.length > 0);
    seg.innerHTML = words.map(w =>
      `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:1.06;margin-right:.3em;"><span class="ah-word" style="display:inline-block;will-change:transform,opacity;transform:translateY(100%);opacity:0;">${w}</span></span>`
    ).join('');
  });
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

/* ══ FOOTER CONTACT CTA ══ */
gsap.fromTo('#footer-contact',
  { y: 40, opacity: 0 },
  {
    y: 0, opacity: 1,
    duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: '#footer-contact', start: 'top 88%', once: true }
  }
);

/* ══ CURSOR GLOW ══ */
(function() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const xTo = gsap.quickTo(glow, 'left', { duration: 0.65, ease: 'power2.out' });
  const yTo = gsap.quickTo(glow, 'top',  { duration: 0.65, ease: 'power2.out' });
  window.addEventListener('mousemove', e => { xTo(e.clientX); yTo(e.clientY); });
})();

/* ══ HERO VIDEO FRAME + PARALLAX ══ */
(function() {
  const frame = document.getElementById('hero-video-frame');
  if (!frame) return;

  gsap.set(frame, { top: '5%', height: '100%' });

  gsap.to(frame, { opacity: 1, duration: 2.2, ease: 'power2.out', delay: 0.7 });
  gsap.to(frame, {
    y: '-8%', ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
  });
})();

/* ══ MAGNETIC CHIPS ══ */
gsap.utils.toArray('.chip').forEach(chip => {
  chip.addEventListener('mousemove', function(e) {
    const r = chip.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * 0.28;
    const dy = (e.clientY - r.top  - r.height / 2) * 0.28;
    gsap.to(chip, { x: dx, y: dy, duration: 0.2, ease: 'power2.out' });
  });
  chip.addEventListener('mouseleave', function() {
    gsap.to(chip, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ══ BUILD JOURNEY TIMELINE ══ */
(function() {
  if (window.innerWidth < 768) return;

  const visual = document.querySelector('#pms-visual');
  if (!visual) return;

  const dots    = visual.querySelectorAll('.rmap-dot');
  const lines   = visual.querySelectorAll('.rmap-line');
  const texts   = visual.querySelectorAll('.rmap-text');
  const pending = visual.querySelector('.rmap-dot-pending');

  function runTimeline() {
    dots.forEach((dot, i) => {
      const d = i * 0.16;
      gsap.fromTo(dot,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, duration: 0.32, ease: 'back.out(2.5)', delay: d }
      );
      if (texts[i]) {
        gsap.fromTo(texts[i],
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.38, ease: 'power2.out', delay: d + 0.06 }
        );
      }
      if (lines[i]) {
        gsap.fromTo(lines[i],
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.28, ease: 'power2.inOut', delay: d + 0.22 }
        );
      }
    });

    if (pending) {
      const pd = dots.length * 0.16 + 0.1;
      gsap.fromTo(pending,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        { scale: 1, opacity: 1, duration: 0.32, ease: 'back.out(2)', delay: pd }
      );
      if (texts[texts.length - 1]) {
        gsap.fromTo(texts[texts.length - 1],
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.38, ease: 'power2.out', delay: pd + 0.06 }
        );
      }
      gsap.delayedCall(pd + 0.5, () => {
        gsap.to(pending, {
          opacity: 0.15, scale: 1.45, duration: 1.1,
          ease: 'sine.inOut', repeat: -1, yoyo: true
        });
      });
    }
  }

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      obs.disconnect();
      runTimeline();
    }
  }, { threshold: 0.1 });

  obs.observe(visual);
})();

/* ══ MOBILE NAV ══ */
(function() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-mobile');
  if (!toggle || !menu) return;
  let open = false;
  const bars = toggle.querySelectorAll('.nav-bar');
  function setOpen(val) {
    open = val;
    menu.style.opacity = open ? '1' : '0';
    menu.style.pointerEvents = open ? 'auto' : 'none';
    bars[0].style.transform = open ? 'translateY(6px) rotate(45deg)' : '';
    bars[1].style.opacity   = open ? '0' : '1';
    bars[2].style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
  }
  toggle.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', () => setOpen(false))
  );
})();

/* ══ ACTIVE NAV ══ */
(function() {
  const sections = ['hero','about','experience','project','skills','footer-info'];
  const links = {};
  sections.forEach(id => {
    const a = document.querySelector(`a[href="#${id}"]`);
    if (a) links[id] = a;
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        Object.values(links).forEach(l => l.classList.remove('active'));
        if (links[e.target.id]) links[e.target.id].classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();

/* ══ PRINT FLUSH ══ */
window.addEventListener('beforeprint', () => {
  gsap.set([
    '#hero-name-1','#hero-name-2','#hero-pre','#hero-contact','#hero-scroll',
    '#hero-video-frame',
    '.ah-word','.exp-card','.project-card','.footer-col','.sec-label',
    '.pms-stat','#footer-contact',
  ], { clearProps: 'all' });
  document.querySelectorAll('.char').forEach(c => c.style.opacity = '1');
  document.getElementById('hero-line').style.width = '100%';
  const bar = document.getElementById('pms-bar');
  if (bar) bar.style.width = '84%';
});
