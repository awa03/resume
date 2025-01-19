import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { ErrorBoundary } from 'react-error-boundary';

// Custom hook for Intersection Observer
const useIntersectionObserver = (callback, options = { threshold: 0.1 }) => {
  const observer = useRef(null);
  const elementsRef = useRef(new Set());

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          if (options.once) observer.current.unobserve(entry.target);
        }
      });
    }, options);

    elementsRef.current.forEach(element => {
      if (element) observer.current.observe(element);
    });

    return () => {
      if (observer.current) {
        elementsRef.current.forEach(element => {
          if (element) observer.current.unobserve(element);
        });
      }
    };
  }, [callback, options]);

  return (element) => {
    if (element && !elementsRef.current.has(element)) {
      elementsRef.current.add(element);
      if (observer.current) observer.current.observe(element);
    }
  };
};

// Animated Section Component
const AnimatedSection = ({ children, className, delay = 0, role = 'region', ariaLabel }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const addToObserver = useIntersectionObserver((target) => {
    target.classList.add('animate-in');
    setIsVisible(true);
  });

  useEffect(() => {
    if (elementRef.current) {
      addToObserver(elementRef.current);
    }
  }, [addToObserver]);

  return (
    <div 
      ref={elementRef}
      className={`opacity-0 translate-y-10 ${className}`}
      style={{
        transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      }}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, tech, link, delay }) => (
  <AnimatedSection delay={delay}>
    <div className="h-full bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col  dark:bg-gray-800">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 dark:text-blue-500">{title}</h3>
      <div className="flex-grow overflow-hidden">
        <p className="text-gray-600 text-sm md:text-base line-clamp-6 dark:text-gray-200">{description}</p>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs md:text-sm dark:bg-purple-950"
            >
              {item}
            </span>
          ))}
        </div>
        <a 
          href={link}
          className="text-blue-600 hover:text-blue-800 text-sm md:text-base font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      </div>
    </div>
  </AnimatedSection>
);

// Skill Bar Component
const SkillBar = ({ title, level, color, skills, percent }) => (
  <div>
    <div className="flex justify-between mb-2 dark:text-white">
      <span className="font-medium text-gray-700 dark:text-gray-200">{title}</span>
      <span className={`text-${color}-600`}>{level}</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full dark:text-white">
      <div 
        className={`h-2 bg-blue-600 rounded-full`}
        style={{ width: `${percent}%` }} // Dynamically sets the width based on percent
      />
    </div>
    <div className="mt-2 flex gap-2 flex-wrap dark:text-white">
      {skills.map((skill, index) => (
        <span key={index} className="text-sm text-gray-600">{skill}</span>
      ))}
    </div>
  </div>
);

// Experience Card Component
const ExperienceCard = ({ title, company, period, points, delay, color }) => (
  <AnimatedSection delay={delay}>
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:shadow-gray-900 dark:bg-gray-800">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-400">{title}</h3>
      <p className={`text-${color}-600 mb-4`}>{company} • {period}</p>
      <ul className="space-y-3 text-gray-600 text-sm md:text-base dark:text-gray-200">
        {points.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
    </div>
  </AnimatedSection>
);

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const parallaxRef = useRef();
  const [darkMode, setDarkMode] = useState(true);

  const scrollTo = (page) => {
    parallaxRef.current?.scrollTo(page);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  const projects = [
    {
      title: "Chess Engine",
      description: "Developed a chess engine in C++ using SFML, featuring a fully interactive board that highlights possible moves, validates move legality, and indicates check status in real-time. Planned enhancements include implementing a custom-built neural network to serve as an AI opponent, aiming for a responsive and challenging gameplay experience.",
      tech: ["C++", "SFML", "AI", "Neural Network"],
      link: "https://github.com/awa03/Chess-AI",
      delay: 0.2
    },
    {
      title: "Canvas Remake",
      description: "This project represents my endeavor to replicate the renowned grading platform 'Canvas,' showcasing my skills in both backend and frontend development. Utilizing C# for the backend, I integrated a REST API to ensure seamless data management, enhancing the overall functionality of the application. This comprehensive approach marks my first foray into full-stack development, reflecting my capability to handle large-scale projects that can serve millions of users effectively.",
      tech: ["AWS Lambda", "Kinesis", "DynamoDB", "Node.js"],
      link: "https://github.com/awa03/Canvas_App",
      delay: 0.4
    },
    {
      title: "Ray Tracer",
      description: "I constructed a ray tracer using the C++ language, showcasing my ability to translate complex mathematical concepts into practical applications. By leveraging my knowledge of vector algebra, I calculated ray paths to achieve realistic rendering effects. This project not only demonstrated my adaptability and quick learning in tackling new challenges but also expanded my proficiency in applying mathematical principles to solve real-world problems.",
      tech: ["C++", "Linear Algebra", "Make"],
      link: "https://github.com/awa03/Chess-AI",
      delay: 0.6
    },
    {
      title: "Do Not Resusitate",
      description: "The purpose of this project was to develop a cohesive project for my CEN4090L course. Within this project I worked with 4 other group mates to develop a game in which the player defeat waves of enemies in a tower defense style. I was responsible for developing the tutorial scenes, the save data, the shop, as well as the player. Additionally, I learned c# in order to complete this project. This project taught me valuble skills in teamwork, and communication.",
      link: "https://github.com/awa03/Do_Not_Resuscitate",
      tech: ["C++", "Linear Algebra", "Make"],
      delay: 0.8,
    }
  ];

  const experiences = [
    {
      title: "Research Assistant",
      company: "Florida State University",
      period: "2024 - Present",
      color: "purple",
      points: [
        "Collected data from 200+ students to train and enhance the neural network model.",
        "Designed and implemented tools for detecting and analyzing deepfake images and videos",
        "Leveraging web development expertise to create a project website to showcase results and functionality."
      ],
      delay: 0.2
    },
    {
      title: "FullStack Engineer",
      company: "Scientiae",
      period: "2024 - Present",
      color: "purple",
      points: [
        "Developed a full-stack website from scratch using Docker for containerization, Go for backend development, and HTML, CSS, and JavaScript for the frontend.",
        "Implemented dynamic features such as a mailing list system and a form creation tool akin to Google Forms.",
        "Designed and managed a PostgreSQL database for robust data storage and retrieval.",
        "Created an event planning module to facilitate user-friendly scheduling and management of events."
      ],
      delay: 0.4
    },
    {
      title: "Software Engineering Intern",
      company: "AIM HI",
      period: "2024 - 2024",
      color: "blue",
      points: [
        "Contributed to the development of AIM HI's website using React, improving user engagement and functionality.",
        "Played a key role in building AI image generation tools, and enhancing product features and performance.",
        "Attended strategy meetings, offering valuable insights to guide project direction and implementation.",
        "Directly communicated with potential customers, gathering feedback and aligning development with user needs."
      ],
      delay: 0.6
    }
  ];

  const sections = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const Navigation = ({ scrollTo, sections }) => (
  <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
    {sections.map((section, index) => (
      <div key={index} className="mb-4">
        <button
          onClick={() => scrollTo(index)}
          className="relative flex items-center justify-center w-3 h-3 bg-gray-200 dark:bg-gray-800 
            shadow-lg group hover:w-fit hover:h-auto hover:px-10 hover:py-10 
            hover:bg-blue-700 dark:hover:bg-blue-800
            transition-all duration-300 rounded-full"
          aria-label={`Scroll to ${section}`}
        >
          <span className="absolute opacity-0 text-xs text-white group-hover:opacity-100 
            whitespace-nowrap transition-opacity duration-300">
            {section}
          </span>
        </button>
      </div>
    ))}
  </nav>
);

  const skills = [
  {
    title: "Backend Development",
    level: "Advanced",
    color: "blue",
    skills: ["Python", "Go", "Node.js", "C++", "C", "C#"],
    percent: 90 // Example: Backend Development is 90% filled
  },
  {
    title: "Frontend Development",
    level: "Proficient",
    color: "indigo",
    skills: ["HTML/CSS", "React", "TypeScript", "Next.js"],
    percent: 75 // Example: Frontend Development is 75% filled
  },
  {
    title: "Cloud & Infrastructure",
    level: "Proficient",
    color: "purple",
    skills: ["AWS", "GCP", "Kubernetes", "Terraform"],
    percent: 80 
  }
];
  skills.map((skill, index) => (
  <SkillBar 
    key={index}
    title={skill.title}
    level={skill.level}
    color={skill.color}
    skills={skill.skills}
    percent={skill.percent} // Pass percent to control the width
  />
));

  return (
    <div className={`w-full h-screen ${darkMode ? 'dark' : ''}`}>
      <style>
        {`
.parallax-layer {
  margin: 0;
  padding: 0;
}

.animate-in {
opacity: 1 !important;
transform: translateY(0) !important;
}

.line-clamp-6 {
display: -webkit-box;
-webkit-line-clamp: 6;
-webkit-box-orient: vertical;
overflow: hidden;
}

@media (max-width: 640px) {
.text-6xl {
font-size: 2.5rem;
}
.text-4xl {
font-size: 2rem;
}
.text-2xl {
font-size: 1.5rem;
}
.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          
          .line-clamp-6 {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          @media (max-width: 640px) {
            .text-6xl { font-size: 2.5rem; }
            .text-4xl { font-size: 2rem; }
            .text-2xl { font-size: 1.5rem; }
          }

          /* Dark mode transitions */
          .dark .dark-transition {
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
          }
}
`}
      </style>

       <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? '🌞' : '🌙'}
      </button>


      
      <Navigation scrollTo={scrollTo} sections={sections} />


<Parallax pages={6} ref={parallaxRef} className="bg-slate-50 dark:bg-gray-900">
  {/* Hero Section */}
  <ParallaxLayer
    offset={0}
    speed={0.1}
    className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-800 dark:from-gray-900 dark:to-blue-900 "
  >
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full px-4 md:px-8">
      <AnimatedSection className="text-white md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Aiden Allen</h1>
        <p className="text-xl md:text-2xl text-purple-100 dark:text-purple-200">Research Assistant & Fullstack Engineer</p>
        <p className="mt-4 text-base md:text-lg text-purple-200 dark:text-purple-300">
          Specializing in Full Stack Development, Cloud Architecture, and scalable web applications, 
          with strong proficiency in C++, Go, JavaScript, and cloud technologies.
        </p>
      </AnimatedSection>
      <AnimatedSection className="mt-8 md:mt-0 md:w-1/3" delay={0.2}>
        <div className="w-90 h-auto md:w-70  sm:w-64  rounded-2xl overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-sm">
          <img
            src="hero_img.jpeg"
            alt="Aiden Allen"
            className="w-full h-full object-cover"
          />
        </div>
      </AnimatedSection>
    </div>
  </ParallaxLayer>

  {/* About Section */}
  <ParallaxLayer
    offset={1}
    speed={0.2}
    className="flex items-center p-4 md:p-8 min-h-fit"
  >
    <AnimatedSection className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg p-6 md:p-8 rounded-xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">About Me</h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        With 5 years of programming experience, I specialize in building dynamic, full-stack applications 
        and machine learning models. Currently, I'm a Fullstack Developer at Scientiae, where I focus on 
        backend and frontend development for scalable web applications. I've previously contributed to 
        the development of AI image generation tools and enhanced user experiences during my internship 
        at AIM HI. My expertise spans C++, Go, JavaScript, and data science, and I am passionate about 
        solving real-world problems using cutting-edge technology.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="px-3 py-1 md:px-4 md:py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium">
          Cloud Architecture
        </span>
        <span className="px-3 py-1 md:px-4 md:py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
          System Design
        </span>
        <span className="px-3 py-1 md:px-4 md:py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm font-medium">
          ML Ops
        </span>
      </div>
    </AnimatedSection>
  </ParallaxLayer>

  {/* Skills Section */}
  <ParallaxLayer
    offset={1.7}
    speed={0.2}
    className="flex justify-center items-center p-4 md:p-8 min-h-fit mb-6"
  >
    <AnimatedSection className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Technical Expertise</h2>
      <div className="space-y-6 dark:text-white">
        {skills.map((skill, index) => (
          <SkillBar key={index} {...skill} />
        ))}
      </div>
    </AnimatedSection>
  </ParallaxLayer>

  {/* Projects Section */}
  <ParallaxLayer
    offset={2.6}
    speed={0.1}
    className="flex items-center justify-center min-h-fit p-4 md:p-8"
  >
    <div className="max-w-6xl w-full">
      <AnimatedSection className="text-center mb-3">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-5">Featured Projects</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="h-full">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  </ParallaxLayer>

  {/* Experience Section */}
  <ParallaxLayer
    offset={4}
    speed={0.3}
    className="flex items-center justify-center min-h-fit p-4 md:p-8"
  >
    <div className="max-w-3xl w-full">
      <AnimatedSection className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Work Experience</h2>
      </AnimatedSection>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </div>
    </div>
  </ParallaxLayer>

  {/* Contact Section */}
  <ParallaxLayer
    offset={5}
    speed={0.2}
    className="flex items-center justify-center min-h-fit bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 p-4 md:p-8"
  >
    <AnimatedSection className="text-center text-white w-full max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
      <p className="text-lg md:text-xl mb-6">aiden.allen@protonmail.com</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="linkedin.com/in/aiden-allen-a7385421a"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-lg text-purple-600 dark:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg text-sm md:text-base"
        >
          LinkedIn Profile
        </a>
        <a
          href="https://github.com/awa03"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-gray-800 px-4 py-2 md:px-6 md:py-3 rounded-lg text-blue-600 dark:text-blue-300 font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300 shadow-lg text-sm md:text-base"
        >
          GitHub Profile
        </a>
      </div>
      <p className="mt-8 text-purple-200 dark:text-purple-300">Based in Tallahassee, FL</p>
    </AnimatedSection>
  </ParallaxLayer>
</Parallax>

    </div>
  );
};

export default App;

