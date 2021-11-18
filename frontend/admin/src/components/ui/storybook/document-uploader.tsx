import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone, FileRejection } from "react-dropzone";
import Image from "next/image";

import UploadIcon from "@assets/icons/upload-icon";
import Button from "./button";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import DocIcon from "@assets/icons/files/doc-icon";
import ExcelIcon from "@assets/icons/files/excel-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import InputLabel from "./inputs/input-label";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import ValidationError from "./validation-error";

export interface IFile extends File {
  localUrl: string;
}

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

function isImage(file: IFile) {
  return !!file.type.match("image.*");
}
function isVideo(file: IFile) {
  return !!file.type.match("video.*");
}
// function isAudio(file: IFile) {
//   return !!file.type.match("audio.*");
// }

export function getDocumentPreview(file: IFile, props?: any) {
  const { name, localUrl: url } = file as any;
  const extension = name?.split(".").pop()?.toLocaleLowerCase();
  const size = 40;
  if (extension?.includes("pdf"))
    return <PdfIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("xls"))
    return <ExcelIcon width={size} height={size} {...props} />;
  else if (extension?.includes("csv") || extension?.includes("doc"))
    return <DocIcon width={size} height={size} {...props} />;
  else if (isImage(file))
    // eslint-disable-next-line @next/next/no-img-element
    return <Image layout="fill" src={url || ""} alt={name} {...props} />;
  else if (isVideo(file))
    // eslint-disable-next-line @next/next/no-img-element
    return <video src={url || ""} autoPlay={false} {...props} />;
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
  error,
  numberQueue,
  onChange,
  value,
}: IDocumentUploaderProps) => {
  const { t } = useTranslation("form");
  const [files, setFiles] = useState<IFile[]>(getPreviewFiles(value) || []);
  const firstRun = useRef(true);
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
    if (firstRun.current) firstRun.current = false;
    else if (onChange) onChange(files);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  function handleDelete(index: number) {
    // @ts-ignore
    files.splice(index, 1);
    const newFiles = [...files];
    setFiles(newFiles);
  }

  function openDocument(url: string) {
    window.open(url);
  }

  const thumbs = files?.map((file, idx) => {
    return (
      <div
        key={file.localUrl + "document"}
        className="mb-2 me-2 border mr-4 relative rounded overflow-hidden"
      >
        <div
          className="flex-col border-border-200"
          key={`${file.name}-${idx}`}
          title={file.name}
        >
          <div
            onClick={() => openDocument(file.localUrl)}
            className="flex items-center justify-center w-24 h-20 overflow-hidden cursor-pointer relative"
          >
            {getDocumentPreview(file)}
          </div>
          {/* <button
            className="w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute -top-1 -right-1 shadow-xl outline-none"
            onClick={() => handleDelete(idx)}
            type="button"
          >
            <CloseIcon width={10} height={10} />
          </button> */}
        </div>
        <button
          className="flex-center w-full py-2"
          onClick={() => handleDelete(idx)}
          type="button"
        >
          <TrashCanIcon className="w-4 h-4" />
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
        <div className="flex items-center flex-wrap mb-2">
          {thumbs?.length > 0 && thumbs}
        </div>
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 border-border-base h-24 flex-center rounded cursor-pointer focus:border-primary focus:outline-none",
          })}
        >
          <input {...getInputProps()} />
          <p className="text-xs text-center text-primary-main">
            <span className="text-primary font-semibold">
              {t("form:drop-zone")}
            </span>
          </p>
        </div>

        <Button
          size="small"
          className="mt-3 bg-blue text-xs px-6 hover:bg-blue-700 active:bg-blue-900"
          type="button"
          {...getRootProps()}
        >
          <UploadIcon className="mr-5" /> {t("upload-file")}
        </Button>
        <ValidationError message={error} />
      </div>
    </>
  );
};
export default DocumentUploader;
