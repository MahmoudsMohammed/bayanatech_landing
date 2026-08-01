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
  <link rel="icon" href="../assets/img/favicon.png" type="image/png">
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
        offcanvas: "start"
      }
    : {
        navAria: "Primary",
        products: "Products",
        midLabel: "Our Work",
        midHref: "case-studies.html",
        midKey: "case-studies",
        about: "About",
        contact: "Contact",
        consult: "Request a Quote",
        menu: "Menu",
        close: "Close",
        home: "Home",
        offcanvas: "end"
      };

  const act = (key) => (active === key ? " active" : "");

  const mobileMid = `<a class="nav-link" href="case-studies.html">${t.midLabel}</a>`;

  return `
  <header class="site-header">
    <nav class="navbar navbar-expand-lg" aria-label="${t.navAria}">
      <div class="container">
        <a class="brand-logo" href="index.html">
          <img src="../assets/img/logo-horizontal.png" class="logo-full" height="68" alt="Bayanatech">
          ${brand}
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav" aria-controls="mobileNav" aria-label="${t.menu}">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-none d-lg-flex">
          <ul class="navbar-nav mx-auto align-items-lg-center">
            <li class="nav-item"><a class="nav-link nav-link-main${act("home")}" href="index.html">${t.home}</a></li>
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
          <div class="footer-brand"><img src="../assets/img/logo-horizontal.png" class="logo-full" height="84" alt="بياناتك Bayanatech"></div>
          <p class="footer-tagline">شريك موثوق للتحول الرقمي وحلول تقنية المعلومات للشركات في المملكة العربية السعودية.</p>
          ${socialLinks("وسائل التواصل")}
        </div>
        <div>
          <h5>استكشف</h5>
          <ul>
            <li><a href="products.html">المنتجات</a></li>
            <li><a href="case-studies.html">أعمالنا</a></li>
            <li><a href="about.html">من نحن</a></li>
            <li><a href="contact.html">تواصل معنا</a></li>
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
        </div>
      </div>
      <div class="footer-bottom">
        <span>جميع الحقوق محفوظة ©2026 لمؤسسة بياناتك لتقنية المعلومات</span>
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
          <div class="footer-brand"><img src="../assets/img/logo-horizontal.png" class="logo-full" height="84" alt="Bayanatech"></div>
          <p class="footer-tagline">A trusted digital transformation and IT solutions partner for businesses in Saudi Arabia.</p>
          ${socialLinks("Social media")}
        </div>
        <div>
          <h5>Explore</h5>
          <ul>
            <li><a href="products.html">Products</a></li>
            <li><a href="case-studies.html">Our Work</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
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
        </div>
      </div>
      <div class="footer-bottom">
        <span>©2026 Bayanatech for Information Technology. All rights reserved.</span>
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
    <a class="fab-btn fab-consult" href="consultation.html"><i class="bi bi-calendar-check"></i><span>${isAr ? "اطلب عرض سعر" : "Request a Quote"}</span></a>
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

function productsBody(lang) {
  const isAr = lang === "ar";
  return (
    pageHero(
      lang,
      [{ href: "products.html", label: isAr ? "المنتجات" : "Products" }],
      isAr ? "تعمير السحابي" : "Tameer Cloud",
      isAr
        ? "نظام ERP سحابي متكامل لإدارة المكاتب الهندسية وشركات المقاولات مالياً وإدارياً وفنياً من منصة واحدة."
        : "An integrated cloud ERP for managing engineering offices and contracting companies—financially, administratively, and technically—from one platform."
    ) +
    `
    <section class="section">
      <div class="container">
        <div class="product-duo reveal" aria-label="${isAr ? "تعمير السحابي" : "Tameer Cloud"}">
          <div class="product-duo-logo">
            <img src="../assets/img/tameer-cloud-logo.png" width="360" height="273" alt="${isAr ? "شعار تعمير السحابي" : "Tameer Cloud logo"}" loading="eager">
          </div>
          <div class="erp-window" data-parallax-card>
            <div class="erp-top">
              <span></span><span></span><span></span>
              <strong>${isAr ? "لوحة مؤشرات المدير — تعمير ERP" : "Manager dashboard — Tameer ERP"}</strong>
            </div>
            <div class="erp-shot">
              <picture>
                <source srcset="../assets/img/tameer-manager-dashboard.webp" type="image/webp">
                <img
                  src="../assets/img/tameer-manager-dashboard.jpg"
                  alt="${isAr ? "لوحة مؤشرات المدير في تعمير ERP: إجمالي الإيرادات والمصروفات وصافي الأرباح، تحليلات الإيرادات، حالة المشاريع، وأداء الموظفين" : "Tameer ERP manager dashboard: total revenue, expenses, and net profit; revenue analytics; project status; and employee performance"}"
                  width="1400"
                  height="3175"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
            </div>
          </div>
        </div>
        <div class="section-header centered">
          <h2 class="section-title">${isAr ? "كل ما تحتاجه لإدارة أعمالك في مكان واحد" : "Everything you need to run your business in one place"}</h2>
          <p class="section-lead">${isAr ? "يركز تعمير السحابي على أهداف المشروع ومتطلبات العميل والمدة والتكلفة، ويجمع إدارة المشاريع والحسابات والموارد البشرية في نظام واحد سهل الاستخدام." : "Tameer Cloud focuses on project goals, client requirements, timeline, and cost—bringing project management, accounting, and HR together in one easy-to-use system."}</p>
        </div>
        <div class="row g-4">
          <div class="col-lg-4">
            <a class="card-soft d-flex flex-column text-decoration-none" href="https://tameercloud.com/" target="_blank" rel="noopener">
              <span class="card-icon"><i class="bi bi-kanban"></i></span>
              <h3>${isAr ? "إدارة المشاريع" : "Project management"}</h3>
              <p>${isAr ? "إدارة متخصصة للمشاريع الهندسية تشمل توزيع المهام، ومتابعة المراحل، ومخططات جانت، وسير العمل، والإشعارات، ومؤشرات الأداء." : "Specialized engineering project management including task assignment, stage tracking, Gantt charts, workflows, notifications, and KPIs."}</p>
              <span class="btn-link-more mt-auto">${isAr ? "استكشف إدارة المشاريع" : "Explore project management"} <i class="bi bi-arrow-${isAr ? "left" : "right"}"></i></span>
            </a>
          </div>
          <div class="col-lg-4">
            <a class="card-soft d-flex flex-column text-decoration-none" href="https://tameercloud.com/accounts" target="_blank" rel="noopener">
              <span class="card-icon"><i class="bi bi-calculator"></i></span>
              <h3>${isAr ? "الحسابات والفوترة" : "Accounting & invoicing"}</h3>
              <p>${isAr ? "نظام محاسبة وفوترة إلكترونية متكامل لإدارة المبيعات والمشتريات والضرائب والرواتب، مع تقارير مالية ومتابعة ربحية المشاريع." : "An integrated accounting and e-invoicing system for sales, purchasing, tax, and payroll—with financial reports and project profitability tracking."}</p>
              <span class="btn-link-more mt-auto">${isAr ? "استكشف النظام المحاسبي" : "Explore the accounting system"} <i class="bi bi-arrow-${isAr ? "left" : "right"}"></i></span>
            </a>
          </div>
          <div class="col-lg-4">
            <a class="card-soft d-flex flex-column text-decoration-none" href="https://tameercloud.com/employees" target="_blank" rel="noopener">
              <span class="card-icon"><i class="bi bi-people"></i></span>
              <h3>${isAr ? "الموارد البشرية" : "Human resources"}</h3>
              <p>${isAr ? "أتمتة شؤون الموظفين من الحضور والانصراف والإجازات والموافقات إلى مسير الرواتب والعقود والملفات، مع خدمات ذاتية عبر الجوال." : "Automate HR from attendance, leave, and approvals to payroll, contracts, and files—with self-service on mobile."}</p>
              <span class="btn-link-more mt-auto">${isAr ? "استكشف الموارد البشرية" : "Explore human resources"} <i class="bi bi-arrow-${isAr ? "left" : "right"}"></i></span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="section product-stats" aria-labelledby="product-stats-title">
      <div class="container">
        <div class="section-header centered">
          <span class="section-eyebrow">${isAr ? "أرقام تعكس الثقة" : "Numbers that reflect trust"}</span>
          <h2 class="section-title" id="product-stats-title">${isAr ? "خبرة واسعة ونظام ينمو مع أعمالك" : "Deep experience and a system that grows with your business"}</h2>
          <p class="section-lead">${isAr ? "حل محاسبي وإداري موثوق يخدم آلاف المنشآت والمستخدمين في المملكة." : "A trusted accounting and management solution serving thousands of organizations and users across the Kingdom."}</p>
        </div>
        <div class="product-metrics" aria-label="${isAr ? "إحصائيات تعمير السحابي" : "Tameer Cloud statistics"}">
          <div class="product-metric">
            <strong dir="ltr" class="product-metric-value">
              <span data-counter="22" data-digits="latn" data-suffix="${isAr ? "+" : "K+"}">0</span>${isAr ? `
              <span class="metric-unit">ألف</span>` : ""}
            </strong>
            <span>${isAr ? "منشأة سعودية" : "Saudi organizations"}</span>
          </div>
          <div class="product-metric">
            <strong dir="ltr" data-counter="12" data-digits="latn" data-suffix="+">0</strong>
            <span>${isAr ? "عاماً في السوق" : "Years in the market"}</span>
          </div>
          <div class="product-metric">
            <strong dir="ltr" class="product-metric-value">
              <span data-counter="21" data-digits="latn" data-suffix="${isAr ? "+" : "M+"}">0</span>${isAr ? `
              <span class="metric-unit">مليون</span>` : ""}
              <img class="sar-symbol" src="../assets/img/saudi-riyal-symbol.png" alt="" width="28" height="32" aria-hidden="true">
            </strong>
            <span>${isAr ? "عملية محاسبية" : "Accounting transactions"}</span>
          </div>
          <div class="product-metric">
            <strong dir="ltr" class="product-metric-value">
              <span data-counter="100" data-digits="latn" data-suffix="${isAr ? "+" : "K+"}">0</span>${isAr ? `
              <span class="metric-unit">ألف</span>` : ""}
            </strong>
            <span>${isAr ? "مستخدم شهرياً" : "Monthly users"}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section zatca-section" aria-labelledby="zatca-title">
      <div class="container">
        <div class="zatca-content">
          <div class="zatca-copy">
            <span class="zatca-panel-label">${isAr ? "الامتثال والموثوقية" : "Compliance & trust"}</span>
            <h2 class="section-title" id="zatca-title">${isAr ? "جاهز لمتطلبات الفوترة الإلكترونية" : "Ready for e-invoicing requirements"}</h2>
            <p class="section-lead">${isAr ? "يساعدك تعمير السحابي على إدارة الفواتير والعمليات المحاسبية بما يتوافق مع متطلبات هيئة الزكاة والضريبة والجمارك." : "Tameer Cloud helps you manage invoices and accounting operations in line with ZATCA requirements."}</p>
          </div>
          <img src="../assets/img/zatca-logo.png" alt="${isAr ? "هيئة الزكاة والضريبة والجمارك" : "Zakat, Tax and Customs Authority (ZATCA)"}" width="1018" height="246" loading="lazy">
        </div>
      </div>
    </section>
    <section class="section section-muted">
      <div class="container text-center">
        <span class="section-eyebrow">${isAr ? "اعرف المزيد" : "Learn more"}</span>
        <h2 class="section-title">${isAr ? "اكتشف جميع إمكانات تعمير السحابي" : "Discover all Tameer Cloud capabilities"}</h2>
        <p class="section-lead mx-auto mb-4">${isAr ? "للمزيد من المعلومات حول النظام ومميزاته، تفضل بزيارة الموقع الرسمي لتعمير السحابي." : "For more information about the system and its features, visit the official Tameer Cloud website."}</p>
        <a class="btn btn-brand" href="https://tameercloud.com/" target="_blank" rel="noopener">${isAr ? "زيارة موقع تعمير السحابي" : "Visit Tameer Cloud website"} <i class="bi bi-box-arrow-up-${isAr ? "left me-2" : "right ms-2"}"></i></a>
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
        <p class="text-muted">${isAr ? "نقدّم حلولاً متكاملة في الشبكات ومراكز البيانات والاستشارات والأمن وأنظمة الحاسب وخدمات ما بعد البيع—لأن عملاءنا هم مقياس نجاحنا وشركاء مسيرتنا، فإننا نسعى دائماً لأن نبقى خيارهم الأول في الحلول التقنية." : "We deliver integrated solutions across networks, data centers, consulting, security, computer systems, and aftermarket services—because our customers are the measure of our success and partners in our journey, we always strive to remain their first choice in technical solutions."}</p>
        <div class="row g-3 mt-3">
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="14" data-digits="latn" data-suffix="+">0</div><div class="metric-label">${isAr ? "سنة" : "Years"}</div></div></div>
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="4000" data-digits="latn" data-suffix="+">0</div><div class="metric-label">${isAr ? "مشروع ناجح" : "Successful projects"}</div></div></div>
          <div class="col-4"><div class="metric-card"><div class="metric-value" data-counter="3000" data-digits="latn" data-suffix="+">0</div><div class="metric-label">${isAr ? "عميل راضي" : "Satisfied clients"}</div></div></div>
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
        ["الضيافة", "مكارم المدينة", "ربط إلكتروني عبر الشبكات اللاسلكية.", "خدمات ربط ودعم فني.", "تقدير الجهود وتحسين الاتصال.", "WAN", "ربط"],
        ["التصنيع", "شركة مصنع مياه عذبة", "الحاجة إلى بنية تحتية تقنية متكاملة تربط الفروع والأنظمة بمركز واحد.", "تصميم وتنفيذ شبكات الحاسب الآلي، وتجهيز وإعداد الخوادم، وتركيب نظام السنترال، وربط الفروع عبر شبكة اتصال موحدة وآمنة، بالإضافة إلى تكامل أجهزة الحضور والانصراف مع المركز الرئيسي.", "تعزيز كفاءة التشغيل، وتوحيد إدارة الأنظمة، وضمان استمرارية الأعمال.", "PBX", "سنترال"],
        ["الرعاية الصحية", "مجموعة د. عبد الرحمن العقالي الطبية", "تطوير البنية التحتية التقنية لجميع فروع المجموعة.", "تصميم وتنفيذ شبكات الحاسب الآلي، وتجهيز وإعداد الخوادم، وإنشاء الشبكات المحلية، وربط الفروع عبر شبكة اتصال لاسلكية آمنة وموثوقة.", "تعزيز كفاءة البنية التقنية، وتحسين الاتصال بين الفروع، ودعم استمرارية الأعمال ورفع كفاءة الأداء التشغيلي.", "Wi-Fi", "ربط لاسلكي"]
      ]
    : [
        ["Hospitality", "Hotel group interconnect", "Need reliable wireless linking across properties.", "Infrastructure, wireless interconnect, and support.", "Project completed to a high standard.", "8+", "Years"],
        ["Non-profit", "Endowment network uplift", "Need to develop network and information systems.", "Infrastructure delivery and systems enablement.", "Effective impact on capability.", "Core", "Uplift"],
        ["Enterprise", "Holding company support", "Dependable network with sustained support.", "Network build and seven years of support.", "Long partnership and continuity.", "7", "Years"],
        ["Hospitality", "Makarem Al Madinah", "Electronic linking via wireless networking.", "Interconnect services and technical support.", "Recognized contribution to connectivity.", "WAN", "Link"],
        ["Manufacturing", "Azbah Water Factory", "A need for integrated technical infrastructure linking branches and systems to one hub.", "Computer network design and delivery, server provisioning, PBX installation, and branch connectivity over a unified, secure network—plus attendance device integration with headquarters.", "Improved operational efficiency, unified systems management, and business continuity.", "PBX", "Telephony"],
        ["Healthcare", "Dr. Abdulrahman Al-Ogaly Medical Group", "Modernizing the technical infrastructure across every branch of the group.", "Computer network design and delivery, server provisioning, local network build-out, and branch connectivity over a secure, reliable wireless link.", "Stronger technical foundations, better inter-branch connectivity, and improved operational performance.", "Wi-Fi", "Wireless link"]
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
      [{ href: "consultation.html", label: isAr ? "عرض سعر" : "Quote" }],
      isAr ? "اطلب عرض سعر" : "Request a Quote",
      isAr
        ? "أخبرنا عن احتياجك وسنقترح مساراً واضحاً للبنية والأمان أو التحول الرقمي."
        : "Tell us about your need and we’ll propose a clear path for infrastructure, security, or digital transformation."
    ) +
    `
    <section class="section"><div class="container"><div class="row justify-content-center"><div class="col-lg-8">
      <div class="form-card reveal">
        <div class="alert alert-success d-none" tabindex="-1" data-form-success role="status">${isAr ? "تم استلام طلبك. سنتواصل قريباً." : "Your request was received. We’ll be in touch shortly."}</div>
        <div class="alert alert-danger d-none" tabindex="-1" data-form-error role="alert">${isAr ? "تعذّر الإرسال. حاول مرة أخرى." : "Could not send. Please try again."}</div>
        <form class="needs-validation" novalidate data-form="consultation">
          <input type="hidden" name="_subject" value="Bayanatech consultation request">
          <div class="row g-3">
            <div class="col-md-6"><label class="form-label" for="qName">${isAr ? "الاسم الكامل" : "Full name"}</label><input class="form-control" id="qName" name="name" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qCompany">${isAr ? "الشركة / الجهة" : "Company / Organization"}</label><input class="form-control" id="qCompany" name="company" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qEmail">${isAr ? "البريد المهني" : "Work email"}</label><input class="form-control" id="qEmail" type="email" name="email" required><div class="invalid-feedback">${isAr ? "بريد صالح مطلوب" : "Valid email required"}</div></div>
            <div class="col-md-6"><label class="form-label" for="qPhone">${isAr ? "الجوال" : "Mobile"}</label><input class="form-control" id="qPhone" type="tel" name="phone" required><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-12"><label class="form-label" for="qService">${isAr ? "مجال الاهتمام" : "Area of interest"}</label>
              <select class="form-select" id="qService" name="service" required>
                <option value="">${isAr ? "اختر..." : "Select..."}</option>
                <option>${isAr ? "البنية التحتية للشبكات" : "Network Infrastructure"}</option>
                <option>${isAr ? "السيرفرات وحلول التخزين" : "Servers and Storage Solutions"}</option>
                <option>${isAr ? "كاميرات المراقبة" : "Surveillance Cameras"}</option>
                <option>${isAr ? "الشبكات اللاسلكية (Wi-Fi)" : "Wireless Networks (Wi-Fi)"}</option>
                <option>${isAr ? "السنترالات وأنظمة الاتصال" : "PBX and Communication Systems"}</option>
                <option>${isAr ? "أنظمة الحضور والانصراف" : "Attendance Systems"}</option>
                <option>${isAr ? "أمن المعلومات والشبكات" : "Information and Network Security"}</option>
                <option>${isAr ? "عقود الصيانة والدعم الفني" : "Maintenance Contracts and Technical Support"}</option>
                <option>${isAr ? "أخرى" : "Other"}</option>
              </select>
              <div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div>
            </div>
            <div class="col-12"><label class="form-label" for="qMsg">${isAr ? "نبذة عن الاحتياج" : "Brief description of your need"}</label><textarea class="form-control" id="qMsg" name="message" rows="5" required></textarea><div class="invalid-feedback">${isAr ? "مطلوب" : "Required"}</div></div>
            <div class="col-12 form-check ms-1"><input class="form-check-input optional-consent" type="checkbox" id="qConsent" name="consent" value="yes"><label class="form-check-label" for="qConsent">${isAr ? "أوافق على التواصل بشأن طلبي." : "I agree to be contacted about this request."}</label></div>
            <div class="col-12"><div data-recaptcha></div><p class="small text-danger d-none mb-0" data-recaptcha-error>${isAr ? "يرجى إكمال التحقق." : "Please complete verification."}</p></div>
            <div class="col-12 d-flex flex-wrap gap-2">
              <button class="btn btn-brand" type="submit">${isAr ? "إرسال الطلب" : "Submit request"}</button>
              <a class="btn btn-brand-outline" href="${wa}" target="_blank" rel="noopener">${isAr ? "واتساب مباشر" : "Direct WhatsApp"}</a>
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
  writePage(
    lang,
    "products.html",
    "products",
    lang === "ar" ? "تعمير السحابي | منتجات بياناتك" : "Tameer Cloud | Bayanatech Products",
    lang === "ar"
      ? "تعمير السحابي، نظام ERP متكامل لإدارة المشاريع والحسابات والموارد البشرية للمكاتب الهندسية وشركات المقاولات."
      : "Tameer Cloud, an integrated ERP system for project management, accounting, and HR for engineering offices and contracting companies.",
    productsBody(lang)
  );
  writePage(lang, "product-detail.html", "products", `${lang === "ar" ? "تفاصيل المنتج" : "Product"} | ${brand}`, lang === "ar" ? "تفاصيل المنتج" : "Product details", productDetailBody(lang));
  writePage(lang, "industries.html", "industries", `${lang === "ar" ? "القطاعات" : "Industries"} | ${brand}`, lang === "ar" ? "قطاعات نخدمها" : "Industries we serve", industriesBody(lang));
  writePage(lang, "about.html", "about", `${lang === "ar" ? "من نحن" : "About"} | ${brand}`, lang === "ar" ? "عن بياناتك" : "About Bayanatech", aboutBody(lang));
  writePage(lang, "case-studies.html", "case-studies", `${lang === "ar" ? "قصص النجاح" : "Case Studies"} | ${brand}`, lang === "ar" ? "قصص نجاح العملاء" : "Customer success stories", casesBody(lang));
  writePage(lang, "contact.html", "contact", `${lang === "ar" ? "تواصل معنا" : "Contact"} | ${brand}`, lang === "ar" ? "تواصل مع بياناتك" : "Contact Bayanatech", contactBody(lang));
  writePage(lang, "consultation.html", "consultation", `${lang === "ar" ? "عرض سعر" : "Consultation"} | ${brand}`, lang === "ar" ? "اطلب عرض سعر" : "Book a consultation", consultationBody(lang));
});

console.log("Done.");
