'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Direction } from '@/utils/AppConfig';

import { ChapterContent } from './ChapterContent';
// import { currentUser } from '@clerk/nextjs';
// import { getTranslations } from 'next-intl/server';
import { ContentNavigation } from './ContentNavigation';

const ChapterContentWrapper = () => {
  // const t = await getTranslations('Dashboard');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [chapter, setChapter] = useState('');

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollUp = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const pathNames: string[] = pathname.split('/').filter((e: string) => e);
    if (Array.isArray(pathNames) && pathNames.length > 1) {
      const chapterUri: string | undefined = pathNames[2];
      if (chapterUri) {
        setChapter(chapterUri);
      }
    }
  }, [pathname, searchParams]);

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 py-[10px] text-justify md:grid-cols-1 xl:grid-cols-1">
      {/* <p>Chapter: {chapter}</p> */}
      <ContentNavigation
        direction={`${Direction.Down}`}
        chapterName={chapter}
        scrollCallback={handleScrollDown}
      />
      <ChapterContent />
      <ContentNavigation
        direction={`${Direction.Up}`}
        scrollCallback={handleScrollUp}
      />
    </div>
  );
};

export { ChapterContentWrapper };
