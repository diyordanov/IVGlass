import { useEffect, useState } from 'react';
import { Card, Field, TextInput, PrimaryButton, GhostButton } from '../ui';
import { Trash2 } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
}

interface GalleryCategory {
  slug: string;
  label: string;
}

interface GalleryImage {
  id: string;
  category: string;
  alt: string;
  src: string;
}

export default function GalleryAdmin() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatLabel, setNewCatLabel] = useState('');
  const [selMedia, setSelMedia] = useState('');
  const [selCategory, setSelCategory] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const load = () => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((res: { categories: GalleryCategory[]; images: GalleryImage[] }) => {
        setCategories(res.categories ?? []);
        setImages(res.images ?? []);
        if (res.categories?.[0]) setSelCategory(res.categories[0].slug);
      });
    fetch('/api/media')
      .then((r) => r.json())
      .then((res: { items: MediaItem[] }) => {
        setMedia(res.items ?? []);
        if (res.items?.[0]) setSelMedia(res.items[0].id);
      });
  };

  useEffect(load, []);

  const addCategory = async () => {
    if (!newCatSlug || !newCatLabel) return;
    await fetch('/api/gallery/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: newCatSlug, label: newCatLabel }),
    });
    setNewCatSlug('');
    setNewCatLabel('');
    load();
  };

  const addImage = async () => {
    if (!selMedia || !selCategory) return;
    await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ media_id: selMedia, category_slug: selCategory, alt: newAlt }),
    });
    setNewAlt('');
    load();
  };

  const removeImage = async (id: string) => {
    await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Галерия</h1>

      <Card title="Нова категория">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Slug (напр. dush-kabini)">
            <TextInput value={newCatSlug} onChange={(e) => setNewCatSlug(e.target.value)} />
          </Field>
          <Field label="Име (напр. Душ кабини)">
            <TextInput value={newCatLabel} onChange={(e) => setNewCatLabel(e.target.value)} />
          </Field>
        </div>
        <PrimaryButton onClick={addCategory}>Добави категория</PrimaryButton>
      </Card>

      <Card title="Добави снимка в галерията">
        {media.length === 0 ? (
          <p className="text-[13px] text-[#68777D]">Първо качи снимки в Медия библиотеката.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Снимка">
                <select
                  value={selMedia}
                  onChange={(e) => setSelMedia(e.target.value)}
                  className="w-full rounded-[10px] px-3.5 py-2.5 text-[14px]"
                  style={{ border: '1px solid #DDE5E7' }}
                >
                  {media.map((m) => (
                    <option key={m.id} value={m.id}>{m.filename}</option>
                  ))}
                </select>
              </Field>
              <Field label="Категория">
                <select
                  value={selCategory}
                  onChange={(e) => setSelCategory(e.target.value)}
                  className="w-full rounded-[10px] px-3.5 py-2.5 text-[14px]"
                  style={{ border: '1px solid #DDE5E7' }}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Алт текст (за SEO)">
              <TextInput value={newAlt} onChange={(e) => setNewAlt(e.target.value)} placeholder="напр. Душ кабина Варна" />
            </Field>
            <PrimaryButton onClick={addImage}>Добави в галерията</PrimaryButton>
          </>
        )}
      </Card>

      <Card title={`Добавени от админа (${images.length})`}>
        {images.length === 0 ? (
          <p className="text-[13px] text-[#68777D]">
            Все още няма добавени снимки от тук. Съществуващите 183 снимки от галерията остават видими на сайта непроменени.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-3 max-[700px]:grid-cols-2">
            {images.map((img) => (
              <div key={img.id} className="rounded-[12px] overflow-hidden" style={{ border: '1px solid #E3EAEC' }}>
                <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" />
                <div className="p-2 flex items-center justify-between">
                  <span className="text-[10px] text-[#68777D] truncate">{img.category}</span>
                  <GhostButton onClick={() => removeImage(img.id)}>
                    <Trash2 size={12} />
                  </GhostButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
