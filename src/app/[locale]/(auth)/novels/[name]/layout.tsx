import { stringToSlug } from '@/utils/Helpers';

export function generateStaticParams() {
  const novelNames: string[] = ['The great butler is devil'];

  return novelNames.map((name: string) => ({
    name: stringToSlug(name),
  }));
}

export default function Layout({
  children,
  // chapters,
}: {
  children: React.ReactNode;
  // chapters: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* {chapters} */}
    </>
  );
}
