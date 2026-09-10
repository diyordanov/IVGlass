const SLABS = [
  { transform: 'translate(-78%,-56%) rotateY(43deg) translateZ(-70px)', bg: 'rgba(194,230,233,.27)' },
  { transform: 'translate(-64%,-53%) rotateY(35deg) translateZ(-35px)', bg: 'rgba(115,192,199,.19)' },
  { transform: 'translate(-50%,-50%) rotateY(27deg)', bg: 'rgba(235,247,248,.29)' },
  { transform: 'translate(-36%,-47%) rotateY(20deg) translateZ(35px)', bg: 'rgba(105,150,154,.14)' },
  { transform: 'translate(-22%,-44%) rotateY(12deg) translateZ(70px)', bg: 'rgba(205,220,218,.22)' },
];

const LIST_ITEMS = [
  { color: 'rgba(220,248,249,.8)', title: 'Прецизно заснемане', sub: 'по реалния обект' },
  { color: 'rgba(160,218,224,.65)', title: 'Индивидуално проектиране', sub: 'размер · форма · обков' },
  { color: 'rgba(92,143,150,.50)', title: 'Професионален монтаж', sub: 'точен · чист · завършен' },
];

export default function GlassStory() {
  return (
    <section id="about" className="section bg-white overflow-hidden">
      <div className="container grid grid-cols-[.8fr_1.2fr] gap-20 items-center max-[820px]:grid-cols-1 max-[820px]:gap-11">
        <div
          className="h-[600px] relative max-[820px]:h-[520px] max-[820px]:order-2 max-[560px]:h-[440px] max-[560px]:scale-[.82]"
          style={{ perspective: '1100px' }}
          data-reveal="left"
          aria-hidden="true"
        >
          {SLABS.map((slab, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 w-[260px] h-[410px] rounded-xl border border-[rgba(63,145,155,.26)] transition-transform duration-800"
              style={{
                background: slab.bg,
                boxShadow: '-12px 26px 48px rgba(27,88,96,.08),inset 0 0 40px rgba(255,255,255,.42)',
                transformOrigin: 'center',
                transform: slab.transform,
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            />
          ))}
          <div
            className="absolute left-1/2 bottom-[54px] -translate-x-1/2 w-[430px] h-px"
            style={{
              background: 'linear-gradient(90deg,transparent,var(--glass-strong),transparent)',
              boxShadow: '0 0 24px rgba(70,181,193,.55)',
            }}
          />
        </div>

        <div data-reveal="right">
          <div className="eyebrow">IV GLASS · НАШИЯТ ПОДХОД</div>
          <h2 className="h2-display">
            Стъклото е материал.
            <br />
            Детайлът го превръща в интериор.
          </h2>
          <p className="lead">
            Вашият проект започва с реалното пространство. Ние съчетаваме
            естетика, техническа логика, точни размери и правилния тип стъкло,
            за да получите решение, което изглежда естествено на мястото си.
          </p>

          <div className="border-t border-[var(--line)] mt-[35px]">
            {LIST_ITEMS.map((item) => (
              <div
                key={item.title}
                className="py-[21px] border-b border-[var(--line)] grid grid-cols-[36px_1fr_auto] gap-[15px] items-center"
              >
                <i
                  className="w-3.5 h-3.5 rounded border border-[rgba(15,70,78,.18)] block"
                  style={{ background: item.color }}
                />
                <strong className="text-[14px]">{item.title}</strong>
                <span className="text-[11px] text-[var(--muted)]">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
