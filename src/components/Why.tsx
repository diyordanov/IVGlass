const WHY = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" fill="none">
        <path d="M4 17V7m16 10V7M2 12h20M7 4l-3 3 3 3M17 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'По индивидуален размер',
    desc: 'Решението следва реалните размери и особености на пространството, а не стандартен шаблон.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" fill="none">
        <path d="M12 3l7 3v5c0 4.6-2.9 8.3-7 10-4.1-1.7-7-5.4-7-10V6l7-3zM9 12l2 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Закалено стъкло',
    desc: 'Работим с безопасно закалено стъкло и подходящи конфигурации според приложението и проекта.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" fill="none">
        <path d="M4 20h16M6 16l9-9 3 3-9 9H6v-3zM13 9l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Техническа консултация',
    desc: 'Помагаме да изберете форма, тип стъкло и детайли така, че естетиката да работи заедно с функцията.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" fill="none">
        <path d="M4 5h16v14H4zM8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Един екип от начало до край',
    desc: 'От първата идея и заснемането до доставката и монтажа — целият процес остава координиран.',
  },
];

export default function Why() {
  return (
    <section className="section text-white overflow-hidden" style={{ background: 'var(--ink)' }}>
      <div className="container relative">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>ЗАЩО IV GLASS</div>
            <h2 className="h2-display text-white" data-reveal>
              Не „нещо готово“.
              <br />
              Точното решение за вашето място.
            </h2>
          </div>
          <p className="lead text-[rgba(255,255,255,.56)]" data-reveal>
            Когато стъклото е част от архитектурата, милиметрите, изборът на материал
            и качеството на монтажа са част от дизайна.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3.5 mt-[55px] max-[1040px]:grid-cols-2 max-[560px]:grid-cols-1">
          {WHY.map((item, i) => (
            <article
              key={item.title}
              data-reveal
              className={`group min-h-[290px] p-7 border border-[rgba(255,255,255,.1)] rounded-3xl relative overflow-hidden transition-all duration-400 hover:-translate-y-[7px] hover:border-[rgba(46,141,244,.33)] max-[560px]:min-h-[230px] ${['', 'delay-1', 'delay-2', 'delay-3'][i]}`}
              style={{
                background: 'linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.025))',
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <div
                className="absolute w-[90px] h-[180px] -right-[35px] -top-[45px] border border-[rgba(140,190,245,.22)] rotate-[24deg] rounded-[7px]"
                style={{ background: 'rgba(140,190,245,.035)' }}
              />
              <div
                className="w-[46px] h-[46px] rounded-[14px] grid place-items-center mb-[68px] max-[560px]:mb-[45px]"
                style={{
                  background: 'rgba(46,141,244,.10)',
                  border: '1px solid rgba(46,141,244,.20)',
                  color: '#82BBF8',
                }}
              >
                {item.icon}
              </div>
              <h3 className="text-white text-[18px]">{item.title}</h3>
              <p className="text-[rgba(255,255,255,.49)] text-[12px] leading-[1.7] m-0">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
