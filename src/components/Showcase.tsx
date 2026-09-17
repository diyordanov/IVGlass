import { useState } from 'react';

interface GlassOption {
  name: string;
  title: string;
  desc: string;
  bg: string;
  filter: string;
  swatch: string;
  label: string;
  sub: string;
}

const OPTIONS: GlassOption[] = [
  {
    name: 'Прозрачно закалено',
    title: 'Прозрачно закалено стъкло',
    desc: 'Класическият избор за визуално леко и светло душ пространство. Подходящо за минималистични решения и почти всеки интериор.',
    bg: 'rgba(205,239,241,.10)',
    filter: 'none',
    swatch: 'rgba(215,244,247,.20)',
    label: 'Прозрачно',
    sub: 'чисто · универсално',
  },
  {
    name: 'Optiwhite / Low Iron',
    title: 'Optiwhite — кристална прозрачност',
    desc: 'Стъкло с намалено съдържание на желязо за по-чист, почти безцветен ефект и минимален зеленикав оттенък.',
    bg: 'rgba(226,250,250,.08)',
    filter: 'saturate(.86) brightness(1.08)',
    swatch: 'rgba(238,255,255,.30)',
    label: 'Optiwhite',
    sub: 'low iron · ultra clear',
  },
  {
    name: 'Тонирано сиво',
    title: 'Тонирано стъкло — Grey',
    desc: 'Дълбок и архитектурен нюанс за съвременни бани с черен, графитен или иноксов обков.',
    bg: 'rgba(73,91,96,.28)',
    filter: 'saturate(.7) brightness(.82)',
    swatch: 'rgba(75,92,96,.56)',
    label: 'Grey',
    sub: 'графит · характер',
  },
  {
    name: 'Тонирано бронз',
    title: 'Тонирано стъкло — Bronze',
    desc: 'По-топло и бутиково присъствие, което се съчетава отлично с камък, дърво и месингови детайли.',
    bg: 'rgba(145,109,78,.28)',
    filter: 'sepia(.20) saturate(.86)',
    swatch: 'rgba(142,104,73,.52)',
    label: 'Bronze',
    sub: 'топло · премиум',
  },
  {
    name: 'Матирано',
    title: 'Матирано стъкло',
    desc: 'Баланс между светлина и дискретност — подходящо, когато търсите повече уединение без тежко усещане.',
    bg: 'rgba(232,240,241,.36)',
    filter: 'blur(1.4px) saturate(.65)',
    swatch: 'rgba(230,239,240,.72)',
    label: 'Матирано',
    sub: 'privacy · soft',
  },
  {
    name: 'Антиваровиково покритие',
    title: 'Антиваровиково покритие',
    desc: 'Практично защитно решение, което ограничава натрупването на варовик и сапунени остатъци и улеснява ежедневната поддръжка.',
    bg: 'rgba(189,228,233,.12)',
    filter: 'contrast(1.03) brightness(1.03)',
    swatch: 'linear-gradient(135deg,rgba(198,239,243,.35),rgba(255,255,255,.75))',
    label: 'Easy care',
    sub: 'по-лесна поддръжка',
  },
];

const SHOWCASE_IMG = '/images/dush-kabini-harmonika-varna/dush-kabini-harmonika-varna-16.webp';

export default function Showcase() {
  const [active, setActive] = useState(0);
  const opt = OPTIONS[active];

  return (
    <section id="showers" className="section text-white overflow-hidden" style={{ background: 'var(--ink)' }}>
      <div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          background: 'rgba(90,180,192,.12)',
          filter: 'blur(90px)',
          top: '20%',
          right: '-150px',
        }}
      />
      <div className="container relative">
        <div className="section-head">
          <div>
            <div className="eyebrow text-[#A6D9DF]" data-reveal>ДУШ КАБИНИ И ПРЕГРАДИ</div>
            <h2 className="h2-display text-white" data-reveal>
              Бутикова баня.
              <br />
              Без компромис с размера.
            </h2>
          </div>
          <p className="lead text-[rgba(255,255,255,.58)]" data-reveal>
            От един минималистичен панел до цялостна кабина от няколко стъклени елемента —
            всяко решение се проектира според конкретното пространство.
          </p>
        </div>

        <div className="grid grid-cols-[1.05fr_.95fr] gap-[70px] items-center max-[820px]:grid-cols-1 max-[820px]:gap-11">
          <div
            className="relative min-h-[680px] rounded-[34px] overflow-hidden border border-[rgba(255,255,255,.12)] max-[820px]:min-h-[570px] max-[560px]:min-h-[470px] max-[560px]:rounded-[25px]"
            style={{ background: '#243136' }}
            data-reveal="left"
          >
            <img src={SHOWCASE_IMG} alt="Модерен душ със стъклен параван" className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg,rgba(5,16,20,.05),rgba(5,16,20,.22))' }}
            />
            <div
              className="absolute z-[3] rounded-[5px] border border-[rgba(255,255,255,.56)] transition-all duration-550"
              style={{
                inset: '10% 9% 8% 53%',
                background: opt.bg,
                boxShadow: 'inset 0 0 35px rgba(255,255,255,.20),0 20px 50px rgba(0,0,0,.18)',
                backdropFilter: opt.filter === 'none' ? undefined : opt.filter,
                WebkitBackdropFilter: opt.filter === 'none' ? undefined : opt.filter,
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <div
                className="absolute left-[10px] top-0 bottom-0 w-0.5"
                style={{
                  background: 'linear-gradient(transparent,rgba(113,213,224,.9),transparent)',
                  boxShadow: '0 0 16px rgba(113,213,224,.55)',
                }}
              />
            </div>
            <div
              className="absolute z-[4] bottom-5 left-5 border border-[rgba(255,255,255,.12)] rounded-[15px]"
              style={{
                background: 'rgba(10,22,26,.64)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '14px 16px',
              }}
            >
              <span className="block text-[9px] uppercase tracking-[.14em] text-[#93C9CF] font-extrabold">
                Избрано стъкло
              </span>
              <strong className="text-[13px]">{opt.name}</strong>
            </div>
          </div>

          <div data-reveal="right" className="py-2.5">
            <div className="eyebrow">ИЗБЕРЕТЕ ХАРАКТЕРА</div>
            <h3 className="text-white text-[31px] mb-[15px]">{opt.title}</h3>
            <p className="text-[rgba(255,255,255,.57)] leading-[1.72] text-[15px] min-h-[78px]">{opt.desc}</p>

            <div className="grid grid-cols-2 gap-2.5 my-7 max-[560px]:grid-cols-1">
              {OPTIONS.map((o, i) => (
                <button
                  key={o.name}
                  onClick={() => setActive(i)}
                  className={`rounded-[16px] px-3.5 py-[15px] flex items-center gap-3 text-left transition-all duration-300 ${
                    i === active
                      ? 'bg-[rgba(151,213,220,.12)] border-[rgba(151,213,220,.36)] text-white -translate-y-0.5'
                      : 'bg-[rgba(255,255,255,.045)] border-[rgba(255,255,255,.11)] text-[rgba(255,255,255,.72)] hover:bg-[rgba(151,213,220,.12)] hover:border-[rgba(151,213,220,.36)] hover:text-white hover:-translate-y-0.5'
                  }`}
                  style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
                >
                  <span
                    className="w-[30px] h-[30px] rounded-lg border border-[rgba(255,255,255,.33)] flex-shrink-0"
                    style={{
                      background: o.swatch,
                      boxShadow: 'inset 0 0 8px rgba(255,255,255,.3)',
                    }}
                  />
                  <span>
                    <b className="text-[12px]">{o.label}</b>
                    <small className="block text-[9px] mt-0.5 text-[rgba(255,255,255,.44)]">{o.sub}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="border-l border-[#7FC4CC] pl-[18px] text-[12px] leading-[1.7] text-[rgba(255,255,255,.52)]">
              Всички стъкла по поръчка се изпълняват като закалени стъкла
              в съответствие с приложимите стандарти за безопасност.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
