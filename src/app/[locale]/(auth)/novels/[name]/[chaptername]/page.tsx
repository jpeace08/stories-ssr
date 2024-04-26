// import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ChapterContentWrapper } from '@/components/ChapterContentWrapper';
import { logger } from '@/libs/Logger';
import { getBaseUrl } from '@/utils/Helpers';

export async function generateStaticParams({
  params: { name },
}: {
  params: { name: string };
}) {
  try {
    const link = new URL(`${getBaseUrl()}/api/novels/${name}`);
    const { data } = await fetch(link, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    if (!data) {
      return [];
    }
    const { chaptersData } = data;

    return chaptersData.map((c: any) => ({
      chaptername: c.uri,
    }));
  } catch (error) {
    logger.info(error);
    return [];
  }
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
