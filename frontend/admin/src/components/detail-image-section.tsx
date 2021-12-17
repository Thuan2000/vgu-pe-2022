import Image from "next/image";
import React from "react";

import { IFile } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";

interface IDetailImagesProps {
  coverImage?: IFile;
  images?: IFile[];
}

const DetailImages: React.FC<IDetailImagesProps> = ({ coverImage, images }) => {
  return (
    <div>
      <div
        className={`sm:w-80 sm:h-80 relative border rounded-sm overflow-hidden`}
      >
        <Image
          src={coverImage?.url || siteSettings.logo.url}
          alt={"posted-detail-preview"}
          layout="fill"
        />
      </div>
      <div className="flex space-x-2 mt-2">
        {images?.slice(1, 5).map((img, idx) => {
          return (
            <div
              key={img.location + "br=images"}
              className="sm:w-20 sm:h-20 relative border rounded-sm overflow-hidden"
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
