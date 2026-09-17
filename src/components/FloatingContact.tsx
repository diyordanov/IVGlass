import { useEffect, useRef, useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

const PHONE_DISPLAY = '089 955 8192';
const PHONE_TEL = '+359899558192';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed right-5 bottom-5 z-[1500] max-[560px]:right-4 max-[560px]:bottom-4">
      {open && (
        <div
          className="absolute right-0 bottom-[68px] w-[240px] rounded-[18px] bg-white p-2.5 flex flex-col gap-1.5"
          style={{ boxShadow: '0 20px 50px rgba(15,52,62,.22)', border: '1px solid var(--line)' }}
        >
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex items-center gap-3 px-3.5 py-3 rounded-[12px] text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--mist)] transition-colors"
          >
            <span
              className="w-9 h-9 rounded-full grid place-items-center flex-shrink-0"
              style={{ background: 'rgba(46,141,244,.16)', color: 'var(--glass-deep)' }}
            >
              <Phone size={17} strokeWidth={2.2} />
            </span>
            <span>
              Обади се
              <span className="block text-[11px] font-normal text-[var(--muted)]">{PHONE_DISPLAY}</span>
            </span>
          </a>
          <a
            href={`viber://chat?number=%2B${PHONE_TEL.replace('+', '')}`}
            className="flex items-center gap-3 px-3.5 py-3 rounded-[12px] text-[13px] font-semibold text-[var(--ink)] hover:bg-[var(--mist)] transition-colors"
          >
            <span
              className="w-9 h-9 rounded-full grid place-items-center flex-shrink-0"
              style={{ background: 'rgba(46,141,244,.16)', color: 'var(--glass-deep)' }}
            >
              <MessageCircle size={17} strokeWidth={2.2} />
            </span>
            <span>
              Viber чат
              <span className="block text-[11px] font-normal text-[var(--muted)]">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Затвори контакти' : 'Свържи се с нас'}
        aria-expanded={open}
        className="w-14 h-14 rounded-full grid place-items-center transition-transform duration-300"
        style={{
          background: 'var(--ink)',
          color: 'white',
          boxShadow: '0 16px 34px rgba(13,23,28,.32)',
          transform: open ? 'rotate(90deg)' : 'none',
        }}
      >
        {open ? <X size={22} /> : <Phone size={22} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
