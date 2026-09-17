import { useMemo, useState } from 'react';
import { GALLERY_CATEGORIES, GALLERY_IMAGES } from '@/data/gallery';

const PAGE_SIZE = 12;

export default function Gallery() {
  const [active, setActive] = useState<string>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === active)),
    [active]
  );

  const shown = filtered.slice(0, visible);

  const selectCategory = (slug: string) => {
    setActive(slug);
    setVisible(PAGE_SIZE);
  };

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const step = (dir: 1 | -1) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + shown.length) % shown.length;
    setLightboxIndex(next);
  };

  return (
    <section id="gallery" className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>ГАЛЕРИЯ</div>
            <h2 className="h2-display" data-reveal>
              Реални обекти.
              <br />
              Истински резултати във Варна.
            </h2>
          </div>
          <p className="lead" data-reveal>
            Разгледайте изпълнени от нас душ кабини, паравани, парапети и стъклени
            прегради — филтрирайте по категория, за да намерите вдъхновение за вашето пространство.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-9" data-reveal>
          <button
            onClick={() => selectCategory('all')}
            className={`px-4 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-300 ${
              active === 'all'
                ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--glass-strong)]'
            }`}
          >
            Всички ({GALLERY_IMAGES.length})
          </button>
          {GALLERY_CATEGORIES.map((cat) => {
            const count = GALLERY_IMAGES.filter((img) => img.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                onClick={() => selectCategory(cat.slug)}
                className={`px-4 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-300 ${
                  active === cat.slug
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                    : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--glass-strong)]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-4 gap-4 max-[1040px]:grid-cols-3 max-[700px]:grid-cols-2">
          {shown.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="relative rounded-[18px] overflow-hidden isolate group aspect-[4/5] border-0 p-0 cursor-zoom-in"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(180deg,transparent 55%,rgba(5,20,25,.65))' }}
              />
              <span className="absolute left-3 right-3 bottom-3 text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left leading-snug">
                {img.alt}
              </span>
            </button>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="flex justify-center mt-10">
            <button className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              Покажи още снимки
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && shown[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-5"
          style={{ background: 'rgba(5,15,19,.92)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-[rgba(255,255,255,.35)] text-white grid place-items-center"
            onClick={closeLightbox}
            aria-label="Затвори"
          >
            ✕
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[rgba(255,255,255,.35)] text-white grid place-items-center"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Предишна снимка"
          >
            ←
          </button>
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-[rgba(255,255,255,.35)] text-white grid place-items-center"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Следваща снимка"
          >
            →
          </button>
          <figure className="max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={shown[lightboxIndex].src}
              alt={shown[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[78vh] object-contain rounded-[14px] mx-auto"
            />
            <figcaption className="text-center text-white text-[13px] mt-4 opacity-80">
              {shown[lightboxIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
