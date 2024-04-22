'use client';

// import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

import {
  CacheKeys,
  getCacheData,
  isExistData,
  setCacheData,
} from '@/utils/AppConfig';
import { combineUrlParams } from '@/utils/Helpers';
// import { getTranslations } from 'next-intl/server';

const ChapterList = () => {
  // const t = await getTranslations('Dashboard');

  const [chapters, setChapters] = useState([] as any);
  // const [mapChapters, setMapChapters] = useState({} as any);
  const [isCached, setIsCached] = useState(true);

  useEffect(() => {
    const isDataExist: boolean = isExistData(localStorage, CacheKeys.chapters);
    setIsCached(isDataExist);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let fetchChapter = await fetch(
        'https://truyenchu.vn/api/services/chapter-option?type=chapter_option&data=801',
        {
          next: { revalidate: 60 },
        },
      ).then((res) => res.text());
      fetchChapter = `${fetchChapter}`;
      const re = /chuong-(\d+)-(-?[a-z]-?)+/g;
      const matchResult = [...fetchChapter.matchAll(re)];
      const chaptersData: any[] = [];
      let setChaptersData: any = {};
      matchResult.forEach((res) => {
        chaptersData.push({
          uri: res[0],
          number: res[1],
        });
        setChaptersData = {
          ...setChaptersData,
          [`${res[1]}`]: `${res[0]}`,
        };
      });

      setCacheData(localStorage, CacheKeys.chapters, chaptersData);
      setCacheData(localStorage, CacheKeys.setChapters, setChaptersData);

      setChapters(chaptersData);
      // setMapChapters(setChaptersData);
    };
    if (!isCached) {
      fetchData().catch(() => {
        // eslint-disable-next-line no-console
        console.log('Get chapter data error');
      });
    } else {
      const cacheData: any = getCacheData(localStorage, CacheKeys.chapters, []);
      if (cacheData && Array.isArray(cacheData)) {
        setChapters(cacheData);
      }
    }
  }, [isCached]);

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 md:grid-cols-1 xl:grid-cols-1">
      <Suspense fallback="Loading...">
        {chapters.map((r: any) => {
          const uri: string = `/stories/${r.uri}`;
          // const prev = mapChapters[`${Number(r.number) - 1}`];
          // const next = mapChapters[`${Number(r.number) + 1}`];
          const uriLink: string = combineUrlParams(uri, { current: r.number });

          return (
            <Link
              className="hover:text-blue-700"
              key={`${r.uri}-${r.number}`}
              href={uriLink}
            >
              Chương {r.number}: {r.uri.slice(7, r.uri.length - 1)}
            </Link>
          );
        })}
      </Suspense>
    </div>
  );
};

export { ChapterList };
