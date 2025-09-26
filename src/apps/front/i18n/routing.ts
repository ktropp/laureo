import { Settings } from '@theme/settings';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Settings.languages.map(locale => locale.slice(0, 2)),

  // Used when no locale matches
  defaultLocale: Settings.defaultLanguage.slice(0, 2),

  // Don't show locale in default locale
  localePrefix: 'as-needed',

  // Disable locale detection
  localeDetection: false
});