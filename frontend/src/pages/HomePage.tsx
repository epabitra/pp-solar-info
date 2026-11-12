import { AboutPreview } from '@/components/home/AboutPreview';
import { AudienceStrip } from '@/components/home/AudienceStrip';
import { CalculatorTeaser } from '@/components/home/CalculatorTeaser';
import { HomeHero } from '@/components/home/HomeHero';
import { ProjectsPreview } from '@/components/home/ProjectsPreview';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { FaqSection } from '@/components/sections/FaqSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { company } from '@/lib/siteConfig';

export default function HomePage() {
  useDocumentMeta(
    company.legalName,
    'Solar EPC, rooftop solar installation (on-grid, off-grid, hybrid), O&M, panel cleaning and electrical work in Ganjam, Odisha.',
  );

  return (
    <>
      <HomeHero />
      <AudienceStrip />
      <AboutPreview />
      <ServicesOverview />
      <CalculatorTeaser />
      <ProjectsPreview />
      <WhyChooseUs tone="surface" />
      <ProcessSection tone="canvas" />
      <FaqSection tone="surface" />
      <CtaBanner />
    </>
  );
}
