import AttachIcon from "@assets/icons/attach-icon";
import { trimText } from "@utils/functions";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

interface IPPIFileAttacherProps {
  onChange: (e: File) => void;
  value: File;
  disabled?: boolean;
}

type AcceptedExt = "doc" | "xls" | "ppt" | "pdf";

const PPIFileAttacher: React.FC<IPPIFileAttacherProps> = ({
  onChange,
  value,
  disabled,
}) => {
  const { t } = useTranslation("form");
  const [file, setFile] = useState<File>(value);
  const { getRootProps, getInputProps } = useDropzone({
    accept: `.pdf, ${getSimilar("doc")}, ${getSimilar("xls")}, ${getSimilar(
      "ppt"
    )} `,
    maxFiles: 1,
    onDrop: async (accFile) => {
      if (!accFile.length) return;
      const file = accFile?.at(0) as File;

      setFile(file);
      onChange(file);
    },
  });

  function getSimilar(ext: AcceptedExt) {
    return `.${ext}, .${ext + "x"}`;
  }

  return (
    <div
      {...getRootProps({
        className: "w-full h-full flex-center py-3 cursor-pointer",
      })}
    >
      <input {...getInputProps()} disabled={disabled} />
      <span className="mx-2">
        {trimText(file?.name || t("attach-file-label"), 20)}
      </span>
      <AttachIcon className="w-5 h-5" />
    </div>
  );
};
export default PPIFileAttacher;
