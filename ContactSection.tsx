import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Github,
  Instagram,
  Linkedin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import {
  ContactConfig,
  ContactSubmission,
  validateContactForm,
} from './portfolioData';

interface ContactSectionProps {
  contact: ContactConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contact.email);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({ name, email, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const newEntry: ContactSubmission = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSubmissions((prev) => [newEntry, ...prev]);
    setName('');
    setEmail('');
    setMessage('');
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 4000);
  };

  const socialItems = [
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail className="w-4 h-4 text-[#F1F2F4]" />,
    },
    {
      label: 'GitHub',
      value: contact.githubUrl,
      href: contact.githubUrl,
      icon: <Github className="w-4 h-4 text-[#F1F2F4]" />,
    },
    {
      label: 'Instagram',
      value: contact.instagramUrl,
      href: contact.instagramUrl,
      icon: <Instagram className="w-4 h-4 text-[#F1F2F4]" />,
    },
    {
      label: 'LinkedIn',
      value: contact.linkedinUrl,
      href: contact.linkedinUrl,
      icon: <Linkedin className="w-4 h-4 text-[#F1F2F4]" />,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 lg:py-36 border-t border-[#F1F2F4]/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Copy Email, & Social Coordinates */}
          <motion.div
            initial={{ opacity: 0.85, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <p className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#71869B] mb-3">
                05. Direct Channel &amp; Social Network
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F1F2F4] [text-wrap:balance]"
              >
                Let&apos;s{' '}
                <span className="font-editorial italic font-normal text-[#C4C9D0]">
                  Connect
                </span>
              </h2>
              <p className="mt-4 font-body text-base text-[#C4C9D0] leading-relaxed">
                I&apos;m always interested in learning new things, discussing technology, and connecting with people who share similar interests.
              </p>
            </div>

            {/* Primary Copy Email Action */}
            <div className="p-5 rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="block font-mono-tech text-xs uppercase tracking-wider text-[#71869B]">
                  Direct Email Address
                </span>
                <p className="font-mono-tech text-sm sm:text-base text-[#F1F2F4] truncate mt-1">
                  {contact.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#F1F2F4] text-[#08090B] font-display text-xs font-semibold hover:bg-[#C4C9D0] transition-colors whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Email Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Coordinates List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono-tech text-xs uppercase tracking-[0.16em] text-[#71869B]">
                  Social Profiles &amp; Coordinates
                </h3>
                <span className="font-editorial italic text-sm text-[#C4C9D0]/75">
                  Verified Channels
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Email' ? undefined : '_blank'}
                    rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                    className="group p-4 rounded-xl bg-[#121417] border border-[#C4C9D0]/15 hover:border-[#F1F2F4]/50 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#1B1F24] flex items-center justify-center shrink-0 group-hover:bg-[#71869B]/30 transition-colors">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="block font-display text-xs font-semibold text-[#F1F2F4]">
                          {item.label}
                        </span>
                        <span className="block text-[11px] font-mono-tech text-[#C4C9D0]/65 truncate">
                          {item.value}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#71869B] group-hover:text-[#F1F2F4] transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0.85, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-[#121417] border border-[#C4C9D0]/15 p-6 sm:p-10">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F1F2F4]/[0.06]">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F1F2F4]">
                    Send a Direct Message
                  </h3>
                  <p className="font-body text-xs text-[#C4C9D0]/70 mt-1">
                    Fill out your details below to start a conversation with Benyamin Fernando Napitupulu.
                  </p>
                </div>
                <span className="font-mono-tech text-xs text-[#71869B] hidden sm:inline">
                  SMAN 1 Tualang · 11.1
                </span>
              </div>

              <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-display text-xs font-medium text-[#C4C9D0] mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-[#C4C9D0]/20 font-body text-sm text-[#F1F2F4] placeholder:text-[#71869B]/60 focus:outline-none focus:border-[#F1F2F4] transition-colors"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs text-amber-300">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-display text-xs font-medium text-[#C4C9D0] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-[#C4C9D0]/20 font-body text-sm text-[#F1F2F4] placeholder:text-[#71869B]/60 focus:outline-none focus:border-[#F1F2F4] transition-colors"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs text-amber-300">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-display text-xs font-medium text-[#C4C9D0] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message about software development, C++, Java, or collaboration..."
                    className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-[#C4C9D0]/20 font-body text-sm text-[#F1F2F4] placeholder:text-[#71869B]/60 focus:outline-none focus:border-[#F1F2F4] transition-colors resize-y"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs text-amber-300">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="font-editorial italic text-sm text-[#C4C9D0]/80">
                    Direct inquiry dispatch · Ready for response.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F1F2F4] text-[#08090B] font-display text-xs font-semibold tracking-wide hover:bg-[#C4C9D0] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>

              {justSubmitted && (
                <div
                  role="status"
                  className="mt-6 p-4 rounded-xl bg-[#08090B] border border-[#C4C9D0]/35 text-xs text-[#F1F2F4] flex items-center justify-between gap-4"
                >
                  <span>
                    Thank you! Your message has been recorded in the session inbox below.
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono-tech underline text-[#C4C9D0] hover:text-[#F1F2F4] whitespace-nowrap"
                  >
                    Open in Mail Client ↗
                  </a>
                </div>
              )}

              {submissions.length > 0 && (
                <div className="mt-6 pt-6 border-t border-[#F1F2F4]/[0.06] space-y-3">
                  <p className="font-mono-tech text-xs uppercase tracking-wider text-[#71869B]">
                    Recent Session Dispatches ({submissions.length})
                  </p>
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-xl bg-[#08090B] border border-[#C4C9D0]/15 text-xs"
                    >
                      <div className="flex items-center justify-between text-[#F1F2F4] font-medium">
                        <span>
                          {sub.name} ({sub.email})
                        </span>
                        <span className="font-mono-tech text-[#71869B]">{sub.createdAt}</span>
                      </div>
                      <p className="text-[#C4C9D0]/85 mt-1.5 leading-relaxed">{sub.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
