import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import XIcon from "@assets/icons/x-icon";
import Button from "../button";
import Image from "next/image";

interface IImageCropperProps {
  files: File[];
  onFinish: (croppedImageUrl: CroppedImage[]) => void;
}

export interface CroppedImage {
  originalUrl: string;
  croppedUrl: string;
}

const ImageCropper: React.FC<IImageCropperProps> = ({ files, onFinish }) => {
  const [activeUrlIdx, setActiveIdx] = useState(0);
  const croppedImageUrls = useRef<CroppedImage[]>([]);
  const croppedCroppers = useRef([]);
  var check: boolean = false;

  const srcs = files.map((file) => {
    const url = URL.createObjectURL(file);
    console.log(url);
    return url;
  });

  const cropperRef = useRef<HTMLImageElement>(null);

  function onCrop() {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper);
    const originalUrl = cropper.crossOriginUrl; // not unique
    //const originalUrl = cropper.originalUrl
    //the cropper.originalUrl is the same for all images
    const croppedUrl = cropper.getCroppedCanvas().toDataURL();

    const idx = croppedImageUrls.current.findIndex(
      ({ originalUrl: origin }) => originalUrl === origin
    );
    console.log(idx); // different originalUrl cause to new id created.
    if (idx !== -1) return;

    croppedImageUrls.current = [
      ...croppedImageUrls.current,
      { croppedUrl, originalUrl },
    ];

  }

  function handleConfirmClick() {
    onFinish(croppedImageUrls.current);
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
          src={srcs[activeUrlIdx]}
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
        {srcs.map((imageSrc, idx) => {
          return (
            <div
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-20 `}
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