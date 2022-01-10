import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { IFile } from "@graphql/types.graphql";
import { useModal } from "src/contexts/modal.context";
import ImagePreview from "@components/ui/image-preview";

interface ImagesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  images: any[];
  changeSection: (id: number) => void;
  imgWidth?: number;
  imgHeight?: number;
  imageWrapperClass?: string;
  thumbWrapperClass?: string;
  isImageFill?: boolean;
  getImageSrc: (img: IFile) => string;
}

interface ImageThumbProps {
  img: any;
  isLast?: boolean;
  imagesLength: number;
  wrapperClassName?: string;
  getImageSrc: (img: IFile) => string;
  onClick: (src: string) => void;
}

const CoverImage = ({ text }: { text: string }) => {
  return (
    <div className="text-white font-semibold z-50 rounded-md abs-fullsize bg-black flex-center opacity-60 text-lg">
      {text}
    </div>
  );
};

const ImageThumb: React.FC<ImageThumbProps> = ({
  img,
  isLast,
  imagesLength,
  wrapperClassName,
  onClick,
  getImageSrc,
}) => {
  const { t } = useTranslation();
  const imgSrc = getImageSrc(img);
  const withCover = isLast && imagesLength - 3 > 0;
  return (
    <div
      onClick={() => onClick(imgSrc)}
      className={`relative cursor-pointer border-gray-100 rounded-md flex-center h-[75px] w-[75px]
        ${imagesLength <= 3 && "mr-3"}
        ${!withCover && "border-2"}
        ${wrapperClassName}
      `}
    >
      {withCover && <CoverImage text={`+${imagesLength - 3}`} />}
      <Image src={imgSrc} width={50} height={75} alt={t("image-preview-alt")} />
    </div>
  );
};

const ImagesSection: React.FC<ImagesSectionProps> = ({
  images,
  changeSection,
  className,
  imgWidth,
  imgHeight,
  imageWrapperClass,
  thumbWrapperClass,
  isImageFill,
  getImageSrc,
  ...props
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation("form");

  const coverImage = getImageSrc(images[0]) || siteSettings.logo.url;

  const thumbs =
    images.length > 1 &&
    images?.slice(1, 4)?.map((img, idx) => {
      return (
        <ImageThumb
          getImageSrc={getImageSrc}
          onClick={openImage}
          img={img}
          key={`${img.url}-thumb-preview`}
          isLast={idx === 2}
          wrapperClassName={thumbWrapperClass}
          imagesLength={images.length}
        />
      );
    });

  function openImage(defaultActiveUrl: string) {
    openModal(
      (
        <ImagePreview
          defaultActiveUrl={defaultActiveUrl}
          images={images || []}
        />
      ) as any
    );
  }

  return (
    <div className={className}>
      <div
        className={`relative cursor-pointer flex-center border-2 border-gray-200 h-auto ${imageWrapperClass}`}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={coverImage}
          alt={t("image-preview-alt")}
          width={imgWidth}
          height={imgHeight}
          onClick={() => openImage(coverImage)}
          {...(isImageFill
            ? { layout: "fill" }
            : {
                width: imgWidth,
                height: imgHeight,
              })}
          className="p-3"
        />
        <p
          className="absolute w-full bottom-0 text-white bg-primary opacity-80 hover:opacity-100 all-transition flex-center py-3 cursor-pointer"
          onClick={changeSection as any}
        >
          {t("change-photo-label")}
        </p>
      </div>
      <div
        className={`flex mt-3 justify-start ${
          images?.length > 3 && "justify-between"
        }`}
      >
        {thumbs}
      </div>
    </div>
  );
};
export default ImagesSection;
