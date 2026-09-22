import { useEffect, useState, type ImgHTMLAttributes } from "react";

import fallbackLogo from "@/assets/logo-agrismart.png";

/**
 * Image that never shows a broken-image icon: on a load error it swaps to the
 * AgriSmart mark while keeping the card's sizing classes.
 */
export function SafeImage({
  src,
  alt,
  className,
  fallback = fallbackLogo,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  const isFallback = current === fallback;

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (!isFallback) setCurrent(fallback);
      }}
      style={isFallback ? { objectFit: "contain", padding: "1.5rem", ...rest.style } : rest.style}
    />
  );
}
