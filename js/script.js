/* =========================================================================
   KCGLOBAL WORLD ENTERPRISES
   Vanilla JS only. Each module does something CSS cannot: state toggling,
   observation, and form UX. The animation itself lives in style.css — this
   file only adds and removes classes.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ===== STICKY HEADER STATE ===== */
  (function stickyHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var THRESHOLD = 24;
    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > THRESHOLD);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  })();

  /* ===== MOBILE NAVIGATION ===== */
  (function mobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('nav');
    var header = document.getElementById('site-header');
    if (!toggle || !nav || !header) return;

    var DESKTOP = window.matchMedia('(min-width: 1024px)');

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      header.classList.toggle('nav-open', open);
      document.body.classList.toggle('is-locked', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    function close(returnFocus) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* Close on link tap so the in-page anchor is actually visible */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close(true);
    });

    /* Clicking outside the panel dismisses it */
    document.addEventListener('click', function (event) {
      if (DESKTOP.matches) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      close(false);
    });

    /* Resizing up to desktop must not leave the body scroll-locked */
    DESKTOP.addEventListener('change', function (event) {
      if (event.matches) close(false);
    });
  })();

  /* ===== ACTIVE NAV LINK =====
     Inner pages mark the current link with aria-current in the markup, which
     needs no script. This observer only handles in-page anchors — i.e. the
     home page, where one nav link can cover several scrolling sections. */
  (function activeNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;   /* cross-page link — leave it be */
      var id = href.slice(1);
      var section = id && document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    if (!sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, {
      /* Fire when a section occupies the middle band of the viewport */
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(function (section) { observer.observe(section); });
  })();

  /* ===== SCROLL REVEAL ===== */
  (function scrollReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    function revealAll() {
      items.forEach(function (item) { item.classList.add('is-visible'); });
    }

    /* No observer support, or the visitor asked for less motion: show it all. */
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      revealAll();
      return;
    }

    /* Stagger siblings so grids arrive as a wave rather than a block. */
    var STEP = 80;
    var MAX = 320;
    var counts = new Map();

    items.forEach(function (item) {
      var parent = item.parentElement;
      var index = counts.get(parent) || 0;
      counts.set(parent, index + 1);
      if (index > 0) {
        item.style.transitionDelay = Math.min(index * STEP, MAX) + 'ms';
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    items.forEach(function (item) { observer.observe(item); });

    /* If the visitor flips reduced-motion on mid-session, stop animating. */
    reduceMotion.addEventListener('change', function (event) {
      if (event.matches) revealAll();
    });
  })();

  /* ===== PAGE LOAD OVERLAY ===== */
  (function pageLoad() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return;

    function dismiss() {
      preloader.classList.add('is-done');
      /* Take it out of the layout so it can never intercept a click */
      window.setTimeout(function () { preloader.hidden = true; }, 600);
    }

    if (reduceMotion.matches) {
      preloader.hidden = true;
      return;
    }

    /* Hold briefly for the mark to draw, then get out of the way. */
    window.addEventListener('load', function () {
      window.setTimeout(dismiss, 300);
    });

    /* Safety net: never let a stalled asset keep the overlay up. */
    window.setTimeout(dismiss, 2500);
  })();

  /* ===== BACK TO TOP ===== */
  (function backToTop() {
    var button = document.getElementById('to-top');
    if (!button) return;

    var ticking = false;

    function update() {
      button.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      /* Send focus back to the top of the document, not just the viewport */
      var skip = document.querySelector('.skip-link');
      if (skip) skip.focus({ preventScroll: true });
    });

    update();
  })();

  /* ===== CONTACT FORM ===== */
  (function contactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var status = document.getElementById('cf-status');

    /* Arriving from a property lightbox on another page: ?enquiry=<listing>.
       Written with .value (never innerHTML) so the query string can only ever
       become text in a field, not markup on the page. */
    (function prefillFromQuery() {
      var params = new URLSearchParams(window.location.search);
      var enquiry = params.get('enquiry');
      var message = document.getElementById('cf-message');
      if (!enquiry || !message || message.value) return;

      message.value = 'I would like a callback about: ' + enquiry.slice(0, 160) + '.';
      /* Land them on the form rather than the top of a page they did not
         choose to read, but do not steal focus mid-scroll. */
      form.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'center' });
    })();

    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    /* Permissive on formatting, strict on digit count — Nigerian numbers are
       written as 08030555002, +2348030555002, and everything in between. */
    var PHONE = /^[\d\s()+-]{7,20}$/;

    var rules = [
      { id: 'cf-name', message: 'Please enter your full name.', test: function (v) { return v.length >= 2; } },
      { id: 'cf-email', message: 'Please enter a valid email address.', test: function (v) { return EMAIL.test(v); } },
      { id: 'cf-phone', message: 'Please enter a phone number we can reach you on.', test: function (v) { return PHONE.test(v) && (v.replace(/\D/g, '').length >= 7); } },
      { id: 'cf-message', message: 'Please tell us a little about what you need.', test: function (v) { return v.length >= 10; } }
    ];

    function setError(rule, message) {
      var input = document.getElementById(rule.id);
      var error = document.getElementById(rule.id + '-error');
      var field = input.closest('.field');
      var invalid = Boolean(message);

      field.classList.toggle('is-invalid', invalid);
      input.setAttribute('aria-invalid', String(invalid));
      error.textContent = message || '';
      error.hidden = !invalid;
      return !invalid;
    }

    function validate(rule) {
      var input = document.getElementById(rule.id);
      var value = input.value.trim();
      return setError(rule, rule.test(value) ? '' : rule.message);
    }

    /* Only re-validate a field once it has been shown as invalid, so the form
       never scolds someone mid-typing. */
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      input.addEventListener('blur', function () {
        if (input.value.trim()) validate(rule);
      });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('is-invalid')) validate(rule);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var firstInvalid = null;
      rules.forEach(function (rule) {
        if (!validate(rule) && !firstInvalid) firstInvalid = document.getElementById(rule.id);
      });

      if (firstInvalid) {
        status.textContent = 'Please check the highlighted fields and try again.';
        status.className = 'form__status is-error';
        firstInvalid.focus();
        return;
      }

      handOff();
    });

    var WHATSAPP = '2348030555002';

    /* Where the enquiry goes.

       This form was written for Netlify Forms; the site is deployed on Vercel,
       where that endpoint does not exist, so every submission returned 405 and
       nothing ever reached anyone. Email would need a domain and a monitored
       mailbox, neither of which exists yet.

       So the form composes the enquiry and hands it to WhatsApp on the business
       number. The form still earns its place: it asks for the four things worth
       having, validates them, and produces a message that arrives structured
       rather than as "hi is this still available". The button says WhatsApp and
       so does the note under it — nobody should have their details handed to
       another service without being told. */
    function handOff() {
      /* Honeypot. A bot that filled the hidden field gets the success state and
         nothing else; do not open anything. */
      var pot = form.querySelector('[name="bot-field"]');
      if (pot && pot.value) { succeed(); return; }

      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      var text =
        'Enquiry from the KCGLOBAL Worldwide website\n\n' +
        'Name: ' + get('cf-name') + '\n' +
        'Phone: ' + get('cf-phone') + '\n' +
        'Email: ' + get('cf-email') + '\n\n' +
        get('cf-message');

      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text);

      /* Opened from inside a click-driven submit, so the popup blocker allows
         it. If it is blocked anyway, navigate this tab rather than lose the
         enquiry. */
      var win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;

      succeed();
    }

    function succeed() {
      status.innerHTML = 'Opening WhatsApp with your details filled in — press send there ' +
        'to reach us. If nothing opened, call <a href="tel:+2348030555002">08030555002</a>.';
      status.className = 'form__status is-success';
      form.reset();
      rules.forEach(function (rule) { setError(rule, ''); });
    }
  })();

  /* ===== PROPERTY LIGHTBOX =====
     Reads every field from the clicked card rather than a parallel data object,
     so the listing exists in exactly one place in the HTML. Falls back to the
     card's plain #contact link if anything here is missing. */
  (function propertyLightbox() {
    var box = document.getElementById('lightbox');
    var triggers = document.querySelectorAll('.property [data-lb-open]');
    if (!box || !triggers.length) return;

    var panel = box.querySelector('.lightbox__panel');
    var heroImg = document.getElementById('lb-hero');
    var thumbs = document.getElementById('lb-thumbs');
    var counter = document.getElementById('lb-counter');
    var prev = document.getElementById('lb-prev');
    var next = document.getElementById('lb-next');
    var waLink = document.getElementById('lb-wa');
    var callback = document.getElementById('lb-contact');

    var WHATSAPP = '2348030555002';
    var shots = [];
    var index = 0;
    var lastFocus = null;
    var hideTimer = null;

    /* Cards request 800px-wide images; the dialog is much larger, so ask
       Unsplash for a bigger rendition of the same photo. */
    function upsize(url) {
      return url.replace(/([?&]w=)\d+/, '$11400');
    }

    function show(i) {
      if (!shots.length) return;
      index = (i + shots.length) % shots.length;
      heroImg.src = shots[index].src;
      heroImg.alt = shots[index].alt;
      counter.textContent = (index + 1) + ' / ' + shots.length;

      Array.prototype.forEach.call(thumbs.children, function (li, n) {
        var btn = li.firstElementChild;
        if (btn) btn.setAttribute('aria-current', String(n === index));
      });
    }

    function buildThumbs() {
      thumbs.textContent = '';
      /* One photo needs no picker */
      thumbs.hidden = shots.length < 2;
      if (shots.length < 2) return;

      shots.forEach(function (shot, n) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        var img = document.createElement('img');

        btn.type = 'button';
        btn.className = 'lightbox__thumb';
        btn.setAttribute('aria-label', 'Show photo ' + (n + 1) + ' of ' + shots.length);
        btn.setAttribute('aria-current', String(n === 0));
        img.src = shot.src;
        img.alt = '';
        img.loading = 'lazy';

        btn.appendChild(img);
        btn.addEventListener('click', function () { show(n); });
        li.appendChild(btn);
        thumbs.appendChild(li);
      });
    }

    function text(card, selector) {
      var el = card.querySelector(selector);
      return el ? el.textContent.trim() : '';
    }

    /* Null-safe. A field removed from the markup must never take the dialog
       down with it: a browser holding a cached copy of this script will look
       for slots the current HTML no longer has, and a thrown TypeError here
       aborts populate() before the dialog is ever shown. Skip what is absent. */
    function setText(id, value) {
      var el = document.getElementById(id);
      if (el) el.textContent = value;
    }

    function populate(card) {
      var mainImg = card.querySelector('.property__media img');
      var title = text(card, '.property__title');
      var location = text(card, '.property__location');
      var tag = text(card, '.property__tag');

      shots = [];
      if (mainImg) shots.push({ src: upsize(mainImg.src), alt: mainImg.alt });
      (card.dataset.gallery || '').split('|').forEach(function (url) {
        if (url) shots.push({ src: url, alt: title + ' — additional photo' });
      });

      setText('lb-title', title);
      setText('lb-desc', card.dataset.description || '');

      var tagEl = document.getElementById('lb-tag');
      if (tagEl) {
        tagEl.textContent = tag;
        tagEl.hidden = !tag;
      }

      /* Rebuild location and meta with their icons intact */
      var locEl = document.getElementById('lb-location');
      var srcLoc = card.querySelector('.property__location');
      if (locEl) locEl.innerHTML = srcLoc ? srcLoc.innerHTML : '';

      var metaEl = document.getElementById('lb-meta');
      var srcMeta = card.querySelector('.property__meta');
      if (metaEl) metaEl.innerHTML = srcMeta ? srcMeta.innerHTML : '';

      waLink.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(
        'Hello KCGLOBAL, I would like to enquire about the ' + title +
        ' at ' + location + '. Could you send the price and arrange an inspection?'
      );

      buildThumbs();
      show(0);
      prev.hidden = next.hidden = shots.length < 2;
    }

    /* --- focus management --- */
    var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function trap(event) {
      if (event.key !== 'Tab') return;
      var items = Array.prototype.filter.call(
        panel.querySelectorAll(FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
      );
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function onKey(event) {
      if (event.key === 'Escape') { close(); return; }
      if (event.key === 'ArrowLeft' && shots.length > 1) show(index - 1);
      if (event.key === 'ArrowRight' && shots.length > 1) show(index + 1);
      trap(event);
    }

    function open(card, trigger) {
      lastFocus = trigger;
      populate(card);

      /* Cancel a close still waiting out its fade. Without this, opening a
         second listing within 400ms of closing the first lets the old timer
         fire and re-hide the dialog that just opened — the card looks dead. */
      if (hideTimer) { window.clearTimeout(hideTimer); hideTimer = null; }

      box.hidden = false;
      document.body.classList.add('is-locked');
      /* Next frame, so the transition has a start state to animate from */
      window.requestAnimationFrame(function () { box.classList.add('is-open'); });

      document.addEventListener('keydown', onKey);
      box.querySelector('.lightbox__close').focus();
    }

    function close() {
      if (box.hidden) return;
      box.classList.remove('is-open');
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');

      var done = function () { box.hidden = true; hideTimer = null; };
      if (reduceMotion.matches) done();
      else hideTimer = window.setTimeout(done, 400);

      if (lastFocus) lastFocus.focus();
    }

    /* --- wiring --- */
    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function (event) {
        var card = trigger.closest('.property');
        if (!card) return;          /* leave the #contact fallback alone */
        event.preventDefault();
        open(card, trigger);
      });
    });

    Array.prototype.forEach.call(box.querySelectorAll('[data-lb-close]'), function (el) {
      el.addEventListener('click', close);
    });

    prev.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });

    /* Hand the enquiry to the contact form, pre-referenced to this listing.
       The form lives on contact.html, so from any page without it we carry the
       listing across in the query string and let contactForm() read it back. */
    callback.addEventListener('click', function () {
      var titleEl = document.getElementById('lb-title');
      var title = titleEl ? titleEl.textContent : '';
      var message = document.getElementById('cf-message');
      close();

      /* No form on this page (home and properties both link out to it) */
      if (!message) {
        window.location.href = 'contact.html?enquiry=' + encodeURIComponent(title);
        return;
      }

      message.value = 'I would like a callback about: ' + title + '.';

      var contact = document.getElementById('contact');
      if (contact) {
        contact.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }
      /* Let the scroll settle before pulling focus, or it fights the animation */
      window.setTimeout(function () {
        var name = document.getElementById('cf-name');
        if (name) name.focus({ preventScroll: true });
      }, reduceMotion.matches ? 0 : 600);
    });
  })();

  /* ===== CURRENT YEAR ===== */
  (function currentYear() {
    var slot = document.getElementById('year');
    if (slot) slot.textContent = String(new Date().getFullYear());
  })();

})();
