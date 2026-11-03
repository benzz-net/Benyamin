import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Github,
  Terminal,
  X,
  PlusCircle,
  Wallet,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ProjectItem,
  TRAVEL_DESTINATIONS,
  TravelDestination,
  TravelTransaction,
  filterProjectsByCategory,
  processTravelBooking,
} from './portfolioData';
import { TiltCard } from './TiltCard';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

function renderProjectVisualPreview(projectNumber: string) {
  switch (projectNumber) {
    case '01':
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full object-cover" fill="none">
          <rect width="640" height="360" fill="#08090B" />
          <rect x="28" y="24" width="584" height="312" rx="10" fill="#121417" stroke="#2A3038" strokeWidth="1.2" />
          <circle cx="50" cy="44" r="5" fill="#71869B" />
          <circle cx="68" cy="44" r="5" fill="#4A5568" />
          <circle cx="86" cy="44" r="5" fill="#2D3748" />
          <text x="112" y="48" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            travel_agency_system.cpp — C++ Console Runtime
          </text>
          <line x1="28" y1="64" x2="612" y2="64" stroke="#2A3038" />
          <text x="52" y="96" fill="#71869B" fontFamily="monospace" fontSize="12">
            [SYSTEM] SMAN 1 Tualang · C++ Struct &amp; File Stream Engine
          </text>
          <text x="52" y="124" fill="#F1F2F4" fontFamily="monospace" fontSize="13" fontWeight="600">
            1. User Account &amp; Balance Management
          </text>
          <text x="52" y="148" fill="#C4C9D0" fontFamily="monospace" fontSize="13">
            2. Select Travel Destination &amp; Package Tier
          </text>
          <text x="52" y="172" fill="#C4C9D0" fontFamily="monospace" fontSize="13">
            3. Process Booking Transaction &amp; Receipt
          </text>
          <text x="52" y="196" fill="#C4C9D0" fontFamily="monospace" fontSize="13">
            4. Export Persistent History (transactions.txt)
          </text>
          <rect x="52" y="222" width="536" height="84" rx="6" fill="#08090B" stroke="#71869B" strokeOpacity="0.4" />
          <text x="70" y="250" fill="#C4C9D0" fontFamily="monospace" fontSize="12">
            struct TravelPackage &#123; string code; string destination; int priceIdr; &#125;;
          </text>
          <text x="70" y="276" fill="#71869B" fontFamily="monospace" fontSize="12">
            Status: Ready · Click &quot;Interactive C++ Console&quot; to test live
          </text>
        </svg>
      );
    case '02':
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full object-cover" fill="none">
          <rect width="640" height="360" fill="#08090B" />
          <radialGradient id="orbGrad" cx="65%" cy="50%" r="45%">
            <stop offset="0%" stopColor="#71869B" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#1B1F24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#08090B" stopOpacity="1" />
          </radialGradient>
          <rect width="640" height="360" fill="url(#orbGrad)" />
          <circle cx="430" cy="180" r="105" fill="#121417" stroke="#C4C9D0" strokeWidth="1.5" />
          <ellipse cx="430" cy="180" rx="135" ry="42" transform="rotate(-22 430 180)" stroke="#71869B" strokeWidth="1.2" />
          <text x="56" y="135" fill="#71869B" fontFamily="monospace" fontSize="11" letterSpacing="3">
            PORTFOLIO ARCHITECTURE
          </text>
          <text x="56" y="175" fill="#F1F2F4" fontFamily="serif" fontStyle="italic" fontSize="32">
            Benyamin F. N.
          </text>
          <text x="56" y="208" fill="#C4C9D0" fontFamily="sans-serif" fontSize="13">
            3D WebGL · Editorial UI · Multi-Font Craft
          </text>
        </svg>
      );
    case '03':
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full object-cover" fill="none">
          <rect width="640" height="360" fill="#08090B" />
          <g stroke="#1B1F24" strokeWidth="1">
            <line x1="0" y1="90" x2="640" y2="90" />
            <line x1="0" y1="180" x2="640" y2="180" />
            <line x1="0" y1="270" x2="640" y2="270" />
            <line x1="160" y1="0" x2="160" y2="360" />
            <line x1="320" y1="0" x2="320" y2="360" />
            <line x1="480" y1="0" x2="480" y2="360" />
          </g>
          <rect x="64" y="62" width="220" height="236" rx="10" fill="#121417" stroke="#71869B" strokeWidth="1.2" />
          <text x="88" y="102" fill="#F1F2F4" fontFamily="monospace" fontSize="14" fontWeight="700">
            C++ Algorithms
          </text>
          <text x="88" y="134" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Binary Search
          </text>
          <text x="88" y="158" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Matrix Operations
          </text>
          <text x="88" y="182" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Struct Sorting
          </text>
          <rect x="348" y="62" width="228" height="236" rx="10" fill="#121417" stroke="#C4C9D0" strokeOpacity="0.4" strokeWidth="1.2" />
          <text x="372" y="102" fill="#F1F2F4" fontFamily="monospace" fontSize="14" fontWeight="700">
            Java OOP Labs
          </text>
          <text x="372" y="134" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Encapsulation
          </text>
          <text x="372" y="158" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Class Inheritance
          </text>
          <text x="372" y="182" fill="#C4C9D0" fontFamily="monospace" fontSize="11">
            · Console Utilities
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 640 360" className="w-full h-full object-cover" fill="none">
          <rect width="640" height="360" fill="#08090B" />
          <circle cx="320" cy="180" r="120" stroke="#71869B" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="320" cy="180" r="78" stroke="#C4C9D0" strokeOpacity="0.4" strokeWidth="1.2" />
          <polygon points="320,122 372,212 268,212" stroke="#F1F2F4" strokeWidth="1.5" fill="#121417" />
          <text x="320" y="275" textAnchor="middle" fill="#C4C9D0" fontFamily="monospace" fontSize="12" letterSpacing="3">
            FUTURE R&amp;D · BACKEND &amp; SECURITY
          </text>
        </svg>
      );
  }
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProjectItem['category']>('all');
  const [activeConsoleProject, setActiveConsoleProject] = useState<ProjectItem | null>(null);

  const [balanceIdr, setBalanceIdr] = useState<number>(8500000);
  const [passengerName, setPassengerName] = useState<string>('Benyamin Fernando');
  const [selectedDestId, setSelectedDestId] = useState<string>(TRAVEL_DESTINATIONS[0].id);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [transactions, setTransactions] = useState<TravelTransaction[]>([
    {
      id: 'INV-1042',
      passengerName: 'Benyamin Fernando',
      destinationName: 'Lake Toba Highland Retreat',
      packageTier: 'Heritage Package',
      guests: 1,
      totalPriceIdr: 1850000,
      timestamp: '2026-10-18 14:20:00',
    },
  ]);
  const [consoleFeedback, setConsoleFeedback] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  const visibleProjects = filterProjectsByCategory(projects, selectedCategory);

  const handleBookPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const dest: TravelDestination =
      TRAVEL_DESTINATIONS.find((d) => d.id === selectedDestId) || TRAVEL_DESTINATIONS[0];

    const res = processTravelBooking({
      currentBalanceIdr: balanceIdr,
      passengerName,
      destination: dest,
      guests: guestCount,
    });

    if (!res.success || !res.transaction) {
      setConsoleFeedback({
        type: 'err',
        text: res.error || 'Booking failed.',
      });
      return;
    }

    setBalanceIdr(res.newBalanceIdr);
    setTransactions((prev) => [res.transaction!, ...prev]);
    setConsoleFeedback({
      type: 'ok',
      text: `SUCCESS: ${res.transaction.id} recorded to transactions.txt (${dest.name}).`,
    });
  };

  const handleTopUpBalance = () => {
    setBalanceIdr((prev) => prev + 2500000);
    setConsoleFeedback({
      type: 'ok',
      text: 'BALANCE_UPDATED: +IDR 2,500,000 credited to user struct.',
    });
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-28 lg:py-36 border-t border-[#F1F2F4]/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Heading & Category Filter */}
        <motion.div
          initial={{ opacity: 0.85, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16"
        >
          <div>
            <p className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B] mb-3">
              03. Selected Works &amp; Case Studies
            </p>
            <h2
              id="projects-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F1F2F4] [text-wrap:balance]"
            >
              Selected{' '}
              <span className="font-editorial italic font-normal text-[#C4C9D0]">
                Projects
              </span>
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter projects"
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#121417] border border-[#C4C9D0]/15 self-start lg:self-auto"
          >
            {(
              [
                { id: 'all', label: 'All Works' },
                { id: 'systems', label: 'C++ Systems' },
                { id: 'web', label: 'Web Portfolio' },
                { id: 'fundamentals', label: 'Practice Labs' },
                { id: 'upcoming', label: 'Future R&D' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 font-mono-tech text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#1B1F24] text-[#F1F2F4]'
                    : 'text-[#C4C9D0]/70 hover:text-[#F1F2F4]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {visibleProjects.map((project, index) => {
            const isWide = index % 3 === 0;
            const colSpanClass = isWide ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0.85, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={colSpanClass}
              >
                <TiltCard
                  maxTiltDeg={4}
                  className="h-full rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 hover:border-[#C4C9D0]/40 transition-colors flex flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <span className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B]">
                        PROJECT {project.number}
                      </span>
                      <span className="font-editorial italic text-base text-[#C4C9D0]">
                        Case Study {project.number}
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#08090B] border border-[#F1F2F4]/[0.07] mb-6">
                      {renderProjectVisualPreview(project.number)}
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F1F2F4] tracking-tight [text-wrap:balance]">
                      {project.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono-tech text-[#71869B]">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {idx < project.technologies.length - 1 && (
                            <span aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="mt-4 font-body text-sm sm:text-base text-[#C4C9D0]/85 leading-relaxed">
                      {project.description}
                    </p>

                    <ul className="mt-5 space-y-1.5 border-t border-[#F1F2F4]/[0.06] pt-4 font-body text-xs text-[#C4C9D0]/75">
                      {project.architectureHighlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-[#71869B]">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#F1F2F4]/[0.06] flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1F24] border border-[#C4C9D0]/20 font-display text-xs font-medium text-[#F1F2F4] hover:border-[#F1F2F4] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    {project.hasInteractivePreview ? (
                      <button
                        type="button"
                        onClick={() => setActiveConsoleProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F1F2F4] text-[#08090B] font-display text-xs font-semibold hover:bg-[#C4C9D0] transition-colors whitespace-nowrap shrink-0"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Live Demo · Interactive C++ Console</span>
                      </button>
                    ) : (
                      <a
                        href={project.liveDemoUrl}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#08090B] border border-[#C4C9D0]/25 font-display text-xs font-medium text-[#C4C9D0] hover:text-[#F1F2F4] hover:border-[#F1F2F4] transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Interactive C++ Travel Agency Console Modal for Project 01 */}
      {activeConsoleProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cpp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08090B]/85"
        >
          <div className="w-full max-w-4xl rounded-2xl bg-[#121417] border border-[#C4C9D0]/25 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#08090B] border-b border-[#F1F2F4]/10">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#71869B]" />
                <h3 id="cpp-modal-title" className="font-mono-tech text-xs sm:text-sm text-[#F1F2F4]">
                  PROJECT 01 — {activeConsoleProject.title} (Interactive C++ Simulation)
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close C++ Console Simulator"
                onClick={() => setActiveConsoleProject(null)}
                className="p-1.5 rounded-lg text-[#C4C9D0] hover:text-[#F1F2F4] hover:bg-[#1B1F24] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 space-y-5">
                <div className="p-4 rounded-xl bg-[#08090B] border border-[#C4C9D0]/15 flex items-center justify-between">
                  <div>
                    <span className="font-mono-tech text-xs uppercase text-[#71869B]">
                      Current User Balance
                    </span>
                    <p className="font-mono-tech text-xl font-semibold text-[#F1F2F4] mt-0.5">
                      IDR {balanceIdr.toLocaleString('en-US')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleTopUpBalance}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1B1F24] border border-[#C4C9D0]/25 text-xs font-medium text-[#F1F2F4] hover:border-[#F1F2F4] transition-colors whitespace-nowrap shrink-0"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#71869B]" />
                    <span>+Top Up 2.5M</span>
                  </button>
                </div>

                <form onSubmit={handleBookPackage} className="space-y-4">
                  <div>
                    <label
                      htmlFor="sim-passenger-name"
                      className="block text-xs font-mono-tech text-[#C4C9D0] mb-1.5"
                    >
                      Passenger Name (struct UserAccount)
                    </label>
                    <input
                      id="sim-passenger-name"
                      type="text"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#08090B] border border-[#C4C9D0]/25 text-sm text-[#F1F2F4]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sim-destination"
                      className="block text-xs font-mono-tech text-[#C4C9D0] mb-1.5"
                    >
                      Select Destination &amp; Travel Package
                    </label>
                    <select
                      id="sim-destination"
                      value={selectedDestId}
                      onChange={(e) => setSelectedDestId(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#08090B] border border-[#C4C9D0]/25 text-sm text-[#F1F2F4]"
                    >
                      {TRAVEL_DESTINATIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          [{d.code}] {d.name} — IDR {d.priceIdr.toLocaleString('en-US')} ({d.durationDays}D)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sim-guests"
                      className="block text-xs font-mono-tech text-[#C4C9D0] mb-1.5"
                    >
                      Number of Travelers (1 - 10)
                    </label>
                    <input
                      id="sim-guests"
                      type="number"
                      min={1}
                      max={10}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#08090B] border border-[#C4C9D0]/25 text-sm text-[#F1F2F4] font-mono-tech"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F1F2F4] text-[#08090B] font-display text-xs font-semibold hover:bg-[#C4C9D0] transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Execute Transaction &amp; Save to File</span>
                  </button>
                </form>

                {consoleFeedback && (
                  <div
                    className={`p-3 rounded-lg border text-xs font-mono-tech flex items-start gap-2 ${
                      consoleFeedback.type === 'ok'
                        ? 'bg-[#08090B] border-[#C4C9D0]/40 text-[#F1F2F4]'
                        : 'bg-[#08090B] border-amber-500/50 text-amber-300'
                    }`}
                  >
                    {consoleFeedback.type === 'ok' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#C4C9D0]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    )}
                    <span>{consoleFeedback.text}</span>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl bg-[#08090B] border border-[#C4C9D0]/15 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-tech text-xs uppercase text-[#71869B]">
                      Transaction History (transactions.txt)
                    </span>
                    <span className="font-mono-tech text-xs text-[#C4C9D0]">
                      {transactions.length} records
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-3 rounded-lg bg-[#121417] border border-[#F1F2F4]/[0.06] text-xs font-mono-tech"
                      >
                        <div className="flex items-center justify-between text-[#F1F2F4]">
                          <span className="font-semibold">{tx.id} · {tx.passengerName}</span>
                          <span>IDR {tx.totalPriceIdr.toLocaleString('en-US')}</span>
                        </div>
                        <p className="text-[#C4C9D0]/80 mt-1">
                          {tx.destinationName} ({tx.guests}x {tx.packageTier})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {activeConsoleProject.codeSnippet && (
                  <div className="rounded-xl bg-[#08090B] border border-[#C4C9D0]/15 p-4">
                    <span className="block font-mono-tech text-xs uppercase text-[#71869B] mb-2">
                      C++ Core Struct &amp; Function Excerpt
                    </span>
                    <pre className="text-[11px] leading-relaxed font-mono-tech text-[#C4C9D0] overflow-x-auto">
                      <code>{activeConsoleProject.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
