import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

// 무한 스크롤
const useInfinityScroll = (url, count) => {
  const [dataList, setDataList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const { search } = useLocation();
  const [ref, inView] = useInView();

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${url}_limit=${count}&_page=${page.current}`
      );
      setDataList((prev) => [...prev, ...data]);

      setHasNextPage(data.length === count); // 전달받은 count와 data의 배열 길이가 같은지 체크

      if (data.length) {
        // data가 존재하면 페이지 1 추가
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, [count, url]);

  // useEffect(() => {
  // fetch();
  // }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  return { ref, dataList };
};

export default useInfinityScroll;
