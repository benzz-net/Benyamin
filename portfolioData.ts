export interface PersonalIdentity {
  fullName: string;
  firstName: string;
  lastName: string;
  currentClass: string;
  school: string;
  role: string;
  subtitle: string;
  field: string;
  status: string;
  profileImageUrl: string;
  heroIntro: string;
  heroDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  mainInterests: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'language' | 'interest';
  status: string;
  progress: number;
  summary: string;
  focusTopics: string[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'systems' | 'web' | 'fundamentals' | 'upcoming';
  description: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl: string;
  hasInteractivePreview?: boolean;
  architectureHighlights: string[];
  codeSnippet?: string;
}

export interface JourneyMilestone {
  id: string;
  step: string;
  phase: string;
  title: string;
  description: string;
  focusTag: string;
}

export interface ContactConfig {
  email: string;
  githubUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface TravelDestination {
  id: string;
  code: string;
  name: string;
  packageTier: string;
  durationDays: number;
  priceIdr: number;
}

export interface TravelTransaction {
  id: string;
  passengerName: string;
  destinationName: string;
  packageTier: string;
  guests: number;
  totalPriceIdr: number;
  timestamp: string;
}

/**
 * Developer configuration constants (edit directly in code before deploying to GitHub).
 */
export const PROFILE_PHOTO_PATH = 'foto.jpg';
export const YOUR_EMAIL = 'benyaminnfernando@gmail.com';
export const YOUR_GITHUB_URL = 'https://github.com/benyaminfernando';
export const YOUR_INSTAGRAM_URL = 'https://instagram.com/benyaminfernando';
export const YOUR_LINKEDIN_URL = 'https://linkedin.com/in/benyamin-fernando-napitupulu';

/**
 * Fallback studio portrait SVG if foto.jpg has not been uploaded yet.
 */
export const STUDIO_PORTRAIT_FALLBACK_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720" fill="none">
  <defs>
    <radialGradient id="studioGlow" cx="50%" cy="34%" r="65%">
      <stop offset="0%" stop-color="#2E3B4E" stop-opacity="1"/>
      <stop offset="55%" stop-color="#14181F" stop-opacity="1"/>
      <stop offset="100%" stop-color="#08090B" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1F2F4" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#94A7BC" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#1B1F24" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="suitGrad" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#242C37"/>
      <stop offset="100%" stop-color="#0D1015"/>
    </linearGradient>
  </defs>
  <rect width="600" height="720" fill="url(#studioGlow)"/>
  <circle cx="300" cy="255" r="205" stroke="url(#rimLight)" stroke-width="1.2" stroke-dasharray="5 7" opacity="0.55"/>
  <circle cx="300" cy="255" r="152" stroke="#94A7BC" stroke-width="1" opacity="0.4"/>
  <path d="M135 690C148 535 212 465 300 465C388 465 452 535 465 690Z" fill="url(#suitGrad)" stroke="url(#rimLight)" stroke-width="2"/>
  <path d="M245 468L300 562L355 468" stroke="#F1F2F4" stroke-width="1.5" opacity="0.65"/>
  <circle cx="300" cy="260" r="92" fill="#1B212A" stroke="url(#rimLight)" stroke-width="2.2"/>
  <path d="M235 248C262 230 338 230 365 248" stroke="#F1F2F4" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
  <text x="300" y="274" text-anchor="middle" fill="#F1F2F4" font-family="sans-serif" font-weight="700" font-size="28" letter-spacing="6" opacity="0.9">BFN</text>
  <text x="300" y="645" text-anchor="middle" fill="#C4C9D0" font-family="monospace" font-size="13" letter-spacing="4" opacity="0.9">BENYAMIN F. NAPITUPULU · 11.1</text>
</svg>
`)}`;

export const INITIAL_IDENTITY: PersonalIdentity = {
  fullName: 'Benyamin Fernando Napitupulu',
  firstName: 'Benyamin Fernando',
  lastName: 'Napitupulu',
  currentClass: 'XI.1',
  school: 'SMAN 1 Tualang',
  role: 'Student Developer / Aspiring Software Engineer',
  subtitle: 'Student Developer | Future Software Engineer',
  field: 'Computer Science',
  status: 'Currently Learning',
  profileImageUrl: PROFILE_PHOTO_PATH,
  heroIntro: "HELLO, I'M",
  heroDescription:
    "I'm a high school student passionate about programming, technology, and building digital experiences. Currently exploring software development and strengthening my computer science fundamentals.",
  aboutTitle: 'A Little About Me',
  aboutDescription:
    "My name is Benyamin Fernando Napitupulu. I'm currently studying at SMAN 1 Tualang in class XI.1. I have a strong interest in computer science and software development. I enjoy learning programming languages, experimenting with new technologies, and creating projects that help me improve my technical skills.",
  mainInterests: [
    'Software Development',
    'Backend Development',
    'Computer Science',
    'Cybersecurity',
  ],
};

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'cpp',
    name: 'C++',
    category: 'language',
    status: 'Actively Practicing',
    progress: 75,
    summary: 'Structured programming, structs, modular functions, file I/O streams, and algorithmic problem-solving.',
    focusTopics: ['Structs & Pointers', 'File Handling', 'Console Systems', 'Logic & Loops'],
  },
  {
    id: 'java',
    name: 'Java',
    category: 'language',
    status: 'Learning OOP Fundamentals',
    progress: 60,
    summary: 'Object-Oriented Programming concepts, classes, encapsulation, inheritance, and strongly typed design.',
    focusTopics: ['Classes & Objects', 'OOP Principles', 'Data Types', 'Control Flow'],
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'language',
    status: 'Solid Foundation',
    progress: 80,
    summary: 'Semantic document structure, accessible markup, forms, and clean web layout architecture.',
    focusTopics: ['Semantic HTML5', 'Document Hierarchy', 'Forms', 'Accessibility'],
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'language',
    status: 'Exploring Layouts & Motion',
    progress: 75,
    summary: 'Responsive Grid and Flexbox layouts, dark editorial styling, typography scales, and subtle transitions.',
    focusTopics: ['Flexbox & Grid', 'Responsive Design', 'Animations', 'Custom Variables'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'language',
    status: 'Currently Exploring',
    progress: 65,
    summary: 'DOM manipulation, interactive UI logic, event handling, and asynchronous web scripting.',
    focusTopics: ['DOM Events', 'ES6+ Syntax', 'State Logic', 'Interactive UI'],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    category: 'interest',
    status: 'Core Focus Area',
    progress: 60,
    summary: 'Designing reliable server-side logic, data persistence, transaction processing, and API architecture.',
    focusTopics: ['Data Modeling', 'File Persistence', 'Business Logic', 'System Reliability'],
  },
  {
    id: 'software-eng',
    name: 'Software Engineering',
    category: 'interest',
    status: 'Continuous Exploration',
    progress: 70,
    summary: 'Writing modular, maintainable code and applying structured problem-solving to real-world systems.',
    focusTopics: ['Modular Architecture', 'Clean Code', 'Debugging', 'System Design'],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    category: 'interest',
    status: 'Researching Fundamentals',
    progress: 50,
    summary: 'Understanding secure coding practices, input validation, authentication concepts, and system defense.',
    focusTopics: ['Input Validation', 'Access Control', 'Network Basics', 'Secure Logic'],
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    category: 'interest',
    status: 'Building Interfaces',
    progress: 72,
    summary: 'Combining modern web standards with interactive 3D graphics and responsive engineering.',
    focusTopics: ['Frontend Architecture', '3D WebGL', 'Performance', 'UI/UX Craft'],
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'project-01',
    number: '01',
    title: 'Travel Agency Management System',
    category: 'systems',
    description:
      'A C++ console-based travel agency system featuring user management, destination selection, travel packages, transaction processing, balance management, and transaction history.',
    technologies: ['C++', 'Struct', 'Functions', 'File Handling'],
    githubUrl: 'https://github.com/benyaminfernando/cpp-travel-agency-system',
    liveDemoUrl: '#interactive-console-01',
    hasInteractivePreview: true,
    architectureHighlights: [
      'Custom C++ structs for UserProfile, TravelPackage, and TransactionRecord',
      'Persistent record storage and retrieval using <fstream> file handling',
      'Balance validation, package tier calculation, and formatted receipt history',
    ],
    codeSnippet: `struct TransactionRecord {
    string invoiceId;
    string passengerName;
    string destination;
    string packageTier;
    int totalCostIdr;
};

bool processBooking(UserAccount &user, const TravelPackage &pkg, int guests) {
    int total = pkg.basePriceIdr * guests;
    if (user.balanceIdr < total) return false;
    user.balanceIdr -= total;
    saveTransactionToFile(user.username, pkg, total);
    return true;
}`,
  },
  {
    id: 'project-02',
    number: '02',
    title: 'Personal Portfolio Website',
    category: 'web',
    description:
      'A personal portfolio website designed to showcase my programming journey, technical interests, and development projects.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/benyaminfernando/personal-portfolio',
    liveDemoUrl: '#home',
    architectureHighlights: [
      'Multi-font typographic system pairing Bricolage Grotesque, Cormorant Garamond & JetBrains Mono',
      'Real-time Three.js metallic geometric sculpture with PBR studio lighting',
      'Flat root file structure designed for effortless GitHub deployment',
    ],
  },
  {
    id: 'project-03',
    number: '03',
    title: 'Programming Practice Projects',
    category: 'fundamentals',
    description:
      'A collection of small programming projects created to improve logical thinking, problem-solving, and programming fundamentals.',
    technologies: ['C++', 'Java'],
    githubUrl: 'https://github.com/benyaminfernando/programming-practice',
    liveDemoUrl: '#projects',
    architectureHighlights: [
      'Algorithmic exercises in sorting, searching, matrix operations, and number theory',
      'Object-Oriented Java console exercises modeling banking and student gradebooks',
      'Focus on clean control flow, edge-case handling, and memory-safe data structures',
    ],
  },
  {
    id: 'project-04',
    number: '04',
    title: 'Future Projects',
    category: 'upcoming',
    description:
      'More experiments, applications, and creative software projects will be added as I continue learning.',
    technologies: ['Backend APIs', 'Cybersecurity Labs', 'Full-Stack Systems'],
    githubUrl: 'https://github.com/benyaminfernando',
    liveDemoUrl: '#contact',
    architectureHighlights: [
      'Upcoming exploration into RESTful backend services and relational databases',
      'Security-focused command-line utilities and encryption experiments',
      'Open to collaborative student engineering initiatives and open-source learning',
    ],
  },
];

export const INITIAL_JOURNEY: JourneyMilestone[] = [
  {
    id: 'milestone-1',
    step: '01',
    phase: 'Foundation',
    title: 'Started exploring programming.',
    description:
      'Discovered how software powers modern technology and began writing my first logical instructions and flowcharts.',
    focusTag: 'Computational Thinking',
  },
  {
    id: 'milestone-2',
    step: '02',
    phase: 'Web Structure',
    title: 'Learned HTML and CSS fundamentals.',
    description:
      'Built structured web pages, experimenting with semantic tags, typography, responsive flexbox/grid layouts, and dark UI themes.',
    focusTag: 'HTML · CSS',
  },
  {
    id: 'milestone-3',
    step: '03',
    phase: 'Core Logic',
    title: 'Practiced C++ programming and problem-solving.',
    description:
      'Strengthened algorithmic thinking through C++ loops, conditionals, arrays, structs, functions, and console data processing.',
    focusTag: 'C++ · Algorithms',
  },
  {
    id: 'milestone-4',
    step: '04',
    phase: 'Object-Oriented Paradigm',
    title: 'Started learning Java and Object-Oriented Programming.',
    description:
      'Explored classes, objects, encapsulation, and modular software design principles using Java.',
    focusTag: 'Java · OOP',
  },
  {
    id: 'milestone-5',
    step: '05',
    phase: 'Applied Systems',
    title: 'Built a C++ Travel Agency Management System.',
    description:
      'Engineered a complete multi-module C++ console application handling user accounts, travel packages, balance management, and persistent file history.',
    focusTag: 'C++ · File Handling',
  },
  {
    id: 'milestone-6',
    step: '06',
    phase: 'Current Horizon',
    title: 'Currently exploring backend development and cybersecurity.',
    description:
      'Deepening computer science fundamentals in class 11.1 at SMAN 1 Tualang while studying backend architecture and system security.',
    focusTag: 'Backend · Cybersecurity',
  },
];

export const INITIAL_CONTACT: ContactConfig = {
  email: YOUR_EMAIL,
  githubUrl: YOUR_GITHUB_URL,
  instagramUrl: YOUR_INSTAGRAM_URL,
  linkedinUrl: YOUR_LINKEDIN_URL,
};

export const TRAVEL_DESTINATIONS: TravelDestination[] = [
  {
    id: 'dest-1',
    code: 'BALI-EX',
    name: 'Bali Cultural & Coastal Expedition',
    packageTier: 'Executive Package',
    durationDays: 4,
    priceIdr: 3250000,
  },
  {
    id: 'dest-2',
    code: 'TOBA-HL',
    name: 'Lake Toba Highland Retreat',
    packageTier: 'Heritage Package',
    durationDays: 3,
    priceIdr: 1850000,
  },
  {
    id: 'dest-3',
    code: 'YOG-AC',
    name: 'Yogyakarta Temple & Academic Tour',
    packageTier: 'Scholar Package',
    durationDays: 3,
    priceIdr: 2100000,
  },
  {
    id: 'dest-4',
    code: 'RAJA-PR',
    name: 'Raja Ampat Marine Archipelago',
    packageTier: 'Premier Odyssey',
    durationDays: 5,
    priceIdr: 5400000,
  },
];

export function clampSkillProgress(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: 'all' | ProjectItem['category']
): ProjectItem[] {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}

export interface ContactValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function validateContactForm(input: {
  name: string;
  email: string;
  message: string;
}): ContactValidationResult {
  const errors: ContactValidationResult['errors'] = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName || trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function processTravelBooking(params: {
  currentBalanceIdr: number;
  passengerName: string;
  destination: TravelDestination;
  guests: number;
}): {
  success: boolean;
  error?: string;
  newBalanceIdr: number;
  transaction?: TravelTransaction;
} {
  const cleanPassenger = params.passengerName.trim();
  if (!cleanPassenger) {
    return {
      success: false,
      error: 'ERR_INVALID_USER: Passenger name cannot be empty.',
      newBalanceIdr: params.currentBalanceIdr,
    };
  }
  if (params.guests < 1 || params.guests > 10) {
    return {
      success: false,
      error: 'ERR_GUEST_COUNT: Guests must be between 1 and 10.',
      newBalanceIdr: params.currentBalanceIdr,
    };
  }
  const totalCost = params.destination.priceIdr * params.guests;
  if (params.currentBalanceIdr < totalCost) {
    return {
      success: false,
      error: `ERR_INSUFFICIENT_BALANCE: Required IDR ${totalCost.toLocaleString('en-US')}, available IDR ${params.currentBalanceIdr.toLocaleString('en-US')}.`,
      newBalanceIdr: params.currentBalanceIdr,
    };
  }

  const remaining = params.currentBalanceIdr - totalCost;
  const tx: TravelTransaction = {
    id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    passengerName: cleanPassenger,
    destinationName: params.destination.name,
    packageTier: params.destination.packageTier,
    guests: params.guests,
    totalPriceIdr: totalCost,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
  };

  return {
    success: true,
    newBalanceIdr: remaining,
    transaction: tx,
  };
}
