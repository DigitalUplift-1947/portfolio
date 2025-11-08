// script.js
document.addEventListener('DOMContentLoaded', () => {
    // EASY EDIT: Console log for debugging load time. Remove if not needed.
    console.log("Portfolio website loaded at 07:08 AM PKT, September 25, 2025");
    // EASY EDIT: Cached elements. Add/remove DOM queries here if adding features.
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
        themeToggle: document.getElementById('theme-toggle'),
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
        socialIcons: document.querySelectorAll('.social-icon')
    };
    // EASY EDIT: Variables for scroll and form submission. Adjust cooldown if needed.
    let lastScrollY = window.scrollY;
    let lastSubmissionTime = 0;
    const submissionCooldown = 30000;
    let scrollTimeout;
    let typingInterval; // For typing animation control
    // EASY EDIT: Translations object. Add/remove languages or keys as needed.
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
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        },
        es: {
            'nav-home': 'Inicio',
            'nav-about': 'Acerca de',
            'nav-experience': 'Experiencia',
            'nav-certifications': 'Certificaciones',
            'nav-projects': 'Proyectos',
            'nav-contact': 'Contacto',
            'home-hello': 'Hola',
            'explore-certifications': 'Explora Mis Certificaciones',
            'join-me': '¡Únete a mí en dominar habilidades digitales para un futuro más brillante!',
            'about-title': 'Sobre Mí',
            'about-para1': 'Combino habilidades en herramientas de IA, ingeniería de prompts y ciberseguridad con experiencia en marketing digital y creación de contenido. Actualmente cursando <span class="text-[var(--primary-color)]">Licenciatura en Sistemas de Información Empresarial (BBIS)</span>, Universidad de Gestión y Tecnología – En curso (Esperado 2027).',
            'about-para2': 'A través de mi canal de YouTube <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>, empodero a más de <span class="text-[var(--primary-color)]">177 millones de paquistaníes</span> que carecen de habilidades digitales con videos semanales que ofrecen consejos prácticos.',
            'about-para3': 'Impulsado por la curiosidad y el compromiso con el aprendizaje, soy adaptable, creativo y apasionado por simplificar ideas complejas.',
            'skills-title': 'Habilidades y Experiencia',
            'skill-ai': 'Herramientas de IA',
            'skill-python': 'Python',
            'skill-cyber': 'Ciberseguridad',
            'skill-marketing': 'Marketing Digital',
            'skill-youtube': 'Creación de YouTube',
            'skill-bilingual': 'Comunicación Bilingüe',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>Visita Mi Canal de YouTube',
            'experience-title': 'Experiencia Profesional',
            'exp-ai-strategist': 'Estratega de IA y Contenido',
            'badge-personal': 'Proyecto Personal',
            'exp-digital-dates': 'Digital Uplift | 2020 – Presente',
            'exp-ai-bullet1': 'Produje contenido de YouTube enfocado en tecnología, creciendo la audiencia un 25% anualmente.',
            'exp-ai-bullet2': 'Desarrollé guiones creativos usando ingeniería de prompts, mejorando el engagement.',
            'exp-ai-bullet3': 'Manejé la producción de video de extremo a extremo con Adobe Premiere Pro.',
            'exp-internships': 'Pasantías',
            'badge-multiple': 'Múltiples Roles',
            'exp-various-dates': 'Varias Organizaciones | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum Hospital (Pasantía en Marketing y RRHH, 2023–2024): Aumenté la participación en eventos un 15% y agilicé el reclutamiento.',
            'exp-intern2': 'TX Labz (Pasantía en RRHH, 2022): Optimicé el onboarding, reduciendo el tiempo de procesamiento un 20%.',
            'exp-intern3': 'Med Coach Global (Pasantía en Redes Sociales, 2025–Presente): Aumenté el engagement en redes sociales un 30%.',
            'exp-intern4': 'Experiencia en ONG (Alkhimat Foundation y ILM): Coordiné proyectos comunitarios y divulgación.',
            'cert-title': 'Certificaciones',
            'cert-prompt-eng': 'Ingeniería de Prompts e Esenciales de Prompts',
            'issued-by-google': 'Emitido por Google',
            'cert-google-ai': 'Esenciales de IA de Google',
            'issued-by-linkedin': 'Emitido por LinkedIn',
            'cert-linkedin-ai': 'Esenciales de IA de LinkedIn',
            'issued-by-itu': 'Emitido por ITU',
            'cert-python': 'Curso de Programación en Python',
            'issued-by-ibm': 'Emitido por IBM',
            'cert-marketing': 'Curso de Marketing Digital',
            'cert-cyber': 'Curso de Ciberseguridad',
            'projects-title': 'Proyectos',
            'visit-project': 'Visitar Proyecto',
            'view-credential': 'Ver Credencial →',
            'contact-title': 'Ponte en Contacto',
            'form-name': 'Nombre',
            'error-name': 'El nombre debe tener 2-50 caracteres y contener solo letras, espacios o guiones.',
            'form-email': 'Correo Electrónico',
            'error-email': 'Por favor ingresa una dirección de correo electrónico válida.',
            'form-message': 'Mensaje',
            'error-message': 'El mensaje debe tener 10-500 caracteres y no puede contener caracteres especiales.',
            'form-not-bot': 'No soy un bot',
            'error-captcha': 'Por favor marca esta casilla para verificar.',
            'send-message': 'Enviar Mensaje',
            'social-text': 'Encuéntrame en redes sociales:',
            'direct-text': 'O contáctame directamente:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>Chatea en WhatsApp',
            'download-resume': '<i class="fas fa-download mr-2"></i>Descargar Currículum',
            'modal-sent': '¡Mensaje Enviado!',
            'modal-thanks': '¡Gracias por tu mensaje!',
            'close-btn': 'Cerrar',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. Todos los derechos reservados.',
            'loading-text': 'Cargando Portafolio...',
            'welcome-text': '¡Echemos un vistazo a mi portafolio!',
            'enter-btn': 'Entrar',
            'lang-en': 'English',
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
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
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        },
        de: {
            'nav-home': 'Startseite',
            'nav-about': 'Über mich',
            'nav-experience': 'Erfahrung',
            'nav-certifications': 'Zertifikate',
            'nav-projects': 'Projekte',
            'nav-contact': 'Kontakt',
            'home-hello': 'Hallo',
            'explore-certifications': 'Meine Zertifikate erkunden',
            'join-me': 'Schließe dich mir an, um digitale Fähigkeiten für eine hellere Zukunft zu meistern!',
            'about-title': 'Über mich',
            'about-para1': 'Ich kombiniere Fähigkeiten in KI-Tools, Prompt-Engineering und Cybersicherheit mit Erfahrung im digitalen Marketing und Content-Erstellung. Derzeit verfolge ich einen <span class="text-[var(--primary-color)]">Bachelor in Business Information Systems (BBIS)</span>, University of Management and Technology – Laufend (Erwartet 2027).',
            'about-para2': 'Durch meinen YouTube-Kanal <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a> ermächtige ich über <span class="text-[var(--primary-color)]">177 Millionen Pakistaner</span>, die an digitalen Fähigkeiten mangeln, mit wöchentlichen Videos mit praktischen Tipps.',
            'about-para3': 'Getrieben von Neugier und Engagement für Lernen bin ich anpassungsfähig, kreativ und leidenschaftlich darin, komplexe Ideen zu vereinfachen.',
            'skills-title': 'Fähigkeiten & Expertise',
            'skill-ai': 'KI-Tools',
            'skill-python': 'Python',
            'skill-cyber': 'Cybersicherheit',
            'skill-marketing': 'Digitales Marketing',
            'skill-youtube': 'YouTube-Erstellung',
            'skill-bilingual': 'Bilinguale Kommunikation',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>Meinen YouTube-Kanal besuchen',
            'experience-title': 'Berufliche Erfahrung',
            'exp-ai-strategist': 'KI- & Content-Stratege',
            'badge-personal': 'Persönliches Projekt',
            'exp-digital-dates': 'Digital Uplift | 2020 – Gegenwart',
            'exp-ai-bullet1': 'Produzierte tech-fokussierten YouTube-Content, wachsende Audience um 25% jährlich.',
            'exp-ai-bullet2': 'Entwickelte kreative Skripte mit Prompt-Engineering, verbesserte Engagement.',
            'exp-ai-bullet3': 'Handhabte End-to-End-Video-Produktion mit Adobe Premiere Pro.',
            'exp-internships': 'Praktika',
            'badge-multiple': 'Mehrere Rollen',
            'exp-various-dates': 'Verschiedene Organisationen | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum Hospital (Marketing & HR-Praktikum, 2023–2024): Steigerte Event-Teilnahme um 15% und rationalisierte Rekrutierung.',
            'exp-intern2': 'TX Labz (HR-Praktikum, 2022): Optimiertes Onboarding, reduzierte Verarbeitungszeit um 20%.',
            'exp-intern3': 'Med Coach Global (Social Media-Praktikum, 2025–Gegenwart): Erhöhte Social-Media-Engagement um 30%.',
            'exp-intern4': 'NGO-Erfahrung (Alkhimat Foundation & ILM): Koordinierte Community-Projekte und Outreach.',
            'cert-title': 'Zertifikate',
            'cert-prompt-eng': 'Prompt Engineering und Prompting Essentials',
            'issued-by-google': 'Ausgestellt von Google',
            'cert-google-ai': 'Google AI Essentials',
            'issued-by-linkedin': 'Ausgestellt von LinkedIn',
            'cert-linkedin-ai': 'LinkedIn AI Essentials',
            'issued-by-itu': 'Ausgestellt von ITU',
            'cert-python': 'Python Programming Course',
            'issued-by-ibm': 'Ausgestellt von IBM',
            'cert-marketing': 'Digital Marketing Course',
            'cert-cyber': 'Cybersecurity Course',
            'projects-title': 'Projekte',
            'visit-project': 'Projekt besuchen',
            'view-credential': 'Credential ansehen →',
            'contact-title': 'Kontaktieren Sie mich',
            'form-name': 'Name',
            'error-name': 'Name muss 2-50 Zeichen haben und nur Buchstaben, Leerzeichen oder Bindestriche enthalten.',
            'form-email': 'E-Mail',
            'error-email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            'form-message': 'Nachricht',
            'error-message': 'Nachricht muss 10-500 Zeichen haben und keine Sonderzeichen enthalten.',
            'form-not-bot': 'Ich bin kein Bot',
            'error-captcha': 'Bitte diese Box anhaken, um zu verifizieren.',
            'send-message': 'Nachricht senden',
            'social-text': 'Finden Sie mich in sozialen Medien:',
            'direct-text': 'Oder kontaktieren Sie mich direkt:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>Chatten auf WhatsApp',
            'download-resume': '<i class="fas fa-download mr-2"></i>Lebenslauf herunterladen',
            'modal-sent': 'Nachricht gesendet!',
            'modal-thanks': 'Vielen Dank für Ihre Nachricht!',
            'close-btn': 'Schließen',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. Alle Rechte vorbehalten.',
            'loading-text': 'Portafolio laden...',
            'welcome-text': 'Lassen Sie uns mein Portafolio anschauen!',
            'enter-btn': 'Eintreten',
            'lang-en': 'English',
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
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
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        },
        ja: {
            'nav-home': 'ホーム',
            'nav-about': '私について',
            'nav-experience': '経験',
            'nav-certifications': '認定資格',
            'nav-projects': 'プロジェクト',
            'nav-contact': 'お問い合わせ',
            'home-hello': 'こんにちは',
            'explore-certifications': '私の認定資格を探る',
            'join-me': 'より明るい未来のためのデジタルスキルの習得に私と一緒に参加しましょう！',
            'about-title': '私について',
            'about-para1': 'AIツール, プロンプトエンジニアリング, サイバーセキュリティのスキルをデジタルマーケティングとコンテンツ作成の経験と組み合わせています。現在, 管理技術大学で<span class="text-[var(--primary-color)]">ビジネス情報システム学士（BBIS)</span>を修了中（2027年予定）。',
            'about-para2': '私のYouTubeチャンネル<a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>を通じて, デジタルスキルに欠ける<span class="text-[var(--primary-color)]">1億7700万人のパキスタン人</span>を, 週刊ビデオで実践的なヒントを提供してエンパワーしています。',
            'about-para3': '好奇心と学習へのコミットメントに駆り立てられ, 適応力があり, 創造的で, 複雑なアイデアを簡素化することに情熱を注いでいます。',
            'skills-title': 'スキルと専門知識',
            'skill-ai': 'AIツール',
            'skill-python': 'Python',
            'skill-cyber': 'サイバーセキュリティ',
            'skill-marketing': 'デジタルマーケティング',
            'skill-youtube': 'YouTube作成',
            'skill-bilingual': 'バイリンガルコミュニケーション',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>私のYouTubeチャンネルを訪れる',
            'experience-title': 'プロフェッショナル経験',
            'exp-ai-strategist': 'AI & コンテンツストラテジスト',
            'badge-personal': '個人プロジェクト',
            'exp-digital-dates': 'Digital Uplift | 2020 – 現在',
            'exp-ai-bullet1': 'テック焦点のYouTubeコンテンツを制作, 視聴者数を年25%成長。',
            'exp-ai-bullet2': 'プロンプトエンジニアリングを使用して創造的なスクリプトを開発, 関与を向上。',
            'exp-ai-bullet3': 'Adobe Premiere Proでエンドツーエンドのビデオ制作を担当。',
            'exp-internships': 'インターンシップ',
            'badge-multiple': '複数の役割',
            'exp-various-dates': 'さまざまな組織 | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum病院（マーケティング & HRインターン, 2023–2024): イベント参加を15%増加, 採用を合理化。',
            'exp-intern2': 'TX Labz（HRインターン, 2022): オンボーディングを最適化, 処理時間を20%短縮。',
            'exp-intern3': 'Med Coach Global（ソーシャルメディアインターン, 2025–現在): ソーシャルメディア関与を30%増加。',
            'exp-intern4': 'NGO経験（Alkhimat Foundation & ILM): コミュニティプロジェクトとアウトリーチを調整。',
            'cert-title': '認定資格',
            'cert-prompt-eng': 'プロンプトエンジニアリングとプロンプティングエッセンシャル',
            'issued-by-google': 'Google発行',
            'cert-google-ai': 'Google AIエッセンシャル',
            'issued-by-linkedin': 'LinkedIn発行',
            'cert-linkedin-ai': 'LinkedIn AIエッセンシャル',
            'issued-by-itu': 'ITU発行',
            'cert-python': 'Pythonプログラミングコース',
            'issued-by-ibm': 'IBM発行',
            'cert-marketing': 'デジタルマーケティングコース',
            'cert-cyber': 'サイバーセキュリティコース',
            'projects-title': 'プロジェクト',
            'visit-project': 'プロジェクトを訪問',
            'view-credential': '資格証明書を見る →',
            'contact-title': 'お問い合わせ',
            'form-name': '名前',
            'error-name': '名前は2-50文字で, 文字, スペース, ハイフンのみを含めてください。',
            'form-email': 'メール',
            'error-email': '有効なメールアドレスを入力してください。',
            'form-message': 'メッセージ',
            'error-message': 'メッセージは10-500文字で, 特殊文字を含めないでください。',
            'form-not-bot': '私はボットではありません',
            'error-captcha': '検証のためにこのボックスをチェックしてください。',
            'send-message': 'メッセージを送信',
            'social-text': 'ソーシャルメディアで私を見つけてください:',
            'direct-text': 'または直接連絡してください:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>WhatsAppでチャット',
            'download-resume': '<i class="fas fa-download mr-2"></i>履歴書をダウンロード',
            'modal-sent': 'メッセージが送信されました!',
            'modal-thanks': 'メッセージありがとうございます!',
            'close-btn': '閉じる',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>。すべての権利を保有。',
            'loading-text': 'ポートフォリオを読み込み中...',
            'welcome-text': '私のポートフォリオを見てみましょう!',
            'enter-btn': '入る',
            'lang-en': 'English',
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        },
        ko: {
            'nav-home': '홈',
            'nav-about': '소개',
            'nav-experience': '경험',
            'nav-certifications': '자격증',
            'nav-projects': '프로젝트',
            'nav-contact': '연락처',
            'home-hello': '안녕하세요',
            'explore-certifications': '내 자격증 탐색',
            'join-me': '더 밝은 미래를 위한 디지털 스킬 마스터링에 나와 함께하세요!',
            'about-title': '소개',
            'about-para1': 'AI 도구, 프롬프트 엔지니어링, 사이버 보안 스킬을 디지털 마케팅과 콘텐츠 제작 경험과 결합합니다. 현재 관리 및 기술 대학에서 <span class="text-[var(--primary-color)]">비즈니스 정보 시스템 학사(BBIS)</span>를 추구 중 (2027년 예상).',
            'about-para2': '내 YouTube 채널 <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>을 통해 디지털 스킬이 부족한 <span class="text-[var(--primary-color)]">1억 7,700만 파키스탄인</span>을 주간 비디오로 실용적인 팁을 제공하여 강화합니다.',
            'about-para3': '호기심과 학습 헌신에 의해 주도되며, 적응력 있고 창의적이며 복잡한 아이디어를 단순화하는 데 열정적입니다.',
            'skills-title': '스킬 & 전문 지식',
            'skill-ai': 'AI 도구',
            'skill-python': 'Python',
            'skill-cyber': '사이버 보안',
            'skill-marketing': '디지털 마케팅',
            'skill-youtube': 'YouTube 제작',
            'skill-bilingual': '이중 언어 커뮤니케이션',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>내 YouTube 채널 방문',
            'experience-title': '전문 경험',
            'exp-ai-strategist': 'AI & 콘텐츠 전략가',
            'badge-personal': '개인 프로젝트',
            'exp-digital-dates': 'Digital Uplift | 2020 – 현재',
            'exp-ai-bullet1': '테크 중심 YouTube 콘텐츠 제작, 연간 청중 25% 성장.',
            'exp-ai-bullet2': '프롬프트 엔지니어링을 사용한 창의적 스크립트 개발, 참여 향상.',
            'exp-ai-bullet3': 'Adobe Premiere Pro로 엔드투엔드 비디오 프로덕션 처리.',
            'exp-internships': '인턴십',
            'badge-multiple': '다중 역할',
            'exp-various-dates': '다양한 조직 | 2022 – 2026',
            'exp-intern1': 'Shaukat Khanum 병원 (마케팅 & HR 인턴, 2023–2024): 이벤트 참여 15% 증가, 채용 간소화.',
            'exp-intern2': 'TX Labz (HR 인턴, 2022): 온보딩 최적화, 처리 시간 20% 감소.',
            'exp-intern3': 'Med Coach Global (소셜 미디어 인턴, 2025–현재): 소셜 미디어 참여 30% 증가.',
            'exp-intern4': 'NGO 경험 (Alkhimat Foundation & ILM): 커뮤니티 프로젝트 및 아웃리치 조정.',
            'cert-title': '자격증',
            'cert-prompt-eng': '프롬프트 엔지니어링 및 프롬프팅 에센셜',
            'issued-by-google': 'Google 발급',
            'cert-google-ai': 'Google AI 에센셜',
            'issued-by-linkedin': 'LinkedIn 발급',
            'cert-linkedin-ai': 'LinkedIn AI 에센셜',
            'issued-by-itu': 'ITU 발급',
            'cert-python': 'Python 프로그래밍 코스',
            'issued-by-ibm': 'IBM 발급',
            'cert-marketing': '디지털 마케팅 코스',
            'cert-cyber': '사이버 보안 코스',
            'projects-title': '프로젝트',
            'visit-project': '프로젝트 방문',
            'view-credential': '자격 증명 보기 →',
            'contact-title': '연락처',
            'form-name': '이름',
            'error-name': '이름은 2-50자이며 문자, 공백 또는 하이픈만 포함해야 합니다.',
            'form-email': '이메일',
            'error-email': '유효한 이메일 주소를 입력하세요.',
            'form-message': '메시지',
            'error-message': '메시지는 10-500자이며 특수 문자를 포함할 수 없습니다.',
            'form-not-bot': '나는 봇이 아닙니다',
            'error-captcha': '검증을 위해 이 상자를 체크하세요.',
            'send-message': '메시지 보내기',
            'social-text': '소셜 미디어에서 나를 찾아보세요:',
            'direct-text': '또는 직접 연락하세요:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>WhatsApp에서 채팅',
            'download-resume': '<i class="fas fa-download mr-2"></i>이력서 다운로드',
            'modal-sent': '메시지 전송됨!',
            'modal-thanks': '메시지 감사합니다!',
            'close-btn': '닫기',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. 모든 권리 보유.',
            'loading-text': '포트폴리오 로딩 중...',
            'welcome-text': '내 포트폴리오를 살펴보자!',
            'enter-btn': '들어가기',
            'lang-en': 'English',
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
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
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
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
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        },
        pt: {
            'nav-home': 'Início',
            'nav-about': 'Sobre',
            'nav-experience': 'Experiência',
            'nav-certifications': 'Certificações',
            'nav-projects': 'Projetos',
            'nav-contact': 'Contato',
            'home-hello': 'Olá',
            'explore-certifications': 'Explorar Minhas Certificações',
            'join-me': 'Junte-se a mim para dominar habilidades digitais para um futuro mais brilhante!',
            'about-title': 'Sobre Mim',
            'about-para1': 'Combino habilidades em ferramentas de IA, engenharia de prompts e cibersegurança com experiência em marketing digital e criação de conteúdo. Atualmente cursando <span class="text-[var(--primary-color)]">Bacharelado em Sistemas de Informação Empresarial (BBIS)</span>, Universidade de Gestão e Tecnologia – Em andamento (Previsto 2027).',
            'about-para2': 'Através do meu canal no YouTube <a href="https://www.youtube.com/@DigitalUplift.1947" target="_blank" rel="noopener noreferrer" class="text-[var(--primary-color)] hover:underline">@DigitalUplift.1947</a>, capacito mais de <span class="text-[var(--primary-color)]">177 milhões de paquistaneses</span> que carecem de habilidades digitais com vídeos semanais oferecendo dicas práticas.',
            'about-para3': 'Impulsionado pela curiosidade e compromisso com o aprendizado, sou adaptável, criativo e apaixonado por simplificar ideias complexas.',
            'skills-title': 'Habilidades e Expertise',
            'skill-ai': 'Ferramentas de IA',
            'skill-python': 'Python',
            'skill-cyber': 'Cibersegurança',
            'skill-marketing': 'Marketing Digital',
            'skill-youtube': 'Criação no YouTube',
            'skill-bilingual': 'Comunicação Bilíngue',
            'skill-github': 'GitHub',
            'skill-netlify': 'Netlify',
            'skill-premiere': 'Premiere Pro',
            'skill-cloudflare': 'Cloudflare',
            'skill-backend': 'Backend Development',
            'skill-workers': 'Workers',
            'visit-youtube': '<i class="fab fa-youtube mr-2"></i>Visite Meu Canal no YouTube',
            'experience-title': 'Experiência Profissional',
            'exp-ai-strategist': 'Estrategista de IA e Conteúdo',
            'badge-personal': 'Projeto Pessoal',
            'exp-digital-dates': 'Digital Uplift | 2020 – Presente',
            'exp-ai-bullet1': 'Produzi conteúdo focado em tech no YouTube, crescendo a audiência em 25% anualmente.',
            'exp-ai-bullet2': 'Desenvolvi roteiros criativos usando engenharia de prompts, melhorando o engajamento.',
            'exp-ai-bullet3': 'Gerenciei produção de vídeo de ponta a ponta com Adobe Premiere Pro.',
            'exp-internships': 'Estágios',
            'badge-multiple': 'Múltiplos Papéis',
            'exp-various-dates': 'Várias Organizações | 2022 – 2026',
            'exp-intern1': 'Hospital Shaukat Khanum (Estágio em Marketing e RH, 2023–2024): Aumentei participação em eventos em 15% e otimizei recrutamento.',
            'exp-intern2': 'TX Labz (Estágio em RH, 2022): Otimizei onboarding, reduzindo tempo de processamento em 20%.',
            'exp-intern3': 'Med Coach Global (Estágio em Mídias Sociais, 2025–Presente): Aumentei engajamento em mídias sociais em 30%.',
            'exp-intern4': 'Experiência em ONGs (Alkhimat Foundation & ILM): Coordenei projetos comunitários e outreach.',
            'cert-title': 'Certificações',
            'cert-prompt-eng': 'Engenharia de Prompts e Essenciais de Prompting',
            'issued-by-google': 'Emitido por Google',
            'cert-google-ai': 'Essenciais de IA do Google',
            'issued-by-linkedin': 'Emitido por LinkedIn',
            'cert-linkedin-ai': 'Essenciais de IA do LinkedIn',
            'issued-by-itu': 'Emitido por ITU',
            'cert-python': 'Curso de Programação em Python',
            'issued-by-ibm': 'Emitido por IBM',
            'cert-marketing': 'Curso de Marketing Digital',
            'cert-cyber': 'Curso de Cibersegurança',
            'projects-title': 'Projetos',
            'visit-project': 'Visitar Projeto',
            'view-credential': 'Ver Credencial →',
            'contact-title': 'Entre em Contato',
            'form-name': 'Nome',
            'error-name': 'O nome deve ter 2-50 caracteres e conter apenas letras, espaços ou hifens.',
            'form-email': 'E-mail',
            'error-email': 'Por favor, insira um endereço de e-mail válido.',
            'form-message': 'Mensagem',
            'error-message': 'A mensagem deve ter 10-500 caracteres e não pode conter caracteres especiais.',
            'form-not-bot': 'Não sou um bot',
            'error-captcha': 'Por favor, marque esta caixa para verificar.',
            'send-message': 'Enviar Mensagem',
            'social-text': 'Encontre-me nas redes sociais:',
            'direct-text': 'Ou contate-me diretamente:',
            'chat-whatsapp': '<i class="fab fa-whatsapp mr-2"></i>Converse no WhatsApp',
            'download-resume': '<i class="fas fa-download mr-2"></i>Baixar Currículo',
            'modal-sent': 'Mensagem Enviada!',
            'modal-thanks': 'Obrigado pela sua mensagem!',
            'close-btn': 'Fechar',
            'footer-copyright': '© 2025 <span class="text-[var(--primary-color)]">Muhammad Owais</span>. Todos os direitos reservados.',
            'loading-text': 'Carregando Portfólio...',
            'welcome-text': 'Vamos dar uma olhada no meu portfólio!',
            'enter-btn': 'Entrar',
            'lang-en': 'English',
            'lang-es': 'Español',
            'lang-fr': 'Français',
            'lang-de': 'Deutsch',
            'lang-zh': '中文',
            'lang-ja': '日本語',
            'lang-ko': '한국어',
            'lang-ar': 'العربية',
            'lang-hi': 'हिंदी',
            'lang-pt': 'Português'
        }
    };
    // EASY EDIT: i18n function. Handles text updates for language changes. Add logic for RTL if needed (e.g., for Arabic).
    function updateText(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        // Re-apply to any newly inserted elements (e.g., if HTML contains data-i18n, but in this case embedded)
        setTimeout(() => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        }, 0);
        document.documentElement.lang = lang;
        // Restart typing animation if active
        if (typingInterval) {
            clearTimeout(typingInterval);
            typeWriter();
        }
    }
    // Initialize language to English
    updateText('en');
    // EASY EDIT: Language toggle logic. Add more languages to dropdown HTML and translations object.
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
    // EASY EDIT: Theme toggle. Adjust light/dark variables in CSS :root.
    elements.themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        const isLight = document.documentElement.classList.contains('light-theme');
        elements.themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
        // Update parallax for theme
        if (isLight) {
            elements.parallaxBackground.classList.add('light-theme');
            // Recreate clouds if switching to light
            const existingClouds = elements.parallaxBackground.querySelectorAll('.cloud');
            existingClouds.forEach(cloud => cloud.remove());
            const cloudCount = 10;
            for (let i = 0; i < cloudCount; i++) {
                const cloud = document.createElement('div');
                cloud.classList.add('cloud');
                cloud.style.left = Math.random() * 100 + '%';
                cloud.style.width = cloud.style.height = (Math.random() * 60 + 40) + 'px';
                cloud.style.animationDelay = Math.random() * 50 + 's'; // Slower random delay
                cloud.style.animationDuration = (Math.random() * 30 + 50) + 's'; // Longer duration further
                elements.parallaxBackground.appendChild(cloud);
            }
        } else {
            elements.parallaxBackground.classList.remove('light-theme');
            // Recreate stars if switching to dark
            const existingStars = elements.parallaxBackground.querySelectorAll('.star');
            existingStars.forEach(star => star.remove());
            const starCount = 50;
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.left = Math.random() * 100 + '%';
                star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
                star.style.animationDelay = Math.random() * 8 + 's'; // Slower random delay
                star.style.animationDuration = (Math.random() * 4 + 6) + 's'; // Longer duration further
                elements.parallaxBackground.appendChild(star);
            }
        }
    });
    // EASY EDIT: Parallax elements creation. Adjust counts, sizes, or animation speeds in CSS.
    function createStarsAndClouds() {
        const starCount = 50;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.left = Math.random() * 100 + '%';
            star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
            star.style.animationDelay = Math.random() * 8 + 's';
            star.style.animationDuration = (Math.random() * 4 + 6) + 's'; // Slower stars
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
                cloud.style.animationDuration = (Math.random() * 30 + 50) + 's'; // Slower clouds
                elements.parallaxBackground.appendChild(cloud);
            }
        }
    }
    createStarsAndClouds();
    // EASY EDIT: Typing animation texts. Add/remove strings in this array for the changing text in Home.
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
        let typeSpeed = 100; // Slower for smoother typing
        if (isDeleting) {
            typeSpeed /= 1.2; // Slightly slower delete for smoothness
        }
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2200; // Shorter pause for quicker cycle
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            typeSpeed = 500;
            textIndex = (textIndex + 1) % texts.length;
            isDeleting = false;
        }
        typingInterval = setTimeout(typeWriter, typeSpeed);
    }
    // EASY EDIT: Social icons pulse animation. Adjust timings or add more icons.
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
    // EASY EDIT: Welcome overlay dismiss. Adjust sound or fade timings.
    elements.welcomeBtn.addEventListener('click', () => {
        // Play sound if available
        if (elements.welcomeSound) {
            elements.welcomeSound.play().catch(e => console.log('Sound play failed:', e));
        }
        elements.welcomeOverlay.classList.remove('visible');
        setTimeout(() => {
            elements.mainContent.classList.add('fade-in');
            elements.headerElement.classList.add('fade-in');
            // Start typing animation
            typeWriter();
            // Trigger icon pulses and repeat every 5 seconds
            triggerIconPulses();
            setInterval(triggerIconPulses, 5000);
        }, 300);
    });
    // EASY EDIT: Loading screen hide. Adjust timeout for longer/shorter load simulation.
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
        elements.welcomeOverlay.classList.add('visible');
        // Trigger fade-in for welcome text
        const welcomeText = document.querySelector('.welcome-text');
        setTimeout(() => welcomeText.style.opacity = '1', 500);
    }, 1000); // Reduced from 2000ms to 1000ms
    // EASY EDIT: Mobile menu toggle. Adjust transitions in CSS.
    elements.mobileMenuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.mobileMenu.classList.toggle('-translate-y-[150%]');
        const isOpen = !elements.mobileMenu.classList.contains('-translate-y-[150%]');
        elements.mobileMenuButton.setAttribute('aria-expanded', isOpen);
        elements.mobileMenuButton.innerHTML = isOpen ? '<i class="fas fa-times text-xl"></i>' : '<i class="fas fa-bars text-xl"></i>';
    });
    // EASY EDIT: Nav links smooth scroll. Add more links if expanding nav.
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            if (!elements.mobileMenu.classList.contains('-translate-y-[150%]')) {
                elements.mobileMenu.classList.add('-translate-y-[150%]');
                elements.mobileMenuButton.setAttribute('aria-expanded', 'false');
                elements.mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            }
        });
    });
    // EASY EDIT: Toggle details for timeline. Adjust aria attributes if adding more.
    elements.toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const contentId = btn.getAttribute('aria-controls');
            const content = document.getElementById(contentId);
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            // Close all other sections first
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
            // Toggle the clicked one
            btn.setAttribute('aria-expanded', !isExpanded);
            const icon = btn.querySelector('i');
            if (icon) icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            content.classList.toggle('show');
            btn.classList.toggle('active');
        });
    });
    // EASY EDIT: Skill items expand on click. Adjust max-height in CSS for longer content.
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close other open items
            skillItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                }
            });
            item.classList.toggle('expanded');
        });
    });
    // EASY EDIT: Scroll handler for header and back-to-top. Adjust thresholds (e.g., 50, 100, 300).
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
        // Back to top visibility
        if (currentScrollY > 300) {
            elements.backToTopBtn.classList.add('visible');
        } else {
            elements.backToTopBtn.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', handleScroll);
    // EASY EDIT: Back to top click. Adjust behavior if needed.
    elements.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // EASY EDIT: Intersection observer for section animations. Adjust threshold/rootMargin for trigger points.
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
    // EASY EDIT: Form validation. Adjust regex patterns for name/email/message.
    function validateForm() {
        let isValid = true;
        // Reset errors
        [elements.nameError, elements.emailError, elements.messageError, elements.captchaError].forEach(error => {
            error.classList.remove('active');
            const input = error.previousElementSibling || error.parentNode.querySelector('input, textarea');
            if (input) input.classList.remove('input-error');
        });
        // Name validation
        const name = elements.nameInput.value.trim();
        const nameRegex = /^[a-zA-Z\s-]{2,50}$/;
        if (!nameRegex.test(name)) {
            elements.nameError.classList.add('active');
            elements.nameInput.classList.add('input-error');
            isValid = false;
        }
        // Email validation
        const email = elements.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            elements.emailError.classList.add('active');
            elements.emailInput.classList.add('input-error');
            isValid = false;
        }
        // Message validation
        const message = elements.messageInput.value.trim();
        const messageRegex = /^[\w\s.,!?'-]{10,500}$/; // Alphanumeric, spaces, common punctuation
        if (!messageRegex.test(message)) {
            elements.messageError.classList.add('active');
            elements.messageInput.classList.add('input-error');
            isValid = false;
        }
        // Captcha
        if (!elements.captchaCheckbox.checked) {
            elements.captchaError.classList.add('active');
            isValid = false;
        }
        return isValid;
    }
    // EASY EDIT: Form submission to Cloudflare Worker. Update URL or add more fields.
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
        // Disable submit button
        elements.submitBtn.disabled = true;
        const originalText = elements.submitBtn.innerHTML;
        elements.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        try {
            const formData = {
                name: elements.nameInput.value.trim(),
                email: elements.emailInput.value.trim(),
                message: elements.messageInput.value.trim()
            };
            const response = await fetch('https://portfolio-form-handler.timespace.workers.dev/', { // Replace with your Worker URL
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
    // EASY EDIT: Modal close logic. Adjust if adding more modals.
    elements.closeModalBtn.addEventListener('click', () => {
        elements.messageModal.classList.remove('is-visible');
    });
    elements.messageModal.addEventListener('click', (e) => {
        if (e.target === elements.messageModal) {
            elements.messageModal.classList.remove('is-visible');
        }
    });
    // EASY EDIT: Real-time input validation. Adjust if changing fields.
    [elements.nameInput, elements.emailInput, elements.messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const error = document.getElementById(input.id + '-error');
            if (error) {
                validateForm(); // Re-validate on input
            }
        });
    });
    elements.captchaCheckbox.addEventListener('change', () => {
        if (elements.captchaError) {
            validateForm();
        }
    });
    // Initial scroll handle
    handleScroll();
});
