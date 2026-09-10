export default function Footer() {
  return (
    <footer className="pt-[72px] pb-7 bg-white">
      <div className="container">
        <div className="grid grid-cols-[1.2fr_.8fr_.8fr_.9fr] gap-10 pb-[50px] border-b border-[var(--line)] max-[1040px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div>
            <div className="text-[23px] font-extrabold tracking-[.12em] text-[var(--ink)] mb-4">
              <span className="text-[var(--glass-deep)] not-italic">IV</span> GLASS
            </div>
            <p className="max-w-[330px] text-[12px] leading-[1.8] text-[var(--muted)]">
              Интериорни решения от стъкло по индивидуален размер —
              проектиране, доставка и професионален монтаж.
            </p>
            <div className="mt-[18px] px-3.5 py-3 rounded-xl bg-[var(--mist)] text-[9px] leading-[1.6] text-[#819095]">
              DESIGN NOTE: добавете реалния телефон, имейл, обслужван регион и социални профили,
              когато клиентът ги потвърди.
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.13em] my-1 mb-[18px] text-[var(--ink)]">Навигация</h4>
            <a href="#home" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Начало</a>
            <a href="#services" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Услуги</a>
            <a href="#about" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">За нас</a>
            <a href="#contact" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Контакти</a>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.13em] my-1 mb-[18px] text-[var(--ink)]">Решения</h4>
            <a href="#showers" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Душ кабини</a>
            <a href="#showers" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Стъклени паравани</a>
            <a href="#projects" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Стъклени парапети</a>
            <a href="#projects" className="block text-[12px] text-[var(--muted)] my-3 hover:text-[var(--glass-deep)]">Интериорни прегради</a>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.13em] my-1 mb-[18px] text-[var(--ink)]">Контакт</h4>
            <span className="block text-[12px] text-[var(--muted)] my-3">Телефон: предстои</span>
            <span className="block text-[12px] text-[var(--muted)] my-3">Email: предстои</span>
            <span className="block text-[12px] text-[var(--muted)] my-3">Facebook · IV Glass</span>
          </div>
        </div>

        <div className="flex justify-between gap-[30px] pt-[25px] text-[10px] text-[#87959A] max-[560px]:flex-col max-[560px]:gap-2">
          <span>© 2026 IV Glass. Всички права запазени.</span>
          <span>Premium glass solutions · made to measure</span>
        </div>
      </div>
    </footer>
  );
}
