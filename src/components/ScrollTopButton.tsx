'use client';

import { useEffect, useState } from 'react';

import { Direction } from '@/utils/AppConfig';

type Props = {
  direction: string;
  scrollCallback: () => void;
  chapterName?: string;
};

const ScrollTopButton = (params: Props) => {
  const { direction, scrollCallback, chapterName } = params;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (
        (direction === Direction.Down && window.scrollY < 500) ||
        (direction === Direction.Up && window.scrollY > 500)
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [direction]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isVisible ? (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          onClick={() => scrollCallback()}
          className={
            direction === Direction.Up
              ? `size-0 border-x-[10px] border-b-[18px] border-x-transparent border-b-gray-700`
              : `size-0 border-x-[10px] border-t-[18px] border-x-transparent border-t-gray-700`
          }
        />
      ) : (
        <p className="text-truncation">{chapterName}</p>
      )}
    </>
  );
};

export { ScrollTopButton };
