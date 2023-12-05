'use client';

import { useEffect, useMemo, useCallback, useTransition, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type UpdateQueryOptions = {
  optionName: string;
  queryTag: string;
  queryValues: string[];
}[];
/** Update Query Hook
 * @example isActive (현재 설정된 query 표시 예제)
 * className={cx({'isActive' : selectedOptions.get(queryTag) === value })}
 */
export function useUpdateSearchParams(
  options: UpdateQueryOptions | null,
  routerHistory: 'push' | 'replace'
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [_, startTransition] = useTransition();

  const selectedOptions = useMemo<URLSearchParams | null>(() => {
    if (options) {
      const params = new URLSearchParams(
        Object.fromEntries(searchParams.entries())
      );

      options.forEach(option => {
        if (!searchParams.has(option.queryTag)) {
          params.set(option.queryTag, option.queryValues[0]);
        }
      });

      return params;
    }

    return null;
  }, [searchParams, options]);

  const updateSearchParam = useCallback(
    (
      name: string | string[] | null,
      value: string | string[] | null,
      deleteParams?: string[],
      SpecifiedPathname?: string
    ) => {
      const params = new URLSearchParams(
        Object.fromEntries(searchParams.entries())
      );

      if (name && value) {
        if (typeof name === 'string' && typeof value === 'string') {
          // 단일 쿼리 업데이트
          params.set(name, value);
        } else if (typeof name === 'object' && typeof value === 'object') {
          // 복수 쿼리 업데이트

          // 배열 name, value의 크기 불일치
          if (name.length === value.length)
            throw new Error('Update Query Error: mismatch name and value size');

          name.forEach((n, index) => {
            params.set(n, value[index]);
          });
        } else {
          // name, value의 타입 불일치
          throw new Error('Update Query Error: mismatch name and value type');
        }
      }

      // 제거할 쿼리
      if (deleteParams) {
        deleteParams.forEach(deleteParam => {
          if (params.has(deleteParam)) params.delete(deleteParam);
        });
      }

      // 라우터 변경
      startTransition(() => {
        const nextPathname = SpecifiedPathname || pathname;

        if (routerHistory === 'push') {
          router.push(nextPathname + '?' + params.toString());
        } else {
          router.replace(nextPathname + '?' + params.toString());
        }
      });
    },
    [router, pathname, searchParams, routerHistory]
  );

  return {
    selectedOptions,
    updateSearchParam,
  };
}

/** Timeout hook
 * 일정 시간 동안 지연된 후, 함수를 실행하는 훅
 */
export function useTimeout(
  callback: () => void,
  delay: number | null,
  isRun: boolean
) {
  const savedCallback = useRef(callback);

  // 가장 최근 콜백 업데이트
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay || !isRun) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay, isRun]);
}

/** Interval hook
 * 주기적으로 함수를 실행하는 훅
 */
export function useInterval(callback: () => void, intervalTime: number | null) {
  const savedCallback = useRef(callback);

  // 가장 최근 콜백 업데이트
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!intervalTime && intervalTime !== 0) return;

    const id = setInterval(() => savedCallback.current(), intervalTime);

    return () => clearInterval(id);
  }, [intervalTime]);
}
