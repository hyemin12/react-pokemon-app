// 모달창 밖을 클릭하면 함수를 호출하는 리스너 등록하기

import { ReactNode, useEffect } from "react";

const useOnClickOutSide = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  console.log(callback);
  useEffect(() => {
    const listener = (e: any) => {
      // 1. 어디 클릭하는지 구분
      // 모달 창 클릭하면 return
      // 모달 창 밖 클릭하면 callback 함수 실행
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      callback();
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback]);
};

export default useOnClickOutSide;
