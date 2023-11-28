import { useState, useEffect } from "react";
import { Loading } from "../assets/icons/Loading";

interface LazyImgProps {
  src: string;
  alt: string;
}

const LazyImg = ({ src, alt }: LazyImgProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [opacity, setOpacity] = useState<string>("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  const imageLoadHanlder = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className='absolute h-full  z-10 w-full flex items-center justify-center'>
          <Loading className='animate-spin w-14 h-14' />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width='100%'
        height='auto'
        loading='lazy'
        onLoad={imageLoadHanlder}
        className={`object-contain h-full ${opacity}`}
      />
    </>
  );
};

export default LazyImg;
