import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import XIcon from "@assets/icons/x-icon";
import Button from "../button";
import Image from "next/image";
import Swal from "sweetalert2";
import { useTranslation } from "next-i18next";
import VerifiedIcon from "@assets/icons/verified-icon";
import { COLORS } from "@utils/colors";
import { IFile } from "@graphql/types.graphql";

interface IImageCropperProps {
  fileSources: IFile[];
  onFinish: (croppedImageUrl: CroppedImageUrls) => void;
  aspectRatio?: number;
  onClose: () => void;
}

export interface CroppedImage {
  originalUrl: string;
  croppedUrl: string;
}

export interface CroppedImageUrls {
  [k: string]: IFile;
}

let check: any[] = [];
check[0] = true;
let check2nd: boolean = false;

const ImageCropper: React.FC<IImageCropperProps> = ({
  onFinish,
  fileSources,
  aspectRatio = 1,
  onClose,
}) => {
  const { t } = useTranslation("form");
  const [activeUrlIdx, setActiveIdx] = useState(0);
  const refIdx = useRef(0);
  const croppedImages = useRef<CroppedImageUrls>({});
  const cropperRef = useRef<HTMLImageElement>(null);
  var i: number;
  var count = 0;
  for (i = 0; i < fileSources.length; i++) {
    if (check[i] === true) count++;
  }
  if (count === fileSources.length) check2nd = true;

  function onCrop() {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    const fileSource = fileSources[refIdx.current];
    const originalUrl = fileSources[refIdx.current].url;

    const croppedUrl = cropper.getCroppedCanvas().toDataURL();
    croppedImages.current[originalUrl] = { ...fileSource, url: croppedUrl };
  }
  function handleConfirmClick() {
    if (check2nd === false) {
      Swal.fire({
        icon: "error",
        iconColor: "00D796",
        title: t("crop-undone"),
        confirmButtonColor: "#00D796",
        confirmButtonText: t("ok-button"),
      });
    } else {
      onFinish(croppedImages.current);
      check = [];
      check2nd = false;
      check[0] = true;
    }
  }
  return (
    <div>
      <div
        className={`py-80 sm:w-screen sm:h-screen relative overflow-hidden flex-center flex-col`}
      >
        <div
          className="absolute top-10 right-10 hover:scale-125 transition-all duration-150 cursor-pointer"
          onClick={onClose}
        >
          <XIcon fill={COLORS.WHITE} />
        </div>
        <div className={`relative -mt-10 w-screen h-96 flex justify-center`}>
          <Cropper
            src={fileSources[activeUrlIdx].url}
            aspectRatio={aspectRatio}
            guides={false}
            max="1080px"
            autoCrop
            crop={onCrop}
            ref={cropperRef}
          />
        </div>
        <div
          className={`flex space-x-2 mt-10 place-items-center justify-center`}
        >
          {fileSources.map((file, idx) => {
            return (
              <div
                onClick={() => {
                  refIdx.current = idx;
                  setActiveIdx(idx);
                  check[idx] = true;
                }}
                key={file.url}
                className={`sm:w-20 sm:h-20 relative`}
              >
                <div className="grid grid-cols-2">
                  <Image
                    src={file.url}
                    layout="fill"
                    className="rounded-lg col-start-1"
                  />
                  {check[idx] === true && (
                    <VerifiedIcon className="col-start-1 mt-24" />
                  )}
                </div>
              </div>
            );
          })}
          <div className={``}>
            {check2nd === true && (
              <Button autoFocus onClick={handleConfirmClick}>
                {t("confirm-button")}
              </Button>
            )}
            {check2nd === false && (
              <Button
                className={`autofocus`}
                onClick={handleConfirmClick}
                color="error"
                autoFocus
              >
                {t("confirm-button")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCropper;
