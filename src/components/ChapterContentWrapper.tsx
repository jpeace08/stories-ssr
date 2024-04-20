'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

import { ChapterContent } from './ChapterContent';
// import { currentUser } from '@clerk/nextjs';
// import { getTranslations } from 'next-intl/server';
import { ContentNavigation } from './ContentNavigation';

// type SearchParams = {
//   prev: null | string;
//   next: null | string;
// };

const ChapterContentWrapper = () => {
  // const t = await getTranslations('Dashboard');
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const [uri, setUri] = useState('');
  // const [params, setSearchParams] = useState({
  //   prev: null,
  //   next: null,
  // } as SearchParams);

  // useEffect(() => {
  //   if (!pathname) {
  //     return;
  //   }
  //   const pathNames: string[] = pathname.split('/');
  //   if (Array.isArray(pathNames) && pathNames.length > 1) {
  //     const uriApi: string | undefined = pathNames[2];
  //     if (uriApi) {
  //       const prev = searchParams.get('prev');
  //       const next = searchParams.get('next');
  //       setUri(uriApi);
  //       setSearchParams({ prev, next });
  //     }
  //   }
  // }, [pathname, searchParams]);

  // if (!uri) {
  //   return <>Loading...</>;
  // }

  return (
    <div className="grid grid-cols-1 justify-items-start gap-3 text-justify md:grid-cols-1 xl:grid-cols-1">
      {/* <p>Chapter: {uri}</p> */}
      <ContentNavigation />
      <ChapterContent />
      <ContentNavigation />
    </div>
  );
};

export { ChapterContentWrapper };
