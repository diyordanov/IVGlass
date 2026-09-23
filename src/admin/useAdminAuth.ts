import { useCallback, useEffect, useState } from 'react';

export function useAdminAuth() {
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'anonymous'>('loading');

  const check = useCallback(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : { authenticated: false }))
      .then((res: { authenticated: boolean }) => setStatus(res.authenticated ? 'authenticated' : 'anonymous'))
      .catch(() => setStatus('anonymous'));
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const login = useCallback(async (password: string): Promise<boolean> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setStatus('authenticated');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setStatus('anonymous');
  }, []);

  return { status, login, logout };
}
