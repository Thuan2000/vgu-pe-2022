import Image from "next/image";
import React from "react";

import { IFile } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import { useModal } from "src/contexts/modal.context";
import ImagePreview from "./image-preview";

interface IDetailImagesProps {
  coverImage?: IFile;
  images?: IFile[];
}

const DetailImages: React.FC<IDetailImagesProps> = ({ coverImage, images }) => {
  const { openModal } = useModal();
  const coverImageUrl = coverImage?.url || siteSettings.logo.url;

  function showImagePreviewModal(defaultActiveUrl: string) {
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
    <div>
      <div
        className={`sm:w-80 cursor-pointer sm:h-80 relative border rounded-sm overflow-hidden`}
      >
        <div onClick={() => showImagePreviewModal(coverImageUrl)}>
          <Image
            src={coverImageUrl}
            alt={"posted-detail-preview"}
            layout="fill"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-2">
        {images?.slice(1, 5).map((img, idx) => {
          return (
            <div
              onClick={() => showImagePreviewModal(img.url)}
              key={img.location + "br=images"}
              className="sm:w-20 sm:h-20 cursor-pointer relative border rounded-sm overflow-hidden"
            >
              {idx === 3 && (
                <div className="absolute w-full h-full bg-black bg-opacity-60 z-10 text-white font-semibold flex-center">
                  +{images.length - (idx + 1)}
                </div>
              )}
              <Image
                alt={img.fileName + "preview"}
                src={img.url || siteSettings.logo.href}
                layout="fill"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DetailImages;
