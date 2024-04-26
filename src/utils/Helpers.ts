export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export const combineUrlParams = (
  url: string = '',
  params: any = {},
): string => {
  const keys: string[] = Object.keys(params);
  const paramUrl = keys
    .reduce(
      (result: any[], key: string) =>
        params[key] !== undefined && params[key] !== null && params[key] !== ''
          ? [...result, `${key}=${params[key]}`]
          : [...result],
      [],
    )
    .join('&');
  return `${url}?${paramUrl}`;
};

export const stringToSlug = (str: string): string => {
  // Remove accents and special characters, then replace spaces with hyphens

  const normalStr: string = str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-'); // Replace multiple - with single -

  // Trim hyphens from both ends of the string
  return normalStr.replace(/^-+|-+$/g, '');
};
