import {getRequestConfig} from 'next-intl/server';
import {Settings} from "@theme/settings";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = Settings.adminLanguage || 'en';

  return {
    locale,
    messages: (await import(`./../messages/${locale}.json`)).default
  };
});