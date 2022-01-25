import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import XIcon from "@assets/icons/x-icon";
import Button from "../button";
import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import VerifiedIcon from "@assets/icons/verified-icon";

interface IImageCropperProps {
  src_id: string[];
  onFinish: (croppedImageUrl: CroppedImageUrls) => void;
}

export interface CroppedImage {
  originalUrl: string;
  croppedUrl: string;
}

export interface CroppedImageUrls {
  [k: string]: string;
}

let check: any[] = [];
check[0] = true;
let check2nd: boolean = false;

const ImageCropper: React.FC<IImageCropperProps> = ({ onFinish, src_id }) => {
  const { t } = useTranslation("form");
  const [activeUrlIdx, setActiveIdx] = useState(0);
  const refIdx = useRef(0);
  const croppedImageUrlsInObject = useRef<CroppedImageUrls>({});
  const cropperRef = useRef<HTMLImageElement>(null);

  var i: number;
  var count = 0;
  for(i = 0; i < src_id.length; i++) {
    if (check[i] === true) count++;
  }
  if (count === src_id.length) check2nd = true;

  console.log(check2nd);

  function onCrop() {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const originalUrl = src_id[refIdx.current];
    const croppedUrl = cropper.getCroppedCanvas().toDataURL();
    croppedImageUrlsInObject.current[originalUrl] = croppedUrl;

  }
  function handleConfirmClick() {
    if (check2nd === false) {
      Swal.fire({
        icon: 'error',
        iconColor: "00D796",
        title: t("crop-undone"),
        confirmButtonColor: "#00D796",
        confirmButtonText: t("ok-button"),
      });
    }
    else {
      onFinish(croppedImageUrlsInObject.current);
      check = [];
      check2nd = false;
      check[0] = true;
    } 
  }
  return (
    <div>
      <div className={`py-80 sm:w-screen sm:h-screen relative overflow-hidden`}>
        <div className={`relative -mt-10 w-screen h-96 flex justify-center`}>
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
        <div className={`flex space-x-2 mt-10 place-items-center justify-center`}>
          {src_id.map((imageSrc, idx) => {
            return (
              <div
                onClick={() => {
                  refIdx.current = idx;
                  setActiveIdx(idx);
                  check[idx] = true;
                }}
                className={`sm:w-20 sm:h-20 relative`}
              >
                <div className="grid grid-cols-2">
                  <Image src={imageSrc} layout="fill" className="rounded-lg col-start-1" />
                  {check[idx] === true && (
                    <VerifiedIcon className="col-start-1 mt-24" />
                  )}
                  
                </div>
              </div>
            );
          })}
          <div className={``}>
            {check2nd === true && (
              <Button onClick={handleConfirmClick}>{t("confirm-button")}</Button>
            )}
            {check2nd === false && (
              <Button onClick={handleConfirmClick} color="error">{t("confirm-button")}</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCropper;
