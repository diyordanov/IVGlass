import { useEffect } from 'react';

export interface ThemeSettings {
  colors?: {
    glassDeep?: string;
    glassStrong?: string;
    glass?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
}

const CSS_VAR_MAP: Record<string, string> = {
  glassDeep: '--glass-deep',
  glassStrong: '--glass-strong',
  glass: '--glass',
};

const GOOGLE_FONTS_STYLESHEET_ID = 'ivg-google-fonts';

function loadGoogleFont(family: string) {
  const encoded = family.trim().replace(/\s+/g, '+');
  let link = document.getElementById(GOOGLE_FONTS_STYLESHEET_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = GOOGLE_FONTS_STYLESHEET_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700;800&display=swap`;
}

export function useTheme() {
  useEffect(() => {
    fetch('/api/theme')
      .then((r) => (r.ok ? r.json() : null))
      .then((res: { data: ThemeSettings | null } | null) => {
        const theme = res?.data;
        if (!theme) return;

        const root = document.documentElement;
        if (theme.colors) {
          for (const [key, value] of Object.entries(theme.colors)) {
            const cssVar = CSS_VAR_MAP[key];
            if (cssVar && value) root.style.setProperty(cssVar, value);
          }
        }

        if (theme.fonts?.heading) {
          loadGoogleFont(theme.fonts.heading);
          root.style.setProperty('--font-heading', `'${theme.fonts.heading}', sans-serif`);
        }
        if (theme.fonts?.body) {
          loadGoogleFont(theme.fonts.body);
          root.style.setProperty('--font-body', `'${theme.fonts.body}', sans-serif`);
          document.body.style.fontFamily = `var(--font-body)`;
        }
      })
      .catch(() => {});
  }, []);
}
