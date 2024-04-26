import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Stories',
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix,
};

export const MAX_FETCH_CHAPTER: number = 100;

export const Direction = {
  Up: 'UP',
  Down: 'DOWN',
};

export const CacheKeys = {
  chapters: 'CHAPTER_LIST_KEY',
  setChapters: 'SET_CHAPTER_LIST_KEY',
  preContentKey: 'CHAPTER_',
};

export const getCacheData = (
  localStorage: any,
  key: string,
  defaultValue: any,
): any => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      return defaultValue;
    }
    return JSON.parse(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    localStorage.removeItem(key);
    return defaultValue;
  }
};

export const isExistData = (localStorage: any, key: string): boolean => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    localStorage.removeItem(key);
    return false;
  }
};

export const setCacheData = (
  localStorage: any,
  key: string,
  data: any,
): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    localStorage.removeItem(key);
    return false;
  }
};
