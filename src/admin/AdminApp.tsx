import { Routes, Route } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';
import Login from './pages/Login';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import Pages from './pages/Pages';
import Media from './pages/Media';
import GalleryAdmin from './pages/GalleryAdmin';
import ProjectsAdmin from './pages/ProjectsAdmin';
import Design from './pages/Design';

export default function AdminApp() {
  const { status, login, logout } = useAdminAuth();

  if (status === 'loading') {
    return (
      <div className="min-h-screen grid place-items-center" style={{ background: '#0D171C' }}>
        <span className="text-white text-[13px]">Зареждане…</span>
      </div>
    );
  }

  if (status === 'anonymous') {
    return <Login onLogin={login} />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={logout} />}>
        <Route index element={<Dashboard />} />
        <Route path="pages" element={<Pages />} />
        <Route path="media" element={<Media />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="design" element={<Design />} />
      </Route>
    </Routes>
  );
}
