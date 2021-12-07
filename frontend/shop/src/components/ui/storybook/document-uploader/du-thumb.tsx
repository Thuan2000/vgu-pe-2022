import DocIcon from "@assets/icons/files/doc-icon";
import ExcelIcon from "@assets/icons/files/excel-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { IFile } from "@graphql/types.graphql";
import React from "react";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import Loader from "../loader/loader";
import Typography from "../typography";
import { trimText } from "@utils/functions";

interface IDUThumbProps {
  file: IFile;
  onClick: (url: string) => void;
  onDelete: () => void;
  isLoading?: boolean;
}

function isImage(file: IFile) {
  return !!file?.fileType?.includes("image");
}
function isVideo(file: IFile) {
  return !!file?.fileType?.includes("video");
}

export function getDocumentPreview(file: IFile, props?: any) {
  const { fileName, url } = file as any;
  const extension = fileName?.split(".").pop()?.toLocaleLowerCase();
  const size = 40;
  if (extension?.includes("pdf"))
    return <PdfIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("xls"))
    return <ExcelIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("doc"))
    return <DocIcon width={size} height={size} {...props} />;
  else if (isImage(file))
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <Image
        layout="fill"
        objectFit="cover"
        src={url}
        alt={fileName}
        {...props}
      />
    );
  else if (isVideo(file))
    // eslint-disable-next-line @next/next/no-img-element
    return <video src={url} autoPlay={false} {...props} />;
}

const DUThumb: React.FC<IDUThumbProps> = ({
  file,
  onClick,
  onDelete,
  isLoading,
}) => {
  return (
    <div className="mb-2 me-2 border mr-4 relative rounded overflow-hidden">
      <div
        className="flex-col border-border-200 relative"
        title={file.fileName}
      >
        <div
          onClick={() => onClick(file.url)}
          className={`flex overflow-hidden items-center justify-center w-24 h-20
            ${isLoading ? `h-24` : "cursor-pointer"}
          `}
        >
          {isLoading ? (
            <Loader simple={true} className="w-10 h-10" />
          ) : (
            getDocumentPreview(file)
          )}
        </div>
        <Typography
          className="bg-black w-full bg-opacity-80 text-white cursor-pointer absolute bottom-0"
          align="center"
          onClick={() => onClick(file.url)}
          size="xs"
          text={trimText(file.fileName, 11)}
        />
      </div>

      <button
        className="flex-center w-full py-2"
        onClick={onDelete}
        type="button"
      >
        {!isLoading && <TrashCanIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};
export default DUThumb;
