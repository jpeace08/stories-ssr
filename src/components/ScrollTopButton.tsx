'use client';

import { useEffect, useState } from 'react';

import { Direction } from '@/utils/AppConfig';

type Props = {
  direction: string;
  scrollCallback: () => void;
};

const ScrollTopButton = (params: Props) => {
  const { direction, scrollCallback } = params;

  // const [disbale, setDisable] = useState(false);
  const [arrow, setArrow] = useState(null as any);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!direction) {
      return;
    }
    setArrow(direction);
  }, [direction]);

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
  }, []);

  if (!arrow) {
    return <>...</>;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isVisible && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          onClick={() => scrollCallback()}
          // eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/classnames-order
          className={`size-0 border-l-[10px] border-l-transparent border-${arrow === Direction.Up ? 'b' : 't'}-[20px] border-${arrow === Direction.Up ? 'b' : 't'}-gray-700 border-r-[10px] border-r-transparent`}
        />
      )}
    </>
  );
};

export { ScrollTopButton };
