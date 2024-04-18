// import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ChapterList } from '@/components/ChapterList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Portfolio',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Stories = () => {
  // const t = useTranslations('Portfolio');

  return <ChapterList />;
};

export default Stories;
