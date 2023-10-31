import { useState, useEffect } from "react";

const LazyImg = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  const imageLoadHanlder = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute h-full  z-10 w-full flex items-center justify-center">
          Loading...
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width="100%"
        height="auto"
        loading="lazy"
        onLoad={imageLoadHanlder}
        className={`object-contain h-full ${opacity}`}
      />
    </>
  );
};

export default LazyImg;
