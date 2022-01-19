import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import XIcon from "@assets/icons/x-icon";
import Button from "../button";
import Image from "next/image";

interface IImageCropperProps {
  src_id: string[];
  // files: File[];
  onFinish: (croppedImageUrl: CroppedImageUrls) => void;
}

export interface CroppedImage {
  originalUrl: string;
  croppedUrl: string;
}

export interface CroppedImageUrls {
  [k: string]: string;
}

const ImageCropper: React.FC<IImageCropperProps> = ({ onFinish, src_id }) => {
  const [activeUrlIdx, setActiveIdx] = useState(0);
  const refIdx = useRef(0);
  const croppedImageUrlsInObject = useRef<CroppedImageUrls>({});
  const cropperRef = useRef<HTMLImageElement>(null);

  function onCrop() {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const originalUrl = src_id[refIdx.current];
    const croppedUrl = cropper.getCroppedCanvas().toDataURL();

    croppedImageUrlsInObject.current[originalUrl] = croppedUrl;
  }

  function handleConfirmClick() {
    onFinish(croppedImageUrlsInObject.current);
  }

  return (
    <div className={`relative w-full h-full`}>
      <div className={`w-full`}>
        <Button variant="custom" className={`absolute right-0 top-0 bg-red`}>
          <XIcon />
        </Button>
      </div>
      <div className={`relative -mt-10 w-full h-full`}>
        <Cropper
          src={src_id[activeUrlIdx]}
          aspectRatio={1}
          guides={false}
          max="1080px"
          autoCrop
          crop={onCrop}
          ref={cropperRef}
        />
      </div>
      <div
        className={`flex items-center space-x-2 absolute top-full translate-y-10`}
      >
        {src_id.map((imageSrc, idx) => {
          return (
            <div
              onClick={() => {
                refIdx.current = idx;
                setActiveIdx(idx);
              }}
              className={`relative w-20 h-20 bg-red`}
            >
              <Image src={imageSrc} layout="fill" className="rounded-lg" />
            </div>
          );
        })}
        <div className={``}>
          <Button onClick={handleConfirmClick}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};
export default ImageCropper;
