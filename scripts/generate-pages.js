/**
 * Generates bilingual inner pages with shared chrome.
 * Run: node scripts/generate-pages.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const CONTACT = {
  phone: "0568587099",
  phoneDisplay: "056 858 7099",
  whatsapp: "966503326610",
  whatsappDisplay: "050 332 6610",
  email: "info@bayanatech.com.sa",
  address: {
    ar: "شارع خالدة بنت الأسود، حي طيبة، مقابل جامعة طيبة",
    en: "Khalidah bint Al-Aswad St., Taybah District, opposite Taibah University"
  },
  hours: {
    ar: "السبت - الخميس 09:00 - 19:00",
    en: "Saturday – Thursday, 09:00 – 19:00"
  }
};

const SOCIAL = [
  ["https://www.facebook.com/Bayanatech", "Facebook", "bi-facebook"],
  ["https://www.twitter.com/Bayanatech", "X", "bi-twitter-x"],
  ["https://www.youtube.com/channel/UCTb3AivjT1Vp7ZkZFLgb_TQ", "YouTube", "bi-youtube"]
];

function socialLinks(label) {
  const items = SOCIAL.map(
    ([href, name, icon]) =>
      `\n            <a href="${href}" target="_blank" rel="noopener" aria-label="${name}"><i class="bi ${icon}"></i></a>`
  ).join("");
  return `<div class="social-links" aria-label="${label}">${items}\n          </div>`;
}

function head({ lang, title, description, active }) {
  const rtl = lang === "ar";
  const bootstrap = rtl
    ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  const fonts = rtl
    ? "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
    : "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${rtl ? "rtl" : "ltr"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="icon" href="../assets/img/logo.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${fonts}" rel="stylesheet">
  <link href="${bootstrap}" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link href="../assets/css/tokens.css" rel="stylesheet">
  <link href="../assets/css/main.css" rel="stylesheet">
</head>
<body data-page="${active}">
  <a class="skip-link" href="#main">${rtl ? "تخطى إلى المحتوى" : "Skip to content"}</a>
`;
}

function header(lang, active) {
  const isAr = lang === "ar";
  const other = isAr ? "en" : "ar";
  const otherLabel = isAr ? "English" : "العربية";
  const brand = isAr
    ? `<span class="brand-name">بياناتك<span class="brand-tag">لتقنية المعلومات</span></span>`
    : `<span class="brand-name">Bayanatech<span class="brand-tag">Information Technology</span></span>`;
  const switchFile = active === "home" ? "index" : active;
  const t = isAr
    ? {
        navAria: "الرئيسية",
        solutions: "خدماتنا",
        products: "المنتجات",
        midLabel: "أعمالنا",
        midHref: "case-studies.html",
        midKey: "case-studies",
        about: "من نحن",
        contact: "تواصل معنا",
        consult: "اطلب عرض سعر",
        menu: "القائمة",
        close: "إغلاق",
        home: "الرئيسية",
        allSol: "كل الخدمات",
        mega: [
          ["#infrastructure", "bi-hdd-network", "البنية التحتية", "أسس تقنية قوية قابلة للتوسع"],
          ["#cybersecurity", "bi-shield-check", "الأمن السيبراني", "حماية البيانات والشبكات واستمرارية الأعمال"],
          ["#cloud", "bi-cloud", "الخدمات السحابية", "مرونة دون التخلي عن السيطرة"],
          ["#networking", "bi-diagram-3", "الشبكات", "LAN وWAN ولاسلكي بأداء عالٍ"],
          ["#managed", "bi-headset", "إدارة تقنية المعلومات", "دعم استباقي باتفاقيات واضحة"],
          ["#software", "bi-grid-1x2", "برمجيات الأعمال", "أنظمة تحقق عائداً ملموساً"]
        ],
        offcanvas: "start"
      }
    : {
        navAria: "Primary",
        solutions: "Solutions",
        products: "Products",
        midLabel: "Industries",
        midHref: "industries.html",
        midKey: "industries",
        about: "About",
        contact: "Contact",
        consult: "Request Consultation",
        menu: "Menu",
        close: "Close",
        home: "Home",
        allSol: "All Solutions",
        cases: "Case Studies",
        mega: [
          ["#infrastructure", "bi-hdd-network", "IT Infrastructure", "Resilient foundations that scale with your business"],
          ["#cybersecurity", "bi-shield-check", "Cybersecurity", "Protect data, networks, and continuity"],
          ["#cloud", "bi-cloud", "Cloud Services", "Agility without compromising control"],
          ["#networking", "bi-diagram-3", "Networking", "LAN, WAN, and wireless that perform"],
          ["#managed", "bi-headset", "Managed IT", "Proactive support with clear SLAs"],
          ["#software", "bi-grid-1x2", "Business Software", "ERP and workplace systems that deliver ROI"]
        ],
        offcanvas: "end"
      };

  const act = (key) => (active === key ? " active" : "");

  const megaItems = t.mega
    .map(
      ([hash, icon, title, desc]) => `
                    <div class="col-md-4">
                      <a class="mega-item" href="solutions.html${hash}"><span class="mega-icon"><i class="bi ${icon}"></i></span><div><h6>${title}</h6><p>${desc}</p></div></a>
                    </div>`
    )
    .join("");

  const mobileMid = isAr
    ? `<a class="nav-link" href="case-studies.html">${t.midLabel}</a>`
    : `<a class="nav-link" href="industries.html">${t.midLabel}</a>
        <a class="nav-link" href="case-studies.html">${t.cases}</a>`;

  return `
  <header class="site-header">
    <nav class="navbar navbar-expand-lg" aria-label="${t.navAria}">
      <div class="container">
        <a class="brand-logo" href="index.html">
          <img src="../assets/img/logo-transparent.png" class="logo-full" height="46" alt="Bayanatech">
          ${brand}
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="${t.menu}">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-none d-lg-flex">
          <ul class="navbar-nav mx-auto align-items-lg-center">
            <li class="nav-item nav-item-mega position-static">
              <a class="nav-link nav-link-main${act("solutions")}" href="solutions.html" aria-expanded="false" aria-haspopup="true">${t.solutions}</a>
              <div class="mega-menu" role="region"><div class="container"><div class="row g-3">${megaItems}</div></div></div>
            </li>
            <li class="nav-item"><a class="nav-link nav-link-main${act("products")}" href="products.html">${t.products}</a></li>
            <li class="nav-item"><a class="nav-link nav-link-main${act(t.midKey)}" href="${t.midHref}">${t.midLabel}</a></li>
            <li class="nav-item"><a class="nav-link nav-link-main${act("about")}" href="about.html">${t.about}</a></li>
            <li class="nav-item"><a class="nav-link nav-link-main${act("contact")}" href="contact.html">${t.contact}</a></li>
          </ul>
          <div class="d-flex align-items-center gap-2">
            <a class="lang-switch" href="../${other}/${switchFile}.html" data-switch-lang="${other}" hreflang="${other}">${otherLabel}</a>
            <a class="btn btn-brand" href="consultation.html">${t.consult}</a>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <div class="offcanvas offcanvas-${t.offcanvas} offcanvas-nav" tabindex="-1" id="mobileNav" aria-labelledby="mobileNavLabel">
    <div class="offcanvas-header">
      <h2 class="offcanvas-title h5" id="mobileNavLabel">${t.menu}</h2>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="${t.close}"></button>
    </div>
    <div class="offcanvas-body">
      <nav aria-label="${isAr ? "الجوال" : "Mobile"}">
        <a class="nav-link" href="index.html">${t.home}</a>
        <div class="accordion accordion-flush" id="mobAcc">
          <div class="accordion-item border-0">
            <h3 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mobSol">${t.solutions}</button>
            </h3>
            <div id="mobSol" class="accordion-collapse collapse" data-bs-parent="#mobAcc">
              <div class="accordion-body">
                <a class="nav-link" href="solutions.html">${t.allSol}</a>
                <a class="nav-link" href="solutions.html#infrastructure">${t.mega[0][2]}</a>
                <a class="nav-link" href="solutions.html#cybersecurity">${t.mega[1][2]}</a>
                <a class="nav-link" href="solutions.html#cloud">${t.mega[2][2]}</a>
              </div>
            </div>
          </div>
        </div>
        <a class="nav-link" href="products.html">${t.products}</a>
        ${mobileMid}
        <a class="nav-link" href="about.html">${t.about}</a>
        <a class="nav-link" href="contact.html">${t.contact}</a>
        <a class="btn btn-brand w-100 mt-3" href="consultation.html">${t.consult}</a>
        <a class="lang-switch d-inline-block mt-3" href="../${other}/${switchFile}.html" data-switch-lang="${other}">${otherLabel}</a>
      </nav>
    </div>
  </div>
`;
}

function footer(lang) {
  const isAr = lang === "ar";
  const wa = `https://wa.me/${CONTACT.whatsapp}`;
  if (isAr) {
    return `
  <footer class="site-footer">
    <div class="footer-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand"><img src="../assets/img/logo.png" class="logo-full" height="48" alt="بياناتك Bayanatech"></div>
          <p class="footer-tagline">شريك موثوق للتحول الرقمي وحلول تقنية المعلومات للشركات في المملكة العربية السعودية.</p>
          ${socialLinks("وسائل التواصل")}
        </div>
        <div>
          <h5>استكشف</h5>
          <ul>
            <li><a href="solutions.html">خدماتنا</a></li>
            <li><a href="products.html">المنتجات</a></li>
            <li><a href="case-studies.html">أعمالنا</a></li>
            <li><a href="about.html">من نحن</a></li>
          </ul>
        </div>
        <div>
          <h5>خدماتنا</h5>
          <ul>
            <li><a href="solutions.html#networking">الشبكات</a></li>
            <li><a href="solutions.html#cybersecurity">الأمن السيبراني</a></li>
            <li><a href="solutions.html#cloud">السحابة</a></li>
            <li><a href="solutions.html#managed">عقود الصيانة</a></li>
          </ul>
        </div>
        <div class="footer-contact-col">
          <h5>تواصل معنا</h5>
          <ul class="footer-contact-list">
            <li><i class="bi bi-geo-alt"></i><span>${CONTACT.address.ar}</span></li>
            <li><i class="bi bi-telephone"></i><a href="tel:${CONTACT.phone}" dir="ltr">${CONTACT.phoneDisplay}</a></li>
            <li><i class="bi bi-whatsapp"></i><a href="${wa}" target="_blank" rel="noopener" dir="ltr">${CONTACT.whatsappDisplay}</a></li>
            <li><i class="bi bi-envelope"></i><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
            <li><i class="bi bi-clock"></i><span>${CONTACT.hours.ar}</span></li>
          </ul>
          <a class="btn btn-brand footer-cta" href="consultation.html">اطلب عرض سعر</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>جميع الحقوق محفوظة © 2008–2026 لمؤسسة بياناتك لتقنية المعلومات</span>
        <span>المدينة المنورة، المملكة العربية السعودية</span>
      </div>
    </div>
  </footer>
`;
  }
  return `
  <footer class="site-footer">
    <div class="footer-glow" aria-hidden="true"></div>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand"><img src="../assets/img/logo.png" class="logo-full" height="48" alt="Bayanatech"></div>
          <p class="footer-tagline">Trusted digital transformation and IT solutions partner for businesses in Saudi Arabia.</p>
          ${socialLinks("Social media")}
        </div>
        <div>
          <h5>Explore</h5>
          <ul>
            <li><a href="solutions.html">Solutions</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="industries.html">Industries</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div>
          <h5>Solutions</h5>
          <ul>
            <li><a href="solutions.html#networking">Networking</a></li>
            <li><a href="solutions.html#cybersecurity">Cybersecurity</a></li>
            <li><a href="solutions.html#cloud">Cloud</a></li>
            <li><a href="solutions.html#managed">Managed IT</a></li>
          </ul>
        </div>
        <div class="footer-contact-col">
          <h5>Contact</h5>
          <ul class="footer-contact-list">
            <li><i class="bi bi-geo-alt"></i><span>${CONTACT.address.en}</span></li>
            <li><i class="bi bi-telephone"></i><a href="tel:${CONTACT.phone}" dir="ltr">${CONTACT.phoneDisplay}</a></li>
            <li><i class="bi bi-whatsapp"></i><a href="${wa}" target="_blank" rel="noopener" dir="ltr">${CONTACT.whatsappDisplay}</a></li>
            <li><i class="bi bi-envelope"></i><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
            <li><i class="bi bi-clock"></i><span>${CONTACT.hours.en}</span></li>
          </ul>
          <a class="btn btn-brand footer-cta" href="consultation.html">Request Consultation</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2008–2026 Bayanatech for Information Technology. All rights reserved.</span>
        <span>Madinah, Kingdom of Saudi Arabia</span>
      </div>
    </div>
  </footer>
`;
}

function chromeEnd(lang) {
  const isAr = lang === "ar";
  const wa = `https://wa.me/${CONTACT.whatsapp}`;
  return `
  <div class="fab-contact">
    <a class="fab-btn fab-whatsapp" href="${wa}" target="_blank" rel="noopener" aria-label="${isAr ? "واتساب" : "WhatsApp"}"><i class="bi bi-whatsapp"></i></a>
    <a class="fab-btn fab-consult" href="consultation.html"><i class="bi bi-calendar-check"></i><span>${isAr ? "اطلب عرض سعر" : "Free consultation"}</span></a>
  </div>
  <div class="sticky-cta-bar" role="region" aria-label="${isAr ? "تواصل سريع" : "Quick consultation"}">
    <div class="container d-flex flex-wrap align-items-center justify-content-between gap-2">
      <span class="small mb-0">${isAr ? "جاهز للحديث مع خبير؟" : "Ready to talk with an expert?"}</span>
      <a class="btn btn-brand" href="consultation.html">${isAr ? "اطلب عرض سعر" : "Request Consultation"}</a>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script>
  <script src="../assets/js/config.js"><\/script>
  <script src="../assets/js/products.js"><\/script>
  <script src="../assets/js/i18n.js"><\/script>
  <script src="../assets/js/main.js"><\/script>
</body>
</html>
`;
}

function pageHero(lang, crumbs, title, lead) {
  const home = lang === "ar" ? "الرئيسية" : "Home";
  const crumbHtml = crumbs
    .map((c, i) => {
      if (i === crumbs.length - 1) return `<span class="current">${c.label}</span>`;
      return `<a href="${c.href}">${c.label}</a><span class="sep">/</span>`;
    })
    .join("");
  return `
  <section class="page-hero">
    <div class="container">
      <nav class="breadcrumb-nav" aria-label="Breadcrumb"><a href="index.html">${home}</a><span class="sep">/</span>${crumbHtml}</nav>
      <h1>${title}</h1>
      <p class="lead">${lead}</p>
    </div>
  </section>`;
}

function writePage(lang, filename, active, title, description, mainHtml) {
  const html =
    head({ lang, title, description, active }) +
    header(lang, active) +
    `\n  <main id="main">\n${mainHtml}\n  </main>\n` +
    footer(lang) +
    chromeEnd(lang);
  const out = path.join(ROOT, lang, filename);
  fs.writeFileSync(out, html, "utf8");
  console.log("Wrote", out);
}

/* ========== PAGE BODIES ========== */

function solutionsBody(lang) {
  const isAr = lang === "ar";
  const items = isAr
    ? [
        ["infrastructure", "bi-hdd-network", "البنية التحتية لتقنية المعلومات", "أسس خوادم وتخزين وبيئة عمل تقلل التوقف وتدعم النمو.", "موثوقية أعلى", "تكلفة تشغيل أوضح", "جاهزية للتوسع"],
        ["cybersecurity", "bi-shield-check", "الأمن السيبراني", "طبقات حماية للشبكات والبيانات تقلل مخاطر التوقف والاختراق.", "تقليل المخاطر", "استمرارية الأعمال", "ثقة أصحاب المصلحة"],
        ["cloud", "bi-cloud", "الخدمات السحابية", "ترحيل وتشغيل أحمال العمل بمرونة مع تحكم بالأمان والتكلفة.", "سرعة النشر", "قابلية التوسع", "كفاءة التكلفة"],
        ["networking", "bi-diagram-3", "الشبكات", "LAN وWAN ولاسلكي يربط المواقع والمستخدمين بأداء متوقع.", "اتصال مستقر", "ربط الفروع", "تجربة مستخدم أفضل"],
        ["erp", "bi-boxes", "حلول تخطيط الموارد", "أتمتة الإدارية والمالية والفنية لرفع كفاءة التسليم.", "دورة عمل أقصر", "دقة أعلى", "خدمة عملاء أفضل"],
        ["managed", "bi-headset", "إدارة تقنية المعلومات", "عقود صيانة ودعم فني استباقي باتفاقيات مستوى خدمة واضحة.", "استجابة أسرع", "صيانة وقائية", "تركيز على الأعمال"],
        ["surveillance", "bi-camera-video", "المراقبة", "كاميرات IP وNVR لحماية المواقع والأصول مع مشاهدة عن بُعد.", "رؤية أشمل", "أدلة عند الحاجة", "طمأنينة تشغيلية"],
        ["software", "bi-grid-1x2", "برمجيات الأعمال", "أنظمة مكان العمل والقطاعات التي تحول الورق إلى رقمية.", "إنتاجية أعلى", "أتمتة", "عائد ملموس"]
      ]
    : [
        ["infrastructure", "bi-hdd-network", "IT Infrastructure", "Server, storage, and workplace foundations that reduce downtime and support growth.", "Higher reliability", "Clearer OpEx", "Scale-ready"],
        ["cybersecurity", "bi-shield-check", "Cybersecurity", "Layered network and data protection that reduces breach and downtime risk.", "Lower risk", "Business continuity", "Stakeholder trust"],
        ["cloud", "bi-cloud", "Cloud Services", "Migrate and operate workloads with agility, security, and cost control.", "Faster delivery", "Elasticity", "Cost efficiency"],
        ["networking", "bi-diagram-3", "Networking", "LAN, WAN, and wireless that keep sites and users connected with predictable performance.", "Stable connectivity", "Branch linking", "Better UX"],
        ["erp", "bi-boxes", "ERP Solutions", "Automate admin, finance, and technical workflows to improve delivery efficiency.", "Shorter cycles", "Higher accuracy", "Better service"],
        ["managed", "bi-headset", "Managed IT Services", "Proactive maintenance and support with clear SLAs.", "Faster response", "Preventive care", "Business focus"],
        ["surveillance", "bi-camera-video", "Surveillance", "IP cameras and NVR systems that protect sites and assets with remote viewing.", "Full visibility", "Evidence on demand", "Operational peace of mind"],
        ["software", "bi-grid-1x2", "Business Software", "Workplace and industry systems that digitize paper processes.", "Higher productivity", "Automation", "Tangible ROI"]
      ];

  const hero = pageHero(
    lang,
    [{ href: "solutions.html", label: isAr ? "الحلول" : "Solutions" }],
    isAr ? "حلول تقنية تحقق نتائج أعمال" : "Technology solutions built for business outcomes",
    isAr
      ? "كل حل يجيب عن سؤال واحد: لماذا يهتم العميل؟—الموثوقية، الأمان، الكفاءة، والتوسع."
      : "Every solution answers one question: why should the customer care?—reliability, security, efficiency, and scale."
  );

  const cards = items
    .map(([id, icon, title, desc, a, b, c], idx) => {
      const muted = idx % 2 === 1 ? " section-muted" : "";
      return `
      <section class="section${muted}" id="${id}">
        <div class="container">
          <div class="row align-items-center g-5">
            <div class="col-lg-6 reveal">
              <div class="card-icon mb-3"><i class="bi ${icon}"></i></div>
              <h2 class="section-title">${title}</h2>
              <p class="section-lead">${desc}</p>
              <ul class="feature-list mt-4">
                <li><i class="bi bi-check-circle-fill"></i><span>${a}</span></li>
                <li><i class="bi bi-check-circle-fill"></i><span>${b}</span></li>
                <li><i class="bi bi-check-circle-fill"></i><span>${c}</span></li>
              </ul>
              <a class="btn btn-brand mt-4" href="consultation.html">${isAr ? "تحدث إلى خبير" : "Talk to an Expert"}</a>
            </div>
            <div class="col-lg-6 reveal">
              <div class="card-soft p-5 text-center" style="min-height:280px;display:grid;place-items:center;background:linear-gradient(145deg,var(--bg-muted),rgba(13,148,136,.12))">
                <i class="bi ${icon}" style="font-size:4rem;color:var(--brand-secondary)"></i>
              </div>
            </div>
          </div>
        </div>
      </section>`;
    })
    .join("");

  return (
    hero +
    cards +
    `
    <section class="section"><div class="container"><div class="cta-band reveal">
      <h2>${isAr ? "هل تحتاج تقييماً مجانياً؟" : "Need a free assessment?"}</h2>
      <p>${isAr ? "حدد أولويات البنية والأمان والسحابة مع فريق بياناتك." : "Prioritize infrastructure, security, and cloud with the Bayanatech team."}</p>
      <a class="btn btn-brand" href="consultation.html">${isAr ? "احجز استشارة" : "Book Consultation"}</a>
    </div></div></section>`
  );
}

function productsBody(lang) {
  const isAr = lang === "ar";
  return (
    pageHero(
      lang,
      [{ href: "products.html", label: isAr ? "المنتجات" : "Products" }],
      isAr ? "كتالوج المنتجات والحلول" : "Products & solutions catalog",
      isAr ? "ابحث وصِفِ حسب الفئة—شبكات، خوادم، سحابة، تخطيط موارد، أمن، حضور، ومراقبة." : "Search and filter by category—networking, servers, cloud, ERP, security, attendance, and surveillance."
    ) +
    `
    <section class="section">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div data-product-filters class="filter-bar" role="group" aria-label="${isAr ? "تصفية" : "Filters"}"></div>
          <label class="visually-hidden" for="productSearch">${isAr ? "بحث" : "Search"}</label>
          <input id="productSearch" class="product-search form-control" type="search" placeholder="${isAr ? "ابحث عن منتج..." : "Search products..."}" data-product-search>
        </div>
        <div class="row g-4" data-products-grid data-detail-base="product-detail.html"></div>
        <p class="products-empty" data-products-empty hidden>${isAr ? "لا توجد منتجات مطابقة." : "No matching products."}</p>
      </div>
    </section>`
  );
}

function productDetailBody(lang) {
  const isAr = lang === "ar";
  return `
    <section class="page-hero">
      <div class="container" data-product-detail>
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="index.html">${isAr ? "الرئيسية" : "Home"}</a><span class="sep">/</span>
          <a href="products.html">${isAr ? "المنتجات" : "Products"}</a><span class="sep">/</span>
          <span class="current" data-pd-crumb>—</span>
        </nav>
        <span class="badge-cat" data-pd-cat style="background:rgba(255,255,255,.15);color:#fff;padding:.35rem .75rem;border-radius:999px;font-size:.75rem"></span>
        <h1 class="mt-3" data-pd-title>—</h1>
        <p class="lead" data-pd-summary>—</p>
      </div>
    </section>
    <section class="section">
      <div class="container" data-product-detail>
        <div class="row g-5">
          <div class="col-lg-7">
            <div class="card-soft mb-4 text-center py-5"><i data-pd-icon class="bi bi-box" style="font-size:4rem;color:var(--brand-secondary)"></i></div>
            <h2 class="h4 text-brand">${isAr ? "نظرة عامة" : "Overview"}</h2>
            <p data-pd-desc class="text-muted"></p>
            <h2 class="h4 text-brand mt-4">${isAr ? "المزايا" : "Benefits & features"}</h2>
            <ul class="feature-list" data-pd-features></ul>
          </div>
          <div class="col-lg-5">
            <div class="form-card sticky-lg-top" style="top:100px">
              <h3 class="h5 text-brand mb-3">${isAr ? "اطلب هذا الحل" : "Request this solution"}</h3>
              <p class="small text-muted">${isAr ? "سنتواصل خلال يوم عمل." : "We’ll respond within one business day."}</p>
              <a class="btn btn-brand w-100 mb-2" href="consultation.html" data-pd-cta>${isAr ? "اطلب عرضاً" : "Request Demo"}</a>
              <a class="btn btn-brand-outline w-100" href="contact.html">${isAr ? "تحدث إلى المبيعات" : "Talk to Sales"}</a>
              <hr class="my-4">
              <a class="btn-link-more" href="products.html">${isAr ? "العودة للمنتجات" : "Back to products"} <i class="bi bi-arrow-${isAr ? "left" : "right"}"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

function industriesBody(lang) {
  const isAr = lang === "ar";
  const list = isAr
    ? [
        ["healthcare", "bi-heart-pulse", "الرعاية الصحية", "شبكات وأنظمة موثوقة تدعم استمرارية الرعاية وحماية البيانات الحساسة."],
        ["education", "bi-mortarboard", "التعليم", "حلول تقنية للمدارس والمؤسسات التعليمية—شبكات، دعم، وأنظمة حضور."],
        ["government", "bi-bank", "القطاع الحكومي", "بنى تحتية آمنة وقابلة للتدقيق تلبي متطلبات الجهات."],
        ["retail", "bi-shop", "التجزئة", "جاهزية المتاجر ونقاط البيع وربط الفروع لاستمرارية المبيعات."],
        ["manufacturing", "bi-gear-wide-connected", "التصنيع", "شبكات صناعية ودعم يقلل توقف الإنتاج."],
        ["hospitality", "bi-building", "الضيافة", "ربط الفنادق والواي فاي والدعم متعدد المواقع—خبرة مثبتة."],
        ["financial", "bi-currency-exchange", "الخدمات المالية", "أمن واتصال عالي الموثوقية للعمليات الحساسة."]
      ]
    : [
        ["healthcare", "bi-heart-pulse", "Healthcare", "Reliable networks and systems that support care continuity and protect sensitive data."],
        ["education", "bi-mortarboard", "Education", "IT for schools and institutions—networks, support, and attendance systems."],
        ["government", "bi-bank", "Government", "Secure, auditable infrastructure aligned to institutional requirements."],
        ["retail", "bi-shop", "Retail", "Store readiness, POS enablement, and branch connectivity for sales continuity."],
        ["manufacturing", "bi-gear-wide-connected", "Manufacturing", "Industrial networking and support that reduce production downtime."],
        ["hospitality", "bi-building", "Hospitality", "Hotel interconnect, Wi-Fi, and multi-site support—proven experience."],
        ["financial", "bi-currency-exchange", "Financial Services", "High-trust security and connectivity for sensitive operations."]
      ];

  return (
    pageHero(
      lang,
      [{ href: "industries.html", label: isAr ? "القطاعات" : "Industries" }],
      isAr ? "خبرة قطاعية عميقة" : "Deep industry expertise",
      isAr ? "نكيّف التصميم والأمان والدعم مع واقع كل قطاع." : "We tailor design, security, and support to each sector’s realities."
    ) +
    `<section class="section"><div class="container"><div class="row g-4">` +
    list
      .map(
        ([id, icon, title, desc]) => `
      <div class="col-md-6 col-lg-4 reveal" id="${id}">
        <article class="card-soft h-100">
          <div class="card-icon"><i class="bi ${icon}"></i></div>
          <h2 class="h4">${title}</h2>
          <p>${desc}</p>
          <a class="btn-link-more" href="consultation.html">${isAr ? "ناقش احتياج قطاعك" : "Discuss your sector"} <i class="bi bi-arrow-${isAr ? "left" : "right"}"></i></a>
        </article>
      </div>`
      )
      .join("") +
    `</div></div></section>`
  );
}

function aboutBody(lang) {
  const isAr = lang === "ar";
  return (
    pageHero(
      lang,
      [{ href: "about.html", label: isAr ? "من نحن" : "About" }],
      isAr ? "عن بياناتك لتقنية المعلومات" : "About Bayanatech",
      isAr
        ? "نسعى لتطوير حلول تقنية المعلومات والحلول الإلكترونية لتمكين عملائنا من الاستمرار في أعمالهم بيسر وسهولة."
        : "We develop IT and electronic solutions that help our clients run their businesses with ease and confidence."
    ) +
    `
    <section class="section"><div class="container"><div class="row g-5 align-items-center">
      <div class="col-lg-6 reveal">
        <span class="section-eyebrow">${isAr ? "قصتنا" : "Our story"}</span>
        <h2 class="section-title">${isAr ? "أكثر من أربعة عشر عاماً من الشراكة التقنية" : "Fourteen+ years of technology partnership"}</h2>
        <p class="text-muted">${isAr ? "نقدّم حلولاً متكاملة في الشبكات ومراكز البيانات والاستشارات والأمن وأنظمة الحاسب وخدمات ما بعد البيع—لأن عملاءنا مقياس نجاحنا وشركاء عمل نسعى لإبقائهم خيارهم الأفضل." : "We deliver integrated solutions across networks, data centers, consulting, security, computer systems, and aftermarket services—because our customers are our measure of success and partners we work hard to keep."}</p>
        <div class="row g-3 mt-3">
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="14" data-suffix="+">0</div><div class="metric-label">${isAr ? "سنوات" : "Years"}</div></div></div>
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="300" data-suffix="+">0</div><div class="metric-label">${isAr ? "مشاريع" : "Projects"}</div></div></div>
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="120" data-suffix="+">0</div><div class="metric-label">${isAr ? "عملاء" : "Clients"}</div></div></div>
        </div>
      </div>
      <div class="col-lg-6 reveal">
        <div class="row g-3">
          <div class="col-md-6"><div class="card-soft"><h3 class="h5">${isAr ? "الرسالة" : "Mission"}</h3><p class="small text-muted mb-0">${isAr ? "تمكين المؤسسات بحلول تقنية موثوقة تزيد الكفاءة والأمان وقابلية التوسع." : "Enable organizations with reliable IT that improves efficiency, security, and scalability."}</p></div></div>
          <div class="col-md-6"><div class="card-soft"><h3 class="h5">${isAr ? "الرؤية" : "Vision"}</h3><p class="small text-muted mb-0">${isAr ? "أن نكون الشريك المفضل للتحول الرقمي في المملكة." : "To be the preferred digital transformation partner in Saudi Arabia."}</p></div></div>
          <div class="col-12"><div class="card-soft"><h3 class="h5">${isAr ? "القيم" : "Values"}</h3><p class="small text-muted mb-0">${isAr ? "الثقة، الاحتراف، المساءلة، والشراكة طويلة الأمد." : "Trust, professionalism, accountability, and long-term partnership."}</p></div></div>
        </div>
      </div>
    </div></div></section>
    <section class="section section-muted"><div class="container text-center reveal">
      <h2 class="section-title">${isAr ? "هل تود الانضمام إلى رحلة التحول؟" : "Ready to start your transformation?"}</h2>
      <a class="btn btn-brand" href="consultation.html">${isAr ? "اطلب استشارة" : "Request Consultation"}</a>
    </div></section>`
  );
}

function casesBody(lang) {
  const isAr = lang === "ar";
  const cases = isAr
    ? [
        ["الضيافة", "ربط مجموعة فنادق", "تحدي الربط اللاسلكي بين الفنادق.", "بنية تحتية وربط لاسلكي ودعم فني.", "إنجاز المشروع واكتمال الربط.", "8+", "سنوات"],
        ["الأوقاف", "تحديث شبكة وقف", "الحاجة لتطوير شبكة ونظم معلومات.", "تنفيذ بنية تحتية وتحسينات أنظمة.", "أثر فعّال في القدرات التقنية.", "Core", "رفع"],
        ["مؤسسات", "دعم شركة قابضة", "شبكة موثوقة ودعم مستمر.", "بناء الشبكة ودعم لسبع سنوات.", "شراكة طويلة واستمرارية تشغيل.", "7", "سنوات"],
        ["الضيافة", "مكارم المدينة", "ربط إلكتروني عبر الشبكات اللاسلكية.", "خدمات ربط ودعم فني.", "تقدير الجهود وتحسين الاتصال.", "WAN", "ربط"]
      ]
    : [
        ["Hospitality", "Hotel group interconnect", "Need reliable wireless linking across properties.", "Infrastructure, wireless interconnect, and support.", "Project completed to a high standard.", "8+", "Years"],
        ["Non-profit", "Endowment network uplift", "Need to develop network and information systems.", "Infrastructure delivery and systems enablement.", "Effective impact on capability.", "Core", "Uplift"],
        ["Enterprise", "Holding company support", "Dependable network with sustained support.", "Network build and seven years of support.", "Long partnership and continuity.", "7", "Years"],
        ["Hospitality", "Makarem Al Madinah", "Electronic linking via wireless networking.", "Interconnect services and technical support.", "Recognized contribution to connectivity.", "WAN", "Link"]
      ];

  return (
    pageHero(
      lang,
      [{ href: "case-studies.html", label: isAr ? "قصص النجاح" : "Case Studies" }],
      isAr ? "قصص نجاح العملاء" : "Customer success stories",
      isAr ? "تحدٍ، حل، ونتائج—من شراكات حقيقية عبر المملكة." : "Challenge, solution, and results—from real partnerships across the Kingdom."
    ) +
    `<section class="section"><div class="container"><div class="row g-4">` +
    cases
      .map(
        ([chip, title, ch, sol, res, m1, m2]) => `
      <div class="col-md-6 reveal">
        <article class="card-soft case-card h-100">
          <div class="case-meta"><span class="case-chip">${chip}</span></div>
          <h2 class="h4">${title}</h2>
          <div class="case-block"><strong>${isAr ? "التحدي" : "Challenge"}</strong><p>${ch}</p></div>
          <div class="case-block"><strong>${isAr ? "الحل" : "Solution"}</strong><p>${sol}</p></div>
          <div class="case-block"><strong>${isAr ? "النتائج" : "Results"}</strong><p>${res}</p></div>
          <div class="case-metrics"><div><div class="val">${m1}</div><div class="lbl">${m2}</div></div></div>
        </article>
      </div>`
      )
      .join("") +
    `</div>
    <div class="cta-band mt-5 reveal">
      <h2>${isAr ? "هل لديك مشروع مشابه؟" : "Have a similar project?"}</h2>
      <a class="btn btn-brand" href="consultation.html">${isAr ? "احجز استشارة مجانية" : "Book Free Consultation"}</a>
    </div>
    </div></section>`
  );
}

function contactBody(lang) {
  const isAr = lang === "ar";
  const wa = `https://wa.me/${CONTACT.whatsapp}`;
  return (
    pageHero(
      lang,
      [{ href: "contact.html", label: isAr ? "تواصل معنا" : "Contact" }],
      isAr ? "تواصل مع بياناتك" : "Contact Bayanatech",
      isAr ? "فريقنا جاهز لمساعدتك في الاستشارات والدعم وطلبات العروض." : "Our team is ready to help with consulting, support, and proposals."
    ) +
    `
    <section class="section"><div class="container"><div class="row g-5">
      <div class="col-lg-5 reveal">
        <div class="contact-info-item"><div class="icon"><i class="bi bi-geo-alt"></i></div><div><h6>${isAr ? "العنوان" : "Address"}</h6><p>${isAr ? CONTACT.address.ar : CONTACT.address.en}</p></div></div>
        <div class="contact-info-item"><div class="icon"><i class="bi bi-telephone"></i></div><div><h6>${isAr ? "الهاتف" : "Phone"}</h6><p><a href="tel:${CONTACT.phone}" dir="ltr">${CONTACT.phoneDisplay}</a></p></div></div>
        <div class="contact-info-item"><div class="icon"><i class="bi bi-whatsapp"></i></div><div><h6>WhatsApp</h6><p><a href="${wa}" target="_blank" rel="noopener" dir="ltr">${CONTACT.whatsappDisplay}</a></p></div></div>
        <div class="contact-info-item"><div class="icon"><i class="bi bi-envelope"></i></div><div><h6>${isAr ? "البريد" : "Email"}</h6><p><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p></div></div>
        <div class="contact-info-item"><div class="icon"><i class="bi bi-clock"></i></div><div><h6>${isAr ? "ساعات العمل" : "Working hours"}</h6><p>${isAr ? CONTACT.hours.ar : CONTACT.hours.en}</p></div></div>
      </div>
      <div class="col-lg-7 reveal">
        <div class="form-card">
          <h2 class="h4 text-brand mb-3">${isAr ? "أرسل رسالة" : "Send a message"}</h2>
          <div class="alert alert-success d-none" tabindex="-1" data-form-success role="status">${isAr ? "شكراً لك! تم استلام رسالتك." : "Thank you! Your message has been received."}</div>
          <div class="alert alert-danger d-none" tabindex="-1" data-form-error role="alert">${isAr ? "تعذّر الإرسال. حاول مرة أخرى." : "Could not send. Please try again."}</div>
          <form class="needs-validation" novalidate data-form="contact">
            <input type="hidden" name="_subject" value="Bayanatech contact form">
            <div class="row g-3">
              <div class="col-md-6"><label class="form-label" for="cName">${isAr ? "الاسم" : "Name"}</label><input class="form-control" id="cName" name="name" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
              <div class="col-md-6"><label class="form-label" for="cCompany">${isAr ? "الشركة" : "Company"}</label><input class="form-control" id="cCompany" name="company"></div>
              <div class="col-md-6"><label class="form-label" for="cEmail">${isAr ? "البريد" : "Email"}</label><input class="form-control" id="cEmail" type="email" name="email" required><div class="invalid-feedback">${isAr ? "بريد صالح مطلوب" : "Valid email required"}</div></div>
              <div class="col-md-6"><label class="form-label" for="cPhone">${isAr ? "الجوال" : "Phone"}</label><input class="form-control" id="cPhone" type="tel" name="phone" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
              <div class="col-12"><label class="form-label" for="cMsg">${isAr ? "الرسالة" : "Message"}</label><textarea class="form-control" id="cMsg" name="message" rows="4" required></textarea><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
              <div class="col-12"><div data-recaptcha></div><p class="small text-danger d-none mb-0" data-recaptcha-error>${isAr ? "يرجى إكمال التحقق." : "Please complete the captcha."}</p></div>
              <div class="col-12"><button class="btn btn-brand" type="submit">${isAr ? "إرسال" : "Send message"}</button></div>
            </div>
          </form>
        </div>
      </div>
    </div></div></section>`
  );
}

function consultationBody(lang) {
  const isAr = lang === "ar";
  const wa = `https://wa.me/${CONTACT.whatsapp}`;
  return (
    pageHero(
      lang,
      [{ href: "consultation.html", label: isAr ? "عرض سعر" : "Consultation" }],
      isAr ? "اطلب عرض سعر" : "Book a free consultation",
      isAr ? "أخبرنا عن احتياجك وسنقترح مساراً واضحاً للبنية والأمان أو التحول الرقمي." : "Tell us about your needs and we’ll propose a clear path for infrastructure, security, or digital transformation."
    ) +
    `
    <section class="section"><div class="container"><div class="row justify-content-center"><div class="col-lg-8">
      <div class="form-card reveal">
        <div class="alert alert-success d-none" tabindex="-1" data-form-success role="status">${isAr ? "تم استلام طلبك. سنتواصل قريباً." : "Request received. We’ll be in touch shortly."}</div>
        <div class="alert alert-danger d-none" tabindex="-1" data-form-error role="alert">${isAr ? "تعذّر الإرسال. حاول مرة أخرى." : "Could not send. Please try again."}</div>
        <form class="needs-validation" novalidate data-form="consultation">
          <input type="hidden" name="_subject" value="Bayanatech consultation request">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label" for="qName">${isAr ? "الاسم الكامل" : "Full name"}</label><input class="form-control" id="qName" name="name" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qCompany">${isAr ? "الشركة / الجهة" : "Company / Organization"}</label><input class="form-control" id="qCompany" name="company" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qEmail">${isAr ? "البريد المهني" : "Work email"}</label><input class="form-control" id="qEmail" type="email" name="email" required><div class="invalid-feedback">${isAr ? "بريد صالح مطلوب" : "Valid email required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qPhone">${isAr ? "الجوال" : "Phone"}</label><input class="form-control" id="qPhone" type="tel" name="phone" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-12"><label class="form-label" for="qService">${isAr ? "مجال الاهتمام" : "Service interest"}</label>
              <select class="form-select" id="qService" name="service" required>
                <option value="">${isAr ? "اختر..." : "Select..."}</option>
                <option>${isAr ? "البنية التحتية" : "IT Infrastructure"}</option>
                <option>${isAr ? "الأمن السيبراني" : "Cybersecurity"}</option>
                <option>${isAr ? "السحابة" : "Cloud"}</option>
                <option>${isAr ? "الشبكات" : "Networking"}</option>
                <option>${isAr ? "تخطيط الموارد / تعمير" : "ERP / Taameer"}</option>
                <option>${isAr ? "عقود الدعم" : "Managed IT"}</option>
                <option>${isAr ? "أخرى" : "Other"}</option>
              </select>
              <div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div>
            </div>
            <div class="col-12"><label class="form-label" for="qMsg">${isAr ? "نبذة عن الاحتياج" : "Brief description"}</label><textarea class="form-control" id="qMsg" name="message" rows="5" required></textarea><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-12 form-check ms-1"><input class="form-check-input" type="checkbox" id="qConsent" name="consent" value="yes" required><label class="form-check-label" for="qConsent">${isAr ? "أوافق على التواصل بشأن طلبي." : "I agree to be contacted about this request."}</label><div class="invalid-feedback">${isAr ? "الموافقة مطلوبة" : "Consent required"}</div></div>
            <div class="col-12"><div data-recaptcha></div><p class="small text-danger d-none mb-0" data-recaptcha-error>${isAr ? "يرجى إكمال التحقق." : "Please complete the captcha."}</p></div>
            <div class="col-12 d-flex flex-wrap gap-2">
              <button class="btn btn-brand" type="submit">${isAr ? "إرسال الطلب" : "Submit consultation request"}</button>
              <a class="btn btn-brand-outline" href="${wa}" target="_blank" rel="noopener">${isAr ? "واتساب مباشر" : "WhatsApp us"}</a>
            </div>
          </div>
        </form>
      </div>
    </div></div></div></section>`
  );
}

/* Generate all */
["en", "ar"].forEach((lang) => {
  const brand = lang === "ar" ? "بياناتك" : "Bayanatech";
  writePage(lang, "solutions.html", "solutions", `${lang === "ar" ? "الحلول" : "Solutions"} | ${brand}`, lang === "ar" ? "حلول تقنية المعلومات من بياناتك" : "IT solutions from Bayanatech", solutionsBody(lang));
  writePage(lang, "products.html", "products", `${lang === "ar" ? "المنتجات" : "Products"} | ${brand}`, lang === "ar" ? "منتجات وحلول بياناتك" : "Bayanatech products", productsBody(lang));
  writePage(lang, "product-detail.html", "products", `${lang === "ar" ? "تفاصيل المنتج" : "Product"} | ${brand}`, lang === "ar" ? "تفاصيل المنتج" : "Product details", productDetailBody(lang));
  writePage(lang, "industries.html", "industries", `${lang === "ar" ? "القطاعات" : "Industries"} | ${brand}`, lang === "ar" ? "قطاعات نخدمها" : "Industries we serve", industriesBody(lang));
  writePage(lang, "about.html", "about", `${lang === "ar" ? "من نحن" : "About"} | ${brand}`, lang === "ar" ? "عن بياناتك" : "About Bayanatech", aboutBody(lang));
  writePage(lang, "case-studies.html", "case-studies", `${lang === "ar" ? "قصص النجاح" : "Case Studies"} | ${brand}`, lang === "ar" ? "قصص نجاح العملاء" : "Customer success stories", casesBody(lang));
  writePage(lang, "contact.html", "contact", `${lang === "ar" ? "تواصل معنا" : "Contact"} | ${brand}`, lang === "ar" ? "تواصل مع بياناتك" : "Contact Bayanatech", contactBody(lang));
  writePage(lang, "consultation.html", "consultation", `${lang === "ar" ? "عرض سعر" : "Consultation"} | ${brand}`, lang === "ar" ? "اطلب عرض سعر" : "Book a consultation", consultationBody(lang));
});

console.log("Done.");
