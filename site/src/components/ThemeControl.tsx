import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  applyThemePreference,
  readStoredThemePreference,
  themePreferenceFromDocument,
  themeStorageKey,
  type ThemePreference,
} from '../lib/theme';

interface ThemeOption {
  value: ThemePreference;
  label: string;
  description: string;
  icon: LucideIcon;
}

const themeOptions: ThemeOption[] = [
  {
    value: 'light',
    label: 'Light',
    description: 'Use light theme',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Use dark theme',
    icon: Moon,
  },
  {
    value: 'system',
    label: 'System',
    description: 'Follow system theme',
    icon: Monitor,
  },
];

export default function ThemeControl() {
  const [preference, setPreference] = useState<ThemePreference>(readStoredThemePreference);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setPreference(themePreferenceFromDocument());
    });
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey) return;
      const next = readStoredThemePreference();
      applyThemePreference(next, false);
      setPreference(next);
    };

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('storage', handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function selectTheme(next: ThemePreference) {
    applyThemePreference(next);
    setPreference(next);
  }

  return (
    <div className="docs-theme-control" role="group" aria-label="Color theme">
      {themeOptions.map(({ value, label, description, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={description}
          aria-pressed={preference === value}
          title={description}
          onClick={() => selectTheme(value)}
        >
          <Icon aria-hidden="true" />
          <span className="docs-theme-control__label">{label}</span>
        </button>
      ))}
    </div>
  );
}
