// import { currentUser } from '@clerk/nextjs';
// import { getTranslations } from 'next-intl/server';

import { ContentNavigation } from './ContentNavigation';

const ChapterContent = async (params: any) => {
  // const t = await getTranslations('Dashboard');

  let fetchChapter = await fetch(
    `https://truyenchu.vn/dai-quan-gia-la-ma-hoang/${params.uri}`,
    {
      next: { revalidate: 10 },
    },
  ).then((res) => res.text());
  fetchChapter = `${fetchChapter}`;
  const re = /itemprop="articleBody">(.*)<div id="chapter-append"><\/div>/gms;
  const matchResult = [...fetchChapter.matchAll(re)];
  if (matchResult.length <= 0) {
    return <>No content available!</>;
  }
  let content = matchResult[0];
  if (content !== undefined && content !== null) {
    content = { __html: `${content[1]?.trim()}` };
  }

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 text-justify md:grid-cols-1 xl:grid-cols-1">
      <ContentNavigation />
      <p className="text-justify" dangerouslySetInnerHTML={content} />
      <ContentNavigation />
    </div>
  );
};

export { ChapterContent };
