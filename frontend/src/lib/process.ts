/** The four-step working process, shown on pages and in llms-full.txt. */
export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  { title: 'Site visit', text: 'We inspect your roof or site, check shading and study your electricity use.' },
  { title: 'Design & proposal', text: 'We size the system for your load and roof, and explain the options clearly.' },
  { title: 'Installation', text: 'Our team installs, wires, tests and commissions the system safely.' },
  { title: 'Monitor & maintain', text: 'We check performance and service the plant so it keeps generating well.' },
];
