import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";

interface ImagesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  images: any[];
  changeSection: (id: number) => void;
  imgWidth: number;
  imgHeight: number;
}

interface ImageThumbProps {
  img: any;
  isLast?: boolean;
  imagesLength: number;
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
}) => {
  const { t } = useTranslation();
  const withCover = isLast && imagesLength - 3 > 0;
  return (
    <div
      className={`relative ${
        !withCover && "border-2"
      } border-gray-100 rounded-md flex-center ${imagesLength <= 3 && "mr-3"}`}
      style={{ width: "77px", height: "77px" }}
    >
      {withCover && <CoverImage text={`+${imagesLength - 3}`} />}
      <Image
        src={img.localUrl || siteSettings.logo.url}
        width={50}
        height={75}
        alt={t("image-preview-alt")}
      />
    </div>
  );
};

const ImagesSection: React.FC<ImagesSectionProps> = ({
  images,
  changeSection,
  className,
  imgWidth,
  imgHeight,
  ...props
}) => {
  const { t } = useTranslation();

  const thumbs =
    images.length > 1 &&
    images?.slice(1, 4)?.map((img, idx) => {
      return (
        <ImageThumb
          img={img}
          key={`${img.localUrl}-thumb-preview`}
          isLast={idx === 2}
          imagesLength={images.length}
        />
      );
    });

  return (
    <div className={className}>
      <div
        className="relative flex-center border-2 border-gray-200 h-auto"
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={images[0]?.localUrl || siteSettings.logo.url}
          alt={t("image-preview-alt")}
          width={imgWidth}
          height={imgHeight}
          className="p-3"
        />
        <p
          className="absolute w-full bottom-0 text-white bg-primary opacity-80 hover:opacity-100 all-transition flex-center py-3 cursor-pointer"
          onClick={() => changeSection(1)}
        >
          {t("change-photo-label")}
        </p>
      </div>
      <div
        className={`flex mt-3 justify-start ${
          images.length > 3 && "justify-between"
        }`}
      >
        {thumbs}
      </div>
    </div>
  );
};
export default ImagesSection;
