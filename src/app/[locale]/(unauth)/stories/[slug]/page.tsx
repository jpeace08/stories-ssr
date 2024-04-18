// import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ChapterContent } from '@/components/ChapterContent';

type IPortfolioDetailProps = {
  params: { slug: string; locale: string };
};

export async function generateStaticParams() {
  let fetchChapter = await fetch(
    'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
    {
      next: { revalidate: 10 },
    },
  ).then((res) => res.text());
  fetchChapter = `${fetchChapter}`;
  const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
  const matchResult = [...fetchChapter.matchAll(re)];
  const chapters: any[] = [];
  matchResult.forEach((res) => {
    chapters.push({
      uri: res[0],
      number: res[1],
    });
  });

  return chapters.map((elt) => ({
    slug: `${elt.uri}`,
  }));
}

export async function generateMetadata(props: IPortfolioDetailProps) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'PortfolioSlug',
  });

  return {
    title: t('meta_title', { slug: props.params.slug }),
    description: t('meta_description', { slug: props.params.slug }),
  };
}

const PortfolioDetail = (props: IPortfolioDetailProps) => {
  // const t = useTranslations('PortfolioSlug');
  return <ChapterContent uri={props.params.slug} />;
};

export default PortfolioDetail;
