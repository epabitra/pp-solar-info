/** General solar questions. Answers avoid prices, subsidy amounts and guarantees (RULES.md §1.7). */
export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What is the difference between on-grid, off-grid and hybrid solar?',
    answer:
      'An on-grid system is connected to the electricity grid and lowers your bill, but it switches off during a power cut for safety. An off-grid system stores energy in batteries and works without the grid. A hybrid system does both: it lowers your bill and keeps essential loads running during power cuts.',
  },
  {
    question: 'How much roof space do I need?',
    answer:
      'As a rough guide, each 1 kW of panels needs about 100 sq ft of shadow-free roof. The exact area depends on the panels and the structure, and we confirm it during the site visit.',
  },
  {
    question: 'How often should solar panels be cleaned?',
    answer:
      'Dust and bird droppings reduce generation. Most rooftops need cleaning every few weeks, and more often in dusty areas or during the dry season. We offer cleaning and inspection visits.',
  },
  {
    question: 'Do you also do general electrical work?',
    answer:
      'Yes. Along with solar, we handle electrical installation, LT/HT work, lighting, motor and pump installation and repair, and wiring and cabling for houses, offices and industries.',
  },
  {
    question: 'Can you maintain a solar plant installed by another company?',
    answer:
      'Yes. Our operation and maintenance and our cleaning and inspection services are available for existing plants, whoever installed them.',
  },
];
