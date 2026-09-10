import { useState } from 'react';

const PROJECT_TYPES = [
  'Душ кабина / параван',
  'Стъклен парапет',
  'Интериорна преграда',
  'Стъклена врата / панел',
  'Друго',
];

export default function CTA() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3300);
  };

  return (
    <section id="contact" className="pt-[25px]">
      <div className="container">
        <div
          className="rounded-[36px] p-[72px] text-white relative overflow-hidden max-[820px]:p-11 max-[820px]:px-6"
          style={{
            background:
              'linear-gradient(120deg,rgba(12,28,34,.96),rgba(21,54,62,.89)), url("https://images.pexels.com/photos/23985794/pexels-photo-23985794.jpeg?auto=compress&cs=tinysrgb&w=1800") center/cover',
          }}
        >
          <div
            className="absolute right-[5%] -top-[30%] w-[260px] h-[500px] border border-[rgba(188,232,236,.26)] rotate-[24deg] rounded-[14px]"
            style={{ background: 'rgba(196,233,236,.05)' }}
          />

          <div className="grid grid-cols-[.85fr_1.15fr] gap-[74px] items-start relative z-[2] max-[820px]:grid-cols-1">
            <div data-reveal>
              <div className="eyebrow text-[#A8DADF]">ЗАПОЧНЕТЕ ОТ ТУК</div>
              <h2 className="h2-display text-white">
                Имате място.
                <br />
                Ние ще намерим правилната линия.
              </h2>
              <p className="lead text-[rgba(255,255,255,.62)]">
                Изпратете ни идея, снимка и ориентировъчни размери.
                Ще обсъдим подходящото решение и следващата стъпка.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {['Снимки на помещението', 'Ориентировъчни размери', 'Желан тип стъкло'].map((point) => (
                  <span
                    key={point}
                    className="px-3 py-2 border border-[rgba(255,255,255,.15)] rounded-full text-[10px] font-bold text-[rgba(255,255,255,.73)] bg-[rgba(255,255,255,.05)]"
                    style={{
                      backdropFilter: 'blur(9px)',
                      WebkitBackdropFilter: 'blur(9px)',
                    }}
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[26px] p-7 text-[var(--ink)]"
              style={{
                background: 'rgba(255,255,255,.93)',
                border: '1px solid rgba(255,255,255,.56)',
                boxShadow: '0 25px 60px rgba(0,0,0,.18)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
              data-reveal="right"
            >
              <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="name" className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#6B7A7F]">
                    Име
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Вашето име"
                    required
                    className="w-full border border-[#DDE5E7] bg-white rounded-[13px] px-3.5 py-3.5 outline-none text-[var(--ink)] transition-all focus:border-[var(--glass-strong)] focus:shadow-[0_0_0_4px_rgba(121,187,196,.10)]"
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="phone" className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#6B7A7F]">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+359..."
                    required
                    className="w-full border border-[#DDE5E7] bg-white rounded-[13px] px-3.5 py-3.5 outline-none text-[var(--ink)] transition-all focus:border-[var(--glass-strong)] focus:shadow-[0_0_0_4px_rgba(121,187,196,.10)]"
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="project" className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#6B7A7F]">
                    Проект
                  </label>
                  <select
                    id="project"
                    className="w-full border border-[#DDE5E7] bg-white rounded-[13px] px-3.5 py-3.5 outline-none text-[var(--ink)] transition-all focus:border-[var(--glass-strong)] focus:shadow-[0_0_0_4px_rgba(121,187,196,.10)]"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="dimensions" className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#6B7A7F]">
                    Ориентировъчни размери
                  </label>
                  <input
                    id="dimensions"
                    type="text"
                    placeholder="напр. 120 × 90 × 200 cm"
                    className="w-full border border-[#DDE5E7] bg-white rounded-[13px] px-3.5 py-3.5 outline-none text-[var(--ink)] transition-all focus:border-[var(--glass-strong)] focus:shadow-[0_0_0_4px_rgba(121,187,196,.10)]"
                  />
                </div>
                <div className="flex flex-col gap-[7px] col-span-full">
                  <label htmlFor="message" className="text-[9px] font-extrabold uppercase tracking-[.11em] text-[#6B7A7F]">
                    Разкажете ни накратко
                  </label>
                  <textarea
                    id="message"
                    placeholder="Какво искате да реализирате?"
                    className="w-full border border-[#DDE5E7] bg-white rounded-[13px] px-3.5 py-3.5 outline-none text-[var(--ink)] transition-all focus:border-[var(--glass-strong)] focus:shadow-[0_0_0_4px_rgba(121,187,196,.10)] min-h-[88px] resize-y"
                  />
                </div>
              </div>
              <button className="btn btn-primary w-full mt-3.5" type="submit">
                Изпрати запитване →
              </button>
              <p className="text-center text-[9px] text-[#809095] mt-2.5 m-0">
                Демо форма за дизайн прототипа · при разработката се свързва с реален имейл / CRM.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={`fixed right-[22px] bottom-[22px] z-[3000] rounded-[15px] px-[18px] py-4 text-white text-[12px] transition-all duration-350 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-[25px] opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'var(--ink)',
          boxShadow: '0 18px 45px rgba(0,0,0,.22)',
          transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
        }}
      >
        Демо: формата ще бъде свързана при разработката на сайта.
      </div>
    </section>
  );
}
