import Image from "next/image";
import { useState } from "react";

const FallbackImage = ({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc("/assets/fallback.png")}
      {...props}
    />
  );
};
export default FallbackImage;
