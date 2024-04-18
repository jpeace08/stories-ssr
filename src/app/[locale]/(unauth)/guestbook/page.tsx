import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { GuestbookForm } from '@/components/GuestbookForm';
import { GuestbookList } from '@/components/GuestbookList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Guestbook',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Guestbook = () => {
  const t = useTranslations('Guestbook');

  return (
    <>
      <GuestbookForm />

      <Suspense fallback={<p>{t('loading_guestbook')}</p>}>
        <GuestbookList />
      </Suspense>
    </>
  );
};

export default Guestbook;
