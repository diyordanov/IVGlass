import { useState } from 'react';
import { useScrolled } from '@/hooks/useInteractions';

const navLinks = [
  { href: '#home', label: 'Начало' },
  { href: '#services', label: 'Услуги' },
  { href: '#gallery', label: 'Галерия' },
  { href: '#showers', label: 'Душ кабини и прегради' },
  { href: '#about', label: 'За нас' },
  { href: '#contact', label: 'Контакти' },
];

export default function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-450 ${
          scrolled ? 'top-2' : 'top-4'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
      >
        <div
          className={`mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-5 transition-all duration-450 border max-[820px]:flex max-[820px]:justify-between ${
            scrolled
              ? 'min-h-16 rounded-[18px] bg-[rgba(248,251,252,.88)] border-[rgba(255,255,255,.18)] shadow-[0_14px_38px_rgba(14,33,39,.10)]'
              : 'min-h-[76px] rounded-[22px] bg-[rgba(248,251,252,.72)] border-[rgba(255,255,255,.18)] shadow-[0_12px_38px_rgba(14,33,39,.07)]'
          }`}
          style={{
            width: 'min(1320px, calc(100% - 36px))',
            backdropFilter: 'blur(22px) saturate(145%)',
            WebkitBackdropFilter: 'blur(22px) saturate(145%)',
            transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
          }}
        >
          <nav className="flex items-center gap-7 max-[820px]:hidden" aria-label="Основна навигация ляво">
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#home"
            >
              Начало
            </a>
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#services"
            >
              Услуги
            </a>
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#gallery"
            >
              Галерия
            </a>
          </nav>

          <a
            className="relative flex items-center justify-center transition-all duration-400"
            style={{
              width: scrolled ? 44 : 138,
              height: 52,
              transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
            }}
            href="#home"
            aria-label="IV Glass — стъклени изделия по поръчка във Варна, начало"
          >
            <span
              className="absolute flex items-center transition-all duration-400"
              style={{
                opacity: scrolled ? 0 : 1,
                transform: scrolled ? 'translateY(-8px) scale(.88)' : 'none',
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <img src="/brand/logo-horizontal.webp" alt="IV Glass" className="h-[30px] w-auto" />
            </span>
            <span
              className="w-[42px] h-[42px] transition-all duration-400"
              style={{
                opacity: scrolled ? 1 : 0,
                transform: scrolled ? 'scale(1) rotate(0)' : 'scale(.72) rotate(-4deg)',
                transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
              }}
              aria-hidden="true"
            >
              <img src="/brand/logo-mark.webp" alt="" className="w-full h-full object-contain" />
            </span>
          </a>

          <nav className="flex items-center justify-end gap-7 max-[820px]:hidden" aria-label="Основна навигация дясно">
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#showers"
            >
              Душ кабини и прегради
            </a>
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#about"
            >
              За нас
            </a>
            <a
              className="relative text-[13px] font-semibold text-[#25363C] whitespace-nowrap after:content-[''] after:absolute after:h-px after:left-0 after:-bottom-[7px] after:w-0 after:bg-[var(--glass-deep)] after:transition-all after:duration-300 hover:after:w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              href="#contact"
            >
              Контакти
            </a>
          </nav>

          <button
            className="hidden border-0 bg-transparent p-2 max-[820px]:block"
            onClick={openMenu}
            aria-label="Отвори меню"
          >
            <span className="block w-[25px] h-0.5 bg-[var(--ink)] my-[5px] rounded-lg" />
            <span className="block w-[25px] h-0.5 bg-[var(--ink)] my-[5px] rounded-lg" />
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col justify-center p-11 transition-transform duration-450 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          background: 'rgba(246,250,251,.97)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)',
        }}
        aria-hidden={!menuOpen}
      >
        <button
          className="absolute right-[22px] top-5 w-[42px] h-[42px] rounded-full border border-[var(--line)] bg-white"
          onClick={closeMenu}
          aria-label="Затвори меню"
        >
          ✕
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="text-[28px] font-semibold tracking-[-.04em] py-2.5 text-[var(--ink)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
