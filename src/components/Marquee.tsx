const ITEMS = [
  'Закалено безопасно стъкло',
  'Прецизно заснемане',
  'Индивидуален проект',
  'Професионален монтаж',
  'Optiwhite · Grey · Bronze · Frosted',
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-t border-b border-[var(--line)] bg-white"
      aria-label="Основни предимства"
    >
      <div className="flex w-max" style={{ animation: 'marquee 28s linear infinite' }}>
        {[0, 1].map((group) => (
          <div className="flex items-center" key={group} aria-hidden={group === 1}>
            {ITEMS.map((item) => (
              <span
                key={item}
                className="py-5 px-[33px] text-[11px] font-extrabold tracking-[.14em] uppercase text-[#607177] whitespace-nowrap flex items-center gap-8 max-[560px]:py-[17px] max-[560px]:px-[22px]"
              >
                {item}
                <span className="text-[13px] text-[var(--glass-strong)]">◇</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
