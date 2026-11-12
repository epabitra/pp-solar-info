import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Picture } from '@/components/ui/Picture';
import { photos } from '@/lib/images';
import type { ProjectItem } from '@/lib/projects';

const categoryLabel: Record<ProjectItem['category'], string> = {
  rooftop: 'Rooftop solar',
  commercial: 'Commercial & industrial',
  electrical: 'Inverters & electrical',
};

function ProjectTile({ item, onOpen }: { item: ProjectItem; onOpen: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-2xl border border-line bg-card text-left shadow-card transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
      >
        <span className="relative block aspect-[4/3] overflow-hidden bg-surface">
          <Picture
            photo={photos[item.photo]}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-hero/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand aria-hidden="true" className="h-4 w-4" />
          </span>
        </span>
        <span className="block p-5">
          <span className="inline-block rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">{categoryLabel[item.category]}</span>
          <span className="mt-3 block font-display text-lg font-semibold text-ink">{item.title}</span>
          <span className="mt-1 block text-sm text-ink-muted">{item.caption}</span>
          <span className="sr-only">. Open larger photo.</span>
        </span>
      </button>
    </li>
  );
}

interface LightboxProps {
  items: ProjectItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/** Native <dialog>: focus is trapped, Escape closes, focus returns to the opener. */
function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  const step = useCallback(
    (direction: 1 | -1) => {
      if (index === null || items.length === 0) return;
      onNavigate((index + direction + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  const navButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20';

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      // Clicking the backdrop (the dialog element itself) closes it.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      aria-labelledby="lightbox-title"
      className="m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-4 backdrop:bg-hero/90"
    >
      {item && index !== null && (
        <figure className="relative">
          <div className="mb-3 flex items-center justify-between gap-3 text-white">
            <p className="text-sm text-white/70" aria-live="polite">
              {index + 1} of {items.length}
            </p>
            <button type="button" onClick={onClose} aria-label="Close photo" className={navButton}>
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <Picture photo={photos[item.photo]} sizes="(min-width: 1024px) 1024px, 100vw" priority className="max-h-[70dvh] w-full rounded-2xl object-contain" />
          <figcaption className="mt-4 flex items-start justify-between gap-4 text-white">
            <span>
              <span id="lightbox-title" className="block font-display text-lg font-semibold">
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-white/75">{item.caption}</span>
            </span>
            <span className="flex shrink-0 gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={navButton}>
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className={navButton}>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </span>
          </figcaption>
        </figure>
      )}
    </dialog>
  );
}

export function ProjectGallery({ items }: { items: ProjectItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // A filter change can shrink the list under an open lightbox.
  useEffect(() => {
    setOpenIndex((current) => (current !== null && current >= items.length ? null : current));
  }, [items.length]);

  if (items.length === 0) {
    return <p className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted">No photos in this category yet. Choose another category above.</p>;
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <ProjectTile key={item.id} item={item} onOpen={() => setOpenIndex(index)} />
        ))}
      </ul>
      <Lightbox items={items} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
