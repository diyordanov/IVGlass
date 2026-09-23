import { useState, type FormEvent } from 'react';

export default function Login({ onLogin }: { onLogin: (password: string) => Promise<boolean> }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await onLogin(password);
    setLoading(false);
    if (!ok) setError('Грешна парола.');
  };

  return (
    <div
      className="min-h-screen grid place-items-center"
      style={{ background: '#0D171C', fontFamily: "'Montserrat', sans-serif" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[360px] max-w-[90vw] rounded-[20px] p-8"
        style={{ background: '#16242B', border: '1px solid rgba(255,255,255,.08)' }}
      >
        <div className="flex items-center gap-2.5 mb-7">
          <img src="/brand/logo-mark.webp" alt="" className="w-9 h-9" />
          <div className="text-white font-extrabold tracking-[.08em]">IV GLASS · ADMIN</div>
        </div>
        <label className="block text-[11px] font-bold uppercase tracking-[.1em] text-[#8CA0A8] mb-2">Парола</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-[10px] px-3.5 py-3 outline-none text-white mb-3"
          style={{ background: '#0D171C', border: '1px solid rgba(255,255,255,.12)' }}
        />
        {error && <p className="text-[#FF8A8A] text-[12px] mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[10px] py-3 font-bold text-white disabled:opacity-60"
          style={{ background: 'var(--glass-deep, #023E98)' }}
        >
          {loading ? 'Влизане…' : 'Вход'}
        </button>
      </form>
    </div>
  );
}
