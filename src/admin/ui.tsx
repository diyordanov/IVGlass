import type { ReactNode } from 'react';

export function Card({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="bg-white rounded-[16px] p-6 mb-6" style={{ border: '1px solid #E3EAEC' }}>
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-[16px] font-bold text-[#0D171C] m-0">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold uppercase tracking-[.08em] text-[#68777D] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-[10px] px-3.5 py-2.5 outline-none text-[14px] text-[#0D171C] transition-colors focus:border-[var(--glass-strong,#2E8DF4)]';
const inputStyle = { border: '1px solid #DDE5E7' };

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} style={inputStyle} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ''}`} style={inputStyle} />;
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2.5 rounded-[10px] text-[13px] font-bold text-white disabled:opacity-60 ${props.className ?? ''}`}
      style={{ background: 'var(--glass-deep, #023E98)' }}
    />
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-3.5 py-2 rounded-[10px] text-[12px] font-bold text-[#0D171C] ${props.className ?? ''}`}
      style={{ border: '1px solid #DDE5E7', background: 'white' }}
    />
  );
}

export function SavedNote({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="text-[12px] font-semibold text-[#1E9E5A]">Запазено ✓</span>;
}
