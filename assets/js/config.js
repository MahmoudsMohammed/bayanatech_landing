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
  phone: "0568587099",
  phoneDisplay: "056 858 7099",
  whatsapp: "966503326610",
  whatsappDisplay: "050 332 6610",
  email: "info@bayanatech.com.sa",
  social: {
    facebook: "https://www.facebook.com/Bayanatech",
    twitter: "https://www.twitter.com/Bayanatech",
    youtube: "https://www.youtube.com/channel/UCTb3AivjT1Vp7ZkZFLgb_TQ",
  },
  address: {
    ar: "شارع خالدة بنت الأسود، حي طيبة، مقابل جامعة طيبة",
    en: "Khalidah bint Al-Aswad St., Taybah District, opposite Taibah University",
  },
  hours: {
    ar: "السبت - الخميس 09:00 - 19:00",
    en: "Saturday – Thursday, 09:00 – 19:00",
  },
};
