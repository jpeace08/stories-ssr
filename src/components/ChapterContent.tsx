'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import Loading from '@/app/[locale]/(unauth)/stories/[slug]/loading';
import {
  CacheKeys,
  getCacheData,
  MAX_FETCH_CHAPTER,
  setCacheData,
} from '@/utils/AppConfig';

const fetchDataChapter = async (uri: string): Promise<any> => {
  let fetchChapter = await fetch(
    `https://truyenchu.vn/dai-quan-gia-la-ma-hoang/${uri}`,
    {
      next: { revalidate: 10 },
    },
  ).then((res) => res.text());
  fetchChapter = `${fetchChapter}`;
  const re = /itemprop="articleBody">(.*)<div id="chapter-append"><\/div>/gms;
  const matchResult = [...fetchChapter.matchAll(re)];
  if (matchResult.length <= 0) {
    return null;
  }
  let data: string = '';
  const content = matchResult[0];
  if (Array.isArray(content) && content.length > 1) {
    data = `${content[1]}`;
    data = data
      .trim()
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?p>/gi, '')
      .replace(/<div.*?>.*?<\/div>/gis, '')
      .replace(/<a.*?>.*?<\/a>/gis, '')
      .replace(/<script.*?>.*?<\/script>/gis, '');
  }
  return { uri, data };
};

const ChapterContent = () => {
  // const t = await getTranslations('Dashboard');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [arrayData, setArrayData] = useState([] as string[]);

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const pathNames: string[] = pathname.split('/');
    if (pathNames.length < 3) {
      return;
    }
    const cachedArrayContent: any = getCacheData(
      localStorage,
      `${CacheKeys.preContentKey}${pathNames[2]}`,
      null,
    );
    if (cachedArrayContent) {
      setArrayData(cachedArrayContent.split('\n') as string[]);
      return;
    }
    const currentChapter: number = Number(searchParams.get('current'));
    if (Number.isNaN(currentChapter)) {
      return;
    }
    const mapChapters: any = getCacheData(
      localStorage,
      CacheKeys.setChapters,
      null,
    );
    if (!mapChapters) {
      return;
    }
    const chapters: any = getCacheData(localStorage, CacheKeys.chapters, null);
    if (!chapters) {
      return;
    }

    const promises: Promise<any>[] = [];
    const limitFetch: number = Math.min(
      Number(currentChapter + MAX_FETCH_CHAPTER),
      chapters.length + 2,
    );
    for (let i = currentChapter; i <= limitFetch; i += 1) {
      promises.push(fetchDataChapter(mapChapters[`${i}`]));
    }

    let currentChapterContent: string = '';
    const fetchData = async () => {
      const arrayDatas: any[] = await Promise.all(promises);
      arrayDatas.forEach(({ uri, data }) => {
        if (`${uri}` === pathNames[2]) {
          currentChapterContent = data;
        }
        setCacheData(localStorage, `${CacheKeys.preContentKey}${uri}`, data);
      });
      return true;
    };
    fetchData()
      .then(() => {
        setArrayData(currentChapterContent.split('\n') as string[]);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log('Get content error', e);
      });
  }, [pathname, searchParams]);

  return (
    <Suspense fallback={<Loading />}>
      {arrayData.map((c, index) => (
        <p
          className="no-margin text-justify text-gray-500"
          key={`${index + 8}`}
        >
          {c}
        </p>
      ))}
    </Suspense>
  );
};

export { ChapterContent };
