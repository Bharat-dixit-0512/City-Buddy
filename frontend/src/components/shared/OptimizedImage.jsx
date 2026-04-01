import { useEffect, useState } from "react";
import { FALLBACK_PLACE_IMAGE } from "../../utils/placeUtils";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  fallbackSrc = FALLBACK_PLACE_IMAGE,
  priority = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(src || fallbackSrc);
    setIsLoaded(false);
  }, [fallbackSrc, src]);

  const handleError = () => {
    if (imageSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }

    setIsLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 ${containerClassName}`}
    >
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200"
        />
      )}
      <img
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        src={imageSrc || fallbackSrc}
      />
    </div>
  );
};

export default OptimizedImage;
