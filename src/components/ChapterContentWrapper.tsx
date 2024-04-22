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
  const [uri, setUri] = useState('');

  const handleScrollUp = () => {
    window.scroll(0, 0);
  };

  const handleScrollDown = () => {
    // implement later
  };

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const pathNames: string[] = pathname.split('/');
    if (Array.isArray(pathNames) && pathNames.length > 1) {
      const uriApi: string | undefined = pathNames[2];
      if (uriApi) {
        setUri(uriApi);
      }
    }
  }, [pathname, searchParams]);

  if (!uri) {
    return <>Loading...</>;
  }

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 text-justify md:grid-cols-1 xl:grid-cols-1">
      <p>Chapter: {uri}</p>
      <ContentNavigation
        direction={`${Direction.Down}`}
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
