'use client';

import { useState, useEffect, useRef } from 'react';
import { FaReact, FaJsSquare, FaHtml5, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiFlutter, SiRedux } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoHomeOutline, IoPersonOutline, IoMailOutline, IoFolderOutline, IoGridOutline } from 'react-icons/io5';
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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 pb-16 md:pb-0">
      {/* Vertical Navigation - Desktop Only */}
      <nav className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        <a href="#home" className={`group relative w-12 h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'home' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Home">
          <IoHomeOutline className="text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Home</span>
        </a>
        <a href="#about" className={`group relative w-12 h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'about' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="About">
          <IoPersonOutline className="text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">About</span>
        </a>
        <a href="#skills" className={`group relative w-12 h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'skills' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Skills">
          <IoGridOutline className="text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Skills</span>
        </a>
        <a href="#projects" className={`group relative w-12 h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'projects' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Projects">
          <IoFolderOutline className="text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Projects</span>
        </a>
        <a href="#contact" className={`group relative w-12 h-12 flex items-center justify-center rounded-full border transition shadow-md ${activeSection === 'contact' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-blue-600 hover:text-white'}`} title="Contact">
          <IoMailOutline className="text-xl" />
          <span className="absolute left-full ml-4 px-3 py-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Contact</span>
        </a>
      </nav>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-700 shadow-xl">
        <div className="flex justify-around items-center py-2 px-2">
          {[
            { href: '#home', icon: <IoHomeOutline className="text-xl" />, label: 'Home', id: 'home' },
            { href: '#about', icon: <IoPersonOutline className="text-xl" />, label: 'About', id: 'about' },
            { href: '#skills', icon: <IoGridOutline className="text-xl" />, label: 'Skills', id: 'skills' },
            { href: '#projects', icon: <IoFolderOutline className="text-xl" />, label: 'Work', id: 'projects' },
            { href: '#contact', icon: <IoMailOutline className="text-xl" />, label: 'Contact', id: 'contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                activeSection === item.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {item.icon}
              <span className={`text-[10px] font-semibold tracking-wide ${activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {item.label}
              </span>
              {activeSection === item.id && (
                <span className="absolute -top-px h-0.5 w-8 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-purple-50/20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59,130,246,0.06) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-20 right-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-32 w-96 h-96 rounded-full bg-purple-400/10 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10 w-full py-20">
          <div className="grid md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">

            {/* Left: Text content */}
            <div className="text-center md:text-left order-2 md:order-1">
              {/* Available badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-600 text-xs sm:text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </div>

              {/* Heading */}
              <h1 className="mb-5">
                <span className="block text-zinc-500 text-lg sm:text-xl font-medium mb-2 tracking-widest uppercase" style={{ fontFamily: 'var(--font-poppins)' }}>Hi, I'm</span>
                <span className="block font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight tracking-tight pb-1" style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
                  Muthukumar
                </span>
              </h1>

              {/* Role badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {['Frontend Developer', 'Mobile Developer', 'AI Enthusiast'].map((role) => (
                  <span key={role} className="px-3.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-zinc-700 text-sm font-medium hover:border-blue-400 hover:text-blue-600 shadow-sm transition">
                    {role}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-zinc-600 text-base sm:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Specializing in <span className="text-blue-600 font-semibold">React Native</span>, <span className="text-blue-600 font-semibold">Next.js</span>, and <span className="text-purple-600 font-semibold">AI integrations</span>. I turn ideas into reality with strong technical skills and modern web technologies.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href="#projects" className="group px-7 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                  View My Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#contact" className="px-7 py-3.5 border-2 border-zinc-300 text-zinc-800 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                  Get In Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 border-2 border-zinc-300 text-zinc-800 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                  Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Profile photo — yellow blob style */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]">
                {/* Yellow blob background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/bg.png"
                    alt="Background"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Profile photo on top */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                  <div className="relative w-[78%] h-[85%] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/Mk1.jpeg"
                      alt="Muthukumar"
                      fill
                      className="object-contain object-center"
                      priority
                    />
                  </div>
                </div>

              </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99,102,241,0.04) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section label */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              About Me
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — Bio */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                Turning ideas into<br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">scalable applications</span>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  I&apos;m a <span className="font-semibold text-zinc-900 dark:text-white">B.Tech Mechanical Engineering</span> graduate turned passionate{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Frontend &amp; Mobile Developer</span>.
                  I specialize in building production-ready applications using{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">React Native</span>,{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Flutter</span>, and{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Next.js</span> — from concept to deployment.
                </p>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  I bring strong experience across <span className="font-semibold text-blue-600 dark:text-blue-400">Web</span>,{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Mobile</span>, and{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">Desktop</span> platforms, with hands-on work in UI development, state management, and{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">AI integrations</span>.
                  My background in <span className="font-semibold text-blue-600 dark:text-blue-400">QA testing</span> gives me a strong eye for detail — I build features with reliability and user experience in mind.
                </p>
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/Muthukumar1015" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:bg-zinc-700 dark:hover:bg-zinc-200 transition font-medium shadow-md hover:shadow-lg text-sm">
                  <FaGithub className="text-base" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/muthu-kumar-55b26118b" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg text-sm">
                  LinkedIn
                </a>
                <a href="mailto:muthukumarshiva1031@gmail.com"
                  className="flex items-center gap-2 px-5 py-2.5 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white rounded-xl hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800 transition font-medium text-sm">
                  Email
                </a>
              </div>
            </div>

            {/* Right — Terminal card (light mode) */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-200">
              {/* macOS-style header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 border-b border-zinc-200">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-zinc-400 text-xs font-mono">developer.json</span>
              </div>
              {/* Code body — light */}
              <div className="bg-zinc-50 p-5 font-mono text-sm leading-7 select-none">
                <p className="text-zinc-400">{'{'}</p>
                <p className="pl-5"><span className="text-blue-600">&quot;name&quot;</span><span className="text-zinc-400">: </span><span className="text-emerald-600">&quot;Muthukumar&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;role&quot;</span><span className="text-zinc-400">: </span><span className="text-emerald-600">&quot;Frontend &amp; Mobile Dev&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;experience&quot;</span><span className="text-zinc-400">: </span><span className="text-orange-500">&quot;1+ years&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;stack&quot;</span><span className="text-zinc-400">: [</span></p>
                <p className="pl-10"><span className="text-emerald-600">&quot;React Native&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-10"><span className="text-emerald-600">&quot;Flutter&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-10"><span className="text-emerald-600">&quot;Next.js&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-10"><span className="text-emerald-600">&quot;JavaScript&quot;</span></p>
                <p className="pl-5"><span className="text-zinc-400">],</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;platforms&quot;</span><span className="text-zinc-400">: [</span><span className="text-emerald-600">&quot;Web&quot;</span><span className="text-zinc-400">, </span><span className="text-emerald-600">&quot;Mobile&quot;</span><span className="text-zinc-400">, </span><span className="text-emerald-600">&quot;Desktop&quot;</span><span className="text-zinc-400">],</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;projects&quot;</span><span className="text-zinc-400">: </span><span className="text-orange-500">&quot;6+ delivered&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;aiTools&quot;</span><span className="text-zinc-400">: </span><span className="text-orange-500">&quot;5+ integrated&quot;</span><span className="text-zinc-400">,</span></p>
                <p className="pl-5"><span className="text-blue-600">&quot;available&quot;</span><span className="text-zinc-400">: </span><span className="text-purple-600">true</span></p>
                <p className="text-zinc-400">{'}'}</p>
              </div>
              {/* Available footer */}
              <div className="bg-green-50 px-5 py-3 flex items-center gap-2 border-t border-green-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-700 text-xs font-mono font-medium">Available for new opportunities</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section
        ref={skillsRef}
        id="skills"
        className={`py-20 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-zinc-900 dark:via-zinc-800/60 dark:to-zinc-900" />

        {/* Header */}
        <div className="relative z-10 text-center mb-12 px-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            Skills & Technologies
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            Tools I use to build fast, scalable, and beautiful products
          </p>
        </div>

        {/* Marquee rows */}
        {(() => {
          const row1Base = [
            { name: 'React', level: 'Advanced', icon: <FaReact className="text-xl text-blue-500" />, color: 'text-blue-500' },
            { name: 'React Native', level: 'Advanced', icon: <FaReact className="text-xl text-cyan-500" />, color: 'text-cyan-500' },
            { name: 'Next.js', level: 'Advanced', icon: <SiNextdotjs className="text-xl text-zinc-900 dark:text-white" />, color: 'text-zinc-700 dark:text-zinc-300' },
            { name: 'JavaScript', level: 'Expert', icon: <FaJsSquare className="text-xl text-yellow-500" />, color: 'text-yellow-500' },
            { name: 'GitHub', level: 'Advanced', icon: <FaGithub className="text-xl text-zinc-900 dark:text-white" />, color: 'text-zinc-700 dark:text-zinc-300' },
            { name: 'HTML & CSS', level: 'Expert', icon: <FaHtml5 className="text-xl text-orange-500" />, color: 'text-orange-500' },
          ];
          const row2Base = [
            { name: 'Flutter', level: 'Advanced', icon: <SiFlutter className="text-xl text-blue-400" />, color: 'text-blue-400' },
            { name: 'Flutter Bloc', level: 'Advanced', icon: <SiFlutter className="text-xl text-teal-500" />, color: 'text-teal-500' },
            { name: 'Redux', level: 'Advanced', icon: <SiRedux className="text-xl text-purple-600" />, color: 'text-purple-500' },
            { name: 'Tailwind CSS', level: 'Advanced', icon: <SiTailwindcss className="text-xl text-cyan-500" />, color: 'text-cyan-500' },
            { name: 'AI Prompting', level: 'Expert', icon: <GiArtificialIntelligence className="text-xl text-purple-500" />, color: 'text-purple-500' },
          ];
          // Double each base so one scroll-unit (~1400–1800px) exceeds any viewport width
          const row1 = [...row1Base, ...row1Base];
          const row2 = [...row2Base, ...row2Base];

          const SkillPill = ({ skill }: { skill: typeof row1[0] }) => (
            <div className="flex items-center gap-2.5 px-4 py-2.5 mx-2 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm whitespace-nowrap select-none hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200">
              <span>{skill.icon}</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{skill.name}</span>
              <span className={`text-[11px] font-medium ${skill.color} border-l border-zinc-200 dark:border-zinc-600 pl-2.5`}>{skill.level}</span>
            </div>
          );

          return (
            <div className="relative z-10 space-y-4">
              {/* Gradient fades */}
              <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

              {/* Row 1 — scrolls left */}
              <div className="overflow-hidden marquee-track">
                <div className="animate-marquee-left">
                  {[...row1, ...row1].map((s, i) => <SkillPill key={i} skill={s} />)}
                </div>
              </div>

              {/* Row 2 — scrolls right */}
              <div className="overflow-hidden marquee-track">
                <div className="animate-marquee-right">
                  {[...row2, ...row2].map((s, i) => <SkillPill key={i} skill={s} />)}
                </div>
              </div>
            </div>
          );
        })()}

      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-all duration-1000 ${
          visibleSections['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs sm:text-sm font-semibold tracking-wide mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-3">Featured Projects</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
              Real products built and shipped across web, mobile & desktop
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Sybo — Avatar Speaking App',
                description: 'React Native application featuring custom avatar speaking capabilities with LiveKit integration for real-time communication. Built and delivered solo from scratch.',
                tags: ['React Native', 'LiveKit', 'Real-time'],
                gradient: 'from-purple-600 to-pink-600',
                num: '01',
              },
              {
                title: 'Sybo Website',
                description: 'Full website built with PHP showcasing the Sybo avatar app — features, documentation, and user resources. Handles both frontend presentation and backend logic.',
                tags: ['PHP', 'Backend', 'Web'],
                gradient: 'from-violet-600 to-indigo-600',
                num: '02',
                link: 'https://sybo.ai/index.php',
              },
              {
                title: 'Alley — Photo Album App',
                description: 'Mobile photo album application built with Flutter and Flutter Bloc for smooth state management, optimized performance, and a clean user experience.',
                tags: ['Flutter', 'Flutter Bloc', 'Mobile'],
                gradient: 'from-blue-600 to-cyan-500',
                num: '03',
              },
              {
                title: 'POS System',
                description: 'Cross-platform Point of Sale system built with Flutter, supporting both mobile and desktop. Features Flutter Bloc state management for reliable, scalable performance.',
                tags: ['Flutter', 'Flutter Bloc', 'Desktop'],
                gradient: 'from-emerald-600 to-green-500',
                num: '04',
                link: 'https://www.niransoft.com/NiranPOS',
              },
              {
                title: 'NiranPOS Website',
                description: 'Official product website for NiranPOS built with Next.js — fully responsive, showcasing features, UI previews, and product information with a clean modern design.',
                tags: ['Next.js', 'Responsive', 'Product Site'],
                gradient: 'from-teal-600 to-emerald-500',
                num: '05',
                link: 'https://www.niransoft.com/NiranPOS',
              },
              {
                title: 'Trundle — Tour Mobile App',
                description: 'Tour discovery mobile app with modern UI design, smooth navigation, and location-based features. Built with React Native focusing on intuitive user experience.',
                tags: ['React Native', 'UI Design', 'Tour App'],
                gradient: 'from-orange-500 to-amber-500',
                num: '06',
              },
            ].map((project) => (
              <div
                key={project.title}
                className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/50"
              >
                {/* Colored header area */}
                <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${project.gradient} p-5 flex flex-col justify-between`}>
                  {/* Top row: number + link */}
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs font-mono font-bold tracking-widest">{project.num}</span>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-all duration-200 hover:scale-110"
                        aria-label={`Visit ${project.title}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 opacity-60">
                          <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  {/* Project title in colored header */}
                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug drop-shadow-sm">
                    {project.title}
                  </h3>
                </div>

                {/* White body */}
                <div className="p-5">
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 text-[11px] font-medium rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
              <h3 className="text-2xl font-bold text-white mb-2">How can I help?</h3>
              <p className="text-purple-100">I usually respond within a few hours</p>
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
              © 2026 Muthukumar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
