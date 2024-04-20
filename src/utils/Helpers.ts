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
