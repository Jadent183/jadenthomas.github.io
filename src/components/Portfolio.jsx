import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Radar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import profileImg from '/src/assets/images/jaden-headshot.jpg';
import snackTrackrImg from '/src/assets/images/MacroScan.png';
import parserImg from '/src/assets/images/c++parser.png';
import gameCrafterImg from '/src/assets/images/2dGameEngine.png';
import prepMateImg from '/src/assets/images/prepmate-web.png';
import intelliNotesImg from '/src/assets/images/IntelliNotes2.png';
import pharminiImg from '/src/assets/images/PharminiMascotLookWob.png';
import ciaimage from '/src/assets/images/CIA.jpg';

const resumeUrl = `${import.meta.env.BASE_URL}JadenThomasResume.pdf`;

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const skillGroups = [
  {
    label: 'Languages',
    items: ['C++', 'C', 'C#', 'Java', 'Python', 'JavaScript', 'SQL', 'Go'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Next.js', 'Node.js', '.NET / Blazor', 'Spring Boot', 'Tailwind'],
  },
  {
    label: 'Cloud & tools',
    items: ['GCP', 'Kubernetes', 'AWS', 'Azure (certified)', 'SQL Server', 'DynamoDB', 'Linux', 'Git'],
  },
];

const experience = [
  {
    role: 'Software Engineer', 
    company: 'Visa Inc.',
    where: 'San Francisco, CA',
    when: 'September 2025 – Present',
    blurb:
      'Working on Visa’s digital payments team, building and maintaining web applications that support the global payments ecosystem.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Wells Fargo',
    where: 'Charlotte, NC',
    when: 'Summer 2024',
    blurb:
      'Built a full-stack database aggregator in C# and Blazor that gave the team one place to query its most-used databases — cutting typical query time in half and saving an estimated $50K a year. Test-driven throughout, with 100% code coverage.',
  },
  {
    role: 'Software Development Intern',
    company: 'Sandhills Global',
    where: 'Scottsdale, AZ',
    when: 'Sep 2023 – May 2024',
    blurb:
      'Worked on data-driven web applications with .NET, SQL Server, and React on an agile team that shipped continuously.',
  },
  {
    role: 'Producer & Research Lead',
    company: 'PharMini · ASU Research Project',
    where: 'Tempe, AZ',
    when: '2023 – 2025',
    blurb:
      'Led a fourteen-person team building a simulation strategy game that teaches industrial engineering students about medical infrastructure. Ran the sprints, managed the repo, shipped on time.',
  },
];

const projects = [
  {
    title: 'PrepMate',
    image: prepMateImg,
    award: '2nd place · Best Use of AWS — SunHacks 2025',
    description:
      'Snap a photo of whatever is in your fridge and get back full recipes with nutrition facts and cooking steps, powered by a custom-trained image-recognition model.',
    tech: ['C#', 'Blazor', 'AWS Rekognition', 'DynamoDB'],
    link: 'https://github.com/Jadent183/PrepMate-mlh',
  },
  {
    title: 'IntelliNotes',
    image: intelliNotesImg,
    imageClass: 'object-cover object-top',
    award: '3rd place · Education Tech — Hack SoDa 2024',
    description:
      'Records live lecture audio in any language and turns it into translated notes, quizzes, and flashcards in real time.',
    tech: ['Next.js', 'React', 'Google Speech-to-Text', 'GPT API'],
    link: 'https://github.com/Jadent183/itellinote2s',
  },
  {
    title: 'CIA Swarm Capstone',
    image: ciaimage,
    description:
      'CIA-sponsored senior capstone: a team of six building autonomous rovers that cooperatively map an unknown maze with onboard cameras and swarm techniques. I built the node-based maze processing and traversal backend.',
    tech: ['C++', 'C#', 'Raspberry Pi', 'Arduino'],
  },
  {
    title: 'Phar-Mini',
    image: pharminiImg,
    imageClass: 'object-contain p-6',
    imageBg: 'bg-gradient-to-br from-teal-950 to-gray-900',
    description:
      'A simulation strategy game that teaches industrial engineering students about medical infrastructure and resource management — built by the fourteen-person student team I produced.',
    tech: ['Game design', 'Production'],
    link: 'https://jadent183.itch.io/phar-mini',
    linkLabel: 'Play on itch.io',
  },
  // {
  //   title: 'SnackTrackr',
  //   image: snackTrackrImg,
  //   description:
  //     'A calorie-tracking dashboard — scan a barcode or add items by hand and get daily and weekly nutrition breakdowns.',
  //   tech: ['C#', 'Full-stack web'],
  //   link: 'https://github.com/Jadent183/SnackTrackr',
  // },
  {
    title: 'GameCrafter++',
    image: gameCrafterImg,
    description:
      'A console game-creation toolkit: design your own 2D levels, drop in enemies and loot, and play the result right in the terminal.',
    tech: ['C++'],
    link: 'https://github.com/Jadent183/GameCrafter',
  },
  {
    title: 'PredictaParse',
    image: parserImg,
    imageClass: 'object-contain p-6',
    imageBg: 'bg-white',
    description:
      "A predictive recursive-descent parser for a custom programming language, built for ASU's programming-language-theory course.",
    tech: ['C++', 'Compilers'],
    link: 'https://github.com/Jadent183/CSE-340-Predictive-Descent-Parser',
  },
];

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState({});
  const [formStatus, setFormStatus] = useState('');
  const form = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    emailjs
      .sendForm('service_zuo079p', 'template_xkrll4o', form.current, 'gf4BQpcVQ_ACcuvzi')
      .then(
        () => {
          setFormStatus('success');
          form.current.reset();
          setTimeout(() => setFormStatus(''), 5000);
        },
        () => {
          setFormStatus('error');
          setTimeout(() => setFormStatus(''), 5000);
        }
      );
  };

  const reveal = (id) =>
    `transform transition-all duration-700 ${
      isVisible[id] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg font-semibold tracking-tight"
          >
            Jaden Thomas<span className="text-rose-500">.</span>
          </button>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="transition-colors hover:text-rose-500"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-700 px-3 py-1.5 text-sm transition-colors hover:border-rose-500 hover:text-rose-500"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="flex min-h-screen items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 pt-16">
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Hi, I&apos;m <span className="text-rose-500">Jaden Thomas</span>.
            </h1>
            <p className="mb-4 text-xl text-gray-300 md:text-2xl">
              I'm a software engineer, I've built a few things I like — AI study tools, game engines, and a swarm of maze-mapping rovers.
            </p>
            <p className="mb-8 text-gray-400">
              Arizona State computer science grad
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="rounded-lg bg-rose-500 px-6 py-3 font-medium transition-colors hover:bg-rose-600"
              >
                See my work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-lg border border-rose-500 px-6 py-3 font-medium transition-colors hover:bg-rose-500/10"
              >
                Get in touch
              </button>
              <div className="ml-1 flex items-center gap-4">
                <a
                  href="https://github.com/Jadent183"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-400 transition-colors hover:text-rose-500"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jaden-thomas-1b1307187/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-400 transition-colors hover:text-rose-500"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:jadent183@gmail.com"
                  aria-label="Email"
                  className="text-gray-400 transition-colors hover:text-rose-500"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className={`bg-gray-800 py-20 ${reveal('about')}`}>
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">About me</h2>
          <div className="grid items-start gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
            <img
              src={profileImg}
              alt="Jaden Thomas"
              className="mx-auto w-64 rounded-xl shadow-xl md:mx-0 md:w-full"
            />
            <div>
              <p className="mb-4 text-gray-300">
                I&apos;m a computer science grad from Arizona State, where I spent as much time
                building things outside class as in it — two hackathon podium finishes, a
                fourteen-person game team I ran as producer, and a CIA-sponsored capstone that had
                rovers mapping mazes with swarm robotics.
              </p>
              <p className="mb-8 text-gray-300">
                On the professional side, I currently work at Visa on their digital payments team. I&apos;ve interned at Wells Fargo, building a full-stack
                database tool in C# and Blazor, and at Sandhills Global,
                working on data-driven web apps in .NET and React.
              </p>
              <div className="mb-8 grid gap-6 sm:grid-cols-3">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3 className="mb-3 font-semibold text-rose-500">{group.label}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-gray-700/60 px-2.5 py-1 text-sm text-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-gray-300">Education:</span> Arizona State
                University — Computer Science, Class of 2025 ·{' '}
                <span className="font-semibold text-gray-300">Certification:</span> Microsoft
                Azure Fundamentals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={`py-20 ${reveal('experience')}`}>
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">Experience</h2>
          <div className="max-w-3xl space-y-10 border-l border-gray-700 pl-6">
            {experience.map((job) => (
              <div key={job.company} className="relative">
                <span className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
                <h3 className="text-xl font-semibold">
                  {job.role} <span className="text-rose-500">· {job.company}</span>
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  {job.where} · {job.when}
                </p>
                <p className="text-gray-300">{job.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`bg-gray-800 py-20 ${reveal('projects')}`}>
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-700/60 bg-gray-900 transition-colors hover:border-rose-500/60"
              >
                <div className={`h-44 shrink-0 ${project.imageBg ?? 'bg-gray-800'}`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className={`h-full w-full ${project.imageClass ?? 'object-cover'}`}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Radar size={44} className="text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="flex grow flex-col p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.award && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-amber-400">
                      <Award size={15} className="shrink-0" /> {project.award}
                    </p>
                  )}
                  <p className="mb-4 mt-3 grow text-sm text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-700/60 px-2 py-0.5 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-rose-500 transition-colors hover:text-rose-400"
                    >
                      {project.linkLabel ?? 'View on GitHub'} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-20 ${reveal('contact')}`}>
        <div className="container mx-auto px-6">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Contact info</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <a
                href="mailto:jadent183@gmail.com"
                className="flex items-center gap-4 text-gray-300 transition-colors hover:text-rose-500"
              >
                <Mail /> jadent183@gmail.com
              </a>
              <p className="flex items-center gap-4 text-gray-300">
                <Phone /> (480) 789-0436
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/jaden-thomas-1b1307187/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-300 transition-colors hover:text-rose-500"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/Jadent183"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-300 transition-colors hover:text-rose-500"
                >
                  <Github size={24} />
                </a>
              </div>
              <a
                href={resumeUrl}
                download="JadenThomasResume.pdf"
                className="inline-block rounded-lg bg-rose-500 px-6 py-3 font-medium transition-colors hover:bg-rose-600"
              >
                Download resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Jaden Thomas</p>
          <a
            href="https://github.com/Jadent183/jadenthomas.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-rose-500"
          >
            Built with React & Tailwind — source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
