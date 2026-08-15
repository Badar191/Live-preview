
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var arm = function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.classList.add('is-loaded');
      });
    });
  };
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm);
  setTimeout(function () { document.body.classList.add('is-loaded'); }, 1600);

  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var step = parseFloat(group.getAttribute('data-stagger')) || 0.08;
    var i = 0;
    group.querySelectorAll(':scope > * [data-reveal], :scope > [data-reveal]').forEach(function (el) {
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', (i * step).toFixed(2) + 's');
      i += 1;
    });
  });

  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!('IntersectionObserver' in window) || reduced) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  var runCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduced) { el.textContent = String(target); return; }
    var start = null;
    var from = Math.max(0, target - Math.max(24, Math.round(target * 0.35)));
    var dur = 1400;
    var tick = function (ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { runCount(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  var pxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (pxEls.length && !reduced) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      pxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (mid * speed).toFixed(1) + 'px,0)';
      });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  var header = document.querySelector('[data-header]');
  if (header) {
    var onHdr = function () {
      header.classList.toggle('is-stuck', window.scrollY > 10);
    };
    window.addEventListener('scroll', onHdr, { passive: true });
    onHdr();
  }

  var toggle = document.querySelector('[data-nav-toggle]');
  var drawer = document.querySelector('[data-drawer]');
  var scrim = document.querySelector('[data-scrim]');
  if (toggle && drawer) {
    var setNav = function (open) {
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setNav(!document.body.classList.contains('nav-open'));
    });
    if (scrim) scrim.addEventListener('click', function () { setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
  }

  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
