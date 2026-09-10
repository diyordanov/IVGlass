import { useState } from 'react';

const FAQS = [
  {
    q: 'Как да получа предварителна оферта?',
    a: 'Изпратете ни вашата идея, снимки на пространството и приблизителни размери. Така можем да обсъдим подходяща конфигурация и да подготвим предварителна ценова оферта.',
  },
  {
    q: 'Кога се вземат точните размери?',
    a: 'Прецизното заснемане се прави след като пространството е напълно завършено и готово за измерване. Огледът и консултацията на място са платена услуга.',
  },
  {
    q: 'Какви видове стъкло мога да избера?',
    a: 'Предлагат се прозрачно закалено, Optiwhite (Low Iron), тонирано сиво или бронз, матирано стъкло и възможност за антиваровикова обработка според проекта.',
  },
  {
    q: 'Може ли душ кабината да е с нестандартни размери?',
    a: 'Да. Именно индивидуалната изработка позволява конфигурацията да бъде съобразена с реалните размери, чупки, ниши и особености на конкретната баня.',
  },
  {
    q: 'Предлагате ли само монтаж?',
    a: 'IV Glass предлага цялостно персонализирано решение — от уточняване на проекта и точните размери до доставка и професионален монтаж на изработените стъклени елементи.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section bg-white">
      <div className="container grid grid-cols-[.68fr_1.32fr] gap-[90px] items-start max-[820px]:grid-cols-1 max-[820px]:gap-11">
        <div>
          <div className="eyebrow" data-reveal>ЧЕСТИ ВЪПРОСИ</div>
          <h2 className="h2-display" data-reveal>Преди да започнем.</h2>
          <p className="lead" data-reveal>Най-важното, което е добре да знаете още при първото запитване.</p>
        </div>

        <div className="border-t border-[var(--line)]" data-reveal>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-[var(--line)]">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-[25px] border-0 bg-none text-left flex items-center justify-between gap-5 text-[var(--ink)] font-semibold text-[16px]"
              >
                {faq.q}
                <span
                  className={`w-[30px] h-[30px] border border-[var(--line)] rounded-full relative flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                >
                  <span className="absolute left-1/2 top-1/2 w-[11px] h-px bg-[var(--ink)] -translate-x-1/2 -translate-y-1/2" />
                  <span
                    className={`absolute left-1/2 top-1/2 w-[11px] h-px bg-[var(--ink)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${open === i ? 'rotate-0' : 'rotate-90'}`}
                  />
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-450"
                style={{
                  maxHeight: open === i ? '200px' : 0,
                  transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <p className="text-[13px] leading-[1.8] text-[var(--muted)] pr-[55px] pb-[25px] m-0 max-[560px]:pr-2.5">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
