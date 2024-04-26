'use client';

// import { currentUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  const pathname = usePathname();
  const [chapters, setChapters] = useState([] as any);
  // const [mapChapters, setMapChapters] = useState({} as any);
  const [isCached, setIsCached] = useState(true);

  useEffect(() => {
    const isDataExist: boolean = isExistData(localStorage, CacheKeys.chapters);
    setIsCached(isDataExist);
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const pathNames: string[] = `${pathname}`.split('/').filter((e) => e);
    const fetchData = async () => {
      const { data } = await fetch(`/api/novels/${pathNames[1]}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      if (!data) {
        return;
      }
      const { chaptersData, setChaptersData } = data;
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
  }, [isCached, pathname]);

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 py-[10px] md:grid-cols-1 xl:grid-cols-1">
      <Suspense fallback="Loading...">
        {chapters.map((r: any) => {
          const uri: string = `${pathname}/${r.uri}`;
          const uriLink: string = combineUrlParams(uri, { current: r.number });

          return (
            <Link
              className="text-lg text-gray-500 hover:text-blue-700"
              key={`${r.uri}-${r.number}`}
              href={uriLink}
            >
              {r.uri}
            </Link>
          );
        })}
      </Suspense>
    </div>
  );
};

export { ChapterList };
