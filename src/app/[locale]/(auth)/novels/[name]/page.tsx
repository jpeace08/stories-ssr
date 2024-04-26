// import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ChapterList } from '@/components/ChapterList';

export async function generateMetadata(props: {
  params: { locale: string; name: string };
}) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'DevilButler',
  });

  return {
    title: t('meta_title', { name: props.params.name }),
    description: t('meta_description', { name: props.params.name }),
  };
}

export default function Novel() {
  // const t = useTranslations('DevilButler');

  // return <div className="py-[10px] text-lg text-gray-400">{t('name')}</div>;
  return <ChapterList />;
}
