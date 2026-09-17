const AUDIENCE = [
  {
    tag: 'Дом',
    title: 'Бани и жилищни интериори',
    desc: 'Душ кабини, паравани, парапети и стъклени елементи, които пазят светлината и визуалната лекота.',
  },
  {
    tag: 'Retail',
    title: 'Търговски пространства',
    desc: 'Прегради, врати и индивидуални панели за обекти, в които материалите са част от изживяването.',
  },
  {
    tag: 'Business',
    title: 'Корпоративни пространства',
    desc: 'Стъклени системи за по-светли, функционални и визуално отворени офиси и работни зони.',
  },
];

export default function Audience() {
  return (
    <section className="section" style={{ background: 'linear-gradient(180deg,#F7FAFB,#fff)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>ЗА ВСЯКО ПРОСТРАНСТВО</div>
            <h2 className="h2-display" data-reveal>
              Стъклото се адаптира.
              <br />
              Идеята остава ваша.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[18px] max-[820px]:grid-cols-1">
          {AUDIENCE.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              className={`p-8 border border-[var(--line)] rounded-3xl relative overflow-hidden transition-all duration-400 min-h-[260px] hover:-translate-y-1.5 hover:shadow-[var(--shadow)] hover:border-[rgba(46,141,244,.22)] ${['', 'delay-1', 'delay-2'][i]}`}
              style={{
                background: 'rgba(255,255,255,.74)',
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <span className="inline-flex px-2.5 py-[7px] rounded-full bg-[var(--mist)] text-[9px] tracking-[.12em] uppercase font-extrabold text-[var(--glass-deep)] mb-[55px]">
                {item.tag}
              </span>
              <h3 className="h3-display">{item.title}</h3>
              <p className="text-[13px] leading-[1.7] text-[var(--muted)] mb-0">{item.desc}</p>
              <div
                className="absolute w-[105px] h-[200px] -right-[52px] -top-[45px] border border-[rgba(46,141,244,.18)] rotate-[24deg] rounded-[10px]"
                style={{ background: 'rgba(192,221,252,.11)' }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
