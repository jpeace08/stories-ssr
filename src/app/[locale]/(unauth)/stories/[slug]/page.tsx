// import { useTranslations } from 'next-intl';
// import { getTranslations } from 'next-intl/server';

import { ChapterContentWrapper } from '@/components/ChapterContentWrapper';

// type IPortfolioDetailProps = {
//   params: { locale: string };
// };

// export async function generateStaticParams() {
//   let fetchChapter = await fetch(
//     'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
//     {
//       next: { revalidate: 10 },
//     },
//   ).then((res) => res.text());
//   fetchChapter = `${fetchChapter}`;
//   const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
//   const matchResult = [...fetchChapter.matchAll(re)];
//   const chapters: any[] = [];
//   matchResult.forEach((res) => {
//     chapters.push({
//       uri: res[0],
//       number: res[1],
//     });
//   });

//   return chapters.map((elt) => ({
//     slug: `${elt.uri}`,
//   }));
// }

// export function generateStaticParams() {
//   // let fetchChapter = await fetch(
//   //   'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
//   //   {
//   //     next: { revalidate: 10 },
//   //   },
//   // ).then((res) => res.text());
//   // fetchChapter = `${fetchChapter}`;
//   // const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
//   // const matchResult = [...fetchChapter.matchAll(re)];
//   // const chapters: any[] = [];
//   // matchResult.forEach((res) => {
//   //   chapters.push({
//   //     uri: res[0],
//   //     number: res[1],
//   //   });
//   // });

//   return [
//     {
//       uri: 'chuong-1-cuu-u-bi-luc',
//       number: 1,
//     },
//     {
//       uri: 'chuong-2-ma-hoang-trong-sinh',
//       number: 2,
//     },
//   ].map((elt) => ({
//     slug: `${elt.uri}`,
//   }));
// }

export async function generateMetadata() {
  // const t = await getTranslations({
  //   locale: props.params.locale,
  //   namespace: 'PortfolioSlug',
  // });

  return {
    title: 'PortfolioDetail',
    description: 'PortfolioDetailDesc',
  };
}

const PortfolioDetail = () => {
  // const t = useTranslations('PortfolioSlug');
  return <ChapterContentWrapper />;
};

export default PortfolioDetail;
