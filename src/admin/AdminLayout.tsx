import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Image as ImageIcon, GalleryHorizontal, Briefcase, Palette, LogOut, ExternalLink } from 'lucide-react';

const NAV = [
  { to: '/admin', label: 'Табло', icon: LayoutDashboard, end: true },
  { to: '/admin/pages', label: 'Страници', icon: FileText },
  { to: '/admin/media', label: 'Медия', icon: ImageIcon },
  { to: '/admin/gallery', label: 'Галерия', icon: GalleryHorizontal },
  { to: '/admin/projects', label: 'Проекти', icon: Briefcase },
  { to: '/admin/design', label: 'Дизайн', icon: Palette },
];

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#F3F7F8', fontFamily: "'Montserrat', sans-serif" }}>
      <aside
        className="w-[240px] flex-shrink-0 flex flex-col"
        style={{ background: '#0D171C', color: 'white' }}
      >
        <div className="flex items-center gap-2.5 px-5 py-6">
          <img src="/brand/logo-mark.webp" alt="" className="w-8 h-8" />
          <div className="font-extrabold tracking-[.08em] text-[13px]">IV GLASS</div>
        </div>

        <nav className="flex-1 px-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold mb-1 transition-colors ${
                  isActive ? 'text-white' : 'text-[#8CA0A8] hover:text-white hover:bg-[rgba(255,255,255,.05)]'
                }`
              }
              style={({ isActive }) => (isActive ? { background: 'var(--glass-deep, #023E98)' } : undefined)}
            >
              <item.icon size={17} strokeWidth={2} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-5 flex flex-col gap-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold text-[#8CA0A8] hover:text-white hover:bg-[rgba(255,255,255,.05)]"
          >
            <ExternalLink size={17} strokeWidth={2} />
            Виж сайта
          </a>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[13px] font-semibold text-[#8CA0A8] hover:text-white hover:bg-[rgba(255,255,255,.05)] text-left"
          >
            <LogOut size={17} strokeWidth={2} />
            Изход
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-8 max-w-[980px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
