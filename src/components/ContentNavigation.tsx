'use client';

import {
  // usePathname,
  useSearchParams,
} from 'next/navigation';

const ContentNavigation = () => {
  const searchParams = useSearchParams();
  // const pathname = usePathname();

  const prevLink = searchParams.get('prev');
  const nextLink = searchParams.get('next');

  return (
    <div className="grid w-full grid-cols-2 justify-between">
      <p className="flex items-center justify-center">{prevLink}</p>
      <p className="flex items-center justify-center">{nextLink}</p>
    </div>
  );
};

export { ContentNavigation };
