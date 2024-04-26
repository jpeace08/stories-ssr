'use client';

import Link from 'next/link';
import {
  // usePathname,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';

import { CacheKeys, getCacheData } from '@/utils/AppConfig';

import { ScrollTopButton } from './ScrollTopButton';

type Props = {
  direction: string;
  scrollCallback: () => void;
  chapterName?: string;
};

const ContentNavigation = (params: Props) => {
  const { direction, scrollCallback, chapterName } = params;

  const searchParams = useSearchParams();
  const [mapChapters, setMapChapters] = useState(null);
  const [uriLinks, setUriLinks] = useState({
    prevLink: null,
    nextLink: null,
  } as any);

  useEffect(() => {
    if (!mapChapters) {
      const cachedMapChapters: any = getCacheData(
        localStorage,
        CacheKeys.setChapters,
        null,
      );
      if (cachedMapChapters) {
        setMapChapters(cachedMapChapters);
      }
    }
  }, []);

  useEffect(() => {
    if (!mapChapters) {
      return;
    }
    const current = searchParams.get('current');
    const prev: string = `${Number(current) - 1}`;
    const next: string = `${Number(current) + 1}`;
    const prevLink: string = `${mapChapters[prev]}?current=${prev}`;
    const nextLink: string = `${mapChapters[next]}?current=${next}`;
    setUriLinks({ prevLink, nextLink });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapChapters]);

  return (
    <div className="flex w-full items-center justify-between">
      {uriLinks.prevLink && (
        <Link
          className="items-center justify-center hover:text-blue-700"
          href={uriLinks.prevLink}
        >
          Prev
        </Link>
      )}
      <ScrollTopButton
        direction={direction}
        scrollCallback={scrollCallback}
        chapterName={chapterName}
      />
      {uriLinks.nextLink && (
        <Link
          className="items-center justify-center hover:text-blue-700"
          href={uriLinks.nextLink}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export { ContentNavigation };
