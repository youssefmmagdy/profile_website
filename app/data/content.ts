/**
 * Single source of truth for portfolio content.
 * Locale-specific copy lives in `translations`; structural data (projects,
 * skills, links) is locale-independent and kept flat here.
 */

export type Locale = "en" | "de";

export type ProjectCategory = "ai" | "web" | "cloud" | "systems";

export type Project = {
  title: string;
  description: string;
  tools: string[];
  category: ProjectCategory;
  github?: string;
  download?: string;
  video?: string;
  featured?: boolean;
};

/**
 * Public origin of the deployed site, no trailing slash.
 * Used to build absolute URLs for Open Graph / Twitter card images, which
 * social platforms will not resolve from a relative path.
 * UPDATE THIS to your real domain before sharing links.
 */
export const SITE_URL = "https://youssefmagdy.vercel.app";

export const PROFILE = {
  name: "Youssef Magdy",
  email: "Youssefmmagdy55@gmail.com",
  phone: "+201550830082",
  location: "Cairo, Egypt",
  linkedin: "https://www.linkedin.com/in/youssefmmagdy",
  github: "https://github.com/youssefmmagdy",
  youtube: "https://youtube.com/@yusuf-magdy",
  transformersPlaylist: "https://youtu.be/4jJ4dTZyD64?si=qZD7KiHI3Tds3Fr-",
  resume: {
    en: "https://raw.githubusercontent.com/youssefmmagdy/profile_website/main/Youssef_Magdy_Resume.pdf",
    de: "https://raw.githubusercontent.com/youssefmmagdy/profile_website/main/Youssef_Magdy_Lebenslauf.pdf",
  },
} as const;

/** Rotating roles under the hero name, rendered with a typewriter effect. */
export const ROLES = [
  "AI & Machine Learning Engineer",
  "Deep Learning Practitioner",
  "LLM & RAG Systems Builder",
  "Full-Stack Engineer",
];

export const SKILL_GROUPS = [
  {
    id: "ai",
    en: "AI & Machine Learning",
    de: "KI & Maschinelles Lernen",
    items: [
      "LLMs",
      "Transformers",
      "Neural Networks",
      "Deep Neural Networks",
      "Transfer Learning",
      "Convolutional NNs",
      "Fine-tuning",
      "Embeddings",
      "RAG",
      "Knowledge Graphs",
      "Computer Vision",
      "TensorFlow Lite",
      "YOLO",
    ],
  },
  {
    id: "lang",
    en: "Languages",
    de: "Sprachen",
    items: [
      "Python",
      "Java",
      "Dart",
      "TypeScript",
      "JavaScript",
      "C",
      "SQL",
      "Lua",
      "Bash",
    ],
  },
  {
    id: "frameworks",
    en: "Frameworks & Libraries",
    de: "Frameworks & Bibliotheken",
    items: [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "Hugging Face",
      "OpenCV",
      "Spring Boot",
      "FastAPI",
      "Flutter",
      "Riverpod",
      "React",
      "Node.js",
      "Express.js",
      "Streamlit",
      "Tailwind CSS",
    ],
  },
  {
    id: "data",
    en: "Data & Storage",
    de: "Daten & Speicher",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Neo4j",
      "DynamoDB",
      "Redis",
      "Elasticsearch",
      "FAISS",
      "Firebase",
      "Supabase",
      "Power BI",
    ],
  },
  {
    id: "cloud",
    en: "Cloud & Infrastructure",
    de: "Cloud & Infrastruktur",
    items: [
      "AWS (EC2, S3, Lambda)",
      "CloudFront",
      "EKS",
      "CloudFormation",
      "Kubernetes",
      "Docker",
      "Kafka",
      "RabbitMQ",
      "gRPC",
      "Prometheus",
      "Grafana",
      "Linux",
    ],
  },
  {
    id: "practices",
    en: "Engineering Practices",
    de: "Arbeitsweisen",
    items: [
      "Microservices",
      "Test Driven Development",
      "RESTful APIs",
      "OOP",
      "Design Patterns",
      "Git & GitHub",
      "Agile",
      "SCRUM",
      "Jira",
    ],
  },
] as const;

/** Compact list used by the scrolling marquee under the hero. */
export const MARQUEE_TECH = [
  "PyTorch",
  "TensorFlow",
  "Transformers",
  "LangChain",
  "RAG",
  "YOLO",
  "Neo4j",
  "FastAPI",
  "Spring Boot",
  "Flutter",
  "Kubernetes",
  "AWS",
  "Kafka",
  "Docker",
  "React",
  "PostgreSQL",
];

const ATTENTION_PAPER = "Attention is All You Need";

export const PROJECTS: Project[] = [
  {
    title: "Deen Party — Social Party Game App",
    description:
      "A cross-platform mobile party game with 15+ real-time multiplayer modes, built in Flutter with Riverpod on top of a Nakama authoritative realtime server running custom Lua RPC modules for leaderboards, entitlements and chat moderation over WebSocket matches. A Python FastAPI backend on PostgreSQL serves 28,000+ content items alongside a server-authoritative in-app economy, a Gemini-powered AI companion, LiveKit voice rooms and IAP receipt verification for Google Play and the App Store. Also features on-device face tracking with a quantized YOLO model via TensorFlow Lite for a camera-based Quran recitation game, plus a React + TypeScript admin CMS and an event analytics pipeline with partitioned tables and daily rollups. I authored 80% of a 300+ commit codebase in a two-person team.",
    tools: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Nakama",
      "Lua",
      "FastAPI",
      "PostgreSQL",
      "LiveKit",
      "Gemini",
      "TensorFlow Lite",
      "YOLO",
      "React",
      "TypeScript",
      "Docker",
    ],
    category: "web",
    github: "https://github.com/youssefmmagdy",
    featured: true,
  },
  {
    title: "Cloud-Native Web App on AWS",
    description:
      "A highly available full-stack CRUD application deployed across multiple EC2 instances in separate Availability Zones behind an Elastic Load Balancer and fronted by CloudFront for low-latency global delivery. DynamoDB stores the dataset while S3 holds versioned image uploads linked to each record, and a Lambda function triggered on item creation resizes images through an SNS/SQS event-driven pipeline. Containerized services run on Amazon EKS, infrastructure is managed with CloudFormation, system health is monitored via CloudWatch, and access is locked down with least-privilege IAM policies and VPC security groups.",
    tools: [
      "AWS EC2",
      "Elastic Load Balancer",
      "CloudFront",
      "DynamoDB",
      "S3",
      "Lambda",
      "SNS",
      "SQS",
      "EKS",
      "CloudFormation",
      "CloudWatch",
      "IAM",
      "VPC",
      "Node.js",
      "AWS SDK",
    ],
    category: "cloud",
    video:
      "https://drive.google.com/file/d/1LGNdAXy2oKZsVQwB--JhhPC10aGgAizA/view?usp=sharing",
    featured: true,
  },
  {
    title: "Freelance Marketplace Platform",
    description:
      "A two-sided marketplace connecting freelancers with clients, built as five Spring Boot microservices — User, Job, Proposal, Contract and Payment — each backed by PostgreSQL for transactional data. A polyglot persistence layer adds MongoDB for portfolios and threaded messaging, Neo4j for graph-based skill matching, Elasticsearch for full-text job search with filters, and Redis for caching active listings and sessions. Services communicate over OpenFeign, RabbitMQ, Kafka and gRPC, applying Saga, Observer, Mediator and Builder patterns, and the platform runs on Kubernetes with Prometheus and Grafana monitoring. I served as Scrum Master, driving sprint planning and backlog grooming across the team.",
    tools: [
      "Spring Boot",
      "Microservices",
      "PostgreSQL",
      "MongoDB",
      "Neo4j",
      "Elasticsearch",
      "Redis",
      "Kafka",
      "RabbitMQ",
      "gRPC",
      "OpenFeign",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "SCRUM",
    ],
    category: "cloud",
    github: "https://github.com/youssefmmagdy",
    featured: true,
  },
  {
    title: "gpt2-124M-parameters",
    description: `A PyTorch implementation of a GPT-2-style Transformer built from scratch, following the core ideas from the ${ATTENTION_PAPER} paper.`,
    tools: [
      "Transformer Architecture",
      "PyTorch",
      "LLM",
      "Deep Neural Networks",
      "Embedding",
      "Python",
    ],
    category: "ai",
    github: "https://github.com/youssefmmagdy/gpt2-124M-parameters",
    featured: true,
  },
  {
    title: "E-Commerce Graph-RAG Chatbot",
    description:
      "Intelligent e-commerce search powered by Knowledge Graphs and Large Language Models, combining sentiment analysis with graph-based retrieval.",
    tools: [
      "Neo4j Knowledge Graph",
      "LangChain",
      "HuggingFace LLMs",
      "Streamlit",
      "Python",
    ],
    category: "ai",
    github: "https://github.com/youssefmmagdy/E-Commerce-Graph-RAG",
    featured: true,
  },
  {
    title: "Smart-Irrigation Predictor — Bachelor Project",
    description:
      "A machine-learning web application predicting evapotranspiration from 15 years of historical and forecast weather data, with a RAG layer giving irrigation recommendations tailored to location, crop and soil type — supporting sustainable agriculture through data-driven decisions.",
    tools: [
      "Deep Neural Networks",
      "TensorFlow",
      "RAG",
      "API",
      "Vercel",
      "Render",
    ],
    category: "ai",
    github:
      "https://www.linkedin.com/posts/youssefmmagdy_machinelearning-deeplearning-smartirrigation-activity-7332354301714919424-Ivr2?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI",
    featured: true,
  },
  {
    title: "EuroSAT Transfer-Learning Classification",
    description:
      "Land use and land cover classification on the EuroSAT RGB dataset, benchmarking a CNN trained from scratch against transfer learning with EfficientNetB0.",
    tools: ["Transfer Learning", "TensorFlow", "CNN", "EfficientNetB0"],
    category: "ai",
    github:
      "https://github.com/youssefmmagdy/EuroSAT_TransferLearning_Classification",
  },
  {
    title: "LangChain RAG Chatbot",
    description:
      "A retrieval-augmented chatbot that lets users upload a PDF and ask grounded questions about its contents.",
    tools: ["LangChain", "HuggingFace", "FAISS", "Streamlit"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/LangChain-RAG-Streamlit",
  },
  {
    title: "Face-Recognizer",
    description:
      "Real-time face recognition built on YOLOv3-face, identifying people from a live webcam feed — usable for attendance or access-control systems.",
    tools: ["Python", "OpenCV", "Face_Recognition", "PyQt5"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/Face-Recognizer",
    download:
      "https://drive.google.com/uc?export=download&id=1ts3ocTxO3ffQDbaRRMeUGIFjk7vd_UKe",
  },
  {
    title: "Face-Detector",
    description:
      "Real-time face detection and tracking with YOLOv3-face, capturing distinct faces from images, video files or a live webcam feed.",
    tools: ["Python", "OpenCV", "Face_Recognition", "PyQt5"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/Face-Detector",
    download:
      "https://drive.google.com/uc?export=download&id=1mADwAxm1BsdAZg2wfrsEWfEj2vueqljp",
  },
  {
    title: "Lending Club Data Engineering",
    description:
      "An end-to-end data engineering and machine learning pipeline predicting loan default status from historical LendingClub data (2007–2018).",
    tools: [
      "SBERT Embedding",
      "K-Means clustering",
      "Feature Engineering",
      "PowerBI",
    ],
    category: "ai",
    github:
      "https://github.com/youssefmmagdy/Lending-Club-Dataset-Data-Engineering",
  },
  {
    title: "Music-Generator Model",
    description:
      "A deep neural network trained on an irish.abc corpus of 817 songs that composes plausible new melodies.",
    tools: ["Deep Neural Networks", "TensorFlow"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/Music_Generator",
  },
  {
    title: "Names-Generator Model",
    description:
      "The evolution of name generation across progressively more powerful neural architectures, trained on 17,000 names.",
    tools: ["Deep Neural Networks", "PyTorch", "Embedding"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/Names-Generator-NN.git",
  },
  {
    title: "Harris & SIFT Detectors",
    description:
      "A comprehensive analysis of corner and feature detection algorithms in computer vision, comparing the Harris Corner Detector against SIFT.",
    tools: ["Python", "Computer Vision"],
    category: "ai",
    github: "https://github.com/youssefmmagdy/Harris-SIFT-Detectors",
  },
  {
    title: "Teer Enta — MERN Travel Platform",
    description:
      "A group project bringing personalised recommendations, seamless booking and smart budgeting into one intuitive platform, delivered with Agile and SCRUM.",
    tools: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind",
      "SCRUM",
      "Jira",
      "RESTful APIs",
    ],
    category: "web",
    github:
      "https://www.linkedin.com/posts/youssefmmagdy_teerenta-travel-innovation-activity-7276371959221829634-l9Qc?rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI",
  },
  {
    title: "Sharelelkheir — Charity Platform",
    description:
      "A platform connecting donors with non-profit organisations, making it far easier to donate the specific items people in need are asking for.",
    tools: ["React", "Tailwind"],
    category: "web",
    github:
      "https://www.linkedin.com/posts/omar-elharridy-9a5462253_software-engineering-course-project-spring-ugcPost-7207402752178663424-5KUD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI",
  },
  {
    title: "Islamic Classroom",
    description:
      "A Google-Classroom-style app for a small school teaching children Islamic literature, reminding parents about homework, attendance and posts.",
    tools: ["Flutter", "Firebase", "Supabase", "APIs"],
    category: "web",
    github: "https://github.com/youssefmmagdy",
  },
  {
    title: "Hospital Health System",
    description:
      "An entity-relationship model of a hospital structure implemented in SQL, with an ASP.NET front end.",
    tools: ["SQL", "ASP.NET"],
    category: "web",
    github: "https://github.com/youssefmmagdy",
  },
  {
    title: "AWS EC2 Fleet Provisioning",
    description:
      "Provisioned and orchestrated rented EC2 instances to download and process 60,000 books for a website.",
    tools: ["Linux", "AWS", "Bash"],
    category: "cloud",
    github: "https://github.com/youssefmmagdy",
  },
  {
    title: "Tomasulo Algorithm",
    description:
      "An implementation of Tomasulo's algorithm for dynamic instruction scheduling, managing out-of-order execution the way a compiler would.",
    tools: ["Java", "JavaFX", "OOP"],
    category: "systems",
    github: "https://github.com/youssefmmagdy/Tomasulo-Algorithm",
  },
  {
    title: "Fillet-O-Neumann Architecture",
    description:
      "A Von Neumann machine simulator where program instructions and data share one memory unit and the same bus system.",
    tools: ["C", "Computer Architecture"],
    category: "systems",
    github: "https://github.com/youssefmmagdy/Fillet-O-Neumann",
  },
  {
    title: "Operating System Scheduler",
    description:
      "A process scheduler managing resource contention between processes, using mutexes to guarantee mutual exclusion over critical resources.",
    tools: ["C", "Concurrency"],
    category: "systems",
    github: "https://github.com/youssefmmagdy/Operating-System-Schedular",
  },
  {
    title: "Automated PDF Generator",
    description:
      "A TDD-built tool that reads an Excel customer sheet and generates a tailored PDF per customer — built for Hotel am Borsigturm in Germany.",
    tools: ["Python", "Test Driven Development (TDD)"],
    category: "systems",
    github: "https://github.com/youssefmmagdy/Automated-PDF-Generator",
  },
  {
    title: "Full Chess Game",
    description:
      "A complete chess application with board representation, legal-move validation and full game logic.",
    tools: ["Python", "Game Development"],
    category: "systems",
    github:
      "https://www.linkedin.com/posts/youssefmmagdy_%D8%A8%D8%B3%D9%85-%D8%A7%D9%84%D9%84%D9%87-%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86-%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85-%D9%88%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D8%A9-%D9%88%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A-activity-7099719778818269184-9Qca?rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI",
  },
];

type Nav = Record<
  "about" | "experience" | "skills" | "projects" | "contact",
  string
>;

export type Dictionary = {
  nav: Nav;
  a11y: {
    skipToContent: string;
    toggleMenu: string;
    toggleTheme: string;
    toggleLanguage: string;
    backToTop: string;
    primaryNav: string;
  };
  hero: {
    status: string;
    intro: string;
    description: string;
    getInTouch: string;
    viewProjects: string;
    resume: string;
    scroll: string;
  };
  stats: {
    projects: string;
    gpa: string;
    roles: string;
    graduation: string;
  };
  education: {
    label: string;
    title: string;
    university: string;
    faculty: string;
    graduation: string;
    germanGpa: string;
    usGpa: string;
    grade: string;
    usGrade: string;
    resumeLabel: string;
    resumeCta: string;
  };
  youtube: {
    label: string;
    title: string;
    cardTitle: string;
    description: string;
    cta: string;
    loading: string;
    fallbackAuthor: string;
  };
  experience: {
    label: string;
    title: string;
    experiences: {
      title: string;
      company: string;
      period: string;
      description: string;
    }[];
  };
  skills: {
    label: string;
    title: string;
    intro: string;
  };
  projects: {
    label: string;
    title: string;
    intro: string;
    filters: Record<"all" | ProjectCategory, string>;
    showAll: string;
    showLess: string;
    count: (shown: number, total: number) => string;
    featured: string;
    viewSource: string;
    download: string;
    watchDemo: string;
  };
  contact: {
    label: string;
    title: string;
    pitch: string;
    contactInfo: string;
    connect: string;
    emailCta: string;
    linkedin: string;
    github: string;
    youtube: string;
  };
  footer: {
    rights: string;
    built: string;
  };
  palette: {
    trigger: string;
    placeholder: string;
    navigation: string;
    actions: string;
    links: string;
    empty: string;
    toggleTheme: string;
    toggleLanguage: string;
    openResume: string;
    sendEmail: string;
    hintSelect: string;
    hintNavigate: string;
    hintClose: string;
  };
};

export const translations: Record<Locale, Dictionary> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    a11y: {
      skipToContent: "Skip to content",
      toggleMenu: "Toggle navigation menu",
      toggleTheme: "Toggle colour theme",
      toggleLanguage: "Switch to German",
      backToTop: "Back to top",
      primaryNav: "Primary",
    },
    hero: {
      status: "Berlin, Germany",
      intro: "Hi, I am",
      description:
        "I build intelligent systems — from Transformers written from scratch in PyTorch to retrieval-augmented chatbots, real-time multiplayer apps and cloud-native platforms on AWS. Currently finishing my B.Sc. in Computer Engineering at the German University in Cairo with an Excellent grade (GPA 1.6, German scale).",
      getInTouch: "Get in touch",
      viewProjects: "View projects",
      resume: "Résumé",
      scroll: "Scroll",
    },
    stats: {
      projects: "Projects shipped",
      gpa: "German GPA",
      roles: "Professional roles",
      graduation: "Graduating",
    },
    education: {
      label: "Education",
      title: "Academic background",
      university: "German University in Cairo",
      faculty:
        "B.Sc. Computer Engineering — Faculty of Media Engineering and Technology",
      graduation: "Aug 2021 – 2026 (Expected Graduation)",
      germanGpa: "German GPA",
      usGpa: "US GPA (4.0 scale)",
      grade: "Excellent",
      usGrade: "A−",
      resumeLabel: "Full résumé",
      resumeCta: "Open PDF",
    },
    youtube: {
      label: "Teaching",
      title: "Professional highlight",
      cardTitle: "YouTube playlist about Transformers",
      description:
        "I built a YouTube learning playlist focused on Transformers and practical AI concepts — breaking down attention, embeddings and model internals for people getting started.",
      cta: "Watch on YouTube",
      loading: "Loading playlist details…",
      fallbackAuthor: "Youssef Magdy",
    },
    experience: {
      label: "Career",
      title: "Work experience",
      experiences: [
        {
          title: "Junior Teaching Assistant",
          company: "German University in Cairo",
          period: "Sep 2024 — Dec 2024",
          description:
            "Taught Data Structures and Algorithms in Java, guiding students through worksheets and explaining core concepts in lab sessions.",
        },
        {
          title: "Technical Support Intern",
          company: "Orange Business",
          period: "Jul 2024 — Aug 2024",
          description:
            "Network security, technical support, cloud partitioning and cloud solution architecture.",
        },
        {
          title: "Software Developer Intern",
          company: "Hotel am Borsigturm, Germany",
          period: "Oct 2023 — Nov 2023",
          description:
            "Built the front-end website with HTML and Tailwind, and developed an automated PDF generator still used for customer documents.",
        },
      ],
    },
    skills: {
      label: "Toolkit",
      title: "Technical knowledge",
      intro:
        "The stack I reach for across research prototypes and production systems.",
    },
    projects: {
      label: "Work",
      title: "Selected projects",
      intro:
        "Deep learning research, RAG systems, real-time multiplayer products and cloud-native architecture.",
      filters: {
        all: "All",
        ai: "AI / ML",
        web: "Full-Stack",
        cloud: "Cloud & Distributed",
        systems: "Systems",
      },
      showAll: "Show all projects",
      showLess: "Show fewer",
      count: (shown, total) => `Showing ${shown} of ${total}`,
      featured: "Featured",
      viewSource: "View source",
      download: "Download build",
      watchDemo: "Watch demo",
    },
    contact: {
      label: "Contact",
      title: "Let's build something",
      pitch:
        "I am always happy to talk about AI engineering, machine learning research or an interesting product idea.",
      contactInfo: "Contact information",
      connect: "Connect with me",
      emailCta: "Send an email",
      linkedin: "LinkedIn",
      github: "GitHub",
      youtube: "YouTube",
    },
    footer: {
      rights: "All rights reserved.",
      built: "Built with React Router and Tailwind CSS.",
    },
    palette: {
      trigger: "Search",
      placeholder: "Jump to a section, flip the theme, open a link…",
      navigation: "Navigation",
      actions: "Actions",
      links: "Links",
      empty: "No matching commands.",
      toggleTheme: "Toggle theme",
      toggleLanguage: "Auf Deutsch wechseln",
      openResume: "Open résumé (PDF)",
      sendEmail: "Send an email",
      hintSelect: "select",
      hintNavigate: "navigate",
      hintClose: "close",
    },
  },
  de: {
    nav: {
      about: "Über mich",
      experience: "Erfahrung",
      skills: "Fähigkeiten",
      projects: "Projekte",
      contact: "Kontakt",
    },
    a11y: {
      skipToContent: "Zum Inhalt springen",
      toggleMenu: "Navigationsmenü umschalten",
      toggleTheme: "Farbschema umschalten",
      toggleLanguage: "Zu Englisch wechseln",
      backToTop: "Nach oben",
      primaryNav: "Hauptnavigation",
    },
    hero: {
      status: "Berlin, Deutschland",
      intro: "Hallo, ich bin",
      description:
        "Ich entwickle intelligente Systeme — von Transformern, die ich in PyTorch von Grund auf schreibe, über RAG-Chatbots und Echtzeit-Multiplayer-Apps bis hin zu Cloud-nativen Plattformen auf AWS. Aktuell schließe ich mein Studium der Computertechnik (B.Sc.) an der German University in Cairo mit der Note 1,6 (sehr gut) ab.",
      getInTouch: "Kontakt aufnehmen",
      viewProjects: "Projekte ansehen",
      resume: "Lebenslauf",
      scroll: "Scrollen",
    },
    stats: {
      projects: "Umgesetzte Projekte",
      gpa: "Notendurchschnitt",
      roles: "Berufliche Stationen",
      graduation: "Abschluss",
    },
    education: {
      label: "Bildung",
      title: "Akademischer Hintergrund",
      university: "German University in Cairo",
      faculty:
        "B.Sc. Computertechnik — Fakultät für Medieningenieurwesen und Technologie",
      graduation: "Aug. 2021 – 2026 (voraussichtlicher Abschluss)",
      germanGpa: "Notendurchschnitt",
      usGpa: "US GPA (4,0-Skala)",
      grade: "Sehr gut",
      usGrade: "A−",
      resumeLabel: "Vollständiger Lebenslauf",
      resumeCta: "PDF öffnen",
    },
    youtube: {
      label: "Lehre",
      title: "Professionelles Highlight",
      cardTitle: "YouTube-Playlist zu Transformern",
      description:
        "Ich habe eine YouTube-Lernplaylist rund um Transformer und praktische KI-Konzepte erstellt — Attention, Embeddings und Modell-Interna verständlich erklärt.",
      cta: "Auf YouTube ansehen",
      loading: "Playlist-Details werden geladen…",
      fallbackAuthor: "Youssef Magdy",
    },
    experience: {
      label: "Karriere",
      title: "Berufserfahrung",
      experiences: [
        {
          title: "Junior Lehrassistent",
          company: "German University in Cairo",
          period: "Sep 2024 — Dez 2024",
          description:
            "Datenstrukturen und Algorithmen mit Java unterrichtet, Studierende durch Arbeitsblätter begleitet und Kernkonzepte in Übungen erklärt.",
        },
        {
          title: "Praktikant technischer Support",
          company: "Orange Business",
          period: "Jul 2024 — Aug 2024",
          description:
            "Netzwerksicherheit, technischer Support, Cloud-Partitionierung und Cloud-Lösungsarchitektur.",
        },
        {
          title: "Praktikant Softwareentwicklung",
          company: "Hotel am Borsigturm, Deutschland",
          period: "Okt 2023 — Nov 2023",
          description:
            "Frontend-Website mit HTML und Tailwind erstellt sowie einen automatischen PDF-Generator entwickelt, der weiterhin für Kundendokumente genutzt wird.",
        },
      ],
    },
    skills: {
      label: "Werkzeuge",
      title: "Technisches Wissen",
      intro:
        "Der Stack, den ich für Forschungsprototypen und produktive Systeme einsetze.",
    },
    projects: {
      label: "Arbeiten",
      title: "Ausgewählte Projekte",
      intro:
        "Deep-Learning-Forschung, RAG-Systeme, Echtzeit-Multiplayer-Produkte und Cloud-native Architektur.",
      filters: {
        all: "Alle",
        ai: "KI / ML",
        web: "Full-Stack",
        cloud: "Cloud & Verteilt",
        systems: "Systeme",
      },
      showAll: "Alle Projekte zeigen",
      showLess: "Weniger zeigen",
      count: (shown, total) => `${shown} von ${total} sichtbar`,
      featured: "Highlight",
      viewSource: "Quellcode ansehen",
      download: "Build herunterladen",
      watchDemo: "Demo ansehen",
    },
    contact: {
      label: "Kontakt",
      title: "Lassen Sie uns etwas bauen",
      pitch:
        "Ich freue mich immer über Gespräche zu KI-Engineering, Machine-Learning-Forschung oder spannenden Produktideen.",
      contactInfo: "Kontaktinformationen",
      connect: "Vernetzen Sie sich",
      emailCta: "E-Mail schreiben",
      linkedin: "LinkedIn",
      github: "GitHub",
      youtube: "YouTube",
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      built: "Gebaut mit React Router und Tailwind CSS.",
    },
    palette: {
      trigger: "Suche",
      placeholder: "Abschnitt öffnen, Design wechseln, Link aufrufen…",
      navigation: "Navigation",
      actions: "Aktionen",
      links: "Links",
      empty: "Keine passenden Befehle.",
      toggleTheme: "Design wechseln",
      toggleLanguage: "Switch to English",
      openResume: "Lebenslauf öffnen (PDF)",
      sendEmail: "E-Mail schreiben",
      hintSelect: "auswählen",
      hintNavigate: "navigieren",
      hintClose: "schließen",
    },
  },
};
