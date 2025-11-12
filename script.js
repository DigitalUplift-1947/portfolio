document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio website loaded");
    const elements = {
        youtubeBtn: document.getElementById('youtube-btn'),
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),
        mainHeader: document.getElementById('main-header'),
        contactForm: document.getElementById('contact-form'),
        messageModal: document.getElementById('message-modal'),
        modalMessage: document.getElementById('modal-message'),
        closeModalBtn: document.getElementById('close-modal-btn'),
        submitBtn: document.getElementById('submit-btn'),
        nameInput: document.getElementById('name'),
        emailInput: document.getElementById('email'),
        messageInput: document.getElementById('message'),
        captchaCheckbox: document.getElementById('not-a-bot'),
        nameError: document.getElementById('name-error'),
        emailError: document.getElementById('email-error'),
        messageError: document.getElementById('message-error'),
        captchaError: document.getElementById('captcha-error'),
        backToTopBtn: document.getElementById('back-to-top'),
        sections: document.querySelectorAll('.animated-section'),
        navLinks: document.querySelectorAll('header nav ul li a'),
        toggleButtons: document.querySelectorAll('.toggle-details'),
        changingText: document.getElementById('changing-text'),
        themeToggleCheckbox: document.getElementById('toggle-checkbox'),
        langToggle: document.getElementById('lang-toggle'),
        langDropdown: document.getElementById('lang-dropdown'),
        langOptions: document.querySelectorAll('.lang-option'),
        parallaxBackground: document.querySelector('.parallax-background'),
        loadingScreen: document.getElementById('loading-screen'),
        welcomeOverlay: document.getElementById('welcome-overlay'),
        welcomeBtn: document.getElementById('welcome-btn'),
        welcomeSound: document.getElementById('welcome-sound'),
        mainContent: document.querySelector('main'),
        headerElement: document.querySelector('header'),
        socialIcons: document.querySelectorAll('.social-icon'),
        imageModal: document.getElementById('image-modal'),
        largeImage: document.getElementById('large-image'),
        closeImageModal: document.getElementById('close-image-modal')
    };
    const lucideScript = document.createElement('script');
    lucideScript.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    document.head.appendChild(lucideScript);
    lucideScript.onload = () => {
        lucide.createIcons();
    };
    let lastScrollY = window.scrollY;
    let lastSubmissionTime = 0;
    const submissionCooldown = 30000;
    let scrollTimeout;
    let typingInterval;
    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-experience': 'Experience',
            'nav-certifications': 'Certifications',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'home-hello': 'Hello',
            'explore-certifications': 'Explore My Certifications',
            'join-me': 'Join me in mastering digital skills for a brighter future!',
            'about-title': 'About Me',
            'about-para1': 'I combine skills in AI tools, prompt engineering, and cybersecurity with experience in digital marketing and content creation. Currently pursuing <span class="text-[var(--primary-color)]">Bachelor of Business Information Systems (BBIS)</span>, University of Management and Technology – Ongoing (Expected 2027).',
            'about-para2': 'Through my YouTube channel <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>, I empower over <span class="text-[var(--primary-color)]">177 million Pakistanis</span> lacking digital skills with weekly videos offering practical tips.',
            'about-para3': 'Driven by curiosity and a commitment to learning, I’m adaptable, creative, and passionate about simplifying complex ideas.',
            'skills-title': 'Skills & Expertise',
            'skill-ai': 'AI Tools',
            'skill-python': 'Python',
            'skill-cyber': 'Cybersecurity',
            'skill-marketing': 'Digital Marketing',
            'skill-youtube': 'YouTube Creation',
            'skill-bilingual': 'Bilingual Communication',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>Visit My YouTube Channel',
            'experience-title': 'Professional Experience',
            'exp-ai-strategist': 'AI & Content Strategist',
            'badge-personal': 'Personal Project',
            'exp-digital-dates': 'Digital Uplift | 2020 – Present',
            'exp-ai-bullet1': 'Produced tech-focused YouTube content, growing audience by 25% annually.',
            'exp-ai-bullet2': 'Developed creative scripts using prompt engineering, enhancing engagement.',
            'exp-ai-bullet3': 'Handled end-to-end video production with Adobe Premiere Pro.',
            'exp-internships': 'Internships',
            'badge-multiple': 'Multiple Roles',
            'exp-various-dates': 'Various Organizations | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum Hospital (Marketing & HR Intern, 2023–2024): Boosted event participation by 15% and streamlined recruitment.',
            'exp-intern2': 'TX Labz (HR Intern, 2022): Optimized onboarding, reducing processing time by 20%.',
            'exp-intern3': 'Med Coach Global (Social Media Intern, 2025–Present): Increased social media engagement by 30%.',
            'exp-intern4': 'NGO Experience (Alkhimat Foundation & ILM): Coordinated community projects and outreach.',
            'cert-title': 'Certifications',
            'cert-prompt-eng': 'Prompt Engineering and Prompting Essentials',
            'issued-by-google': 'Issued by Google',
            'cert-google-ai': 'Google AI Essentials',
            'issued-by-linkedin': 'Issued by LinkedIn',
            'cert-linkedin-ai': 'LinkedIn AI Essentials',
            'issued-by-itu': 'Issued by ITU',
            'cert-python': 'Python Programming Course',
            'issued-by-ibm': 'Issued by IBM',
            'cert-marketing': 'Digital Marketing Course',
            'cert-cyber': 'Cybersecurity Course',
            'projects-title': 'Projects',
            'visit-project': 'Visit Project',
            'view-credential': 'View Credential →',
            'contact-title': 'Get in Touch',
            'form-name': 'Name',
            'error-name': 'Name must be 2-50 characters and contain only letters, spaces, or hyphens.',
            'form-email': 'Email',
            'error-email': 'Please enter a valid email address.',
            'form-message': 'Message',
            'error-message': 'Message must be 10-500 characters and cannot contain special characters.',
            'form-not-bot': "I'm not a bot",
            'error-captcha': 'Please check this box to verify.',
            'send-message': 'Send Message',
            'social-text': 'Find me on social media:',
            'direct-text': 'Or contact me directly:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>Chat on WhatsApp',
            'download-resume': '<i class="fas fa-download mr-2"></i>Download Resume',
            'modal-sent': 'Message Sent!',
            'modal-thanks': 'Thank you for your message!',
            'close-btn': 'Close',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. All Rights Reserved.',
            'loading-text': 'Loading Portfolio...',
            'welcome-text': "Let's have a look at my portfolio!",
            'enter-btn': 'Enter',
            'lang-en': 'English',
            'lang-fr': 'Français',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-zh': '中文'
        },
        fr: {
            'nav-home': 'Accueil',
            'nav-about': 'À propos',
            'nav-experience': 'Expérience',
            'nav-certifications': 'Certifications',
            'nav-projects': 'Projets',
            'nav-contact': 'Contact',
            'home-hello': 'Bonjour',
            'explore-certifications': 'Explorer Mes Certifications',
            'join-me': 'Rejoignez-moi pour maîtriser les compétences numériques pour un avenir plus lumineux !',
            'about-title': 'À Propos de Moi',
            'about-para1': 'J\'combine des compétences en outils IA, ingénierie de prompts et cybersécurité avec une expérience en marketing numérique et création de contenu. Actuellement en poursuite de <span class="text-[var(--primary-color)]">Licence en Systèmes d\'Information Commerciale (BBIS)</span>, Université de Gestion et Technologie – En cours (Prévu 2027).',
            'about-para2': 'À travers ma chaîne YouTube <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>, j\'empower plus de <span class="text-[var(--primary-color)]">177 millions de Pakistanais</span> manquant de compétences numériques avec des vidéos hebdomadaires offrant des conseils pratiques.',
            'about-para3': 'Animé par la curiosité et l\'engagement envers l\'apprentissage, je suis adaptable, créatif et passionné par la simplification d\'idées complexes.',
            'skills-title': 'Compétences et Expertise',
            'skill-ai': 'Outils IA',
            'skill-python': 'Python',
            'skill-cyber': 'Cybersécurité',
            'skill-marketing': 'Marketing Numérique',
            'skill-youtube': 'Création YouTube',
            'skill-bilingual': 'Communication Bilingue',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>Visiter Ma Chaîne YouTube',
            'experience-title': 'Expérience Professionnelle',
            'exp-ai-strategist': 'Stratège IA et Contenu',
            'badge-personal': 'Projet Personnel',
            'exp-digital-dates': 'Digital Uplift | 2020 – Présent',
            'exp-ai-bullet1': 'Produit du contenu YouTube axé sur la tech, augmentant l\'audience de 25% annuellement.',
            'exp-ai-bullet2': 'Développé des scripts créatifs utilisant l\'ingénierie de prompts, améliorant l\'engagement.',
            'exp-ai-bullet3': 'Géré la production vidéo de bout en bout avec Adobe Premiere Pro.',
            'exp-internships': 'Stages',
            'badge-multiple': 'Multiples Rôles',
            'exp-various-dates': 'Diverses Organisations | 2022 – 2026',
            'exp-intern1': 'Hôpital Shaukat Khanum (Stage Marketing et RH, 2023–2024) : Augmenté la participation aux événements de 15% et rationalisé le recrutement.',
            'exp-intern2': 'TX Labz (Stage RH, 2022) : Optimisé l\'onboarding, réduisant le temps de traitement de 20%.',
            'exp-intern3': 'Med Coach Global (Stage Réseaux Sociaux, 2025–Présent) : Augmenté l\'engagement sur les réseaux sociaux de 30%.',
            'exp-intern4': 'Expérience ONG (Alkhimat Foundation et ILM) : Coordonnés des projets communautaires et outreach.',
            'cert-title': 'Certifications',
            'cert-prompt-eng': 'Ingénierie de Prompts et Essentiels de Prompting',
            'issued-by-google': 'Délivré par Google',
            'cert-google-ai': 'Essentiels IA Google',
            'issued-by-linkedin': 'Délivré par LinkedIn',
            'cert-linkedin-ai': 'Essentiels IA LinkedIn',
            'issued-by-itu': 'Délivré par ITU',
            'cert-python': 'Cours de Programmation Python',
            'issued-by-ibm': 'Délivré par IBM',
            'cert-marketing': 'Cours de Marketing Digital',
            'cert-cyber': 'Cours de Cybersécurité',
            'projects-title': 'Projets',
            'visit-project': 'Visiter le Projet',
            'view-credential': 'Voir la Certification →',
            'contact-title': 'Prenez Contact',
            'form-name': 'Nom',
            'error-name': 'Le nom doit avoir 2-50 caractères et contenir seulement des lettres, espaces ou tirets.',
            'form-email': 'Email',
            'error-email': 'Veuillez entrer une adresse email valide.',
            'form-message': 'Message',
            'error-message': 'Le message doit avoir 10-500 caractères et ne pas contenir de caractères spéciaux.',
            'form-not-bot': 'Je ne suis pas un bot',
            'error-captcha': 'Veuillez cocher cette case pour vérifier.',
            'send-message': 'Envoyer le Message',
            'social-text': 'Trouvez-moi sur les réseaux sociaux :',
            'direct-text': 'Ou contactez-moi directement :',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>Chatter sur WhatsApp',
            'download-resume': '<i class="fas fa-download mr-2"></i>Télécharger le CV',
            'modal-sent': 'Message Envoyé !',
            'modal-thanks': 'Merci pour votre message !',
            'close-btn': 'Fermer',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. Tous droits réservés.',
            'loading-text': 'Chargement du Portafolio...',
            'welcome-text': 'Regardons mon portafolio !',
            'enter-btn': 'Entrer',
            'lang-en': 'English',
            'lang-fr': 'Français',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-zh': '中文'
        },
        ar: {
            'nav-home': 'الرئيسية',
            'nav-about': 'حول',
            'nav-experience': 'الخبرة',
            'nav-certifications': 'الشهادات',
            'nav-projects': 'المشاريع',
            'nav-contact': 'الاتصال',
            'home-hello': 'مرحبا',
            'explore-certifications': 'استكشف شهاداتي',
            'join-me': 'انضم إلي في إتقان المهارات الرقمية لمستقبل أكثر إشراقًا!',
            'about-title': 'عني',
            'about-para1': 'أجمع بين مهارات أدوات الذكاء الاصطناعي وهندسة التلقيح وأمن المعلومات مع خبرة في التسويق الرقمي وإنشاء المحتوى. حاليًا أتابع <span class="text-[var(--primary-color)]">بكالوريوس أنظمة المعلومات التجارية (BBIS)</span>، جامعة الإدارة والتكنولوجيا – قيد التقدم (متوقع 2027).',
            'about-para2': 'من خلال قناتي على يوتيوب <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>، أمكن أكثر من <span class="text-[var(--primary-color)]">177 مليون باكستاني</span> يفتقرون إلى المهارات الرقمية من خلال فيديوهات أسبوعية تقدم نصائح عملية.',
            'about-para3': 'مدفوعًا بالفضول والالتزام بالتعلم, أنا قابل للتكيف, مبدع, ومتحمس لتبسيط الأفكار المعقدة.',
            'skills-title': 'المهارات والخبرة',
            'skill-ai': 'أدوات الذكاء الاصطناعي',
            'skill-python': 'بايثون',
            'skill-cyber': 'أمن المعلومات',
            'skill-marketing': 'التسويق الرقمي',
            'skill-youtube': 'إنشاء يوتيوب',
            'skill-bilingual': 'التواصل الثنائي اللغة',
            'skill-github': 'غيت هاب',
            'skill-netlify': 'نتفلای',
            'skill-premiere': 'بريمير برو',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>زيارة قناتي على يوتيوب',
            'experience-title': 'الخبرة المهنية',
            'exp-ai-strategist': 'استراتيجي الذكاء الاصطناعي والمحتوى',
            'badge-personal': 'مشروع شخصي',
            'exp-digital-dates': 'رفع رقمي | 2020 – الحاضر',
            'exp-ai-bullet1': 'أنتجت محتوى يوتيوب يركز على التكنولوجيا, نمو الجمهور بنسبة 25% سنويًا.',
            'exp-ai-bullet2': 'طورت نصوصًا إبداعية باستخدام هندسة التلقيح, تعزيز التفاعل.',
            'exp-ai-bullet3': 'تعاملت مع إنتاج الفيديو من البداية إلى النهاية باستخدام أدوبي بريمير برو.',
            'exp-internships': 'تدريبات',
            'badge-multiple': 'أدوار متعددة',
            'exp-various-dates': 'منظمات متنوعة | 2022 – 2026',
            'exp-intern1': 'مستشفى شوكات خانوم (تدريب تسويق وموارد بشرية, 2023–2024): زيادة مشاركة الأحداث بنسبة 15% وتبسيط التوظيف.',
            'exp-intern2': 'TX Labz (تدريب موارد بشرية, 2022): تحسين الاندماج, تقليل وقت المعالجة بنسبة 20%.',
            'exp-intern3': 'Med Coach Global (تدريب وسائل التواصل الاجتماعي, 2025–الحاضر): زيادة التفاعل في وسائل التواصل بنسبة 30%.',
            'exp-intern4': 'تجربة منظمات غير حكومية (Alkhimat Foundation & ILM): تنسيق مشاريع المجتمع والتواصل.',
            'cert-title': 'شهادات',
            'cert-prompt-eng': 'هندسة التلقيح وأساسيات التلقيح',
            'issued-by-google': 'صدرت بواسطة غوغل',
            'cert-google-ai': 'أساسيات الذكاء الاصطناعي غوغل',
            'issued-by-linkedin': 'صدرت بواسطة لينكدإن',
            'cert-linkedin-ai': 'أساسيات الذكاء الاصطناعي لينكدإن',
            'issued-by-itu': 'صدرت بواسطة ITU',
            'cert-python': 'دورة برمجة بايثون',
            'issued-by-ibm': 'صدرت بواسطة IBM',
            'cert-marketing': 'دورة التسويق الرقمي',
            'cert-cyber': 'دورة أمن المعلومات',
            'projects-title': 'المشاريع',
            'visit-project': 'زيارة المشروع',
            'view-credential': 'عرض الاعتماد →',
            'contact-title': 'تواصل معي',
            'form-name': 'الاسم',
            'error-name': 'يجب أن يكون الاسم 2-50 حرفًا ويحتوي على حروف أو مسافات أو شرطات فقط.',
            'form-email': 'البريد الإلكتروني',
            'error-email': 'يرجى إدخال عنوان بريد إلكتروني صالح.',
            'form-message': 'الرسالة',
            'error-message': 'يجب أن تكون الرسالة 10-500 حرفًا ولا تحتوي على رموز خاصة.',
            'form-not-bot': 'أنا لست روبوتًا',
            'error-captcha': 'يرجى تحديد هذا المربع للتحقق.',
            'send-message': 'إرسال الرسالة',
            'social-text': 'ابحث عني على وسائل التواصل الاجتماعي:',
            'direct-text': 'أو اتصل بي مباشرة:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>دردشة على واتساب',
            'download-resume': '<i class="fas fa-download mr-2"></i>تحميل السيرة الذاتية',
            'modal-sent': 'تم إرسال الرسالة!',
            'modal-thanks': 'شكراً لرسالتك!',
            'close-btn': 'إغلاق',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. جميع الحقوق محفوظة.',
            'loading-text': 'جاري تحميل المحفظة...',
            'welcome-text': 'دعنا نلقي نظرة على محفظتي!',
            'enter-btn': 'دخول',
            'lang-en': 'English',
            'lang-fr': 'Français',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-zh': '中文'
        },
        hi: {
            'nav-home': 'घर',
            'nav-about': 'के बारे में',
            'nav-experience': 'अनुभव',
            'nav-certifications': 'प्रमाणपत्र',
            'nav-projects': 'परियोजनाएं',
            'nav-contact': 'संपर्क',
            'home-hello': 'नमस्ते',
            'explore-certifications': 'मेरे प्रमाणपत्रों का अन्वेषण करें',
            'join-me': 'मुझसे जुड़ें और एक उज्जवल भविष्य के लिए डिजिटल कौशल में महारत हासिल करें!',
            'about-title': 'मेरे बारे में',
            'about-para1': 'मैं AI टूल्स, प्रॉम्प्ट इंजीनियरिंग और साइबरसिक्योरिटी कौशल को डिजिटल मार्केटिंग और कंटेंट क्रिएशन अनुभव के साथ जोड़ता हूं। वर्तमान में प्रबंधन और प्रौद्योगिकी विश्वविद्यालय से <span class="text-[var(--primary-color)]">बिजनेस इंफॉर्मेशन सिस्टम्स बैचलर (BBIS)</span> का पीछा कर रहा हूं – चल रहा (अपेक्षित 2027)।',
            'about-para2': 'मेरे YouTube चैनल <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a> के माध्यम से, मैं डिजिटल कौशल की कमी वाले <span class="text-[var(--primary-color)]">177 मिलियन पाकिस्तानियों</span> को साप्ताहिक वीडियो के माध्यम से व्यावहारिक टिप्स प्रदान करके सशक्त बनाता हूं।',
            'about-para3': 'जिज्ञासा और सीखने के प्रति प्रतिबद्धता से प्रेरित, मैं अनुकूलनीय, रचनात्मक हूं और जटिल विचारों को सरल बनाने के लिए उत्साही हूं।',
            'skills-title': 'कौशल और विशेषज्ञता',
            'skill-ai': 'AI टूल्स',
            'skill-python': 'पायथन',
            'skill-cyber': 'साइबरसिक्योरिटी',
            'skill-marketing': 'डिजिटल मार्केटिंग',
            'skill-youtube': 'यूट्यूब क्रिएशन',
            'skill-bilingual': 'द्विभाषी संचार',
            'skill-github': 'गिटहब',
            'skill-netlify': 'नेटलीफाई',
            'skill-premiere': 'प्रिमियर प्रो',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>मेरा यूट्यूब चैनल देखें',
            'experience-title': 'व्यावसायिक अनुभव',
            'exp-ai-strategist': 'AI और कंटेंट स्ट्रैटेजिस्ट',
            'badge-personal': 'व्यक्तिगत प्रोजेक्ट',
            'exp-digital-dates': 'डिजिटल उन्नयन | 2020 – वर्तमान',
            'exp-ai-bullet1': 'टेक-फोकस्ड यूट्यूब कंटेंट बनाया, दर्शकों को सालाना 25% बढ़ाया।',
            'exp-ai-bullet2': 'प्रॉम्प्ट इंजीनियरिंग का उपयोग करके रचनात्मक स्क्रिप्ट विकसित की, संलग्नता बढ़ाई।',
            'exp-ai-bullet3': 'एडोबी प्रिमियर प्रो के साथ एंड-टू-एंड वीडियो प्रोडक्शन संभाला।',
            'exp-internships': 'इंटर्नशिप',
            'badge-multiple': 'मल्टीपल भूमिकाएं',
            'exp-various-dates': 'विभिन्न संगठन | 2022 – 2026',
            'exp-intern1': 'शौकत खानम अस्पताल (मार्केटिंग और HR इंटर्न, 2023–2024): इवेंट भागीदारी 15% बढ़ाई, भर्ती को सुव्यवस्थित किया।',
            'exp-intern2': 'TX लैब्ज (HR इंटर्न, 2022): ऑनबोर्डिंग को अनुकूलित किया, प्रोसेसिंग टाइम 20% कम किया।',
            'exp-intern3': 'मेड कोच ग्लोबल (सोशल मीडिया इंटर्न, 2025–वर्तमान): सोशल मीडिया संलग्नता 30% बढ़ाई।',
            'exp-intern4': 'एनजीओ अनुभव (अलखिमत फाउंडेशन और ILM): समुदाय परियोजनाओं और आउटरीच का समन्वय किया।',
            'cert-title': 'प्रमाणपत्र',
            'cert-prompt-eng': 'प्रॉम्प्ट इंजीनियरिंग और प्रॉम्प्टिंग एसेंशियल्स',
            'issued-by-google': 'गूगल द्वारा जारी',
            'cert-google-ai': 'गूगल AI एसेंशियल्स',
            'issued-by-linkedin': 'लिंक्डइन द्वारा जारी',
            'cert-linkedin-ai': 'लिंक्डइन AI एसेंशियल्स',
            'issued-by-itu': 'ITU द्वारा जारी',
            'cert-python': 'पायथन प्रोग्रामिंग कोर्स',
            'issued-by-ibm': 'IBM द्वारा जारी',
            'cert-marketing': 'डिजिटल मार्केटिंग कोर्स',
            'cert-cyber': 'साइबरसिक्योरिटी कोर्स',
            'projects-title': 'परियोजनाएं',
            'visit-project': 'परियोजना देखें',
            'view-credential': 'क्रेडेंशियल देखें →',
            'contact-title': 'संपर्क करें',
            'form-name': 'नाम',
            'error-name': 'नाम 2-50 अक्षरों का होना चाहिए और केवल अक्षर, स्पेस या हाइफन शामिल होने चाहिए।',
            'form-email': 'ईमेल',
            'error-email': 'कृपया वैध ईमेल पता दर्ज करें।',
            'form-message': 'संदेश',
            'error-message': 'संदेश 10-500 अक्षरों का होना चाहिए और विशेष वर्ण शामिल नहीं कर सकता।',
            'form-not-bot': 'मैं बॉट नहीं हूं',
            'error-captcha': 'कृपया सत्यापन के लिए इस बॉक्स को चेक करें।',
            'send-message': 'संदेश भेजें',
            'social-text': 'मुझे सोशल मीडिया पर खोजें:',
            'direct-text': 'या सीधे संपर्क करें:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>व्हाट्सएप पर चैट',
            'download-resume': '<i class="fas fa-download mr-2"></i>रिज्यूमे डाउनलोड करें',
            'modal-sent': 'संदेश भेज दिया गया!',
            'modal-thanks': 'आपके संदेश के लिए धन्यवाद!',
            'close-btn': 'बंद करें',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. सर्वाधिकार सुरक्षित।',
            'loading-text': 'पोर्टफोलियो लोड हो रहा है...',
            'welcome-text': 'मेरे पोर्टफोलियो पर नजर डालें!',
            'enter-btn': 'प्रवेश करें',
            'lang-en': 'English',
            'lang-fr': 'Français',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-zh': '中文'
        },
        zh: {
            'nav-home': '首页',
            'nav-about': '关于',
            'nav-experience': '经验',
            'nav-certifications': '证书',
            'nav-projects': '项目',
            'nav-contact': '联系',
            'home-hello': '你好',
            'explore-certifications': '探索我的证书',
            'join-me': '加入我，一起掌握数字技能,迎接更光明的未来！',
            'about-title': '关于我',
            'about-para1': '我结合AI工具、提示工程和网络安全技能，与数字营销和内容创作经验。目前正在攻读<span class="text-[var(--primary-color)]">工商信息系统学士（BBIS）</span>，管理与技术大学 – 进行中（预计2027年）。',
            'about-para2': '通过我的YouTube频道<a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>，我赋能超过<span class="text-[var(--primary-color)]">1.77亿巴基斯坦人</span>，他们缺乏数字技能，通过每周视频提供实用提示。',
            'about-para3': '受好奇心和学习承诺驱动，我适应力强、富有创造力，并热衷于简化复杂想法。',
            'skills-title': '技能与专长',
            'skill-ai': 'AI工具',
            'skill-python': 'Python',
            'skill-cyber': '网络安全',
            'skill-marketing': '数字营销',
            'skill-youtube': 'YouTube创作',
            'skill-bilingual': '双语沟通',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>访问我的YouTube频道',
            'experience-title': '专业经验',
            'exp-ai-strategist': 'AI与内容策略师',
            'badge-personal': '个人项目',
            'exp-digital-dates': 'Digital Uplift | 2020 – 至今',
            'exp-ai-bullet1': '制作科技焦点YouTube内容，每年增长观众25%。',
            'exp-ai-bullet2': '使用提示工程开发创意脚本，提升参与度。',
            'exp-ai-bullet3': '使用Adobe Premiere Pro处理端到端视频制作。',
            'exp-internships': '实习',
            'badge-multiple': '多个角色',
            'exp-various-dates': '各种组织 | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum医院（营销与HR实习，2023–2024）：提升活动参与15%，简化招聘。',
            'exp-intern2': 'TX Labz（HR实习，2022）：优化入职，减少处理时间20%。',
            'exp-intern3': 'Med Coach Global（社交媒体实习, 2025–至今）：增加社交媒体参与30%。',
            'exp-intern4': 'NGO经验（Alkhimat Foundation & ILM）：协调社区项目和外展。',
            'cert-title': '证书',
            'cert-prompt-eng': '提示工程与提示基础',
            'issued-by-google': '由Google颁发',
            'cert-google-ai': 'Google AI基础',
            'issued-by-linkedin': '由LinkedIn颁发',
            'cert-linkedin-ai': 'LinkedIn AI基础',
            'issued-by-itu': '由ITU颁发',
            'cert-python': 'Python编程课程',
            'issued-by-ibm': '由IBM颁发',
            'cert-marketing': '数字营销课程',
            'cert-cyber': '网络安全课程',
            'projects-title': '项目',
            'visit-project': '访问项目',
            'view-credential': '查看凭证 →',
            'contact-title': '联系我',
            'form-name': '姓名',
            'error-name': '姓名必须2-50字符，仅包含字母、空格或连字符。',
            'form-email': '电子邮件',
            'error-email': '请输入有效电子邮件地址。',
            'form-message': '消息',
            'error-message': '消息必须10-500字符，不能包含特殊字符。',
            'form-not-bot': '我不是机器人',
            'error-captcha': '请勾选此框验证。',
            'send-message': '发送消息',
            'social-text': '在社交媒体上找到我：',
            'direct-text': '或直接联系我：',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>在WhatsApp聊天',
            'download-resume': '<i class="fas fa-download mr-2"></i>下载简历',
            'modal-sent': '消息已发送！',
            'modal-thanks': '感谢您的消息！',
            'close-btn': '关闭',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>。保留所有权利。',
            'loading-text': '加载作品集...',
            'welcome-text': '让我们看看我的作品集！',
            'enter-btn': '进入',
            'lang-en': 'English',
            'lang-fr': 'Français',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-zh': '中文'
        }
    };
    function updateText(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        setTimeout(() => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        }, 0);
        document.documentElement.lang = lang;
        if (typingInterval) {
            clearTimeout(typingInterval);
            typeWriter();
        }
    }
    updateText('en');
    elements.langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.langDropdown.classList.toggle('visible');
    });
    document.addEventListener('click', () => {
        elements.langDropdown.classList.remove('visible');
    });
    elements.langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.getAttribute('data-lang');
            updateText(lang);
            elements.langDropdown.classList.remove('visible');
        });
    });
    function updateTheme(isLight) {
        document.documentElement.classList.toggle('light-theme', isLight);
        if (isLight) {
            elements.parallaxBackground.classList.add('light-theme');
            const existingClouds = elements.parallaxBackground.querySelectorAll('.cloud');
            existingClouds.forEach(cloud => cloud.remove());
            const cloudCount = 10;
            for (let i = 0; i < cloudCount; i++) {
                const cloud = document.createElement('div');
                cloud.classList.add('cloud');
                cloud.style.left = Math.random() * 100 + '%';
                cloud.style.width = cloud.style.height = (Math.random() * 60 + 40) + 'px';
                cloud.style.animationDelay = Math.random() * 50 + 's';
                cloud.style.animationDuration = (Math.random() * 30 + 50) + 's';
                elements.parallaxBackground.appendChild(cloud);
            }
        } else {
            elements.parallaxBackground.classList.remove('light-theme');
            const existingStars = elements.parallaxBackground.querySelectorAll('.star');
            existingStars.forEach(star => star.remove());
            const starCount = 50;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = Math.random() * 100 + '%';
                star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
                star.style.animationDelay = Math.random() * 8 + 's';
                star.style.animationDuration = (Math.random() * 4 + 6) + 's';
                elements.parallaxBackground.appendChild(star);
            }
        }
    }
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme === 'light';
    elements.themeToggleCheckbox.checked = isLight;
    updateTheme(isLight);
    elements.themeToggleCheckbox.addEventListener('change', () => {
        const isLight = elements.themeToggleCheckbox.checked;
        updateTheme(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    function createStarsAndClouds() {
        const starCount = 50;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + '%';
            star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
            star.style.animationDelay = Math.random() * 8 + 's';
            star.style.animationDuration = (Math.random() * 4 + 6) + 's';
            elements.parallaxBackground.appendChild(star);
        }
        if (document.documentElement.classList.contains('light-theme')) {
            const cloudCount = 10;
            for (let i = 0; i < cloudCount; i++) {
                const cloud = document.createElement('div');
                cloud.classList.add('cloud');
                cloud.style.left = Math.random() * 100 + '%';
                cloud.style.width = cloud.style.height = (Math.random() * 60 + 40) + 'px';
                cloud.style.animationDelay = Math.random() * 50 + 's';
                cloud.style.animationDuration = (Math.random() * 30 + 50) + 's';
                elements.parallaxBackground.appendChild(cloud);
            }
        }
    }
    createStarsAndClouds();
    const texts = [
        'AI Enthusiast & Innovator',
        'Mastering Prompt Engineering',
        'Building Secure Digital Worlds',
        'Empowering Through Content',
        'Crafting Impactful Stories',
        'Python-Powered Creator',
        'Bridging the Digital Divide'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            elements.changingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            elements.changingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 1.2;
        }
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            typeSpeed = 500;
            textIndex = (textIndex + 1) % texts.length;
            isDeleting = false;
        }
        typingInterval = setTimeout(typeWriter, typeSpeed);
    }
    function triggerIconPulses() {
        const whatsappIcon = document.querySelector('#whatsapp-icon').parentElement;
        const emailIcon = document.querySelector('#email-icon').parentElement;
        const linkedinIcon = document.querySelector('#linkedin-icon').parentElement;
        setTimeout(() => {
            whatsappIcon.classList.add('whatsapp-pulse');
            setTimeout(() => whatsappIcon.classList.remove('whatsapp-pulse'), 2500);
        }, 0);
        setTimeout(() => {
            emailIcon.classList.add('email-pulse');
            setTimeout(() => emailIcon.classList.remove('email-pulse'), 2500);
        }, 500);
        setTimeout(() => {
            linkedinIcon.classList.add('linkedin-pulse');
            setTimeout(() => linkedinIcon.classList.remove('linkedin-pulse'), 2500);
        }, 1000);
    }
    elements.welcomeBtn.addEventListener('click', () => {
        if (elements.welcomeSound) {
            elements.welcomeSound.play().catch(e => console.log('Sound play failed:', e));
        }
        elements.welcomeOverlay.classList.remove('visible');
        setTimeout(() => {
            elements.mainContent.classList.add('fade-in');
            elements.headerElement.classList.add('fade-in');
            typeWriter();
            triggerIconPulses();
            setInterval(triggerIconPulses, 5000);
        }, 300);
    });
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        elements.welcomeOverlay.classList.add('visible');
        const welcomeText = document.querySelector('.welcome-text');
        setTimeout(() => welcomeText.style.opacity = '1', 500);
    }, 1000);
    elements.mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.mobileMenu.classList.toggle('-translate-y-[150%]');
        const isOpen = !elements.mobileMenu.classList.contains('-translate-y-[150%]');
        elements.mobileMenuButton.setAttribute('aria-expanded', isOpen);
        elements.mobileMenuButton.innerHTML = isOpen ? '<i class="fas fa-times text-xl"></i>' : '<i class="fas fa-bars text-xl"></i>';
    });
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            if (!elements.mobileMenu.classList.contains('-translate-y-[150%]')) {
                elements.mobileMenu.classList.add('-translate-y-[150%]');
                elements.mobileMenuButton.setAttribute('aria-expanded', 'false');
                elements.mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            }
        });
    });
    elements.toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const contentId = btn.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            elements.toggleButtons.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContentId = otherBtn.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherContentId);
                    if (otherBtn.getAttribute('aria-expanded') === 'true') {
                        otherBtn.setAttribute('aria-expanded', 'false');
                        const otherIcon = otherBtn.querySelector('i');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        otherContent.classList.remove('show');
                        otherBtn.classList.remove('active');
                    }
                }
            });
            btn.setAttribute('aria-expanded', !isExpanded);
            const icon = btn.querySelector('i');
            if (icon) icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            content.classList.toggle('show');
            btn.classList.toggle('active');
        });
    });
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            item.classList.toggle('expanded');
        });
        item.addEventListener('touchstart', () => {
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            item.classList.toggle('expanded');
        });
    });
    function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            elements.mainHeader.classList.add('scrolled');
        } else {
            elements.mainHeader.classList.remove('scrolled');
        }
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            elements.mainHeader.classList.add('hide');
        } else {
            elements.mainHeader.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
        if (currentScrollY > 300) {
            elements.backToTopBtn.classList.add('visible');
        } else {
            elements.backToTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleScroll);
    elements.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    elements.sections.forEach(section => observer.observe(section));
    function validateForm() {
        let isValid = true;
        [elements.nameError, elements.emailError, elements.messageError, elements.captchaError].forEach(error => {
            error.classList.remove('active');
            const input = error.previousElementSibling || error.parentNode.querySelector('input, textarea');
            if (input) input.classList.remove('input-error');
        });
        const name = elements.nameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
        if (!nameRegex.test(name)) {
            elements.nameError.classList.add('active');
            elements.nameInput.classList.add('input-error');
            isValid = false;
        }
        const email = elements.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            elements.emailError.classList.add('active');
            elements.emailInput.classList.add('input-error');
            isValid = false;
        }
        const message = elements.messageInput.value.trim();
        const messageRegex = /^[\w\s.,!?'-]{10,500}$/;
        if (!messageRegex.test(message)) {
            elements.messageError.classList.add('active');
            elements.messageInput.classList.add('input-error');
            isValid = false;
        }
        if (!elements.captchaCheckbox.checked) {
            elements.captchaError.classList.add('active');
            isValid = false;
        }
        return isValid;
    }
    elements.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSubmissionTime < submissionCooldown) {
            alert('Please wait before sending another message.');
            return;
        }
        if (!validateForm()) {
            return;
        }
        elements.submitBtn.disabled = true;
        const originalText = elements.submitBtn.innerHTML;
        elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        try {
            const formData = {
                name: elements.nameInput.value.trim(),
                email: elements.emailInput.value.trim(),
                message: elements.messageInput.value.trim()
            };
            const response = await fetch('https://portfolio-form-handler.timespace.workers.dev/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                elements.modalMessage.innerHTML = 'Thank you for your message! I will get back to you soon.';
                elements.messageModal.classList.add('is-visible');
                elements.contactForm.reset();
                lastSubmissionTime = now;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            elements.submitBtn.disabled = false;
            elements.submitBtn.innerHTML = originalText;
        }
    });
    elements.closeModalBtn.addEventListener('click', () => {
        elements.messageModal.classList.remove('is-visible');
    });
    elements.messageModal.addEventListener('click', (e) => {
        if (e.target === elements.messageModal) {
            elements.messageModal.classList.remove('is-visible');
        }
    });
    [elements.nameInput, elements.emailInput, elements.messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const error = document.getElementById(input.id + '-error');
            if (error) {
                validateForm();
            }
        });
    });
    elements.captchaCheckbox.addEventListener('change', () => {
        if (elements.captchaError) {
            validateForm();
        }
    });
    // Image modal functionality
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', () => {
            elements.largeImage.src = img.src; // Use same src for large version; replace if different URLs
            elements.imageModal.classList.add('show');
        });
    });
    elements.closeImageModal.addEventListener('click', () => {
        elements.imageModal.classList.remove('show');
    });
    elements.imageModal.addEventListener('click', (e) => {
        if (e.target === elements.imageModal) {
            elements.imageModal.classList.remove('show');
        }
    });
    handleScroll();
});
