import { useEffect, useState } from 'react';
import { Card, Field, TextInput, TextArea, PrimaryButton, SavedNote } from '../ui';

interface FieldDef {
  key: string;
  label: string;
  multiline?: boolean;
}

interface SectionDef {
  section: string;
  title: string;
  fields: FieldDef[];
  defaults: Record<string, string>;
}

const SECTIONS: SectionDef[] = [
  {
    section: 'hero',
    title: 'Начална секция (Hero)',
    fields: [
      { key: 'eyebrow', label: 'Малък надпис над заглавието' },
      { key: 'titleLine1', label: 'Заглавие — ред 1' },
      { key: 'titleLine2', label: 'Заглавие — ред 2 (оцветен)' },
      { key: 'lead', label: 'Основен текст', multiline: true },
      { key: 'primaryBtn', label: 'Текст на основния бутон' },
      { key: 'secondaryBtn', label: 'Текст на втория бутон' },
      { key: 'badgeTitle', label: 'Текст в кръглия етикет' },
      { key: 'badgeSub', label: 'Подтекст в кръглия етикет' },
    ],
    defaults: {
      eyebrow: 'IV GLASS · СТЪКЛО ПО МЯРКА',
      titleLine1: 'Пространство',
      titleLine2: 'без граници.',
      lead: 'Проектираме, доставяме и монтираме душ кабини, стъклени прегради, парапети и интериорни решения по индивидуален размер — за дома, търговския обект и корпоративното пространство.',
      primaryBtn: 'Искам предварителна оферта',
      secondaryBtn: 'Разгледай душ решенията',
      badgeTitle: 'По ваш размер.',
      badgeSub: 'До последния mm',
    },
  },
  {
    section: 'cta',
    title: 'Секция "Започнете от тук" (CTA)',
    fields: [
      { key: 'eyebrow', label: 'Малък надпис' },
      { key: 'titleLine1', label: 'Заглавие — ред 1' },
      { key: 'titleLine2', label: 'Заглавие — ред 2' },
      { key: 'lead', label: 'Текст', multiline: true },
    ],
    defaults: {
      eyebrow: 'ЗАПОЧНЕТЕ ОТ ТУК',
      titleLine1: 'Имате място.',
      titleLine2: 'Ние ще намерим правилната линия.',
      lead: 'Изпратете ни идея, снимка и ориентировъчни размери. Ще обсъдим подходящото решение и следващата стъпка.',
    },
  },
];

function SectionForm({ def }: { def: SectionDef }) {
  const [values, setValues] = useState<Record<string, string>>(def.defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/content/${def.section}`)
      .then((r) => r.json())
      .then((res: { data: Record<string, string> | null }) => {
        if (res.data) setValues({ ...def.defaults, ...res.data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def.section]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch(`/api/content/${def.section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card title={def.title} actions={<SavedNote show={saved} />}>
      {loading ? (
        <p className="text-[13px] text-[#68777D]">Зареждане…</p>
      ) : (
        <>
          {def.fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.multiline ? (
                <TextArea
                  rows={3}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              ) : (
                <TextInput
                  value={values[f.key] ?? ''}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              )}
            </Field>
          ))}
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? 'Запазване…' : 'Запази промените'}
          </PrimaryButton>
        </>
      )}
    </Card>
  );
}

export default function Pages() {
  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Страници</h1>
      {SECTIONS.map((def) => (
        <SectionForm key={def.section} def={def} />
      ))}
    </div>
  );
}
