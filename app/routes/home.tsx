import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Youssef Magdy" },
    { name: "description", content: "Professional portfolio of Youssef Magdy - Software Engineer specializing in AI, Machine Learning, and Full-Stack Development" },
  ];
}

// Icons as simple SVG components
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// Data
const technicalSkills = [
  "LLMs", "Neural Networks", "Transfer Learning", "Convolutional NNs", "Transformer", "Fine-tuning", "Embedding",
  "Test Driven Development (TDD)", "Git & GitHub", "Linux", "Bash", "OOP", "RESTful APIs", "Agile", "SCRUM", "Jira"
];

const projects = [
  
  {
    title: "Face-Detector",
    description: "A real-time face detection and tracking system built with YOLOv3-face, capable of detecting and capturing distinct faces from images, videos, or live webcam feeds.",
    tools: ["Python", "OpenCV", "Face_Recognition", "PyQt5"],
    github: "https://github.com/youssefmmagdy/Face-Detector"
  },
  {
    title: "E-Commerce Sentiment Analysis | Knowledge Graph | Graph-RAG-Chatbot",
    description: "Intelligent E-Commerce Search powered by Knowledge Graphs + Large Language Models.",
    tools: ["Streamlit", "Python", "Neo4j Knowledge Graph", "LangChain", "HuggingFace LLMs"],
    github: "https://github.com/youssefmmagdy/E-Commerce-Graph-RAG"
  },
  {
    title: "Harris-SIFT-Detectors",
    description: "A comprehensive analysis of corner detection and feature detection algorithms in computer vision, comparing Harris Corner Detector and SIFT techniques.",
    tools: ["Python"],
    github: "https://github.com/youssefmmagdy/Harris-SIFT-Detectors"
  },
  {
    title: "Lending-Club-Dataset-Data-Engineering",
    description: "An end-to-end data engineering and machine learning pipeline for predicting loan default status using historical LendingClub loan data (2007–2018).",
    tools: ["SBERT Embedding", "K-Means clustering", "Feature Engineering", "PowerBI"],
    github: "https://github.com/youssefmmagdy/Lending-Club-Dataset-Data-Engineering"
  },
  {
    title: "LangChain-RAG-Streamlit",
    description: "A RAG chatbot that allows users to upload a PDF and ask questions about its content.",
    tools: ["LangChain", "HuggingFace", "Streamlit", "FAISS"],
    github: "https://github.com/youssefmmagdy/LangChain-RAG-Streamlit"
  },
  {
    title: "EuroSAT TransferLearning Classification",
    description: "Land Use and Land Cover (LULC) classification using the EuroSAT RGB dataset. Compares a baseline CNN trained from scratch with transfer learning using EfficientNetB0.",
    tools: ["Transfer Learning", "TensorFlow", "CNN", "EfficientNetB0"],
    github: "https://github.com/youssefmmagdy/EuroSAT_TransferLearning_Classification"
  },
  {
    title: "gpt2-124M-parameters",
    description: "A PyTorch implementation of a GPT-2-style Transformer model, built from scratch by following the core ideas from the 'Attention is All You Need' paper.",
    tools: ["Transformer Architecture", "Python", "LLM", "Deep Neural Networks", "Embedding", "PyTorch"],
    github: "https://github.com/youssefmmagdy/gpt2-124M-parameters"
  },
  {
    title: "Smart-Irrigation-Predictor Bachelor Project (DNN & RAG system)",
    description: "A machine learning-powered web application that predicts Evapotranspiration (ET) using 15 years of historical and forecasted weather data. It offers intelligent irrigation recommendations tailored to location, crop, and soil type — supporting sustainable agriculture through data-driven decisions.",
    tools: ["Deep Neural Networks", "Tensorflow", "RAG", "Vercel Frontend Deploy", "Render Backend Deploy", "API"],
    github: "https://www.linkedin.com/posts/youssefmmagdy_machinelearning-deeplearning-smartirrigation-activity-7332354301714919424-Ivr2?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI"
  },
  {
    title: "Music-Generator-Model Deep Neural Network",
    description: "A Deep Neural Network trained on irish.abc file that contains 817 songs and generates likely.",
    tools: ["Deep Neural Networks", "Tensorflow"],
    github: "https://github.com/youssefmmagdy/Music_Generator"
  },
  {
    title: "AWS EC2 instances",
    description: "We were downloading 60000 books to a website, so we had to rent instances (computers)",
    tools: ["Linux", "AWS", "Bash"],
    github: "https://github.com/youssefmmagdy"
  },
  {
    title: "Names-Generator-Model Deep Neural Network",
    description: "This project demonstrates the evolution of name generation using progressively more powerful neural network models that trained on 17000 names.",
    tools: ["Deep Neural Networks", "PyTorch", "Embedding"],
    github: "https://github.com/youssefmmagdy/Names-Generator-NN.git"
  },
  {
    title: "Full-Stack-Website (Group projekt) with MERN-Stack",
    description: "Teer Enta brings together personalized recommendations, seamless booking, and smart budgeting into one intuitive platform.",
    tools: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind", "Agile", "SCRUM", "Jira", "Restful APIs"],
    github: "https://www.linkedin.com/posts/youssefmmagdy_teerenta-travel-innovation-activity-7276371959221829634-l9Qc?rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI"
  },
  {
    title: "Charity web application",
    description: "building a website that Grants people the ability to connect with non-profit organizations in a much easier form so that they can donate items needed to help people in need, and today we want to showcase that project with you all: Introducing “Sharelelkheir”, your platform that connects Donors to People in need like never before!",
    tools: ["React", "Tailwind"],
    github: "https://www.linkedin.com/posts/omar-elharridy-9a5462253_software-engineering-course-project-spring-ugcPost-7207402752178663424-5KUD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI"
  },
  {
    title: "Implementation of Tomasulo-Algorithm",
    description: "Implementing Tomasulo algorithm that manages how the sequential operations run efficiently, act like a compiler.",
    tools: ["Java", "Javafx", "OOP"],
    github: "https://github.com/youssefmmagdy/Tomasulo-Algorithm"
  },
  {
    title: "Full Chess Game",
    description: "A complete chess application with board representation, move validation, and game logic.",
    tools: ["Python", "Game Development"],
    github: "https://www.linkedin.com/posts/youssefmmagdy_%D8%A8%D8%B3%D9%85-%D8%A7%D9%84%D9%84%D9%87-%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86-%D8%A7%D9%84%D8%B1%D8%AD%D9%8A%D9%85-%D9%88%D8%A7%D9%84%D8%B5%D9%84%D8%A7%D8%A9-%D9%88%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85-%D8%B9%D9%84%D9%8A-activity-7099719778818269184-9Qca?rcm=ACoAADwBd8EBNGc8dzxIODFo9W8Eoa0NM9QhTyI"
  },
  {
    title: "Automatik PDF-Generator",
    description: "Algorithm that takes an excel file that contains customer and generates PDF for every customer, used for Hotel am Borsigturm in Germany.",
    tools: ["Python", "Test Driven Development (TDD)"],
    github: "https://github.com/youssefmmagdy/Automated-PDF-Generator"
  },
  {
    title: "Health system",
    description: "Built Entity Relationship diagram of a hospital structure by using SQL and as frontend ASP.NET.",
    tools: ["SQL", "ASP.NET"],
    github: "https://github.com/youssefmmagdy"
  },
  {
    title: "Fillet-O-Neumann Computer architecture",
    description: "The Von Neumann architecture is a computer design where both program instructions and data are stored in the same memory unit, using the same pathways or bus system",
    tools: ["C"],
    github: "https://github.com/youssefmmagdy/Fillet-O-Neumann"
  },
  {
    title: "Operating-System-Schedular",
    description: "Scheduler manages the usage of resources between the different processes. Mutexes that ensure mutual exclusion over the critical resources. Scheduler that schedules the processes that we have in our system.",
    tools: ["C"],
    github: "https://github.com/youssefmmagdy/Operating-System-Schedular"
  },
  {
    title: "islamic_classroom",
    description: "Like Google classroom, made for a small school that teaches children about Islamic literature, that reminds the children’s parents for doing homework or attendance or posts and so on.",
    tools: ["Flutter", "Firebase", "Supabase", "APIs"],
    github: "https://github.com/youssefmmagdy"
  }
];

const experiences = [
  {
    title: "Junior Teaching Assistant",
    company: "German University in Cairo",
    period: "Sep 2024 - Dec 2024",
    description: "Data Structures and Algorithms with Java - Helping and explaining to students in worksheets"
  },
  {
    title: "Software Developer Intern",
    company: "Hotel Am Borsigturm, Germany",
    period: "Oct 2023 - Nov 2023",
    description: "Built Frontend website using HTML & Tailwind  |  Developed Automated-PDF-Generator"
  },
  {
    title: "Technical Support Intern",
    company: "Orange Business",
    period: "Jul 2024 - Aug 2024",
    description: "Network Security, Technical Support, Cloud Partitioner and Cloud Solution Architect"
  }
];

export default function Home() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-900">Youssef Magdy</a>
            <div className="hidden md:flex gap-8">
              <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>About</a>
              <a href="#experience" className="nav-link" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a>
              <a href="#skills" className="nav-link" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a>
              <a href="#projects" className="nav-link" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a>
              <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Youssef Magdy
              </h1>
              <p className="text-2xl text-red-700 font-medium mb-6">
                Software Engineer & AI Enthusiast
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Passionate software engineer specializing in AI, Machine Learning, and Full-Stack Development. 
                Currently pursuing my degree at the German International University in Berlin with a GPA of 1.46. 
                I love building intelligent systems that solve real-world problems.
              </p>
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-red-700 hover:text-red-700 transition-colors"
                  onClick={(e) => handleNavClick(e, '#projects')}
                >
                  View Projects
                </a>
              </div>
            </div>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              <img 
                src="public/soora.jpg" 
                alt="Youssef Magdy Profile Picture" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Education Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Education</h2>
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">German International University in Berlin</h3>
                <p className="text-red-700 font-medium">Faculty of Media Engineering and Technology</p>
                <p className="text-gray-600 mt-2">Expected Graduation: 2026</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-bold text-lg">
                  GPA: 1.46
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Work Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="card border-l-4 border-l-red-700">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-red-700 font-medium">{exp.company}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                  <span className="mt-2 md:mt-0 text-sm text-gray-500 font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Technical Knowledge</h2>
          <div className="flex flex-wrap gap-3">
            {technicalSkills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{project.title}</h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
                    aria-label="View on GitHub"
                  >
                    <ExternalLinkIcon />
                  </a>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a href="mailto:Youssefmmagdy55@gmail.com" className="contact-link">
                  <EmailIcon />
                  <span>Youssefmmagdy55@gmail.com</span>
                </a>
                <div className="contact-link">
                  <PhoneIcon />
                  <span>+49 176 36535652</span>
                </div>
                <div className="contact-link">
                  <LocationIcon />
                  <span>Tegel, Berlin, Germany</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/youssefmmagdy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/youssefmmagdy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Youssef Magdy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
