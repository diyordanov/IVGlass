import { useEffect, useRef, useState } from 'react';
import { Card, PrimaryButton, GhostButton } from '../ui';
import { Upload, Trash2, Copy } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  alt: string;
  created_at: string;
}

export default function Media() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setLoading(true);
    fetch('/api/media')
      .then((r) => r.json())
      .then((res: { items: MediaItem[] }) => setItems(res.items ?? []))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append('file', file);
      form.append('alt', file.name.replace(/\.[^.]+$/, ''));
      await fetch('/api/media', { method: 'POST', body: form });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Да изтрия ли тази снимка?')) return;
    await fetch(`/api/media/${id}`, { method: 'DELETE' });
    load();
  };

  const copyUrl = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/media/${id}`);
  };

  return (
    <div>
      <h1 className="text-[24px] font-extrabold text-[#0D171C] mb-6">Медия библиотека</h1>

      <Card>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <PrimaryButton onClick={() => fileRef.current?.click()} disabled={uploading}>
          <span className="inline-flex items-center gap-2">
            <Upload size={15} />
            {uploading ? 'Качване…' : 'Качи снимки'}
          </span>
        </PrimaryButton>
      </Card>

      {loading ? (
        <p className="text-[13px] text-[#68777D]">Зареждане…</p>
      ) : items.length === 0 ? (
        <p className="text-[13px] text-[#68777D]">Няма качени снимки още.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-[820px]:grid-cols-3 max-[560px]:grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="rounded-[14px] overflow-hidden bg-white" style={{ border: '1px solid #E3EAEC' }}>
              <img src={`/media/${item.id}`} alt={item.alt} className="w-full aspect-square object-cover" />
              <div className="p-2.5">
                <p className="text-[11px] text-[#68777D] truncate m-0 mb-2">{item.filename}</p>
                <div className="flex gap-1.5">
                  <GhostButton onClick={() => copyUrl(item.id)} title="Копирай линк">
                    <Copy size={13} />
                  </GhostButton>
                  <GhostButton onClick={() => remove(item.id)} title="Изтрий">
                    <Trash2 size={13} />
                  </GhostButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
