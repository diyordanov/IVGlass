import { useParallax } from '@/hooks/useInteractions';

const HERO_IMG = '/images/dush-pregradi-135-gradusa-varna/dush-pregradi-135-gradusa-varna-02.webp';

export default function Hero() {
  const { ref, targetRef } = useParallax();

  return (
    <section
      id="home"
      className="min-h-[100svh] pt-[152px] pb-[76px] relative flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 80% 18%, rgba(157,219,226,.28), transparent 25%), linear-gradient(180deg,#F9FBFC 0%,#FFFFFF 78%)',
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          border: '1px solid rgba(92,157,166,.16)',
          right: '-15vw',
          top: '-13vw',
        }}
      />

      <div className="container grid grid-cols-[.92fr_1.08fr] gap-[74px] items-center max-[1040px]:grid-cols-2 max-[1040px]:gap-[34px] max-[820px]:grid-cols-1">
        <div className="relative z-[3] max-[820px]:pt-5">
          <div className="eyebrow" data-reveal>
            IV GLASS · СТЪКЛО ПО МЯРКА
          </div>
          <h1 className="h1-display delay-1" data-reveal>
            Пространство
            <br />
            <span className="stroke-text">без граници.</span>
          </h1>
          <p className="lead delay-2 max-w-[610px] mb-9" data-reveal>
            Проектираме, доставяме и монтираме душ кабини, стъклени прегради,
            парапети и интериорни решения по индивидуален размер — за дома,
            търговския обект и корпоративното пространство.
          </p>
          <div className="flex gap-3.5 flex-wrap" data-reveal>
            <a href="#contact" className="btn btn-primary">
              Искам предварителна оферта
              <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#showers" className="btn btn-ghost">
              Разгледай душ решенията
            </a>
          </div>

          <div
            className="flex items-center gap-6 mt-[46px] pt-[26px] border-t border-[var(--line)] max-w-[610px] max-[560px]:gap-3 max-[560px]:justify-between"
            data-reveal
          >
            {[
              { num: '01', label: 'Проектиране' },
              { num: '02', label: 'Доставка' },
              { num: '03', label: 'Монтаж' },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-center gap-2.5 text-[12px] font-bold text-[#43545A] max-[560px]:text-[10px] max-[560px]:gap-1.5"
              >
                <span
                  className="w-8 h-8 rounded-full grid place-items-center max-[560px]:w-[27px] max-[560px]:h-[27px]"
                  style={{
                    background: 'rgba(121,187,196,.14)',
                    color: 'var(--glass-deep)',
                  }}
                >
                  {item.num}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div
          ref={ref}
          className="relative z-[2] min-h-[650px] max-[1040px]:min-h-[580px] max-[820px]:min-h-[620px] max-[820px]:mt-5 max-[560px]:min-h-[510px]"
          data-reveal="right"
        >
          <div
            className="absolute inset-0 left-9 rounded-[34px] overflow-hidden max-[820px]:left-0 max-[560px]:rounded-[25px]"
            style={{
              boxShadow: 'var(--shadow)',
              background: 'linear-gradient(145deg,#dcebed,#8fbec4 52%,#25373d)',
            }}
          >
            <img
              src={HERO_IMG}
              alt="Модерна баня със стъклена душ кабина"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(180deg,rgba(5,22,27,.02),rgba(5,22,27,.22))' }}
            />
          </div>

          {/* Glass stack decoration */}
          <div
            ref={targetRef}
            className="absolute right-[-48px] top-[42px] w-[150px] h-[280px] z-[5] pointer-events-none max-[820px]:right-[-40px] max-[560px]:origin-top-right"
            style={{ transform: 'scale(.78)' }}
            aria-hidden="true"
          >
            {[
              'right:0;top:0;background:rgba(179,228,233,.27)',
              'right:18px;top:14px;background:rgba(110,192,201,.19)',
              'right:36px;top:28px;background:rgba(183,206,209,.22)',
              'right:54px;top:42px;background:rgba(103,163,170,.13)',
              'right:72px;top:56px;background:rgba(229,239,241,.28)',
            ].map((style, i) => (
              <span
                key={i}
                className="absolute w-[76px] h-[220px] rounded-[7px] border border-[rgba(255,255,255,.62)]"
                style={{
                  boxShadow: '0 16px 30px rgba(28,88,99,.12), inset 0 0 18px rgba(255,255,255,.4)',
                  backdropFilter: 'blur(3px)',
                  ...(style.split(';').reduce((acc, prop) => {
                    const [k, v] = prop.split(':').map((s) => s.trim());
                    acc[k] = v;
                    return acc;
                  }, {} as Record<string, string>)),
                }}
              />
            ))}
          </div>

          {/* Floating badge */}
          <div
            className="absolute left-[-22px] bottom-11 z-[4] w-[180px] h-[180px] rounded-full grid place-items-center text-center p-[30px] max-[820px]:left-[-4px] max-[820px]:bottom-6 max-[820px]:w-[145px] max-[820px]:h-[145px] max-[820px]:p-[22px] max-[560px]:w-[125px] max-[560px]:h-[125px]"
            style={{
              background: 'rgba(238,249,250,.76)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,.56)',
              boxShadow: '0 20px 50px rgba(15,52,62,.16)',
              animation: 'float 5s ease-in-out infinite',
            }}
          >
            <div>
              <strong className="block text-[18px] leading-[1.05] text-[var(--ink)] max-[560px]:text-[14px]">
                По ваш размер.
              </strong>
              <small className="block text-[10px] tracking-[.14em] uppercase mt-2 text-[var(--glass-deep)] font-extrabold">
                До последния mm
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
