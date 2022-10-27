import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useInfinityScroll = (url, count) => {
  // 무한 스크롤
  const [dataList, setDataList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const page = useRef(1);
  const [ref, inView] = useInView();

  const fetch = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${url}?_limit=${count}&_page=${page.current}`
      );
      setDataList((prev) => [...prev, ...data]);
      setHasNextPage(data.length === count);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, [count, url]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView]);

  return { ref, dataList };
};
