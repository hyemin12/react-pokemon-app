import { useState, useEffect, useRef } from "react";

const LazyImg = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imgRef = useRef(false);

  const [opacity, setOpacity] = useState("opacity-0");

  useEffect(() => {
    isLoading ? setOpacity("opacity-0") : setOpacity("opacity-100");
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="absolute h-full  z-10 w-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width="100%"
          height="auto"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className={`object-contain h-full ${opacity}`}
        />
      )}
    </>
  );
};

export default LazyImg;
