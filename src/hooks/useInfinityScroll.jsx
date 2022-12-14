import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";

// 무한 스크롤
const useInfinityScroll = (url, count) => {
  // const [dataList, setDataList] = useState([]);
  const queryClient = useQueryClient();

  // react query 무한스크롤 방법
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
      refetchOnMount: "always",
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
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
  }, [inView, url]);

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);

  // useState 하는 방법!!!
  // // 데이터 합쳐서 저장
  // useEffect(() => {
  //   dataList?.pages?.map((asd) => setDataList((prev) => [...prev, ...asd]));
  // }, [dataList?.pages]);

  // // 라우터 이동 시 데이터 초기화 (뒤로가기 시에는 위치 저장)
  // useEffect(() => {
  //   return () => {
  //     queryClient.setQueryData(["infiniteProduct", url], (dataList) => ({
  //       pages: dataList?.pages.slice(0, 1),
  //       pageParams: dataList?.pageParams?.slice(0, 1),
  //     }));
  //   };
  // }, [queryClient, url]);

  return { ref, dataList };
};

export default useInfinityScroll;
