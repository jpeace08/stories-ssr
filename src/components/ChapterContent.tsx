'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import {
  CacheKeys,
  getCacheData,
  MAX_FETCH_CHAPTER,
  setCacheData,
} from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/Helpers';

const fetchDataChapter = async (
  selectedMenu: string,
  novelName: string,
  uri: string,
): Promise<any> => {
  const link = new URL(
    `${getBaseUrl()}/api/${selectedMenu}/${novelName}/${uri}`,
  );
  const { data } = await fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
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
    const pathNames: string[] = `${pathname}`.split('/').filter((e) => e);
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
      promises.push(
        fetchDataChapter(
          `${pathNames[0]}`,
          `${pathNames[1]}`,
          mapChapters[`${i}`],
        ),
      );
    }

    let currentChapterContent: string = '';
    const fetchData = async () => {
      const arrayDatas: any[] = await Promise.all(promises);
      arrayDatas.forEach(({ uri, data }) => {
        if (`${uri}` === pathNames[2]) {
          currentChapterContent = data.content;
        }
        setCacheData(
          localStorage,
          `${CacheKeys.preContentKey}${uri}`,
          data.content,
        );
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
    <Suspense fallback="Loading....">
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
