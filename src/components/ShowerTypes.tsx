interface ShowerType {
  num: string;
  label: string;
  title: string;
  desc: string;
  svg: React.ReactNode;
}

const TYPES: ShowerType[] = [
  {
    num: '01',
    label: 'Minimal',
    title: 'Walk-in параван',
    desc: 'Един или повече фиксирани панели за максимално чиста визия и лесен достъп.',
    svg: (
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path d="M40 26v108M40 26h66v108H40" stroke="#83C2C9" strokeWidth="2" />
        <path d="M106 26l15 10v96l-15 2" stroke="#2E7F8B" strokeWidth="2" />
        <path d="M40 134h81" stroke="#B9DDE1" strokeWidth="2" />
        <circle cx="96" cy="82" r="2.5" fill="#2E7F8B" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Classic',
    title: 'Врата + фиксиран панел',
    desc: 'Баланс между удобство, стабилност и минимален обков при стандартни и нестандартни ниши.',
    svg: (
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path d="M34 30v102h92V30" stroke="#83C2C9" strokeWidth="2" />
        <path d="M80 30v102" stroke="#2E7F8B" strokeWidth="2" />
        <path d="M80 30l26 12v76l-26 14" stroke="#2E7F8B" strokeWidth="2" />
        <circle cx="97" cy="82" r="2.5" fill="#2E7F8B" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Space saver',
    title: 'Плъзгаща система',
    desc: 'Практично решение, когато зоната пред душа е ограничена и не искаме радиус на отваряне.',
    svg: (
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path d="M36 34v96h86V34H36z" stroke="#83C2C9" strokeWidth="2" />
        <path d="M78 34v96M83 34v96" stroke="#2E7F8B" strokeWidth="1.7" />
        <path d="M54 78h50" stroke="#B9DDE1" strokeWidth="1.5" strokeDasharray="5 5" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Bespoke',
    title: 'Ъглова / нестандартна',
    desc: 'За скосове, чупки, тесни помещения и архитектура, която изисква решение изцяло по мярка.',
    svg: (
      <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
        <path d="M38 32v98h52V32H38zM90 32l30 16v82H90" stroke="#83C2C9" strokeWidth="2" />
        <path d="M90 32v98" stroke="#2E7F8B" strokeWidth="2" />
        <path d="M38 130h82" stroke="#B9DDE1" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function ShowerTypes() {
  return (
    <section className="section bg-white overflow-hidden" aria-labelledby="showerTypesTitle">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>КОНФИГУРАЦИИ</div>
            <h2 id="showerTypesTitle" className="h2-display" data-reveal>
              Вашата баня определя формата.
              <br />
              Не каталогът.
            </h2>
          </div>
          <p className="lead" data-reveal>
            Подбираме конфигурацията според нишата, отварянето, наклоните, позицията на смесителя и начина, по който реално използвате пространството.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {TYPES.map((t, i) => (
            <article
              key={t.num}
              data-reveal
              className={`border border-[var(--line)] rounded-[24px] p-6 transition-all duration-400 relative overflow-hidden hover:-translate-y-[7px] hover:shadow-[var(--shadow)] hover:border-[rgba(74,151,160,.22)] ${['', 'delay-1', 'delay-2', 'delay-3'][i]}`}
              style={{
                background: 'linear-gradient(180deg,#fff,#F8FBFB)',
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <div className="h-[190px] grid place-items-center mb-[22px] relative max-[560px]:h-40">
                <div
                  className="absolute w-[150px] h-[150px] rounded-full"
                  style={{ background: 'radial-gradient(circle,rgba(151,216,223,.22),transparent 68%)' }}
                />
                <div className="w-[150px] h-[150px] relative z-[2]" style={{ filter: 'drop-shadow(0 18px 20px rgba(27,90,99,.10))' }}>
                  {t.svg}
                </div>
              </div>
              <small className="text-[9px] uppercase tracking-[.13em] font-extrabold text-[var(--glass-deep)]">
                {t.num} · {t.label}
              </small>
              <h3 className="text-[18px] mt-2 mb-2">{t.title}</h3>
              <p className="text-[12px] leading-[1.7] text-[var(--muted)] m-0">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
