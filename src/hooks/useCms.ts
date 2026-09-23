import { useEffect, useState } from 'react';

export function useCmsContent<T>(section: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/content/${section}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res: { data: T | null } | null) => {
        if (!cancelled && res?.data && typeof res.data === 'object') {
          setData({ ...fallback, ...res.data });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [section]);

  return data;
}

export interface CmsMediaItem {
  src: string;
  alt: string;
  category?: string;
}

export function useCmsGallery(): { categories: { slug: string; label: string }[]; images: CmsMediaItem[] } {
  const [data, setData] = useState<{ categories: { slug: string; label: string }[]; images: CmsMediaItem[] }>({
    categories: [],
    images: [],
  });

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res) setData({ categories: res.categories ?? [], images: res.images ?? [] });
      })
      .catch(() => {});
  }, []);

  return data;
}

export interface CmsProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description: string;
  category_slug: string;
  images: { src: string; alt: string }[];
}

export function useCmsProjects(): CmsProject[] {
  const [items, setItems] = useState<CmsProject[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res?.items) setItems(res.items);
      })
      .catch(() => {});
  }, []);

  return items;
}
