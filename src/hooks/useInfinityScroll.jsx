import React, { useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

// 무한 스크롤
const useInfinityScroll = (url, count) => {
  const fetchRepositories = async (page) => {
    const res = await axios.get(`${url}_limit=${count}&_page=${page}`);
    return res.data;
  };

  const {
    data: dataList,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["infiniteProduct", url],
    ({ pageParam = 0 }) => {
      return fetchRepositories(pageParam);
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1; //
        return nextPage ? nextPage : undefined; // 다음 데이터가 있는지 없는지 판단
      },
    }
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, url]);

  return { ref, dataList };
};

export default useInfinityScroll;
