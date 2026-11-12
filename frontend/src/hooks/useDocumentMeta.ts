import { useEffect } from 'react';
import { company } from '@/lib/siteConfig';

/** Sets a unique <title> and meta description per page (STYLE.md §10). */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title === company.legalName ? title : `${title} | ${company.shortName}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
