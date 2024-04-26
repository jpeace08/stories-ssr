import { stringToSlug } from '@/utils/Helpers';

export function generateStaticParams() {
  const novelNames: string[] = ['The great butler is devil'];

  return novelNames.map((name: string) => ({
    name: stringToSlug(name),
  }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
