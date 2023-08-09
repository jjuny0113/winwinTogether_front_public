import React, { useRef, useEffect } from 'react';

export const useOutsideAlerter = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  func: () => any,
  exceptList?: React.RefObject<HTMLElement>[],
): any => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        // ts 3.9.7 추론 때문에 아래 조건들을 변수로 빼주면 에러가 납니다...
        const { target } = event;
        if (ref.current === null || event.target === null) return;

        if (target instanceof Node) {
          const isRefContainsTarget = ref.current.contains(target);
          if (isRefContainsTarget) return;

          if (exceptList !== undefined) {
            const isValid = exceptList.every((exceptRef) => {
              if (exceptRef.current === null) return true;
              return exceptRef.current.contains(target) === false;
            });

            if (isValid) func();
          } else {
            func();
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func, exceptList]);
};

export default useOutsideAlerter;
