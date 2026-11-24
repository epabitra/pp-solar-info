import { useSearchParams } from 'react-router';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Layout';
import { ProjectGallery } from '@/features/projects/ProjectGallery';
import { useHydrated } from '@/hooks/useHydrated';
import { photos } from '@/lib/images';
import { projectCategories, projects } from '@/lib/projects';

type FilterId = (typeof projectCategories)[number]['id'];

function parseFilter(value: string | null): FilterId {
  return projectCategories.find((category) => category.id === value)?.id ?? 'all';
}

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // The pre-rendered page always shows "All work"; a ?category= link applies after hydration.
  const hydrated = useHydrated();
  const active = hydrated ? parseFilter(searchParams.get('category')) : 'all';
  const visible = active === 'all' ? projects : projects.filter((project) => project.category === active);

  const select = (id: FilterId) => {
    setSearchParams(id === 'all' ? {} : { category: id }, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <PageHeader
        title="Our work"
        lead="A look at rooftop solar plants, industrial installations and the electrical work behind them."
        crumbs={[{ label: 'Our work' }]}
        photo={photos.aerialIndustrial}
      />
      <Section labelledBy="gallery-title">
        <h2 id="gallery-title" className="sr-only">
          Project photos
        </h2>
        <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          {projectCategories.map((category) => {
            const selected = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={selected}
                onClick={() => select(category.id)}
                className={`h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                  selected ? 'bg-brand text-on-brand' : 'border border-line bg-card text-ink hover:border-brand hover:text-brand'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <p className="mb-6 text-sm text-ink-muted" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'photo' : 'photos'}
        </p>
        <ProjectGallery items={visible} />
      </Section>
      <CtaBanner title="Want results like these?" />
    </>
  );
}
