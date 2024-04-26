import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { stringToSlug } from '@/utils/Helpers';

async function getListNovelName() {
  await new Promise((resole) => {
    setTimeout(() => {
      resole(true);
    }, 3000);
  });
  return ['The great butler is devil'];
}

export async function generateMetadata(props: {
  params: { locale: string; name: string };
}) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Novels',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Novels() {
  // const t = useTranslations('Novels');
  const listNovelName: string[] = await getListNovelName();

  return (
    <div className="grid min-h-dvh grid-cols-1 justify-items-start gap-3 py-2 md:grid-cols-1 xl:grid-cols-1">
      <Suspense fallback={<p>Loading...</p>}>
        {listNovelName.map((novelName: string) => (
          <Link
            key={`${stringToSlug(novelName)}`}
            href={`/novels/${stringToSlug(novelName)}`}
            title={`${novelName}`}
          >
            {novelName}
          </Link>
        ))}
      </Suspense>
    </div>
  );
}
