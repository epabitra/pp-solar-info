import { Container } from '@/components/ui/Layout';

/** Shown only on the very first load, while the first page's code downloads. */
export function AppSkeleton() {
  return (
    <div role="status" aria-label="Loading" className="min-h-screen animate-pulse bg-canvas">
      <div className="border-b border-line">
        <Container className="flex h-[72px] items-center justify-between">
          <div className="h-10 w-48 rounded-lg bg-surface" />
          <div className="h-11 w-28 rounded-xl bg-surface" />
        </Container>
      </div>
      <div className="h-72 bg-hero/90" />
      <Container className="space-y-4 py-16">
        <div className="h-8 w-2/3 rounded-lg bg-surface" />
        <div className="h-4 w-full rounded bg-surface" />
        <div className="h-4 w-5/6 rounded bg-surface" />
      </Container>
    </div>
  );
}
