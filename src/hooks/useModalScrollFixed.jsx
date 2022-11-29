import React, { useEffect } from "react";

export const useModalScrollFixed = (open, type) => {
  // (type이 있는 경우는 모달이 2중이고, 하나 닫았을 때 스크롤이 다시 되는 걸 방지하기 위해 별도의 값을 넣음)

  useEffect(() => {
    if (open && !type) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [open]);
};
