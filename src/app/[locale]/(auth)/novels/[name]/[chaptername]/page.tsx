// import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ChapterContentWrapper } from '@/components/ChapterContentWrapper';
import { logger } from '@/libs/Logger';

export async function generateStaticParams({
  params: { name },
}: {
  params: { name: string };
}) {
  logger.info(name);
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}api/novels/${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json());
  if (!data) {
    return [];
  }
  const { chaptersData } = data;

  return chaptersData.map((c: any) => ({
    chaptername: c.uri,
  }));
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Novels',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function ChapterSlot() {
  // const t = useTranslations('Novels');
  return <ChapterContentWrapper />;
}
