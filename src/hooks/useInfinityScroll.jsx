import React, { useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "react-query";

// 무한 스크롤
const useInfinityScroll = (url, count) => {
  const queryClient = useQueryClient();

  // 라우터 이탈 시 데이터 clean up으로 직접 리셋
  useEffect(() => {
    return () => {
      queryClient.setQueryData(["infiniteProduct", url], (data) => ({
        pages: data?.pages.slice(0, 1),
        pageParams: data?.pageParams?.slice(0, 1),
      }));
    };
  }, [url]);

  const fetchRepositories = async (page) => {
    const res = await axios.get(`${url}limit=${count}&page=${page}`);
    return res.data;
  };

  const {
    data: dataList,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["infiniteProduct", url],
    ({ pageParam = 1 }) => {
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
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, url]);

  return { ref, dataList };
};

export default useInfinityScroll;
