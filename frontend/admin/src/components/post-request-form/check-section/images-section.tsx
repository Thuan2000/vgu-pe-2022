import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

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
    <div className="text-white font-semibold z-50 abs-fullsize bg-black border-2 border-black flex-center opacity-60 text-lg">
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

  return (
    <div
      className="relative border-2 rounded-md flex-center"
      style={{ width: "77px", height: "77px" }}
    >
      {isLast && imagesLength - 3 > 0 && (
        <CoverImage text={`+${imagesLength - 3}`} />
      )}
      <Image
        src={img.localUrl}
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

  const thumbs = images?.slice(0, 3)?.map((img, idx) => {
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
          src={images[0]?.localUrl || ""}
          alt={t("image-preview-alt")}
          width={imgWidth}
          height={imgHeight}
          className="p-3"
        />
        <p
          className="absolute w-full bottom-0 text-white bg-primary opacity-80 hover:opacity-100 all-transition flex-center py-3 cursor-pointer"
          onClick={() => changeSection(2)}
        >
          {t("change-photo-label")}
        </p>
      </div>
      <div className="flex mt-3 justify-between">{thumbs}</div>
    </div>
  );
};
export default ImagesSection;
