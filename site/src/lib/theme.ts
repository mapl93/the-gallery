export type ThemePreference = 'light' | 'dark' | 'system';

export const themeStorageKey = 'tg-theme';

export function themePreferenceFromDocument(): ThemePreference {
  const theme = document.documentElement.getAttribute('data-theme');
  return theme === 'light' || theme === 'dark' ? theme : 'system';
}

export function readStoredThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    return stored === 'light' || stored === 'dark' ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function applyThemePreference(
  preference: ThemePreference,
  persist = true
): void {
  if (preference === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', preference);
  }

  if (!persist) return;

  try {
    if (preference === 'system') window.localStorage.removeItem(themeStorageKey);
    else window.localStorage.setItem(themeStorageKey, preference);
  } catch {
    // Theme selection remains functional when storage is unavailable.
  }
}

export function applyStoredThemePreference(): ThemePreference {
  const preference = readStoredThemePreference();
  applyThemePreference(preference, false);
  return preference;
}
