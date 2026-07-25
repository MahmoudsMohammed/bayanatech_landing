/**
 * Bayanatech site interactions
 */
(function () {
  const lang = document.documentElement.lang === "ar" ? "ar" : "en";

  /* Header scroll state */
  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mega menu keyboard / click on touch */
  function initMegaMenu() {
    document.querySelectorAll(".nav-item-mega").forEach((item) => {
      const trigger = item.querySelector(".nav-link-main");
      if (!trigger) return;
      trigger.addEventListener("click", (e) => {
        if (window.matchMedia("(min-width: 992px)").matches) {
          // Allow hover; toggle for keyboard
          if (e.detail === 0 || trigger.getAttribute("aria-expanded") === "false") {
            e.preventDefault();
            const open = item.classList.toggle("is-open");
            trigger.setAttribute("aria-expanded", open ? "true" : "false");
          }
        }
      });
    });
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".nav-item-mega.is-open").forEach((item) => {
        if (!item.contains(e.target)) {
          item.classList.remove("is-open");
          const t = item.querySelector(".nav-link-main");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* Scroll reveal */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      io.observe(el);
    });
  }

  /* Lightweight pointer depth for interactive product visuals */
  function initParallaxCards() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-parallax-card]").forEach((card) => {
      const baseTransform = getComputedStyle(card).transform === "none" ? "" : getComputedStyle(card).transform;
      card.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `${baseTransform} rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-3px)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.transform = baseTransform;
      });
    });
  }

  /* Animated counters */
  function animateValue(el, target, duration) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    function frame(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = prefix + value.toLocaleString(lang === "ar" ? "ar-SA" : "en-US") + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10) || 0;
          animateValue(el, target, 1400);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* Product grid filter + search */
  function initProductFilters() {
    const grid = document.querySelector("[data-products-grid]");
    if (!grid || !window.BAYANATECH_PRODUCTS) return;

    const searchInput = document.querySelector("[data-product-search]");
    const chipWrap = document.querySelector("[data-product-filters]");
    const empty = document.querySelector("[data-products-empty]");
    const detailBase = grid.dataset.detailBase || "product-detail.html";
    let activeCat = "all";
    let query = "";

    const cats = window.BAYANATECH_CATEGORIES[lang] || window.BAYANATECH_CATEGORIES.en;
    if (chipWrap) {
      Object.keys(cats).forEach((key) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-chip" + (key === "all" ? " active" : "");
        btn.textContent = cats[key];
        btn.dataset.filter = key;
        btn.addEventListener("click", () => {
          activeCat = key;
          chipWrap.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          render();
        });
        chipWrap.appendChild(btn);
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        query = searchInput.value.trim().toLowerCase();
        render();
      });
    }

    function render() {
      const items = window.BAYANATECH_PRODUCTS.filter((p) => {
        const content = p[lang] || p.en;
        const catOk = activeCat === "all" || p.category === activeCat;
        const qOk =
          !query ||
          content.name.toLowerCase().includes(query) ||
          content.summary.toLowerCase().includes(query) ||
          p.category.includes(query);
        return catOk && qOk;
      });

      grid.innerHTML = items
        .map((p) => {
          const c = p[lang] || p.en;
          const catLabel = cats[p.category] || p.category;
          return `
            <div class="col-md-6 col-lg-4">
              <article class="card-soft product-card h-100">
                <div class="product-thumb" aria-hidden="true"><i class="bi ${p.icon}"></i></div>
                <span class="badge-cat">${catLabel}</span>
                <h3 class="mt-2">${c.name}</h3>
                <p>${c.summary}</p>
                <a class="btn-link-more" href="${detailBase}?id=${encodeURIComponent(p.id)}">
                  ${c.cta} <i class="bi bi-arrow-${lang === "ar" ? "left" : "right"}"></i>
                </a>
              </article>
            </div>`;
        })
        .join("");

      if (empty) empty.hidden = items.length > 0;
    }

    render();
  }

  /* Product detail page */
  function initProductDetail() {
    if (!document.querySelector("[data-product-detail]") || !window.BAYANATECH_PRODUCTS) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "taameer-cloud";
    const product = window.BAYANATECH_PRODUCTS.find((p) => p.id === id) || window.BAYANATECH_PRODUCTS[0];
    const c = product[lang] || product.en;
    const cats = window.BAYANATECH_CATEGORIES[lang] || window.BAYANATECH_CATEGORIES.en;
    const q = (sel) => document.querySelector(sel);

    const title = q("[data-pd-title]");
    const summary = q("[data-pd-summary]");
    const desc = q("[data-pd-desc]");
    const features = q("[data-pd-features]");
    const cat = q("[data-pd-cat]");
    const icon = q("[data-pd-icon]");
    const cta = q("[data-pd-cta]");
    const crumb = q("[data-pd-crumb]");

    if (title) title.textContent = c.name;
    if (summary) summary.textContent = c.summary;
    if (desc) desc.textContent = c.description;
    if (cat) cat.textContent = cats[product.category] || product.category;
    if (icon) icon.className = `bi ${product.icon}`;
    if (crumb) crumb.textContent = c.name;
    if (cta) cta.textContent = c.cta;
    if (features) {
      features.innerHTML = c.features
        .map((f) => `<li><i class="bi bi-check-circle-fill" aria-hidden="true"></i><span>${f}</span></li>`)
        .join("");
    }
    document.title = `${c.name} | Bayanatech`;
  }

  /* Featured products on homepage (subset) */
  function initFeaturedProducts() {
    const grid = document.querySelector("[data-featured-products]");
    if (!grid || !window.BAYANATECH_PRODUCTS) return;
    const featured = window.BAYANATECH_PRODUCTS.slice(0, 6);
    const cats = window.BAYANATECH_CATEGORIES[lang] || window.BAYANATECH_CATEGORIES.en;
    const detailBase = grid.dataset.detailBase || "product-detail.html";
    grid.innerHTML = featured
      .map((p) => {
        const c = p[lang] || p.en;
        return `
          <div class="col-md-6 col-lg-4 reveal">
            <article class="card-soft product-card h-100">
              <div class="product-thumb" aria-hidden="true"><i class="bi ${p.icon}"></i></div>
              <span class="badge-cat">${cats[p.category] || p.category}</span>
              <h3 class="mt-2">${c.name}</h3>
              <p>${c.summary}</p>
              <a class="btn-link-more" href="${detailBase}?id=${encodeURIComponent(p.id)}">
                ${c.cta} <i class="bi bi-arrow-${lang === "ar" ? "left" : "right"}"></i>
              </a>
            </article>
          </div>`;
      })
      .join("");
  }

  /* Bootstrap form validation */
  function initForms() {
    document.querySelectorAll("form.needs-validation").forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          const success = form.querySelector("[data-form-success]");
          const endpoint = form.getAttribute("data-endpoint");
          if (success) {
            success.classList.remove("d-none");
            form.reset();
            form.classList.remove("was-validated");
            success.focus?.();
          }
          // Formspree-ready: set data-endpoint="https://formspree.io/f/xxxx" to enable
          if (endpoint && endpoint.startsWith("http")) {
            fetch(endpoint, {
              method: "POST",
              body: new FormData(form),
              headers: { Accept: "application/json" }
            }).catch(() => {});
          }
        }
        form.classList.add("was-validated");
      });
    });
  }

  /* Sticky CTA bar — show after scrolling past hero */
  function initStickyCta() {
    const bar = document.querySelector(".sticky-cta-bar");
    const hero = document.querySelector(".hero, .page-hero");
    if (!bar) return;
    const toggle = () => {
      const threshold = hero ? hero.offsetHeight * 0.6 : 400;
      const visible = window.scrollY > threshold;
      bar.classList.toggle("is-visible", visible);
      document.body.classList.toggle("has-sticky-cta", visible);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* Newsletter stub */
  function initNewsletter() {
    document.querySelectorAll("[data-newsletter]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.checkValidity()) {
          const msg = form.querySelector("[data-newsletter-msg]");
          if (msg) {
            msg.hidden = false;
            input.value = "";
          }
        } else if (input) {
          input.reportValidity();
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => document.body.classList.add("is-ready"));
    initHeader();
    initMegaMenu();
    initProductFilters();
    initProductDetail();
    initFeaturedProducts();
    initReveal();
    initCounters();
    initForms();
    initStickyCta();
    initNewsletter();
    initParallaxCards();
  });
})();
