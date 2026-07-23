/**
 * Locale helpers — AR/EN path switching
 */
(function () {
  const STORAGE_KEY = "bayanatech-lang";

  function getLangFromPath() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.includes("ar")) return "ar";
    if (parts.includes("en")) return "en";
    return null;
  }

  function preferredLang() {
    return localStorage.getItem(STORAGE_KEY) || getLangFromPath() || "ar";
  }

  function switchLocale(targetLang) {
    localStorage.setItem(STORAGE_KEY, targetLang);
    const path = window.location.pathname.replace(/\\/g, "/");
    const file = path.split("/").pop() || "index.html";
    const page = file.includes(".html") ? file : "index.html";
    const base = path.includes("/ar/") || path.endsWith("/ar") || /\/ar\//.test(path)
      ? path.replace(/\/ar(\/|$)/, `/${targetLang}$1`)
      : path.includes("/en/") || path.endsWith("/en") || /\/en\//.test(path)
        ? path.replace(/\/en(\/|$)/, `/${targetLang}$1`)
        : `/${targetLang}/${page}`;

    // Normalize: if replace failed oddly, build from known structure
    let next = base;
    if (!next.includes(`/${targetLang}/`) && !next.endsWith(`/${targetLang}`)) {
      const match = path.match(/\/(ar|en)\/([^/]*)$/);
      if (match) {
        next = path.replace(`/${match[1]}/`, `/${targetLang}/`);
      } else {
        next = `../${targetLang}/${page}`;
      }
    }

    // Relative-friendly redirect from ar/en pages
    const currentLang = getLangFromPath();
    if (currentLang && currentLang !== targetLang) {
      window.location.href = `../${targetLang}/${page === "" ? "index.html" : page}${window.location.search}${window.location.hash}`;
      return;
    }
    window.location.href = next;
  }

  function initLangSwitcher() {
    document.querySelectorAll("[data-switch-lang]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = el.getAttribute("data-switch-lang");
        if (lang) switchLocale(lang);
      });
    });
  }

  window.BayanatechI18n = {
    getLangFromPath,
    preferredLang,
    switchLocale,
    initLangSwitcher
  };

  document.addEventListener("DOMContentLoaded", initLangSwitcher);
})();
