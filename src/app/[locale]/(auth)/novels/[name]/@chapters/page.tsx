import { getTranslations } from 'next-intl/server';

import { ChapterList } from '@/components/ChapterList';

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

export default async function ChapterListWrapper() {
  // const t = useTranslations('Novels');
  return <ChapterList />;
}
