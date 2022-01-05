/* eslint-disable react-hooks/exhaustive-deps */
import { IFile } from "@graphql/types.graphql";
import React, { useEffect, useState } from "react";
import { useModal } from "src/contexts/modal.context";
import Image from "next/image";
import XIcon from "@assets/icons/x-icon";
import { COLORS } from "@utils/colors";
import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import ArrowPrevIcon from "@assets/icons/arrow-prev-icon";
import { findIndex } from "lodash";

interface IImagePreviewProps {
  defaultActiveUrl: string;
  images: IFile[];
}

const ImagePreview: React.FC<IImagePreviewProps> = ({
  defaultActiveUrl,
  images,
}) => {
  const [activeImageUrl, setActiveImageUrl] = useState(defaultActiveUrl);

  const [activeImageIdx, setActiveImageIdx] = useState(getActiveImageIdx());
  const activeThumbClass = "delay-[0] !scale-125 border border-white";

  useEffect(() => {
    setActiveImageIdx(getActiveImageIdx());
  }, [activeImageUrl]);

  useEffect(() => {
    setActiveImageUrl(images[activeImageIdx].url);
  }, [activeImageIdx]);

  function getActiveImageIdx() {
    const idx = findIndex(images, (img) => img.url === activeImageUrl);
    return idx;
  }

  return (
    <div>
      <XIcon
        fill={COLORS.WHITE}
        className={`animation-hover-scale absolute top-10 right-32 w-5 h-5`}
      />
      <div className={`relative`} onClick={(e) => e.preventDefault()}>
        <div
          className={`relative bg-black bg-opacity-70 h-[600px] w-[1000px] aspect-square -translate-y-24`}
        >
          <Image
            src={activeImageUrl}
            layout="fill"
            objectFit="fill"
            alt="image-preview"
          />
        </div>
        <div
          onClick={(e) => e.preventDefault()}
          className={`flex absolute top-[100] translate-y-10 left-0 right-0 justify-center`}
        >
          {images.map((img, idx) => {
            const isActive = idx === activeImageIdx;
            return (
              <div
                key={img.fileName + img.url}
                onClick={() => setActiveImageUrl(img.url)}
                className={`animation-hover-scale mr-5 rounded-sm overflow-hidden relative bg-black bg-opacity-70 h-[80px] w-[80px] -translate-y-10 
                  ${isActive && activeThumbClass}
                `}
              >
                <Image src={img.url} layout="fill" alt="image-preview" />
              </div>
            );
          })}
        </div>
      </div>

      {activeImageIdx > 0 && (
        <div
          onClick={() => setActiveImageIdx((old) => --old)}
          className={`absolute top-1/2 -translate-y-1/2 left-14 p-4 rounded-full bg-black animation-hover-scale`}
        >
          <ArrowPrevIcon fill={COLORS.WHITE} />
        </div>
      )}
      {activeImageIdx < images.length && (
        <div
          onClick={() => setActiveImageIdx((old) => ++old)}
          className={`absolute top-1/2 -translate-y-1/2 right-14 p-4 rounded-full bg-black animation-hover-scale`}
        >
          <ArrowPrevIcon className={`rotate-180`} fill={COLORS.WHITE} />
        </div>
      )}
    </div>
  );
};
export default ImagePreview;
