// components/ImagePreview.tsx
import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
};

const ImagePreview = ({ images }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 my-2">
        {images.map((image) => {
          const src = URL.createObjectURL(image);
          return (
            <div className="col-span-4" key={image.name}>
              <Image height={100} width={100} src={src} alt={image.name} className="object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePreview;