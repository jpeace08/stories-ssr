// import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
// import { getTranslations } from 'next-intl/server';

const ChapterList = async () => {
  // const t = await getTranslations('Dashboard');

  let fetchChapter = await fetch(
    'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
    {
      next: { revalidate: 60 },
    },
  ).then((res) => res.text());
  fetchChapter = `${fetchChapter}`;
  const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
  const matchResult = [...fetchChapter.matchAll(re)];
  const chapters: any[] = [];
  let setChapters: any = {};
  matchResult.forEach((res) => {
    chapters.push({
      uri: res[0],
      number: res[1],
    });
    setChapters = {
      ...setChapters,
      [`${res[1]}`]: `${res[0]}`,
    };
  });

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 md:grid-cols-1 xl:grid-cols-1">
      {chapters.map((r: any) => {
        let uri = `/stories/${r.uri}`;
        const prev = Number(r.number) - 1;
        uri += `?prev=${prev}`;
        const next = Number(r.number) + 1;
        uri += `&next=${next}`;
        return (
          <Link
            className="hover:text-blue-700"
            key={`${r.uri}-${r.number}`}
            href={uri}
          >
            Chương {r.number}: {r.uri.slice(7, r.uri.length - 1)}
          </Link>
        );
      })}
    </div>
  );
};

export { ChapterList };
