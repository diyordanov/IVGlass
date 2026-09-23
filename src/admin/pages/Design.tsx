import { useEffect, useState } from 'react';
import { Card, Field, PrimaryButton, SavedNote } from '../ui';

interface ThemeData {
  colors: { glassDeep: string; glassStrong: string; glass: string };
  fonts: { heading: string; body: string };
}

const DEFAULT_THEME: ThemeData = {
  colors: { glassDeep: '#023E98', glassStrong: '#2E8DF4', glass: '#C0DDFC' },
  fonts: { heading: 'Montserrat', body: 'Montserrat' },
};

const FONT_OPTIONS = ['Montserrat', 'Inter', 'Poppins', 'Playfair Display', 'Manrope', 'Work Sans', 'Nunito Sans'];

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-11 h-11 rounded-[10px] cursor-pointer"
          style={{ border: '1px solid #DDE5E7', padding: 2 }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[10px] px-3 py-2.5 text-[14px] w-[120px]"
          style={{ border: '1px solid #DDE5E7' }}
        />
      </div>
    </Field>
  );
}

export default function Design() {
  const [theme, setTheme] = useState<ThemeData>(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/theme')
      .then((r) => r.json())
      .then((res: { data: ThemeData | null }) => {
        if (res.data) {
          setTheme({
            colors: { ...DEFAULT_THEME.colors, ...res.data.colors },
            fonts: { ...DEFAULT_THEME.fonts, ...res.data.fonts },
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch('/api/theme', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theme),
    });

    const root = document.documentElement;
    root.style.setProperty('--glass-deep', theme.colors.glassDeep);
    root.style.setProperty('--glass-strong', theme.colors.glassStrong);
    root.style.setProperty('--glass', theme.colors.glass);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <p className="text-[13px] text-[#68777D]">Зареждане…</p>;

  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Дизайн</h1>

      <Card title="Акцентиращи цветове" actions={<SavedNote show={saved} />}>
        <div className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
          <ColorField
            label="Основен (тъмен)"
            value={theme.colors.glassDeep}
            onChange={(v) => setTheme((t) => ({ ...t, colors: { ...t.colors, glassDeep: v } }))}
          />
          <ColorField
            label="Среден"
            value={theme.colors.glassStrong}
            onChange={(v) => setTheme((t) => ({ ...t, colors: { ...t.colors, glassStrong: v } }))}
          />
          <ColorField
            label="Светъл"
            value={theme.colors.glass}
            onChange={(v) => setTheme((t) => ({ ...t, colors: { ...t.colors, glass: v } }))}
          />
        </div>
      </Card>

      <Card title="Шрифтове">
        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
          <Field label="Шрифт за заглавия">
            <select
              value={theme.fonts.heading}
              onChange={(e) => setTheme((t) => ({ ...t, fonts: { ...t.fonts, heading: e.target.value } }))}
              className="w-full rounded-[10px] px-3.5 py-2.5 text-[14px]"
              style={{ border: '1px solid #DDE5E7' }}
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>
          <Field label="Шрифт за текст">
            <select
              value={theme.fonts.body}
              onChange={(e) => setTheme((t) => ({ ...t, fonts: { ...t.fonts, body: e.target.value } }))}
              className="w-full rounded-[10px] px-3.5 py-2.5 text-[14px]"
              style={{ border: '1px solid #DDE5E7' }}
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <PrimaryButton onClick={save} disabled={saving}>
        {saving ? 'Запазване…' : 'Запази дизайна'}
      </PrimaryButton>
    </div>
  );
}
