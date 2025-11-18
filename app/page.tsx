'use client';

import { useState, useEffect, useRef } from 'react';
import { FaReact, FaJsSquare, FaGitAlt, FaHtml5 } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoPhonePortraitOutline, IoHomeOutline, IoPersonOutline, IoMailOutline, IoFolderOutline, IoGridOutline } from 'react-icons/io5';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [mainFormStatus, setMainFormStatus] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for all sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [aboutRef, skillsRef, projectsRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleMainFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    setMainFormStatus('Please wait...');

    const serviceId = 'service_6sucd6k';
    const notificationTemplateId = 'template_dhivsqh';
    const autoReplyTemplateId = 'template_ca6cu7o';
    const publicKey = 'jcHXGbrupWT5gjOgu';

    try {
      // Send notification to you
      await emailjs.sendForm(serviceId, notificationTemplateId, form, publicKey);

      // Send auto-reply to user
      await emailjs.sendForm(serviceId, autoReplyTemplateId, form, publicKey);

      setMainFormStatus('Message sent successfully!');
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => {
        setMainFormStatus('');
      }, 3000);
    } catch (error) {
      setMainFormStatus('Something went wrong!');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 pl-14 md:pl-0">
      {/* Vertical Navigation - All Screens */}
      <nav className="fixed left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-4">
        <a href="#home" className={`group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'home' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Home">
          <IoHomeOutline className="text-lg md:text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">Home</span>
        </a>
        <a href="#about" className={`group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'about' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="About">
          <IoPersonOutline className="text-lg md:text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">About</span>
        </a>
        <a href="#skills" className={`group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'skills' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Skills">
          <IoGridOutline className="text-lg md:text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">Skills</span>
        </a>
        <a href="#projects" className={`group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'projects' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Projects">
          <IoFolderOutline className="text-lg md:text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">Projects</span>
        </a>
        <a href="#contact" className={`group relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'contact' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Contact">
          <IoMailOutline className="text-lg md:text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">Contact</span>
        </a>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/home.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/70" />
        {/* Animated background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="text-center">
            {/* Main heading with gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                Muthukumar
              </span>
            </h1>

            {/* Role badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Frontend Developer', 'B.Tech Mechanical', 'AI Enthusiast', 'Tester'].map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white font-medium hover:border-blue-400 hover:scale-105 transition shadow-sm"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Description with highlighted keywords */}
            <p className="text-lg sm:text-xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Specializing in <span className="font-semibold text-blue-400">React Native</span>, <span className="font-semibold text-blue-400">Next.js</span>, and <span className="font-semibold text-purple-400">AI integrations</span>.
              I turn ideas into reality with expert prompting skills and modern web technologies.
            </p>

            {/* CTA Buttons with icons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#projects"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="group px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:border-blue-400 hover:bg-white/10 transition font-semibold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Get In Touch</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-yellow-50/50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(251, 146, 60, 0.06) 1px, transparent 0)',
          backgroundSize: '45px 45px'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-12 text-center">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content - Order 2 on mobile, 1 on desktop */}
            <div className="order-2 md:order-1 space-y-6">
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                I'm a <span className="font-semibold text-zinc-900 dark:text-white">B.Tech Mechanical Engineering</span> graduate who found my passion in frontend development and AI.
                I specialize in building modern mobile and web applications using <span className="font-semibold text-blue-600 dark:text-blue-400">React Native</span> and <span className="font-semibold text-blue-600 dark:text-blue-400">Next.js</span>,
                creating beautiful user interfaces with a strong focus on AI integrations and user experiences.
              </p>
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                My superpower is <span className="font-semibold text-purple-600 dark:text-purple-400">AI prompt engineering</span> - I can leverage AI tools to rapidly develop solutions
                and write efficient code. I believe in learning by doing and staying at the cutting edge of
                technology to build the future.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com/Muthukumar1015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition font-medium shadow-md hover:shadow-lg"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/muthu-kumar-55b26118b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:muthukumarshiva1031@gmail.com"
                  className="px-6 py-3 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition font-medium"
                >
                  Email
                </a>
              </div>
            </div>

            {/* Image - Order 1 on mobile, 2 on desktop */}
            <div className="relative order-1 md:order-2 h-96 md:h-[500px]">
              {/* Yellow Background Shape */}
              <div className="absolute inset-0 top-0 right-0 md:-top-4 md:-right-4 z-0">
                <Image
                  src="/bg.png"
                  alt="Background"
                  width={700}
                  height={700}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Profile Photo Container */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                <div className="relative w-[80%] h-[85%] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Mk1.jpeg"
                    alt="Muthukumar"
                    fill
                    className="object-contain object-center"
                    priority
                  />
                  {/* Bottom gradient fade for smooth blend */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-zinc-900/80 dark:via-zinc-900/40 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        id="skills"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 opacity-50" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Expertise in modern web and mobile development with a focus on creating exceptional user experiences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'React', icon: <FaReact className="text-5xl text-blue-500" />, level: 'Advanced' },
              { name: 'React Native', icon: <FaReact className="text-5xl text-blue-400" />, level: 'Advanced' },
              { name: 'Next.js', icon: <SiNextdotjs className="text-5xl text-zinc-900 dark:text-white" />, level: 'Advanced' },
              { name: 'JavaScript', icon: <FaJsSquare className="text-5xl text-yellow-500" />, level: 'Expert' },
              { name: 'TypeScript', icon: <SiTypescript className="text-5xl text-blue-600" />, level: 'Advanced' },
              { name: 'AI Prompt Engineering', icon: <GiArtificialIntelligence className="text-5xl text-purple-500" />, level: 'Expert' },
              { name: 'HTML & CSS', icon: <FaHtml5 className="text-5xl text-orange-500" />, level: 'Expert' },
              { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-5xl text-cyan-500" />, level: 'Advanced' },
              { name: 'Git', icon: <FaGitAlt className="text-5xl text-orange-600" />, level: 'Advanced' },
              { name: 'Mobile Development', icon: <IoPhonePortraitOutline className="text-5xl text-green-500" />, level: 'Advanced' },
            ].map((skill) => (
              <div
                key={skill.name}
                className="group relative p-8 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col items-center gap-4"
              >
                <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-lg mb-1">{skill.name}</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{skill.level}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 opacity-70" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.08) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sybo.ai - Avatar Speaking App',
                description: 'AI-powered avatar application with speaking capabilities using LiveKit integration for real-time communication',
                tags: ['React Native', 'AI', 'LiveKit'],
                gradient: 'from-purple-500/10 to-pink-500/10',
                iconColor: 'text-purple-500'
              },
              {
                title: 'Alley - Photo Album UI',
                description: 'Beautiful and intuitive photo album application with modern UI/UX design',
                tags: ['React Native', 'UI/UX', 'Mobile'],
                gradient: 'from-blue-500/10 to-cyan-500/10',
                iconColor: 'text-blue-500'
              },
              {
                title: 'Trundle - Tour Mobile App (In Progress)',
                description: 'Tour application with modern UI design - Personal project currently 20% complete, focusing on innovative user experience',
                tags: ['React Native', 'UI Design', 'Tour App'],
                gradient: 'from-orange-500/10 to-yellow-500/10',
                iconColor: 'text-orange-500'
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group relative bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {project.title}
                    </h3>
                    <div className={`w-3 h-3 rounded-full ${project.iconColor} animate-pulse`} />
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 hover:scale-105 transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        id="contact"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background gradient blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">Let's create something amazing together!</p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-xl">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-10 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">How can we help?</h3>
              <p className="text-purple-100">We usually respond in a few hours</p>
            </div>

            {/* Form Body */}
            <div className="p-8">
              <form onSubmit={handleMainFormSubmit} className="needs-validation space-y-5" noValidate>

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:focus:ring-purple-600 transition"
                  placeholder="e.g. Muthukumar"
                />
                <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                  Please provide your full name.
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:focus:ring-purple-600 transition"
                  placeholder="e.g. you@example.com"
                />
                <div className="empty-feedback text-red-400 text-sm mt-1">
                  Please provide your email address.
                </div>
                <div className="invalid-feedback text-red-400 text-sm mt-1">
                  Please provide a valid email address.
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wide">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3.5 border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:focus:ring-purple-600 transition resize-none"
                  placeholder="e.g. I'd love to discuss..."
                />
                <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                  Please enter your message.
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 focus:from-purple-700 focus:to-purple-800 focus:outline-none transition font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message
              </button>

              {mainFormStatus && (
                <div className={`text-center ${mainFormStatus.includes('success') || mainFormStatus.includes('Thank') ? 'text-green-500' : mainFormStatus.includes('wait') ? 'text-gray-500' : 'text-red-500'}`}>
                  {(mainFormStatus.includes('success') || mainFormStatus.includes('Thank')) ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="font-semibold text-green-700 dark:text-green-400 mb-1">Thank you for reaching out!</p>
                      <p className="text-sm text-green-600 dark:text-green-500">I'll get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium">{mainFormStatus}</p>
                  )}
                </div>
              )}

              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://github.com/Muthukumar1015"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 transition shadow-md hover:shadow-lg"
              title="GitHub"
            >
              <svg className="w-6 h-6 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/muthu-kumar-55b26118b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 transition shadow-md hover:shadow-lg"
              title="LinkedIn"
            >
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:muthukumarshiva1031@gmail.com"
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 hover:scale-110 transition shadow-md hover:shadow-lg"
              title="Email"
            >
              <svg className="w-6 h-6 text-zinc-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              © 2025 Muthukumar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
