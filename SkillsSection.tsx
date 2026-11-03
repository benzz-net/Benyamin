import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Cpu, Shield, Globe, Terminal, Layers } from 'lucide-react';
import { SkillItem } from './portfolioData';
import { TiltCard } from './TiltCard';

interface SkillsSectionProps {
  skills: SkillItem[];
}

function renderSkillLogo(id: string) {
  switch (id) {
    case 'cpp':
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
          <polygon
            points="18,2 32,10 32,26 18,34 4,26 4,10"
            stroke="#C4C9D0"
            strokeWidth="1.5"
            fill="#1B1F24"
          />
          <text
            x="18"
            y="21.5"
            textAnchor="middle"
            fill="#F1F2F4"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            C++
          </text>
        </svg>
      );
    case 'java':
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect
            x="3"
            y="3"
            width="30"
            height="30"
            rx="7"
            stroke="#C4C9D0"
            strokeWidth="1.5"
            fill="#1B1F24"
          />
          <path
            d="M13 22C13 24.2 23 24.2 23 22M15 18C15 19.5 21 19.5 21 18M18 9C16.5 11.5 19.5 13 18 15.5"
            stroke="#F1F2F4"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
          <path
            d="M6 4H30L27.5 29L18 32L8.5 29L6 4Z"
            stroke="#C4C9D0"
            strokeWidth="1.5"
            fill="#1B1F24"
          />
          <text
            x="18"
            y="21"
            textAnchor="middle"
            fill="#F1F2F4"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            &lt;/&gt;
          </text>
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="28"
            height="28"
            rx="6"
            stroke="#C4C9D0"
            strokeWidth="1.5"
            fill="#1B1F24"
          />
          <text
            x="18"
            y="21.5"
            textAnchor="middle"
            fill="#F1F2F4"
            fontSize="10"
            fontWeight="700"
            fontFamily="monospace"
          >
            {`{ }`}
          </text>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 36 36" className="w-7 h-7" fill="none" aria-hidden="true">
          <rect
            x="4"
            y="4"
            width="28"
            height="28"
            rx="6"
            stroke="#C4C9D0"
            strokeWidth="1.5"
            fill="#1B1F24"
          />
          <text
            x="18"
            y="22.5"
            textAnchor="middle"
            fill="#F1F2F4"
            fontSize="12"
            fontWeight="700"
            fontFamily="monospace"
          >
            JS
          </text>
        </svg>
      );
    case 'backend':
      return <Terminal className="w-6 h-6 text-[#F1F2F4]" />;
    case 'software-eng':
      return <Cpu className="w-6 h-6 text-[#F1F2F4]" />;
    case 'cybersecurity':
      return <Shield className="w-6 h-6 text-[#F1F2F4]" />;
    case 'web-dev':
      return <Globe className="w-6 h-6 text-[#F1F2F4]" />;
    default:
      return <Code2 className="w-6 h-6 text-[#F1F2F4]" />;
  }
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'language' | 'interest'>('all');

  const languages = skills.filter((s) => s.category === 'language');
  const interests = skills.filter((s) => s.category === 'interest');

  const displayedLanguages = activeTab === 'interest' ? [] : languages;
  const displayedInterests = activeTab === 'language' ? [] : interests;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-28 lg:py-36 border-t border-[#F1F2F4]/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header + Category Filter Controls */}
        <motion.div
          initial={{ opacity: 0.85, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
        >
          <div>
            <p className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B] mb-3">
              02. Technical Stack &amp; Focus Domains
            </p>
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F1F2F4] [text-wrap:balance]"
            >
              Programming Skills &amp;{' '}
              <span className="font-editorial italic font-normal text-[#C4C9D0]">
                Exploration
              </span>
            </h2>
            <p className="mt-3 font-body text-base text-[#C4C9D0] max-w-2xl">
              Core programming languages and computer science disciplines I am currently studying and practicing.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div
              role="group"
              aria-label="Filter skills by category"
              className="flex items-center gap-1 p-1 rounded-lg bg-[#121417] border border-[#C4C9D0]/15"
            >
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 font-mono-tech text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-[#1B1F24] text-[#F1F2F4]'
                    : 'text-[#C4C9D0]/70 hover:text-[#F1F2F4]'
                }`}
              >
                All ({skills.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('language')}
                className={`px-3.5 py-1.5 font-mono-tech text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'language'
                    ? 'bg-[#1B1F24] text-[#F1F2F4]'
                    : 'text-[#C4C9D0]/70 hover:text-[#F1F2F4]'
                }`}
              >
                Languages ({languages.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interest')}
                className={`px-3.5 py-1.5 font-mono-tech text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === 'interest'
                    ? 'bg-[#1B1F24] text-[#F1F2F4]'
                    : 'text-[#C4C9D0]/70 hover:text-[#F1F2F4]'
                }`}
              >
                Areas of Interest ({interests.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* Group 1: Programming Languages */}
        {displayedLanguages.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F1F2F4]/[0.06]">
              <h3 className="text-sm font-mono-tech uppercase tracking-[0.18em] text-[#C4C9D0]">
                Programming Languages &amp; Web Technologies
              </h3>
              <span className="font-editorial italic text-base text-[#C4C9D0]">
                05 Core Languages
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedLanguages.map((skill) => (
                <TiltCard
                  key={skill.id}
                  maxTiltDeg={6}
                  className="rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 p-6 hover:border-[#C4C9D0]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1B1F24] border border-[#C4C9D0]/15 flex items-center justify-center shrink-0">
                        {renderSkillLogo(skill.id)}
                      </div>
                      <span className="font-editorial italic text-base text-[#C4C9D0] text-right">
                        {skill.status}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-semibold text-[#F1F2F4] tracking-tight">
                      {skill.name}
                    </h4>
                    <p className="mt-2 font-body text-sm text-[#C4C9D0]/80 leading-relaxed">
                      {skill.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-tech text-[11px] text-[#71869B]">
                      {skill.focusTopics.map((topic, i) => (
                        <React.Fragment key={topic}>
                          <span>{topic}</span>
                          {i < skill.focusTopics.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F1F2F4]/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-body text-[#C4C9D0]/75">
                        Learning Progress Indicator
                      </span>
                      <span className="font-mono-tech font-medium text-[#F1F2F4]">
                        {skill.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#08090B] rounded-full overflow-hidden border border-[#F1F2F4]/[0.05]">
                      <div
                        style={{
                          width: `${skill.progress}%`,
                          transition: 'width 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="h-full bg-gradient-to-r from-[#71869B] to-[#F1F2F4] rounded-full"
                      />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* Group 2: Areas of Interest */}
        {displayedInterests.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#F1F2F4]/[0.06]">
              <h3 className="text-sm font-mono-tech uppercase tracking-[0.18em] text-[#C4C9D0] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#71869B]" />
                <span>Engineering &amp; Computer Science Interests</span>
              </h3>
              <span className="font-editorial italic text-base text-[#C4C9D0]">
                04 Focus Areas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedInterests.map((item) => (
                <TiltCard
                  key={item.id}
                  maxTiltDeg={6}
                  className="rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 p-6 hover:border-[#C4C9D0]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#1B1F24] border border-[#C4C9D0]/15 flex items-center justify-center">
                        {renderSkillLogo(item.id)}
                      </div>
                      <span className="font-editorial italic text-sm text-[#C4C9D0]">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-semibold text-[#F1F2F4] tracking-tight">
                      {item.name}
                    </h4>
                    <p className="mt-2 font-body text-sm text-[#C4C9D0]/80 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F1F2F4]/[0.06]">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-body text-[#C4C9D0]/75">Exploration Depth</span>
                      <span className="font-mono-tech font-medium text-[#F1F2F4]">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#08090B] rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${item.progress}%`,
                          transition: 'width 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        className="h-full bg-[#71869B] rounded-full"
                      />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
