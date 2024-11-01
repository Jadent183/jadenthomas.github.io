
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import emailjs from '@emailjs/browser';
import profileImg from '/src/assets/images/JadenThomas_Technology.JPG';
import snackTrackrImg from '/src/assets/images/MacroScan.png';
import parserImg from '/src/assets/images/c++parser.png';
import gameCrafterImg from '/src/assets/images/2dGameEngine.png';
import prepMateImg from '/src/assets/images/PrepMate.png';
import intelliNotes from '/src/assets/images/IntelliNotes2.png';



const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [isVisible, setIsVisible] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const form = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    // Observe sections
    document.querySelectorAll('section').forEach((section) => {
      if (section.id) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };



  // Email Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    emailjs.sendForm(
      'service_zuo079p', 
      'template_xkrll4o', 
      form.current,
      'gf4BQpcVQ_ACcuvzi' 
    )
      .then((result) => {
        setFormStatus('success');
        form.current.reset();
        setTimeout(() => setFormStatus(''), 5000); // Clear status after 5 seconds
      }, (error) => {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 5000);
      });
  };


  // Resume Download
  const handleDownload = async () => {
    try {
      const response = await fetch('/src/assets/JadenThomasResume.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'JadenThomasResume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };


  const projects = [
    {
      title: "PrepMate",
      image: prepMateImg,
      description: "An AI-powered recipe generation web app that allows you to provide ingredients or pictures of ingredients and generate recipes complete with nutrition facts and cooking steps",
      link: "https://github.com/Jadent183/PrepMate-mlh"
    },
    {
      title: "IntelliNotes",
      image: intelliNotes,
      description: "A generative note-taking tool which allows students to record live lecture audio in any language and generate notes, quizzes, and visual aid",
      link: "https://github.com/Jadent183/itellinote2s"
    },
    {
      title: "SnackTrackr",
      image: snackTrackrImg,
      description: "A calorie tracking dashboard which allows you to scan barcodes or input individual items and get the nutrition information for tracking daily/weekly calorie intake",
      link: "https://github.com/Jadent183/SnackTrackr"
    },
    {
      title: "PredictaParse",
      image: parserImg,
      description: "A C++ predictive descent parser which recognizes a customized programming language",
      link: "https://github.com/Jadent183/CSE-340-Predictive-Descent-Parser"
    },
    {
      title: "GameCrafter++",
      image: gameCrafterImg,
      description: "A C++ customizable game creation tool which allows you to create and play your own 2D custom console game",
      link: "https://github.com/Jadent183/GameCrafter"
    }
  ];


  // //   const projects = [
// //     // {
// //     //   title: "PrepMate",   
// //     //   image: prepMateImg,
// //     //   description: "An AI-powered recipe generation web app that allows you to provide ingredients or pictures of ingredients and generate recipes complete with nutrition facts and cooking steps",
// //     //   link: "https://github.com/Jadent183/PrepMate-mlh"
// //     // },
// //     // {
// //     //   title: "IntelliNotes",
// //     //   image: intellinoteImg,
// //     //   description: "A generative note-taking tool which allows students to record live lecture audio in any language and generate notes, quizzes, and visual aid",
// //     //   link: "https://github.com/Jadent183/itellinote2s"
// //     // },
// //     // {
// //     //   title: "SnackTrackr",
// //     //   image: snackTrackrImg,
// //     //   description: "A calorie tracking dashboard which allows you to scan barcodes or input individual items and get the nutrition information for tracking daily/weekly calorie intake",
// //     //   link: "https://github.com/Jadent183/SnackTrackr"
// //     // },
// //     // {
// //     //   title: "PredictaParse",
// //     //   image: parserImg,
// //     //   description: "A C++ predictive descent parser which recognizes a customized programming language",
// //     //   link: "https://github.com/Jadent183/CSE-340-Predictive-Descent-Parser"
// //     // },
// //     // {
// //     //   title: "GameCrafter++",
// //     //   image: gameCrafterImg,
// //     //   description: "A C++ customizable game creation tool which allows you to create and play your own 2D custom console game",
// //     //   link: "https://github.com/Jadent183/GameCrafter"
// //     // }
// //   ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header/Hero Section */}
      <header className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="animate-fadeIn">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-rose-500">Jaden Thomas</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">Software Engineer</p>
            <div className="flex gap-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-rose-500 rounded-lg hover:bg-rose-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20"
              >
                Contact Me
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="px-6 py-3 border border-rose-500 rounded-lg hover:bg-rose-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20"
              >
                View Work
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section 
        id="about" 
        className={`py-20 bg-gray-800 transform transition-all duration-1000 
          ${isVisible['about'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="transform transition-all duration-500 hover:scale-105 max-w-md mx-auto">
                <img 
                  src={profileImg}
                  alt="Jaden Thomas" 
                  className="w-full h-auto rounded-lg shadow-xl object-cover hover:shadow-2xl transition-shadow duration-300"
                  style={{ maxHeight: '1500px' }} 
                />
                  <div className="w-full bg-gray-700 rounded-lg shadow-xl"></div>
                </div>
                <div>
                <p className="text-gray-300 mb-8">
                  Hello, I'm Jaden Thomas, a Software Engineer with a passion for building innovative solutions. 
                  My experience spans across web development, artificial intelligence, and algorithm implementation, 
                  allowing me to tackle diverse technical challenges.
                  <br /><br />
                  I'm driven by creating efficient, scalable solutions and continuously exploring new technologies 
                  to expand my skill set. Whether it's developing intuitive web applications or working with complex 
                  algorithms, I enjoy the process of turning ideas into reality through code.
                </p>
              
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setActiveTab('skills')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 
                    ${activeTab === 'skills' ? 'bg-rose-500' : 'hover:bg-gray-700'}`}
                >
                  Skills
                </button>
                <button 
                  onClick={() => setActiveTab('education')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 
                    ${activeTab === 'education' ? 'bg-rose-500' : 'hover:bg-gray-700'}`}
                >
                  Education
                </button>
              </div>

              <div className="min-h-[150px] transition-all duration-300">
                {activeTab === 'skills' && (
                  <ul className="space-y-4">
                    <li className="transform transition-all duration-300 hover:translate-x-2">
                      <span className="text-rose-500 font-semibold">Programming</span>
                      <br />Software Engineering
                    </li>
                    <li className="transform transition-all duration-300 hover:translate-x-2">
                      <span className="text-rose-500 font-semibold">UI/UX</span>
                      <br />Web Designing
                    </li>
                    <li className="transform transition-all duration-300 hover:translate-x-2">
                      <span className="text-rose-500 font-semibold">Hardware</span>
                      <br />Computer Organization
                    </li>
                  </ul>
                )}
                {activeTab === 'education' && (
                  <ul className="space-y-4">
                    <li className="transform transition-all duration-300 hover:translate-x-2">
                      <span className="text-rose-500 font-semibold">College</span>
                      <br />Arizona State University - BS, Computer Science
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section 
        id="portfolio" 
        className={`py-20 transform transition-all duration-1000 
          ${isVisible['portfolio'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group relative rounded-lg overflow-hidden bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl, h-64"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover transform transition-all duration-300 group-hover:scale-110"
                />
                <div className="w-full h-64 bg-gray-700 transform transition-all duration-500 group-hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      {project.description}
                    </p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200"
                    >
                      View Project <ExternalLink size={16} className="transform transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
      id="contact" 
      className={`py-20 bg-gray-800 transform transition-all duration-1000 
        ${isVisible['contact'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6">
              <a 
                href="mailto:jadent183@gmail.com" 
                className="flex items-center gap-4 text-gray-300 hover:text-rose-500 transition-colors duration-300 transform hover:translate-x-2"
              >
                <Mail />
                jadent183@gmail.com
                </a>
              <p className="flex items-center gap-4 text-gray-300">
                <Phone />
                (480) 789-0436
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/jaden-thomas-1b1307187/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-rose-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://github.com/Jadent183" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-rose-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Github size={24} />
                </a>
              </div>
              <button 
                onClick={handleDownload}
                className="inline-block px-6 py-3 bg-rose-500 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20"
              >
                Download Resume
                </button>
            </div>
          </div>
          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02]"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02]"
              required
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02]"
              required
            />
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className={`px-6 py-3 bg-rose-500 rounded-lg hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed
                ${formStatus === 'sending' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
              <div className="text-green-500 mt-2 animate-fadeIn">
                Message sent successfully!
              </div>
            )}
            {formStatus === 'error' && (
              <div className="text-red-500 mt-2 animate-fadeIn">
                Failed to send message. Please try again.
              </div>
            )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;