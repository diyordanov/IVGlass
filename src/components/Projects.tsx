const PROJECTS = [
  {
    img: 'https://images.pexels.com/photos/14495939/pexels-photo-14495939.jpeg?auto=compress&cs=tinysrgb&w=1500',
    title: 'Walk-in душ зона',
    sub: 'Прозрачно стъкло · минимален обков',
    index: '01 / HOME',
    big: true,
  },
  {
    img: 'https://images.pexels.com/photos/5483051/pexels-photo-5483051.jpeg?auto=compress&cs=tinysrgb&w=1100',
    title: 'Офис прегради',
    sub: 'Светлина без загуба на зониране',
    index: '02 / WORK',
  },
  {
    img: 'https://images.pexels.com/photos/35699360/pexels-photo-35699360.jpeg?auto=compress&cs=tinysrgb&w=1100',
    title: 'Стъклени парапети',
    sub: 'Чиста архитектурна линия',
    index: '03 / ARCH',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>ИДЕИ ЗА ВАШИЯ ПРОЕКТ</div>
            <h2 className="h2-display" data-reveal>
              Една прозрачна линия.
              <br />
              Безброй приложения.
            </h2>
          </div>
          <a href="#contact" className="btn btn-ghost" data-reveal>
            Обсъди своя проект ↗
          </a>
        </div>

        <div className="grid grid-cols-[1.2fr_.8fr] grid-rows-[320px_320px] gap-[18px] max-[820px]:grid-cols-1 max-[820px]:grid-rows-[480px_320px_320px] max-[560px]:grid-rows-[420px_280px_280px]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              className={`relative rounded-[28px] overflow-hidden isolate ${p.big ? 'row-span-2 max-[820px]:row-auto' : ''} ${['', 'delay-1', 'delay-2'][i] ?? ''}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-800 hover:scale-[1.04]"
                style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg,transparent 42%,rgba(6,21,26,.67))' }}
              />
              <div className="absolute z-[3] left-[25px] right-[25px] bottom-[22px] text-white flex justify-between items-end gap-5">
                <div>
                  <h3 className="text-white m-0 mb-1.5 text-[22px]">{p.title}</h3>
                  <span className="text-[10px] tracking-[.12em] uppercase text-[rgba(255,255,255,.68)] font-bold">
                    {p.sub}
                  </span>
                </div>
                <span className="border border-[rgba(255,255,255,.35)] rounded-full px-2.5 py-[7px] text-[9px] text-white">
                  {p.index}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="text-small mt-4">
          * Снимките в този дизайн прототип са илюстративни. Във финалния сайт тук се заменят с реални обекти на IV Glass.
        </p>
      </div>
    </section>
  );
}
