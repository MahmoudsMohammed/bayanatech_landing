/**
 * Build English index.html and products.html from Arabic counterparts
 * by translating text while preserving structure.
 * Run: node scripts/sync-en-from-ar.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

// Longest-first phrase map (AR → EN)
const phrases = [
  [
    "بياناتك لتقنية المعلومات — حلول تقنية متكاملة للشبكات والسيرفرات وكاميرات المراقبة وأمن المعلومات والدعم الفني في المملكة العربية السعودية.",
    "Bayanatech — integrated IT solutions for networks, servers, surveillance, information security, and technical support in Saudi Arabia."
  ],
  [
    "بياناتك لتقنية المعلومات | التحول الرقمي وحلول تقنية المعلومات",
    "Bayanatech | Digital Transformation & IT Solutions"
  ],
  [
    "تعمير السحابي، نظام ERP متكامل لإدارة المشاريع والحسابات والموارد البشرية للمكاتب الهندسية وشركات المقاولات.",
    "Tameer Cloud, an integrated ERP system for project management, accounting, and HR for engineering offices and contracting companies."
  ],
  ["تعمير السحابي | منتجات بياناتك", "Tameer Cloud | Bayanatech Products"],
  ["تخطى إلى المحتوى", "Skip to content"],
  ['aria-label="الرئيسية"', 'aria-label="Primary"'],
  ['aria-label="فتح القائمة"', 'aria-label="Open menu"'],
  ['aria-label="القائمة"', 'aria-label="Menu"'],
  ['aria-label="إغلاق"', 'aria-label="Close"'],
  ['aria-label="الجوال"', 'aria-label="Mobile"'],
  ['aria-label="قائمة الحلول"', 'aria-label="Solutions menu"'],
  ['aria-label="وسائل التواصل"', 'aria-label="Social media"'],
  ['aria-label="واتساب"', 'aria-label="WhatsApp"'],
  ['aria-label="مسار التنقل"', 'aria-label="Breadcrumb"'],
  [
    'بياناتك<span class="brand-tag">لتقنية المعلومات</span>',
    'Bayanatech<span class="brand-tag">Information Technology</span>'
  ],
  ["أسس تقنية قوية قابلة للتوسع", "Resilient foundations that scale with your business"],
  ["حماية البيانات والشبكات واستمرارية الأعمال", "Protect data, networks, and continuity"],
  ["مرونة دون التخلي عن السيطرة", "Agility without compromising control"],
  ["LAN وWAN ولاسلكي بأداء عالٍ", "LAN, WAN, and wireless that perform"],
  ["دعم استباقي باتفاقيات واضحة", "Proactive support with clear SLAs"],
  ["أنظمة تحقق عائداً ملموساً", "Systems that deliver tangible ROI"],
  ["إدارة تقنية المعلومات", "Managed IT"],
  ["برمجيات الأعمال", "Business Software"],
  ["الأمن السيبراني", "Cybersecurity"],
  ["الخدمات السحابية", "Cloud Services"],
  ["البنية التحتية", "Infrastructure"],
  ["خدماتنا", "Our Services"],
  ["منتجاتنا", "Our Products"],
  ["المنتجات", "Products"],
  ["أعمالنا", "Our Work"],
  ["من نحن", "About"],
  ["تواصل معنا", "Contact"],
  ["اطلب عرض سعر", "Request a Quote"],
  ["كل الحلول", "All Solutions"],
  ["كل الخدمات", "All Services"],
  ["السحابة", "Cloud"],
  ["خبرة محلية في البنية التحتية منذ أكثر من 14 عاماً", "Local infrastructure expertise for over 14 years"],
  [
    "شريكك التقني لبناء بيئة أعمال",
    "Your technology partner for a business environment that is"
  ],
  ["أكثر استقراراً وكفاءة", "more stable and efficient"],
  [
    "نقدم حلولاً تقنية متكاملة تساعد المنشآت على بناء بنية تحتية قوية، وحماية بياناتها، وتحسين كفاءة التشغيل، من خلال خدمات الشبكات والسيرفرات وأنظمة المراقبة والدعم الفني المتخصص.",
    "We deliver integrated technology solutions that help organizations build strong infrastructure, protect their data, and improve operational efficiency—through networking, servers, surveillance systems, and specialized technical support."
  ],
  ['aria-label="حلولنا الرئيسية"', 'aria-label="Our core solutions"'],
  ["الشبكات", "Networking"],
  ["السيرفرات", "Servers"],
  ["الكاميرات", "Cameras"],
  ["الدعم الفني", "Technical Support"],
  ["تحدث مع خبير", "Talk to an Expert"],
  ["مركز العمليات التقنية", "Network operations center"],
  ["الأنظمة مستقرة", "Systems stable"],
  ["مركز البيانات", "Data center"],
  ["الخوادم", "Servers"],
  ["البنية الشبكية", "Network fabric"],
  ["أمن الشبكات", "Network security"],
  ["توفر الشبكة", "Network uptime"],
  ["الحماية", "Protection"],
  ["نشطة", "Active"],
  ["مراقبة ودعم متواصل", "Continuous monitoring & support"],
  ['aria-label="انتقل إلى الخدمات"', 'aria-label="Go to services"'],
  ["نبذة عن المؤسسة", "About the company"],
  ["خبرة تقنية تدعم نمو أعمالك", "Technical expertise that supports your growth"],
  [
    "في بياناتك لتقنية المعلومات نساعد المؤسسات والشركات على بناء وتشغيل وإدارة بيئات تقنية موثوقة تدعم استمرارية الأعمال وتواكب متطلبات النمو والتوسع.",
    "At Bayanatech, we help organizations and companies build, operate, and manage reliable technology environments that support business continuity and keep pace with growth and expansion."
  ],
  [
    "نعمل وفق أفضل الممارسات التقنية لتقديم حلول عملية تجمع بين الجودة والكفاءة والدعم المستمر، مع التركيز على تقديم قيمة حقيقية لعملائنا في مختلف القطاعات.",
    "We follow best technical practices to deliver practical solutions that combine quality, efficiency, and continuous support—focused on real value for clients across sectors."
  ],
  ["تعرّف علينا أكثر", "Learn more about us"],
  ["بنية تحتية قوية", "Strong infrastructure"],
  ["تصميم وتنفيذ يضمن استقرار الاتصال وجاهزية التوسع.", "Design and delivery that keep connectivity stable and ready to scale."],
  ["حماية البيانات", "Data protection"],
  ["طبقات أمنية تحفظ أنظمتك وبياناتك من المخاطر الرقمية.", "Security layers that protect your systems and data from digital threats."],
  ["كفاءة التشغيل", "Operational efficiency"],
  ["أنظمة وحلول ترفع جاهزية العمل وتقلل التوقف.", "Systems and solutions that raise readiness and reduce downtime."],
  ["دعم فني متخصص", "Specialized technical support"],
  ["فريق قريب منك يتابع أنظمتك قبل التنفيذ وبعده.", "A nearby team that supports your systems before and after go-live."],
  ["حلول تقنية متكاملة تحت سقف واحد", "Integrated technology solutions under one roof"],
  ["البنية التحتية للشبكات", "Network infrastructure"],
  [
    "نصمم وننفذ شبكات سلكية ولاسلكية عالية الاعتمادية تضمن استقرار الاتصال وسهولة التوسع مستقبلاً.",
    "We design and implement highly reliable wired and wireless networks that ensure stable connectivity and easy future expansion."
  ],
  ["تصميم الشبكات", "Network design"],
  ["تركيب وتجهيز الشبكات", "Network installation & setup"],
  ["إدارة الشبكات", "Network management"],
  ["تحسين الأداء", "Performance optimization"],
  ["حلول الربط بين الفروع", "Branch connectivity solutions"],
  ["اعرف المزيد", "Learn more"],
  ["السيرفرات وحلول التخزين", "Servers & storage solutions"],
  [
    "نوفر حلولاً متكاملة لإدارة البيانات والتطبيقات تضمن الأداء العالي والحماية واستمرارية الأعمال.",
    "We provide integrated solutions for managing data and applications that ensure high performance, protection, and business continuity."
  ],
  ["تركيب وإعداد السيرفرات", "Server installation & setup"],
  ["حلول التخزين الاحترافية", "Professional storage solutions"],
  ["النسخ الاحتياطي", "Backup"],
  ["المحاكاة الافتراضية", "Virtualization"],
  ["مراقبة وإدارة الخوادم", "Server monitoring & management"],
  ["كاميرات المراقبة", "Surveillance cameras"],
  [
    "حلول مراقبة ذكية تساعد المنشآت على تعزيز الأمن ومتابعة العمليات التشغيلية بكفاءة.",
    "Smart surveillance solutions that help organizations strengthen security and monitor operations efficiently."
  ],
  ["تصميم أنظمة المراقبة", "Surveillance system design"],
  ["تركيب الكاميرات", "Camera installation"],
  ["المراقبة المركزية", "Central monitoring"],
  ["التسجيل والأرشفة", "Recording & archiving"],
  ["الصيانة والدعم الفني", "Maintenance & technical support"],
  ["الشبكات اللاسلكية (Wi-Fi)", "Wireless networks (Wi-Fi)"],
  [
    "ننفذ شبكات لاسلكية احترافية توفر تغطية مستقرة وأداءً عالياً للمكاتب والمنشآت متعددة المواقع.",
    "We deploy professional wireless networks that deliver stable coverage and high performance for offices and multi-site organizations."
  ],
  ["تصميم التغطية اللاسلكية", "Wireless coverage design"],
  ["حلول Wi-Fi المؤسسية", "Enterprise Wi-Fi solutions"],
  ["تحسين جودة الإشارة", "Signal quality optimization"],
  ["إدارة المستخدمين والصلاحيات", "User & permission management"],
  ["السنترالات وأنظمة الاتصال", "PBX & communication systems"],
  [
    "حلول اتصال حديثة تساعد على رفع كفاءة التواصل داخل المنشأة وخارجها.",
    "Modern communication solutions that improve how teams connect inside and outside the organization."
  ],
  ["السنترالات السحابية", "Cloud PBX"],
  ["السنترالات المحلية", "On-premises PBX"],
  ["أنظمة مراكز الاتصال", "Contact center systems"],
  ["ربط الفروع", "Branch linking"],
  ["إدارة المكالمات والتقارير", "Call management & reporting"],
  ["أنظمة الحضور والانصراف", "Attendance systems"],
  [
    "حلول متطورة لإدارة حضور الموظفين ومتابعة أوقات العمل بدقة وكفاءة.",
    "Advanced solutions for managing employee attendance and tracking work hours accurately and efficiently."
  ],
  ["أجهزة البصمة", "Fingerprint devices"],
  ["التعرف على الوجه", "Facial recognition"],
  ["تقارير الحضور", "Attendance reports"],
  ["التكامل مع الأنظمة الإدارية", "Integration with admin systems"],
  ["أمن المعلومات والشبكات", "Information & network security"],
  [
    "نساعدك على حماية بياناتك وأنظمتك من المخاطر والتهديدات الرقمية.",
    "We help you protect your data and systems from digital risks and threats."
  ],
  ["جدران الحماية", "Firewalls"],
  ["حماية الشبكات", "Network protection"],
  ["إدارة الصلاحيات", "Access management"],
  ["مراقبة التهديدات", "Threat monitoring"],
  ["تقييم المخاطر الأمنية", "Security risk assessment"],
  ["عقود الصيانة والدعم الفني", "Maintenance & support contracts"],
  [
    "دعم فني احترافي يضمن استمرارية أعمالك وتقليل الأعطال ورفع كفاءة الأنظمة.",
    "Professional technical support that keeps your business running, reduces failures, and improves system efficiency."
  ],
  ["الصيانة الوقائية", "Preventive maintenance"],
  ["الدعم الفني عن بعد", "Remote technical support"],
  ["الزيارات الميدانية", "On-site visits"],
  ["معالجة الأعطال", "Incident handling"],
  ["التقارير الدورية", "Periodic reports"],
  ["تعمير ERP", "Tameer ERP"],
  [
    "منصة متكاملة لإدارة المنشآت تجمع بين الإدارة المالية والموارد البشرية وإدارة المشاريع في نظام واحد يساعدك على متابعة أعمالك واتخاذ قرارات أفضل.",
    "An integrated platform for running your organization—combining finance, HR, and project management in one system that helps you track work and make better decisions."
  ],
  ["الإدارة المالية", "Financial management"],
  ["الموارد البشرية", "Human resources"],
  ["إدارة المشاريع", "Project management"],
  ["التقارير الذكية", "Smart reporting"],
  ["العمل السحابي", "Cloud operation"],
  ["زيارة موقع تعمير ERP", "Visit Tameer ERP website"],
  ["لوحة مؤشرات المدير — تعمير ERP", "Manager dashboard — Tameer ERP"],
  [
    "لوحة مؤشرات المدير في تعمير ERP: إجمالي الإيرادات والمصروفات وصافي الأرباح، تحليلات الإيرادات، حالة المشاريع، وأداء الموظفين",
    "Tameer ERP manager dashboard: total revenue, expenses, and net profit; revenue analytics; project status; and employee performance"
  ],
  ["الامتثال والموثوقية", "Compliance & trust"],
  ["فوترة إلكترونية جاهزة لأعمالك", "E-invoicing ready for your business"],
  [
    "يدعم تعمير ERP إدارة الفواتير والعمليات المحاسبية بما يتوافق مع متطلبات هيئة الزكاة والضريبة والجمارك، لتدير أعمالك بثقة وكفاءة.",
    "Tameer ERP supports invoice and accounting operations in line with ZATCA requirements—so you can run your business with confidence and efficiency."
  ],
  ["اكتشف تعمير ERP", "Discover Tameer ERP"],
  ["هيئة الزكاة والضريبة والجمارك", "Zakat, Tax and Customs Authority (ZATCA)"],
  ["لماذا بياناتك؟", "Why Bayanatech?"],
  ["لأن التقنية الناجحة تبدأ بالشريك المناسب", "Because successful technology starts with the right partner"],
  [
    "لا نقدّم أجهزة فقط؛ نبني حلولاً مدروسة ونبقى معك بعد التشغيل لضمان الاستقرار والتطور.",
    "We don’t just deliver hardware—we build thoughtful solutions and stay with you after go-live to ensure stability and growth."
  ],
  ["تعرّف علينا", "About us"],
  ["خبرة عملية", "Hands-on experience"],
  ["خبرة عملية في تنفيذ المشاريع التقنية.", "Practical experience delivering technology projects."],
  ["حلول مخصصة", "Tailored solutions"],
  ["حلول مصممة وفق احتياجات كل عميل.", "Solutions designed around each client’s needs."],
  ["فريق متخصص", "Specialized team"],
  ["فريق متخصص في البنية التحتية والدعم الفني.", "A team specialized in infrastructure and technical support."],
  ["استجابة سريعة", "Fast response"],
  ["سرعة استجابة ومعالجة الأعطال.", "Fast response and incident resolution."],
  ["جودة والتزام", "Quality & commitment"],
  ["التزام بالجودة وأفضل الممارسات التقنية.", "A commitment to quality and best technical practices."],
  ["دعم مستمر", "Ongoing support"],
  ["دعم مستمر قبل التنفيذ وبعده.", "Continuous support before and after delivery."],
  ["مشاريعنا", "Our projects"],
  ["أعمال نفخر بها", "Work we are proud of"],
  [
    "نفذنا العديد من المشاريع التقنية للجهات الحكومية والشركات والمؤسسات التعليمية والتجارية، وساهمنا في بناء بيئات تقنية مستقرة وآمنة تدعم نجاح أعمال عملائنا.",
    "We have delivered many technology projects for government entities, companies, and educational and commercial institutions—helping build stable, secure environments that support our clients’ success."
  ],
  ["استعرض مشاريعنا", "View our projects"],
  [
    "وزارة الصحة، المديرية العامة للشؤون الصحية بمنطقة المدينة المنورة",
    "Ministry of Health, General Directorate of Health Affairs in Madinah Region"
  ],
  ["من أعمالنا", "From our work"],
  ["القطاع الصحي", "Healthcare sector"],
  [
    "إدارة التدريب والابتعاث وإدارة الموارد الذاتية بمنطقة المدينة المنورة",
    "Training & Scholarship Administration and Self-Resources Management in Madinah Region"
  ],
  [
    "قدمت مؤسسة بياناتك لتقنية المعلومات حلولًا تقنية متكاملة لإدارة التدريب والابتعاث وإدارة الموارد الذاتية، تضمنت إنشاء البنية التحتية لشبكات الحاسب الآلي، وتطوير الأنظمة والمنصات الإلكترونية، وأتمتة إجراءات العمل، بما أسهم في تحسين كفاءة الأداء، وتطوير الخدمات الرقمية، وتوفير تجربة إلكترونية متكاملة للمستفيدين.",
    "Bayanatech delivered integrated technical solutions for training and scholarship administration and self-resources management, including computer network infrastructure, electronic systems and platforms, and workflow automation—improving performance efficiency, advancing digital services, and providing a complete electronic experience for beneficiaries."
  ],
  ["عميل من القطاع غير الربحي", "Non-profit sector client"],
  ["القطاع غير الربحي", "Non-profit sector"],
  [
    "وقف خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز - رحمه الله -",
    "King Abdullah bin Abdulaziz Endowment for the Two Holy Mosques — may God have mercy on him —"
  ],
  [
    "نفخر في مؤسسة بياناتك لتقنية المعلومات بمشاركتنا في تنفيذ أحد المشاريع التقنية المتميزة لصالح وقف خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز - رحمه الله -، والذي شمل تصميم وتنفيذ البنية التحتية لشبكة الحاسب الآلي، وأنظمة المراقبة الأمنية، وتطوير البرامج والأنظمة الإدارية وفق أعلى المعايير التقنية.",
    "At Bayanatech, we are proud to have contributed to one of the distinguished technical projects for the King Abdullah bin Abdulaziz Endowment for the Two Holy Mosques — may God have mercy on him — covering the design and implementation of computer network infrastructure, security surveillance systems, and the development of administrative software and systems to the highest technical standards."
  ],
  ["صديق فارسي القابضة، عميل الدعم الفني", "Sadeeq Farsi Holding, technical support client"],
  ["الشركات", "Enterprises"],
  ["شركة فارسي القابضة", "Farsi Holding Company"],
  [
    "تشرفت مؤسسة بياناتك لتقنية المعلومات بتنفيذ مشروع البنية التحتية التقنية لشركة فارسي القابضة، والذي شمل إنشاء شبكات الحاسب الآلي، وتجهيز الخوادم، وربط الفروع بشبكة لاسلكية موحدة وآمنة. واستمرارًا لشراكتنا، قدمنا خدمات الدعم الفني والصيانة المتخصصة لمدة سبع سنوات، بما ساهم في استقرار بيئة العمل التقنية وضمان استمرارية العمليات بكفاءة عالية.",
    "Bayanatech was honored to deliver the technical infrastructure project for Farsi Holding Company, including computer networks, server provisioning, and connecting branches through a unified, secure wireless network. Continuing our partnership, we provided specialized technical support and maintenance services for seven years, helping stabilize the technical work environment and ensure operational continuity at high efficiency."
  ],
  ["شركاء النجاح", "Success partners"],
  ["عملاء اختارونا شريكاً تقنياً", "Clients who chose us as their technology partner"],
  [
    "نفخر بثقة عملائنا الذين اختارونا شريكاً تقنياً لتنفيذ وإدارة مشاريعهم التقنية.",
    "We are proud of the trust of clients who chose us as their technology partner to deliver and manage their IT projects."
  ],
  ["وقف الملك عبدالله", "King Abdullah Endowment"],
  ["فارسي القابضة", "Farsi Holding"],
  ["وزارة الصحة", "Ministry of Health"],
  ["منازلي للفنادق", "Manazeli Hotels"],
  ["مكارم المدينة", "Makarem Al Madinah"],
  ["مجموعة الشهباء", "Al Shahba Group"],
  ["جمعية التنمية الأسرية (أسرتي)", "Osraty Family Development"],
  ["مجموعة د. عبد الرحمن العقالي الطبية", "Dr. Abdulrahman Al-Ogaly Medical Group"],
  ["شركة مصنع مياه عذبة", "Azbah Water Factory"],
  ["فندق جوهرة الرشيد", "Jawharat Al-Rasheed Hotel"],
  ["مركز البيان لتدبر معاني القرآن", "Al-Bayan Quran Center"],
  ["مأرز العقارية", "Marz Real Estate"],
  ["أسرتي", "Osraty"],
  ["تمنكو", "TMNCO"],
  ["طراز المعماريون", "Terraze"],
  ["الاختبارات", "Ektbarat"],
  ["المحدد", "AL Mohadded"],
  ["أماكن", "Amakin"],
  ["أبعاد", "Dimensions"],
  ["الإحتراف", "Professionalism"],
  ["نوافذ الهندسة", "Engineering Windows"],
  ["رواسم", "Rawasem"],
  ["مكتب الحكمي", "Hakami"],
  ["القطاع التعليمي", "Education sector"],
  ["المنشآت التجارية", "Commercial enterprises"],
  ["شهادات نعتز بها", "Testimonials we value"],
  ["قالوا عنا", "What they say about us"],
  [
    "كلمات من شركاء وثقوا ببياناتك لتطوير بنيتهم التقنية ودعم أعمالهم.",
    "Words from partners who trusted Bayanatech to develop their technology infrastructure and support their business."
  ],
  ["الشهادة الأولى", "Testimonial 1"],
  ["الشهادة الثانية", "Testimonial 2"],
  ["الشهادة الثالثة", "Testimonial 3"],
  ["الشهادة الرابعة", "Testimonial 4"],
  ["الشهادة الخامسة", "Testimonial 5"],
  ["الشهادة السادسة", "Testimonial 6"],
  ["الشهادة السابعة", "Testimonial 7"],
  ["الشهادة الثامنة", "Testimonial 8"],
  ["الشهادة السابقة", "Previous testimonial"],
  ["الشهادة التالية", "Next testimonial"],
  ["شعار وقف الملك عبدالله", "King Abdullah Endowment logo"],
  ["علي محمد القرشي الزهراني", "Ali Mohammed Al-Qurashi Al-Zahrani"],
  ["مدير إدارة الخدمات المساندة", "Director of Support Services"],
  [
    "يتقدم وقف خادم الحرمين الشريفين الملك عبدالله بن عبدالعزيز لوالديه بجزيل الشكر والتقدير لمؤسسة بياناتك لتقنية المعلومات على ما بذلوه من مجهود رائع كان له الأثر الفعال في تطوير البنية التحتية لشبكة الحاسب الآلي ونظم المعلومات، مع تمنياتي لهم بالمزيد من التقدم والنجاح.",
    "The Endowment of the Custodian of the Two Holy Mosques King Abdullah bin Abdulaziz for his parents extends sincere thanks and appreciation to Bayanatech for their outstanding effort, which had a clear impact on developing the computer network and information systems infrastructure—wishing them continued progress and success."
  ],
  ["شعار صديق فارسي القابضة", "Sadeeq Farsi Holding logo"],
  ["الدكتور صالح بن صديق فارسي", "Dr. Saleh bin Sadeeq Farsi"],
  ["الرئيس التنفيذي", "Chief Executive Officer"],
  [
    "تتقدم شركة صديق صالح فارسي القابضة بخالص الشكر والتقدير لمؤسسة بياناتك لتقنية المعلومات على جهودهم المبذولة في بناء شبكة الحاسب الآلي وما تميزوا به من دعم فني على مدى سبع سنوات، سائلين المولى عز وجل أن يجعل ذلك في ميزان حسناتهم.",
    "Sadeeq Saleh Farsi Holding extends sincere thanks and appreciation to Bayanatech for their efforts in building the computer network and for their distinguished technical support over seven years—asking God to reward them for their work."
  ],
  ["شعار مجموعة منازلي", "Manazeli Group logo"],
  ["جهاد عبدالرحمن ناظر", "Jihad Abdulrahman Nazer"],
  ["رئيس مجلس الإدارة", "Chairman of the Board"],
  [
    "تشهد شركة منازلي للفنادق بأن مؤسسة بياناتك لتقنية المعلومات قامت بتركيب البنية التحتية لشبكات الحاسب والربط من خلال التقنية اللاسلكية لفنادق المجموعة وتقديم الدعم الفني اللازم، مما ساهم في إنجاز المشروع على الوجه الأكمل.",
    "Manazeli Hotels certifies that Bayanatech installed computer network infrastructure and wireless connectivity for the group’s hotels and provided the required technical support—helping complete the project successfully."
  ],
  ["شعار مجموعة الشهباء", "Al Shahba Group logo"],
  ["الدكتور سعد عبدالله العويضي", "Dr. Saad Abdullah Al-Owaidi"],
  [
    "كل الشكر والتقدير لمؤسسة بياناتك لتقنية المعلومات على ما قاموا به من جهود مميزة في تركيب شبكات الحاسب الآلي والربط الإلكتروني بين الفنادق، وتقديم الدعم الفني لأكثر من ثماني سنوات. نتمنى لهم دوام التوفيق والنجاح.",
    "All thanks and appreciation to Bayanatech for their outstanding efforts in installing computer networks and electronic connectivity between hotels, and for providing technical support for more than eight years. We wish them continued success."
  ],
  ["شعار مجموعة مكارم المدينة الفندقية", "Makarem Al Madinah Hospitality Group logo"],
  ["نايف زيني محمد عارف", "Naif Zaini Mohammed Aref"],
  [
    "تشهد مجموعة مكارم المدينة الفندقية بأن مؤسسة بياناتك لتقنية المعلومات قامت بخدمات الربط الإلكتروني عبر تقنية الشبكات اللاسلكية وتقديم الدعم الفني، فلهم جزيل الشكر والتقدير على جهودهم الطيبة.",
    "Makarem Al Madinah Hospitality Group certifies that Bayanatech provided electronic connectivity via wireless networking and technical support—with sincere thanks and appreciation for their fine efforts."
  ],
  [
    "شعار وزارة الصحة، المديرية العامة للشؤون الصحية بمنطقة المدينة المنورة",
    "Ministry of Health, General Directorate of Health Affairs in Madinah Region logo"
  ],
  ["بليغ بن محمد سطيح", "Baligh bin Muhammad Satih"],
  ["مدير إدارة الموارد الذاتية", "Director of Self-Resources Management"],
  [
    "تشكر المديرية العامة للشؤون الصحية بمنطقة المدينة المنورة ممثلة في إدارة الموارد الذاتية مؤسسة بياناتك لتقنية المعلومات على أدائها المتميز في تطوير نظام تكامل لإدارة الموارد الذاتية وذلك للعام الثالث على التوالي. متمنين لهم المزيد من التقدم والإبداع.",
    "The General Directorate of Health Affairs in Madinah Region, represented by the Self-Resources Management Department, thanks Bayanatech for its distinguished performance in developing the Takamol system for self-resources management—for the third consecutive year. Wishing them further progress and creativity."
  ],
  ["شعار شركة مصنع مياه عذبة", "Azbah Water Factory logo"],
  ["محمد ماجد النزاوي", "Mohammed Majed Al-Nazzawi"],
  ["المدير التنفيذي – شركة مصنع مياه عذبة", "Chief Executive Officer – Azbah Water Factory"],
  [
    "نفذت مؤسسة بياناتك لتقنية المعلومات مشروعًا متكاملًا للبنية التحتية التقنية لشركة مصنع مياه عذبة، شمل تصميم وتنفيذ شبكات الحاسب الآلي، وتجهيز وإعداد الخوادم (Servers)، وتركيب نظام السنترال، وربط الفروع عبر شبكة اتصال موحدة وآمنة، بالإضافة إلى تكامل أجهزة الحضور والانصراف مع المركز الرئيسي، بما أسهم في تعزيز كفاءة التشغيل، وتوحيد إدارة الأنظمة، وضمان استمرارية الأعمال.",
    "Bayanatech delivered an integrated technical infrastructure project for Azbah Water Factory, covering the design and implementation of computer networks, server provisioning and configuration, PBX installation, and branch connectivity over a unified, secure network—along with integrating attendance devices with headquarters. The project improved operational efficiency, unified systems management, and ensured business continuity."
  ],
  ["شعار مجموعة د. عبد الرحمن العقالي الطبية", "Dr. Abdulrahman Al-Ogaly Medical Group logo"],
  ["محمد محمود نافع", "Mohammed Mahmoud Nafe"],
  [
    "مدير التخطيط والتطوير – مجموعة د. عبد الرحمن العقالي الطبية",
    "Director of Planning and Development – Dr. Abdulrahman Al-Ogaly Medical Group"
  ],
  [
    "نفذت شركة بياناتك لتقنية المعلومات مشروعًا متكاملًا لتطوير البنية التحتية التقنية لجميع فروع مجموعة د. عبد الرحمن العقالي الطبية، شمل تصميم وتنفيذ شبكات الحاسب الآلي، وتجهيز وإعداد الخوادم، وإنشاء الشبكات المحلية، وربط الفروع عبر شبكة اتصال لاسلكية آمنة وموثوقة. وقد أسهم المشروع في تعزيز كفاءة البنية التقنية، وتحسين الاتصال بين الفروع، ودعم استمرارية الأعمال ورفع كفاءة الأداء التشغيلي.",
    "Bayanatech delivered an integrated project to modernize the technical infrastructure across every branch of Dr. Abdulrahman Al-Ogaly Medical Group, covering the design and implementation of computer networks, server provisioning and configuration, local network build-out, and branch connectivity over a secure, reliable wireless network. The project strengthened the technical foundations, improved connectivity between branches, and supported business continuity and operational performance."
  ],
  ["هل لديك مشروع أو احتياج تقني؟", "Have a project or technology need?"],
  [
    "فريقنا جاهز لمساعدتك في اختيار الحل المناسب وتقديم عرض فني ومالي يناسب متطلبات منشأتك.",
    "Our team is ready to help you choose the right solution and provide a technical and commercial quote that fits your organization’s needs."
  ],
  ["اتصل بنا", "Call us"],
  ["تواصل عبر", "Reach us on"],
  ["الاسم", "Name"],
  ["يرجى إدخال الاسم.", "Please enter your name."],
  ["اسم المنشأة", "Organization name"],
  ["رقم الجوال", "Mobile number"],
  ["يرجى إدخال رقم التواصل.", "Please enter a contact number."],
  ["الخدمة المطلوبة", "Required service"],
  ["اختر الخدمة", "Select a service"],
  ["الشبكات اللاسلكية", "Wireless networks"],
  ["السنترالات", "PBX systems"],
  ["أمن المعلومات", "Information security"],
  ["عقود الصيانة", "Maintenance contracts"],
  ["يرجى اختيار الخدمة.", "Please select a service."],
  ["كيف يمكننا مساعدتك؟", "How can we help you?"],
  ["يرجى إكمال التحقق.", "Please complete verification."],
  ["إرسال الطلب", "Submit request"],
  ["بياناتك محفوظة ولن تتم مشاركتها", "Your data is secure and will not be shared"],
  ["تم استلام طلبك بنجاح، وسنتواصل معك قريباً.", "Your request was received successfully. We will contact you soon."],
  ["تعذّر الإرسال. حاول مرة أخرى.", "Could not send. Please try again."],
  [
    "حلول تقنية متكاملة للشبكات والسيرفرات وكاميرات المراقبة وأمن المعلومات والدعم الفني.",
    "Integrated technology solutions for networks, servers, surveillance cameras, information security, and technical support."
  ],
  [
    "شريك موثوق للتحول الرقمي وحلول تقنية المعلومات للشركات في المملكة العربية السعودية.",
    "A trusted digital transformation and IT solutions partner for businesses in Saudi Arabia."
  ],
  ["استكشف", "Explore"],
  [
    "شارع خالدة بنت الأسود، حي طيبة، مقابل جامعة طيبة",
    "Khalidah bint Al-Aswad St., Taybah District, opposite Taibah University"
  ],
  ["السبت - الخميس 09:00 - 19:00", "Saturday – Thursday, 09:00 – 19:00"],
  [
    "جميع الحقوق محفوظة ©2026 لمؤسسة بياناتك لتقنية المعلومات",
    "©2026 Bayanatech for Information Technology. All rights reserved."
  ],
  ["المدينة المنورة، المملكة العربية السعودية", "Madinah, Kingdom of Saudi Arabia"],
  ['alt="بياناتك Bayanatech"', 'alt="Bayanatech"'],
  [
    "نظام ERP سحابي متكامل لإدارة المكاتب الهندسية وشركات المقاولات مالياً وإدارياً وفنياً من منصة واحدة.",
    "An integrated cloud ERP for managing engineering offices and contracting companies—financially, administratively, and technically—from one platform."
  ],
  ["تعمير السحابي", "Tameer Cloud"],
  ["شعار تعمير السحابي", "Tameer Cloud logo"],
  ["كل ما تحتاجه لإدارة أعمالك في مكان واحد", "Everything you need to run your business in one place"],
  [
    "يركز تعمير السحابي على أهداف المشروع ومتطلبات العميل والمدة والتكلفة، ويجمع إدارة المشاريع والحسابات والموارد البشرية في نظام واحد سهل الاستخدام.",
    "Tameer Cloud focuses on project goals, client requirements, timeline, and cost—bringing project management, accounting, and HR together in one easy-to-use system."
  ],
  [
    "إدارة متخصصة للمشاريع الهندسية تشمل توزيع المهام، ومتابعة المراحل، ومخططات جانت، وسير العمل، والإشعارات، ومؤشرات الأداء.",
    "Specialized engineering project management including task assignment, stage tracking, Gantt charts, workflows, notifications, and KPIs."
  ],
  ["استكشف إدارة المشاريع", "Explore project management"],
  ["الحسابات والفوترة", "Accounting & invoicing"],
  [
    "نظام محاسبة وفوترة إلكترونية متكامل لإدارة المبيعات والمشتريات والضرائب والرواتب، مع تقارير مالية ومتابعة ربحية المشاريع.",
    "An integrated accounting and e-invoicing system for sales, purchasing, tax, and payroll—with financial reports and project profitability tracking."
  ],
  ["استكشف النظام المحاسبي", "Explore the accounting system"],
  [
    "أتمتة شؤون الموظفين من الحضور والانصراف والإجازات والموافقات إلى مسير الرواتب والعقود والملفات، مع خدمات ذاتية عبر الجوال.",
    "Automate HR from attendance, leave, and approvals to payroll, contracts, and files—with self-service on mobile."
  ],
  ["استكشف الموارد البشرية", "Explore human resources"],
  ["أرقام تعكس الثقة", "Numbers that reflect trust"],
  ["خبرة واسعة ونظام ينمو مع أعمالك", "Deep experience and a system that grows with your business"],
  [
    "حل محاسبي وإداري موثوق يخدم آلاف المنشآت والمستخدمين في المملكة.",
    "A trusted accounting and management solution serving thousands of organizations and users across the Kingdom."
  ],
  ['aria-label="إحصائيات تعمير السحابي"', 'aria-label="Tameer Cloud statistics"'],
  ["منشأة سعودية", "Saudi organizations"],
  ["عاماً في السوق", "Years in the market"],
  ["مشروع ناجح", "Successful projects"],
  ["عميل راضي", "Satisfied clients"],
  [">سنة</", ">Years</"],
  ["عملية محاسبية", "Accounting transactions"],
  ["مستخدم شهرياً", "Monthly users"],
  ["جاهز لمتطلبات الفوترة الإلكترونية", "Ready for e-invoicing requirements"],
  [
    "يساعدك تعمير السحابي على إدارة الفواتير والعمليات المحاسبية بما يتوافق مع متطلبات هيئة الزكاة والضريبة والجمارك.",
    "Tameer Cloud helps you manage invoices and accounting operations in line with ZATCA requirements."
  ],
  ["اكتشف جميع إمكانات تعمير السحابي", "Discover all Tameer Cloud capabilities"],
  [
    "للمزيد من المعلومات حول النظام ومميزاته، تفضل بزيارة الموقع الرسمي لتعمير السحابي.",
    "For more information about the system and its features, visit the official Tameer Cloud website."
  ],
  ["زيارة موقع تعمير السحابي", "Visit Tameer Cloud website"],
  ["القائمة", "Menu"],
  ["الرئيسية", "Home"],
  ["إغلاق", "Close"]
];

// Sort by Arabic length descending so longer phrases win
phrases.sort((a, b) => b[0].length - a[0].length);

function normalizeWhitespaceForMatch(html) {
  // Collapse runs of whitespace inside text nodes is hard; instead collapse
  // newlines+spaces between Arabic words when looking up remaining tokens later.
  return html;
}

function convertArToEn(html) {
  let out = html;

  out = out.replace(/<!doctype html>/i, "<!DOCTYPE html>");
  out = out.replace(/lang="ar"/, 'lang="en"');
  out = out.replace(/dir="rtl"/, 'dir="ltr"');
  out = out.replace(
    /family=IBM\+Plex\+Sans\+Arabic:wght@400;500;600;700&family=Plus\+Jakarta\+Sans:wght@400;500;600;700/g,
    "family=Plus+Jakarta+Sans:wght@400;500;600;700"
  );
  out = out.replace(/bootstrap\.rtl\.min\.css/g, "bootstrap.min.css");
  out = out.replace(/offcanvas-start/g, "offcanvas-end");

  // Language switch
  out = out.replace(/href="\.\.\/en\//g, 'href="../ar/');
  out = out.replace(/data-switch-lang="en"/g, 'data-switch-lang="ar"');
  out = out.replace(/hreflang="en"/g, 'hreflang="ar"');
  out = out.replace(/>English</g, ">العربية<");

  // Collapse whitespace variants of Arabic phrases for matching:
  // replace multi-line Arabic text by normalizing spaces in source first.
  // Build a whitespace-flexible regex for each phrase.
  for (const [ar, en] of phrases) {
    if (out.includes(ar)) {
      out = out.split(ar).join(en);
      continue;
    }
    // Flexible whitespace match for multiline AR fragments
    const flexible = ar
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\s+/g, "\\s+");
    out = out.replace(new RegExp(flexible, "g"), en);
  }

  // Product metrics: Arabic spells the unit out next to the number ("22+ ألف"),
  // English folds it into a compact suffix ("22K+").
  out = out.replace(
    /(<span data-counter="\d+" data-digits="latn") data-suffix="\+">0<\/span>\s*<span class="metric-unit">(ألف|مليون)<\/span>/g,
    (match, head, unit) =>
      `${head} data-suffix="${unit === "ألف" ? "K+" : "M+"}">0</span>`
  );

  // LTR arrow directions
  out = out.replace(/bi-arrow-left/g, "bi-arrow-right");
  out = out.replace(/bi-arrow-up-left/g, "bi-arrow-up-right");
  out = out.replace(/bi-box-arrow-up-left/g, "bi-box-arrow-up-right");
  // Icon after text: RTL me-2 → LTR ms-2 (common pattern in CTAs)
  out = out.replace(/(\s)<i class="bi bi-arrow-right me-2"/g, '$1<i class="bi bi-arrow-right ms-2"');
  out = out.replace(/(\s)<i class="bi bi-box-arrow-up-right me-2"/g, '$1<i class="bi bi-box-arrow-up-right ms-2"');

  const remaining = out.match(/[\u0600-\u06FF]+/g);
  return {
    out,
    remaining: remaining
      ? [...new Set(remaining)].filter((t) => t !== "العربية")
      : []
  };
}

for (const file of ["index.html", "products.html"]) {
  const arPath = path.join(ROOT, "ar", file);
  const enPath = path.join(ROOT, "en", file);
  const html = fs.readFileSync(arPath, "utf8");
  const { out, remaining } = convertArToEn(html);
  fs.writeFileSync(enPath, out, "utf8");
  console.log(`Wrote en/${file} (${out.split(/\n/).length} lines)`);
  if (remaining.length) console.log("  Remaining AR:", remaining.join(", "));
  else console.log("  Clean (only العربية lang switch expected)");
}
