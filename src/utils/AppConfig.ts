import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Stories',
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix,
};

export const CacheKeys = {
  chapters: 'CHAPTER_LIST_KEY',
  setChapters: 'SET_CHAPTER_LIST_KEY',
};