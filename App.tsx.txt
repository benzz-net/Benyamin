/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Layers } from 'lucide-react';
import {
  INITIAL_CONTACT,
  INITIAL_IDENTITY,
  INITIAL_JOURNEY,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
} from './portfolioData';
import { Navbar, SectionId } from './Navbar';
import { HeroScene3D, MaterialFinishPreset } from './HeroScene3D';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { JourneySection } from './JourneySection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [finishPreset, setFinishPreset] = useState<MaterialFinishPreset>('obsidian');

  const identity = INITIAL_IDENTITY;
  const skills = INITIAL_SKILLS;
  const projects = INITIAL_PROJECTS;
  const milestones = INITIAL_JOURNEY;
  const contact = INITIAL_CONTACT;

  useEffect(() => {
    const sectionIds: SectionId[] = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            if (sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F1F2F4] flex flex-col">
      {/* Sticky Top Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1 pt-20">
        {/* HERO SECTION */}
        <section
          id="home"
          aria-labelledby="hero-heading"
          className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Ambient Radial Studio Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_62%_46%,rgba(113,134,155,0.12),rgba(18,20,23,0.45)_48%,rgba(8,9,11,1)_85%)]"
          />

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 lg:py-16 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center flex-1">
              {/* Left Side: Multi-Font Identity, Bio, CTAs, and Editorial Statement */}
              <motion.div
                initial={{ opacity: 0.9, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col justify-between space-y-10 lg:space-y-12"
              >
                <div className="space-y-5">
                  <p className="font-mono-tech text-xs tracking-[0.26em] uppercase text-[#C4C9D0]">
                    {identity.heroIntro}
                  </p>

                  <h1
                    id="hero-heading"
                    className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-bold tracking-tight text-[#F1F2F4] leading-[1.06] [text-wrap:balance]"
                  >
                    {identity.firstName}{' '}
                    <span className="block font-editorial italic font-medium text-[#C4C9D0] text-5xl sm:text-6xl lg:text-[4.25rem] mt-1">
                      {identity.lastName}
                    </span>
                  </h1>

                  <p className="font-mono-tech text-xs sm:text-sm tracking-wide text-[#71869B]">
                    {identity.subtitle}
                  </p>

                  <p className="font-body text-sm sm:text-base text-[#C4C9D0]/85 max-w-xl leading-relaxed">
                    {identity.heroDescription}
                  </p>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('projects')}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F1F2F4] text-[#08090B] font-display text-xs font-semibold tracking-wide hover:bg-[#C4C9D0] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Explore My Projects</span>
                      <ArrowDownRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#121417] text-[#F1F2F4] border border-[#C4C9D0]/30 font-display text-xs font-medium tracking-wide hover:border-[#F1F2F4] hover:bg-[#1B1F24] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Contact Me</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C4C9D0]" />
                    </button>
                  </div>
                </div>

                {/* Lower Editorial Contrast Lockup */}
                <div className="pt-4 border-t border-[#F1F2F4]/[0.07] max-w-lg">
                  <p className="font-editorial italic text-3xl sm:text-4xl lg:text-5xl text-[#C4C9D0] font-normal leading-tight">
                    A curious builder.
                  </p>
                  <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#F1F2F4] leading-tight mt-0.5">
                    Future software engineer.
                  </p>
                </div>
              </motion.div>

              {/* Right Side: 3D Metallic Geometric Centerpiece */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
                <div className="w-full h-[400px] sm:h-[480px] lg:h-[600px] relative">
                  <HeroScene3D finishPreset={finishPreset} />
                </div>

                {/* Discreet Bottom-Right 3D Material Finish Selector */}
                <div className="mt-2 self-end flex items-center gap-2 bg-[#121417] border border-[#C4C9D0]/20 rounded-full px-3 py-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#71869B] ml-1" />
                  <span className="font-mono-tech text-[11px] text-[#C4C9D0]/70 mr-1">
                    3D Finish:
                  </span>
                  {(
                    [
                      { id: 'obsidian', label: 'Obsidian Chrome' },
                      { id: 'silver', label: 'Polished Silver' },
                      { id: 'wireframe', label: 'Graphite Wire' },
                    ] as const
                  ).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setFinishPreset(preset.id)}
                      className={`px-2.5 py-1 rounded-full font-display text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                        finishPreset === preset.id
                          ? 'bg-[#F1F2F4] text-[#08090B]'
                          : 'text-[#C4C9D0]/75 hover:text-[#F1F2F4]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Full-Width Academic & Focus Strip Below Hero Split */}
            <div className="mt-12 pt-8 border-t border-[#F1F2F4]/[0.07] grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#71869B]">
                  Academic Institution
                </span>
                <p className="mt-1 font-display text-sm sm:text-base font-medium text-[#F1F2F4]">
                  {identity.school} · Class {identity.currentClass}
                </p>
              </div>
              <div>
                <span className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#71869B]">
                  Primary Languages
                </span>
                <p className="mt-1 font-display text-sm sm:text-base font-medium text-[#F1F2F4]">
                  C++ · Java · HTML · CSS · JS
                </p>
              </div>
              <div>
                <span className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#71869B]">
                  Engineering Focus
                </span>
                <p className="mt-1 font-editorial italic text-base sm:text-lg text-[#C4C9D0]">
                  Software &amp; Backend Systems
                </p>
              </div>
              <div>
                <span className="block font-mono-tech text-[11px] uppercase tracking-wider text-[#71869B]">
                  Security &amp; CS
                </span>
                <p className="mt-1 font-editorial italic text-base sm:text-lg text-[#C4C9D0]">
                  Computer Science &amp; Cybersecurity
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01: ABOUT ME */}
        <AboutSection identity={identity} />

        {/* SECTION 02: PROGRAMMING SKILLS */}
        <SkillsSection skills={skills} />

        {/* SECTION 03: SELECTED PROJECTS */}
        <ProjectsSection projects={projects} />

        {/* SECTION 04: DEVELOPMENT JOURNEY */}
        <JourneySection milestones={milestones} />

        {/* SECTION 05: CONTACT SECTION */}
        <ContactSection contact={contact} />
      </main>

      {/* MINIMALIST FOOTER */}
      <Footer />
    </div>
  );
}
