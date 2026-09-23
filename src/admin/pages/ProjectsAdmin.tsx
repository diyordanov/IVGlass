import { useEffect, useState } from 'react';
import { Card, Field, TextInput, TextArea, PrimaryButton, GhostButton } from '../ui';
import { Trash2 } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  description: string;
  images: { src: string; alt: string }[];
}

const EMPTY = { slug: '', title: '', subtitle: '', excerpt: '', description: '' };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [form, setForm] = useState(EMPTY);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const load = () => {
    fetch('/api/projects').then((r) => r.json()).then((res: { items: Project[] }) => setProjects(res.items ?? []));
    fetch('/api/media').then((r) => r.json()).then((res: { items: MediaItem[] }) => setMedia(res.items ?? []));
  };

  useEffect(load, []);

  const toggleMedia = (id: string) => {
    setSelectedMedia((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const createProject = async () => {
    if (!form.slug || !form.title) return;
    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, images: selectedMedia.map((media_id) => ({ media_id, alt: form.title })) }),
    });
    setForm(EMPTY);
    setSelectedMedia([]);
    load();
  };

  const removeProject = async (id: string) => {
    if (!confirm('Да изтрия ли този проект?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Проекти</h1>

      <Card title="Нов проект">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Slug (уникален)">
            <TextInput value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
          </Field>
          <Field label="Заглавие">
            <TextInput value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </Field>
        </div>
        <Field label="Подзаглавие (по избор)">
          <TextInput value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} />
        </Field>
        <Field label="Кратко описание (за картата)">
          <TextArea rows={2} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        </Field>
        <Field label="Пълно описание (за детайлния изглед)">
          <TextArea rows={4} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
        </Field>
        <Field label="Снимки (избери от медия библиотеката)">
          {media.length === 0 ? (
            <p className="text-[13px] text-[#68777D]">Първо качи снимки в Медия библиотеката.</p>
          ) : (
            <div className="grid grid-cols-5 gap-2 max-[700px]:grid-cols-4">
              {media.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMedia(m.id)}
                  className="relative rounded-[10px] overflow-hidden aspect-square"
                  style={{ border: selectedMedia.includes(m.id) ? '3px solid var(--glass-deep, #023E98)' : '1px solid #E3EAEC' }}
                >
                  <img src={`/media/${m.id}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </Field>
        <PrimaryButton onClick={createProject}>Създай проект</PrimaryButton>
      </Card>

      <Card title={`Съществуващи проекти (${projects.length})`}>
        {projects.length === 0 ? (
          <p className="text-[13px] text-[#68777D]">
            Още няма проекти, добавени от тук. Петте проекта, показани в момента на сайта, остават видими непроменени.
          </p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #EEF2F3' }}>
              <div>
                <p className="text-[14px] font-semibold m-0">{p.title}</p>
                <p className="text-[11px] text-[#68777D] m-0">{p.images.length} снимки</p>
              </div>
              <GhostButton onClick={() => removeProject(p.id)}>
                <Trash2 size={13} />
              </GhostButton>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
