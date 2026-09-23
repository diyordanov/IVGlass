import { useEffect, useMemo, useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { useCmsProjects } from '@/hooks/useCms';

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const cmsProjects = useCmsProjects();
  const allProjects = useMemo(
    () => [
      ...PROJECTS,
      ...cmsProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        excerpt: p.excerpt,
        description: p.description,
        categorySlug: p.category_slug,
        images: p.images,
      })),
    ].filter((p) => p.images.length > 0),
    [cmsProjects]
  );
  const active = allProjects.find((p) => p.slug === activeSlug) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSlug(null);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [active]);

  return (
    <section id="projects" className="section" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>РЕАЛИЗИРАНИ ПРОЕКТИ</div>
            <h2 className="h2-display" data-reveal>
              Проекти с история.
              <br />
              Вижте как ги изпълнихме.
            </h2>
          </div>
          <a href="#contact" className="btn btn-ghost" data-reveal>
            Обсъди своя проект ↗
          </a>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {allProjects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActiveSlug(p.slug)}
              data-reveal
              className={`relative min-h-[340px] rounded-[28px] overflow-hidden isolate text-left border-0 p-0 cursor-pointer group ${['', 'delay-1', 'delay-2'][i % 3] ?? ''}`}
            >
              <img
                src={p.images[0].src}
                alt={p.images[0].alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg,transparent 40%,rgba(6,21,26,.72))' }}
              />
              <div className="absolute z-[3] left-[24px] right-[24px] bottom-[22px] text-white">
                <h3 className="text-white m-0 mb-1.5 text-[21px] leading-snug">{p.title}</h3>
                <span className="text-[12px] leading-snug text-[rgba(255,255,255,.72)] block max-w-[320px]">
                  {p.excerpt}
                </span>
                <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-bold uppercase tracking-[.1em] text-white">
                  Разгледай проекта ↗
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-small mt-4">
          Реални обекти, изпълнени от IV Glass във Варна — снимките и описанията са от нашите проекти.
        </p>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-5"
          style={{ background: 'rgba(5,15,19,.92)' }}
          onClick={() => setActiveSlug(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-[rgba(255,255,255,.35)] text-white grid place-items-center z-10"
            onClick={() => setActiveSlug(null)}
            aria-label="Затвори"
          >
            ✕
          </button>
          <div
            className="max-w-[880px] w-full max-h-[88vh] overflow-y-auto rounded-[24px] bg-white p-8 max-[700px]:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {active.subtitle && (
              <div className="eyebrow">{active.subtitle.toUpperCase()}</div>
            )}
            <h3 className="h3-display text-[28px] mb-4">{active.title}</h3>

            <div
              className={`grid gap-3 mb-6 ${active.images.length > 2 ? 'grid-cols-3 max-[700px]:grid-cols-1' : 'grid-cols-2 max-[700px]:grid-cols-1'}`}
            >
              {active.images.map((img) => (
                <div key={img.src} className="rounded-[16px] overflow-hidden aspect-[4/5]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <p className="text-[15px] leading-[1.75] text-[var(--text)]">{active.description}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a href="#gallery" onClick={() => setActiveSlug(null)} className="btn btn-ghost">
                Виж още в галерията
              </a>
              <a href="#contact" onClick={() => setActiveSlug(null)} className="btn btn-primary">
                Искам подобен проект
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
