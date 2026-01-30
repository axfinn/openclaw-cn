/**
 * Internationalization (i18n) module for OpenClaw Control UI
 * Provides translation support for multiple languages
 */

export type Locale = "en" | "zh-CN";

export type TranslationKey = string;

export interface Translations {
  [key: string]: string | Translations;
}

let currentLocale: Locale = "en";
let translations: Record<Locale, Translations> = {
  en: {},
  "zh-CN": {},
};

/**
 * Load translations for a specific locale
 */
export async function loadLocale(locale: Locale): Promise<void> {
  try {
    const response = await fetch(`/locales/${locale}.json`);
    if (!response.ok) {
      console.warn(`Failed to load locale ${locale}, falling back to English`);
      return;
    }
    const data = await response.json();
    translations[locale] = data;
  } catch (error) {
    console.error(`Error loading locale ${locale}:`, error);
  }
}

/**
 * Set the current locale
 */
export function setLocale(locale: Locale): void {
  currentLocale = locale;
  // Save to localStorage for persistence
  localStorage.setItem("openclaw-locale", locale);
}

/**
 * Get the current locale
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Initialize i18n system, loading saved locale preference
 */
export async function initI18n(): Promise<void> {
  // Try to load saved locale from localStorage
  const savedLocale = localStorage.getItem("openclaw-locale") as Locale | null;
  if (savedLocale && (savedLocale === "en" || savedLocale === "zh-CN")) {
    currentLocale = savedLocale;
  } else {
    // Try to detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) {
      currentLocale = "zh-CN";
    } else {
      currentLocale = "en";
    }
  }

  // Load English (default/fallback)
  await loadLocale("en");

  // Load the current locale if it's not English
  if (currentLocale !== "en") {
    await loadLocale(currentLocale);
  }
}

/**
 * Get a nested value from an object using dot notation
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
  const keys = path.split(".");
  let current: string | Translations | undefined = obj;

  for (const key of keys) {
    if (typeof current === "object" && current !== null && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

/**
 * Translate a key to the current locale
 * Supports dot notation for nested keys (e.g., "overview.title")
 * Falls back to English if translation not found
 * Returns the key itself if no translation found in any locale
 */
export function t(key: TranslationKey, params?: Record<string, string | number>): string {
  // Try current locale
  let translation = getNestedValue(translations[currentLocale], key);

  // Fall back to English
  if (!translation && currentLocale !== "en") {
    translation = getNestedValue(translations.en, key);
  }

  // Fall back to key itself
  if (!translation) {
    console.warn(`Missing translation for key: ${key}`);
    return key;
  }

  // Replace parameters if provided
  if (params) {
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return param in params ? String(params[param]) : match;
    });
  }

  return translation;
}

/**
 * Get list of available locales
 */
export function getAvailableLocales(): Array<{ code: Locale; name: string }> {
  return [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "简体中文" },
  ];
}
