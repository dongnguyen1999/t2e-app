import { debounce, get, uniqBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TypedLazyQueryTrigger } from '@reduxjs/toolkit/query/react';
import baseQuery from '@/api/baseQuery';

export type UseLazyQuery = () => [TypedLazyQueryTrigger<unknown, unknown, typeof baseQuery>, { isFetching: boolean, data: unknown }, unknown];

const useInfiniteScroll = <T>(useLazyQuery: UseLazyQuery, queryParams: {[key: string]: unknown}, key: string) => {
  const [fetchData, { isFetching, data }] = useLazyQuery();
  const [mergedData, setMergedData] = useState<T[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMergedData([]);
    fetchData(queryParams);
  }, [JSON.stringify(queryParams)]);

  useEffect(() => {
    if (data && get(data, key)) {
      setMergedData(prevData => {
        const newData = get(data, key);
        const updatedData = [...prevData, ...newData];
        const uniqueData = uniqBy(updatedData.reverse(), 'id').reverse();
        return uniqueData;
      });
    }
  }, [data]);

  const handleScrollEnd = useCallback(() => {
    console.warn('handleScrollEnd');
    if (get(data, 'continuationToken')) {
      fetchData({
        ...queryParams,
        continuationToken: get(data, 'continuationToken')
      });
    }
  }, [data]);

  const handleScroll = useCallback(debounce(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        handleScrollEnd();
      }
    }
  }, 500), [handleScrollEnd]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return {
    listRef,
    isFetching,
    data: mergedData
  };
};

export default useInfiniteScroll;