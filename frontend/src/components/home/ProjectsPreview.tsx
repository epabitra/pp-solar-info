import { ButtonLink } from '@/components/ui/Button';
import { Section, SectionHeading } from '@/components/ui/Layout';
import { ProjectGallery } from '@/features/projects/ProjectGallery';
import { featuredProjectIds, projects } from '@/lib/projects';
import { routes } from '@/lib/siteLinks';

const featured = featuredProjectIds.flatMap((id) => projects.filter((project) => project.id === id));

export function ProjectsPreview() {
  return (
    <Section labelledBy="projects-preview-title">
      <SectionHeading
        id="projects-preview-title"
        eyebrow="Our work"
        title="Installations we are proud of"
        lead="Rooftop plants, industrial systems and the electrical work that makes them safe."
      />
      <ProjectGallery items={featured} />
      <div className="mt-12 text-center">
        <ButtonLink to={routes.projects} variant="outline">
          See all our work
        </ButtonLink>
      </div>
    </Section>
  );
}
