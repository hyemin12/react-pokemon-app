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
        <div className="absolute z-10  flex h-full w-full items-center justify-center">
          <Loading className="h-14 w-14 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={imageLoadHanlder}
        className={`h-full object-contain ${opacity}`}
      />
    </>
  );
};

export default LazyImg;
