import React from 'react';
import { motion } from 'motion/react';
import { JourneyMilestone } from './portfolioData';

interface JourneySectionProps {
  milestones: JourneyMilestone[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({ milestones }) => {
  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="relative py-28 lg:py-36 border-t border-[#F1F2F4]/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0.85, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B] mb-3">
              04. Chronological Progression
            </p>
            <h2
              id="journey-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F1F2F4] [text-wrap:balance]"
            >
              My Development{' '}
              <span className="font-editorial italic font-normal text-[#C4C9D0]">
                Journey
              </span>
            </h2>
            <p className="mt-3 font-body text-base text-[#C4C9D0] max-w-xl">
              Key milestones along my computer science and software engineering path at SMAN 1 Tualang.
            </p>
          </div>
          <p className="font-editorial italic text-xl text-[#C4C9D0]">
            Continuous learning, one system at a time.
          </p>
        </motion.div>

        {/* Alternating Editorial Timeline */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-px bg-gradient-to-b from-[#71869B]/50 via-[#C4C9D0]/20 to-transparent"
          />

          <div className="space-y-8 lg:space-y-12">
            {milestones.map((milestone, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div
                    className={`lg:col-span-5 ${
                      isLeft ? 'lg:order-1 lg:text-right' : 'lg:order-3'
                    }`}
                  >
                    <div className="rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 p-6 hover:border-[#C4C9D0]/40 transition-colors text-left">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 text-xs font-mono-tech text-[#71869B]">
                          <span>STEP {milestone.step}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-editorial italic text-sm text-[#C4C9D0]">
                            {milestone.phase}
                          </span>
                        </div>
                        <span className="font-mono-tech text-[11px] text-[#71869B]">
                          {milestone.focusTag}
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[#F1F2F4] tracking-tight">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 font-body text-sm text-[#C4C9D0]/80 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-2 lg:order-2 justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#08090B] border border-[#C4C9D0]/40 flex items-center justify-center font-mono-tech text-xs text-[#F1F2F4] shadow-lg">
                      {milestone.step}
                    </div>
                  </div>

                  <div
                    className={`hidden lg:block lg:col-span-5 ${
                      isLeft ? 'lg:order-3' : 'lg:order-1'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
