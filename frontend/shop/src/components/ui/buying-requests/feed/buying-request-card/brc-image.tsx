import React from "react";
import Image from "next/image";
import { IFile, Maybe } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";

interface IBrcImageProps extends React.HTMLAttributes<HTMLDivElement> {
  gallery?: Array<IFile>;
}

const BrcImage: React.FC<IBrcImageProps> = ({
  className,
  gallery,
  ...props
}) => {
  const cover = gallery?.at(0)?.url || siteSettings.logo.url;
  const isSdConnectLogo = !gallery?.at(0)?.url;

  return (
    <div
      className={`relative w-[180px] h-[150px] flex-shrink-0 overflow-hidden ${className}`}
      {...props}
    >
      <Image
        src={cover}
        alt="Good"
        objectFit={isSdConnectLogo ? "contain" : "cover"}
        layout="fill"
      />
    </div>
  );
};
export default BrcImage;
