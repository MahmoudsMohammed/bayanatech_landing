/**
 * Site-wide contact + form settings.
 * Add your Google reCAPTCHA v2 site key from https://www.google.com/recaptcha/admin
 */
window.BAYANATECH_CONFIG = {
  formRecipient: "no-reply@tameercloud.com",
  formEndpoint: "https://formsubmit.co/ajax/no-reply@tameercloud.com",
  /*
   * Google reCAPTCHA v2 Checkbox site key (NOT the secret key).
   * Create one at https://www.google.com/recaptcha/admin
   *   → reCAPTCHA v2 → "I'm not a robot" Checkbox
   *   → add your domain(s), e.g. bayanatech.com.sa and www.bayanatech.com.sa
   *   → also add localhost if you test locally
   * Paste the Site Key below. Leave empty until you have a real key
   * (do not use Google’s public test key — it shows a red warning banner).
   */
  recaptchaSiteKey: "6LcKx2QtAAAAACWl5RFuaeNee1KRKf0MHRQj65Mz",
  phone: "0503326610",
  phoneDisplay: "050 332 6610",
  whatsapp: "966568587099",
  whatsappDisplay: "056 858 7099",
  email: "info@bayanatech.com.sa",
  address: {
    ar: "مؤسسة بياناتك لتقنية المعلومات - المدينة المنورة - شارع خالد ابن الوليد - دوار القبلتين - مقابل محطة نفط",
    en: "Bayanatech for Information Technology — Madinah, Khalid Ibn Al-Walid St., Al-Qiblatain Roundabout, opposite Naft station",
  },
  hours: {
    ar: "السبت - الخميس 09:00 - 19:00",
    en: "Saturday – Thursday, 09:00 – 19:00",
  },
};
