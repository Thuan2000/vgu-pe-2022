import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone, FileRejection } from "react-dropzone";

import UploadIcon from "@assets/icons/upload-icon";
import Button from "./button";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import DocIcon from "@assets/icons/files/doc-icon";
import ExcelIcon from "@assets/icons/files/excel-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import { CloseIcon } from "@assets/icons/close-icon";
import InputLabel from "./inputs/input-label";

export interface IDocumentUploaderProps {
  label?: string;
  note?: string;
  numberQueue?: number;
  accept: string;
  defaultValue?: any;
  multiple?: boolean;
  required?: boolean;
  onChange?: (e: any) => void;
  value?: any;
  error?: string;
}

function getDocumentPreview(name: string, url?: string) {
  const extension = name?.split(".").pop()?.toLocaleLowerCase();
  const size = 40;
  if (extension?.includes("pdf")) return <PdfIcon width={size} height={size} />;
  else if (extension?.includes("csv") || extension?.includes("xls"))
    return <ExcelIcon width={size} height={size} />;
  else if (extension?.includes("csv") || extension?.includes("doc"))
    return <DocIcon width={size} height={size} />;
  // This sure be an image
  else {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url || ""} alt={name} />;
  }
}

function getPreviewFiles(values: any[]) {
  if (!values) return [];
  const newValues = values?.map((value) => {
    if (!value.hasOwnProperty("localUrl"))
      return { ...value, localUrl: value.location };

    return value;
  });

  return newValues;
}

const DocumentUploader = ({
  label,
  note,
  multiple,
  accept,
  required,
  numberQueue,
  onChange,
  value,
}: IDocumentUploaderProps) => {
  const { t } = useTranslation("form");
  const [files, setFiles] = useState<any[]>(getPreviewFiles(value) || []);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple: multiple,
    onDropRejected: onDropRejected,
    onDrop: async (acceptedFiles) => {
      if (files.length) {
        const accFiles = acceptedFiles.map((file) => {
          const localUrl = URL.createObjectURL(file);
          const assignedLocalUrl = Object.assign(file, { localUrl });
          return assignedLocalUrl;
        });
        setFiles([...files, ...accFiles]);
      } else {
        const accFiles = acceptedFiles.map((file) => {
          const localUrl = URL.createObjectURL(file);
          const assignedLocalUrl = Object.assign(file, { localUrl });
          return assignedLocalUrl;
        });
        setFiles([...accFiles]);
      }
    },
  });

  useEffect(() => {
    if (onChange) {
      onChange(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  function handleDelete(index: number) {
    // @ts-ignore
    files.splice(index, 1);
    const newFiles = [...files];
    setFiles(newFiles);
  }

  const thumbs = files?.map((file, idx) => {
    return (
      <div
        className="inline-flex flex-col border border-border-200 mr-4 rounded mt-2 me-2 relative"
        key={`${file.name}-${idx}`}
        title={file.name}
      >
        <div
          onClick={() => window.open(file.localUrl)}
          className="flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden cursor-pointer"
        >
          {getDocumentPreview(file.name, file.localUrl)}
        </div>
        <button
          className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute -top-1 -right-1 shadow-xl outline-none"
          onClick={() => handleDelete(idx)}
          type="button"
        >
          <CloseIcon width={10} height={10} />
        </button>
      </div>
    );
  });

  function onDropRejected(e: FileRejection[] = []) {
    const { code } = e[0]?.errors[0];

    Swal.fire({
      icon: "error",
      text: t(`form:error-${code}-message`),
      confirmButtonColor: COLORS.GREEN,
    });
  }

  return (
    <>
      {label && (
        <InputLabel
          required={required}
          label={label}
          note={note}
          numberQueue={numberQueue}
        />
      )}
      <div className={`${!!numberQueue && "ml-8"}`}>
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 border-border-base h-24 flex-center rounded cursor-pointer focus:border-green focus:outline-none",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-xs text-center text-green-main">
            <span className="text-green font-semibold">
              {t("form:drop-zone")}
            </span>
          </p>
        </div>
        <div className="flex items-center flex-wrap">
          {thumbs?.length > 0 && thumbs}
        </div>
        <Button
          size="small"
          className="mt-3 bg-blue text-xs px-6 hover:bg-blue-700 active:bg-blue-900"
          type="button"
          {...getRootProps()}
        >
          <UploadIcon className="mr-5" /> {t("upload-file")}
        </Button>
      </div>
    </>
  );
};
export default DocumentUploader;
