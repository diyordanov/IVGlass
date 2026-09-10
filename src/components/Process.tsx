import { useRef } from 'react';
import { useProcessProgress } from '@/hooks/useInteractions';

const STEPS = [
  {
    num: '01',
    title: 'Идея + ориентировъчни размери',
    desc: 'Изпращате ни снимки на пространството, какво искате да постигнете и приблизителни размери.',
  },
  {
    num: '02',
    title: 'Предварителна оферта',
    desc: 'На база на информацията обсъждаме подходяща конфигурация, стъкло, обков и ориентировъчна стойност.',
  },
  {
    num: '03',
    title: 'Оглед и прецизно заснемане',
    desc: 'Специалист посещава готовото за измерване пространство и взема точните размери за техническото решение.',
    note: 'Огледът е платена услуга',
  },
  {
    num: '04',
    title: 'Изработка и подготовка',
    desc: 'Стъклените елементи се подготвят по финалните размери и избраната конфигурация за конкретния обект.',
  },
  {
    num: '05',
    title: 'Доставка и професионален монтаж',
    desc: 'Финалният етап е точният монтаж на място и проверка на детайлите за завършен, чист резултат.',
  },
];

export default function Process() {
  const listRef = useRef<HTMLDivElement>(null);
  const { activeStep, fillHeight } = useProcessProgress(listRef);

  return (
    <section id="process" className="section bg-white">
      <div className="container grid grid-cols-[.74fr_1.26fr] gap-[90px] items-start max-[820px]:grid-cols-1 max-[820px]:gap-11">
        <div className="sticky top-[120px] max-[820px]:relative max-[820px]:top-auto">
          <div className="eyebrow" data-reveal>ОТ ИДЕЯ ДО МОНТАЖ</div>
          <h2 className="h2-display" data-reveal>
            Ясен процес.
            <br />
            Точен резултат.
          </h2>
          <p className="lead" data-reveal>
            Още преди огледа можем да дадем посока за проекта. Изпратете снимки,
            идея и ориентировъчни размери — ние ще продължим оттам.
          </p>
          <a className="btn btn-primary" href="#contact" data-reveal>
            Започни със запитване →
          </a>
        </div>

        <div ref={listRef} className="relative">
          <div
            className="absolute left-[26px] top-7 bottom-7 w-px"
            style={{ background: '#D7E2E4' }}
          >
            <div
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${fillHeight}%`,
                background: 'var(--glass-deep)',
                transition: 'height .1s linear',
              }}
            />
          </div>

          {STEPS.map((step, i) => (
            <article
              key={step.num}
              data-step
              className={`relative grid grid-cols-[54px_1fr] gap-5 transition-all duration-350 ${
                    i === STEPS.length - 1 ? 'pb-0' : 'pb-[50px]'
                  } ${i <= activeStep ? 'opacity-100 translate-x-1.5' : 'opacity-47'}`}
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
            >
              <div
                className={`w-[54px] h-[54px] rounded-full grid place-items-center text-[11px] font-extrabold z-[2] transition-all duration-350 ${
                  i <= activeStep
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)] shadow-[0_10px_28px_rgba(13,23,28,.15)]'
                    : 'bg-[#F5F8F9] border border-[#D7E2E4] text-[var(--glass-deep)]'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              >
                {step.num}
              </div>
              <div>
                <h3 className="text-[20px] my-[3px] mb-2">{step.title}</h3>
                <p className="text-[13px] leading-[1.72] text-[var(--muted)] m-0">{step.desc}</p>
                {step.note && (
                  <span className="inline-flex mt-2.5 px-2.5 py-[7px] rounded-full bg-[var(--mist)] text-[9px] font-bold text-[#61747A] uppercase tracking-[.08em]">
                    {step.note}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
