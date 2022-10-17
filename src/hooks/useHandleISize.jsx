import React, { useEffect, useState } from "react";

export const useHandleISize = () => {
  const [size, setSize] = useState(window.innerWidth);
  const [resize, setResize] = useState(false);

  // 리사이징
  useEffect(() => {
    // 렌더 시
    if (size < 640) {
      setResize(true);
    } else if (size > 640) {
      setResize(false);
    }

    const Resize = () => {
      let innerSize = window.innerWidth;
      setSize(innerSize);
    };

    window.addEventListener("resize", Resize);
    return () => {
      window.addEventListener("resize", Resize);
      clearTimeout();
    };
  }, [size]);

  return { size, resize };
};
