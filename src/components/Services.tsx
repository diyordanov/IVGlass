import { useCardTilt } from '@/hooks/useInteractions';

interface ServiceCardProps {
  img: string;
  num: string;
  title: string;
  desc: string;
  href: string;
  delay?: string;
}

function ServiceCard({ img, num, title, desc, href, delay }: ServiceCardProps) {
  const tiltRef = useCardTilt();

  return (
    <a
      ref={tiltRef}
      href={href}
      data-reveal
      className={`relative min-h-[430px] rounded-[28px] overflow-hidden text-white isolate ${delay ?? ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 -z-[2]"
        style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
      />
      <div
        className="absolute inset-0 -z-[1]"
        style={{ background: 'linear-gradient(180deg,transparent 25%,rgba(5,20,25,.78) 100%)' }}
      />
      <span
        className="absolute top-[23px] left-[25px] w-[42px] h-[42px] rounded-full grid place-items-center text-[11px] font-extrabold border border-[rgba(255,255,255,.2)]"
        style={{
          background: 'rgba(255,255,255,.17)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {num}
      </span>
      <div className="absolute left-[30px] right-[30px] bottom-7 flex items-end justify-between gap-5">
        <div>
          <h3 className="text-white text-[27px] mb-1.5">{title}</h3>
          <p className="m-0 text-[rgba(255,255,255,.72)] text-[13px] leading-[1.55] max-w-[410px]">{desc}</p>
        </div>
        <span
          className="w-[52px] h-[52px] rounded-full border border-[rgba(255,255,255,.45)] grid place-items-center flex-shrink-0 transition-all duration-300"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
          }}
        >
          ↗
        </span>
      </div>
    </a>
  );
}

const SERVICES = [
  {
    img: 'https://images.pexels.com/photos/6758533/pexels-photo-6758533.jpeg?auto=compress&cs=tinysrgb&w=1400',
    num: '01',
    title: 'Душ кабини и паравани',
    desc: 'Walk-in, статични, с врата, плъзгащи и нестандартни конфигурации по мярка.',
    href: '#showers',
    span: 'lg:col-span-6 col-span-12',
  },
  {
    img: 'https://images.pexels.com/photos/35699360/pexels-photo-35699360.jpeg?auto=compress&cs=tinysrgb&w=1400',
    num: '02',
    title: 'Стъклени парапети',
    desc: 'Светлина, безопасност и чисти линии за стълбища, тераси и модерни интериори.',
    href: '#projects',
    span: 'lg:col-span-6 col-span-12',
    delay: 'delay-1',
  },
  {
    img: 'https://images.pexels.com/photos/5483051/pexels-photo-5483051.jpeg?auto=compress&cs=tinysrgb&w=1000',
    num: '03',
    title: 'Интериорни прегради',
    desc: 'За офиси, търговски обекти и пространства, в които светлината трябва да остане.',
    href: '#projects',
    span: 'lg:col-span-4 col-span-12',
  },
  {
    img: 'https://images.pexels.com/photos/6523301/pexels-photo-6523301.jpeg?auto=compress&cs=tinysrgb&w=1400',
    num: '04',
    title: 'Стъклени врати и панели',
    desc: 'Индивидуални решения, които се адаптират към архитектурата — не обратното.',
    href: '#contact',
    span: 'lg:col-span-8 col-span-12',
    delay: 'delay-1',
  },
];

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--mist)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" data-reveal>РЕШЕНИЯ ОТ СТЪКЛО</div>
            <h2 className="h2-display" data-reveal>
              Проектирани за мястото.
              <br />
              Създадени за начина ви на живот.
            </h2>
          </div>
          <p className="lead" data-reveal>
            Не продаваме просто стъклен панел. Започваме от пространството,
            функцията и детайла — и стигаме до чист, точен и завършен монтаж.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-[18px]">
          {SERVICES.map((s) => (
            <div key={s.num} className={s.span}>
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
