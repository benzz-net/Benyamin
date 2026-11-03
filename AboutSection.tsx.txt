import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PersonalIdentity,
  STUDIO_PORTRAIT_FALLBACK_DATA_URI,
} from './portfolioData';
import { TiltCard } from './TiltCard';

interface AboutSectionProps {
  identity: PersonalIdentity;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ identity }) => {
  const [imgError, setImgError] = useState(false);

  const dashboardItems = [
    { label: 'Name', value: identity.fullName, detail: 'Full Legal & Academic Identity' },
    { label: 'Education', value: identity.school, detail: 'Senior High School · Indonesia' },
    { label: 'Class', value: identity.currentClass, detail: 'Current Academic Cohort' },
    { label: 'Field', value: identity.field, detail: 'Software & Systems Focus' },
    { label: 'Status', value: identity.status, detail: 'Active Exploration & Practice' },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 lg:py-36 border-t border-[#F1F2F4]/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0.85, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B] mb-3">
              01. Personal Profile &amp; Academic Identity
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F1F2F4] [text-wrap:balance]"
            >
              A Little{' '}
              <span className="font-editorial italic font-normal text-[#C4C9D0]">
                About Me
              </span>
            </h2>
          </div>
          <p className="font-editorial italic text-xl sm:text-2xl text-[#C4C9D0] max-w-md">
            Building strong computer science foundations through curiosity and disciplined practice.
          </p>
        </motion.div>

        {/* Editorial Split Layout: Locked Profile Portrait (foto.jpg) Left + Bio & Dashboard Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Protected Profile Portrait (foto.jpg, read-only for visitors) */}
          <motion.div
            initial={{ opacity: 0.85, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 select-none"
          >
            <TiltCard
              maxTiltDeg={5}
              className="rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 p-5"
            >
              <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-[#08090B] border border-[#F1F2F4]/[0.06]">
                <img
                  src={imgError ? STUDIO_PORTRAIT_FALLBACK_DATA_URI : 'foto.jpg'}
                  alt="Benyamin Fernando Napitupulu"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-base font-semibold text-[#F1F2F4]">
                      {identity.fullName}
                    </p>
                    <p className="font-mono-tech text-xs text-[#C4C9D0]/80 mt-0.5">
                      {identity.school} · Class {identity.currentClass}
                    </p>
                  </div>
                  <span className="font-editorial italic text-sm text-[#C4C9D0]">
                    Student Developer
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Editorial Narrative + Personal Information Dashboard */}
          <motion.div
            initial={{ opacity: 0.85, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Editorial Bio */}
            <div className="space-y-6">
              <p className="font-body text-lg sm:text-xl leading-relaxed text-[#F1F2F4] font-normal">
                {identity.aboutDescription}
              </p>

              <div className="pt-4 border-t border-[#F1F2F4]/[0.08]">
                <p className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#71869B] mb-3">
                  Core Areas of Interest
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#C4C9D0]">
                  {identity.mainInterests.map((interest, idx) => (
                    <React.Fragment key={interest}>
                      <span className="font-display text-[#F1F2F4] font-medium">
                        {interest}
                      </span>
                      {idx < identity.mainInterests.length - 1 && (
                        <span aria-hidden="true" className="text-[#71869B]">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Information Dashboard with 3D Tilt Hover Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono-tech uppercase tracking-[0.18em] text-[#71869B]">
                  Personal Information Dashboard
                </h3>
                <span className="font-editorial italic text-sm text-[#C4C9D0]/75">
                  Academic &amp; Technical Coordinates
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dashboardItems.map((item, idx) => (
                  <TiltCard
                    key={item.label}
                    maxTiltDeg={7}
                    className={`rounded-xl bg-[#121417] border border-[#C4C9D0]/15 p-5 hover:border-[#C4C9D0]/40 transition-colors ${
                      idx === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono-tech text-xs uppercase tracking-wider text-[#71869B]">
                        {item.label}
                      </span>
                      <span className="font-body text-xs text-[#C4C9D0]/55">
                        {item.detail}
                      </span>
                    </div>
                    <p className="mt-2 font-display text-lg sm:text-xl font-semibold text-[#F1F2F4] tracking-tight">
                      {item.value}
                    </p>
                  </TiltCard>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
