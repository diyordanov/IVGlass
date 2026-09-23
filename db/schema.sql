-- IV Glass CMS schema (Cloudflare D1)

CREATE TABLE IF NOT EXISTS page_content (
  section TEXT PRIMARY KEY,   -- e.g. 'hero', 'cta', 'services', 'process', 'why'
  data TEXT NOT NULL,         -- JSON blob
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS theme_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL,         -- JSON blob: { colors: {...}, fonts: {...} }
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,        -- uuid
  filename TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gallery_categories (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,        -- uuid
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  category_slug TEXT NOT NULL REFERENCES gallery_categories(slug) ON DELETE CASCADE,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category_slug);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,        -- uuid
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  category_slug TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS project_images (
  id TEXT PRIMARY KEY,        -- uuid
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_id TEXT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);
