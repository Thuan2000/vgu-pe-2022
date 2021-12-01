import React, { ReactSVGElement, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone, FileRejection } from "react-dropzone";

import UploadIcon from "@assets/icons/upload-icon";
import Button from "../button";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import InputLabel from "../inputs/input-label";
import ValidationError from "../validation-error";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import { getCompanyName } from "@utils/functions";
import { IFile, IFileAccessControl, IFileType } from "@graphql/types.graphql";
import DUThumb from "./du-thumb";
import Image from "next/image";
import Loader from "../loader/loader";

export interface IFileWithTypename extends IFile {
  __typename?: string;
}

export interface IDocumentUploaderProps {
  label?: string;
  note?: string;
  numberQueue?: number;
  accept: string;
  defaultValue?: any;
  multiple?: boolean;
  required?: boolean;
  maxFiles?: number;
  dropZoneText?: string;
  onChange?: (e: any) => void;
  value?: any;
  error?: string;
  inputFileType: IFileType;
  accessControl?: IFileAccessControl;
  hideUploadButton?: boolean;
  dropZonePlaceholder?: ReactSVGElement;
  inputStyle?: React.CSSProperties;
  thumbOnInput?: boolean;
}

function getPreviewFiles(values: IFileWithTypename[]) {
  if (!values) return [];
  const files = values.map(({ __typename, ...file }) => file);
  return files;
}

const DocumentUploader = ({
  label,
  note,
  dropZoneText,
  multiple,
  hideUploadButton,
  accept,
  required,
  inputStyle,
  thumbOnInput,
  error,
  dropZonePlaceholder: DropZonePlaceholder,
  numberQueue,
  inputFileType,
  onChange,
  value,
  maxFiles = 10,
  accessControl = "PUBLIC_READ",
}: IDocumentUploaderProps) => {
  const { t } = useTranslation("form");
  const [files, setFiles] = useState<IFile[]>(getPreviewFiles(value) || []);
  const [loadingThumbs, setLoadingThumbs] = useState<string[]>([]);
  const firstRun = useRef(true);
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    maxFiles: maxFiles,
    onDropRejected: onDropRejected,
    onDrop: handleOnDrop,
  });

  const [uploadFiles, { loading }] = useUploadFilesMutation({
    onCompleted: () => setLoadingThumbs([]),
  });

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else if (onChange) onChange(files);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  async function handleOnDrop(acceptedFiles: File[]) {
    if (!!maxFiles && files.length + acceptedFiles.length > maxFiles) {
      fireErrorModal("too-many-files");
      return;
    }

    setLoadingThumbs(new Array(acceptedFiles.length).fill(""));
    const { data } = await uploadFiles({
      variables: {
        input: {
          companyName: getCompanyName() as string,
          files: acceptedFiles,
          uploadsFileInputType: inputFileType as any,
          fileAccessControl: accessControl as any,
        },
      },
    });
    const uploadedFiles = data?.uploadFiles;
    const accFiles = uploadedFiles?.map(
      ({ __typename, ...file }: IFileWithTypename) => file
    );

    if (!!files.length && multiple) setFiles([...files, ...accFiles!]);
    else setFiles(accFiles!);
  }

  function handleDelete(index: number) {
    // @ts-ignore
    files.splice(index, 1);
    const newFiles = [...files];
    setFiles(newFiles);
  }

  function openDocument(url: string) {
    window.open(url);
  }

  function fireErrorModal(errorCode: string) {
    Swal.fire({
      icon: "error",
      text: `${t(`form:error-${errorCode}-message`)} 
        ${errorCode === "too-many-files" ? maxFiles || 10 : ""},
        ${maxFiles - files.length}
        ${t("form:slot-left-message")}
      `,
      confirmButtonColor: COLORS.GREEN,
    });
  }

  function onDropRejected(e: FileRejection[] = []) {
    const { code } = e[0]?.errors[0];

    fireErrorModal(code);
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

      <div className={`select-none space-y-2 ${!!numberQueue && "ml-8"}`}>
        <div className="flex items-center flex-wrap mb-2">
          {!thumbOnInput &&
            files?.map((file, idx) => {
              return (
                <DUThumb
                  key={file.url + "document"}
                  file={file}
                  onClick={openDocument}
                  onDelete={() => handleDelete(idx)}
                />
              );
            })}
          {!thumbOnInput &&
            loading &&
            loadingThumbs?.map((idx) => {
              return (
                <DUThumb
                  key={idx + "loading-thumb"}
                  file={{} as any}
                  isLoading
                  onClick={() => {}}
                  onDelete={() => {}}
                />
              );
            })}
        </div>
        <div
          style={{ ...inputStyle }}
          {...getRootProps({
            className: `border-dashed border-2 h-24 flex-center rounded relative
            ${
              loading || (!!maxFiles && files.length >= maxFiles)
                ? "cursor-not-allowed"
                : "cursor-pointer border-primary focus:border-primary focus:outline-none"
            }`,
          })}
        >
          <input
            {...getInputProps({
              disabled: loading || (!!maxFiles && files.length >= maxFiles),
            })}
          />
          {thumbOnInput && files.length > 0 && (
            <div>{!loading && <Image src={files[0].url} layout="fill" />}</div>
          )}
          {thumbOnInput && loading ? (
            <Loader simple className="w-10 h-10" />
          ) : (
            <p className="text-xs text-center">
              <span
                className={`font-semibold ${
                  loading || (!!maxFiles && files.length >= maxFiles)
                    ? "text-gray-300"
                    : "text-primary"
                }`}
              >
                {DropZonePlaceholder ?? dropZoneText ?? t("form:drop-zone")}
              </span>
            </p>
          )}
        </div>

        {!hideUploadButton && (
          <Button
            size="small"
            className="mt-3 text-xs px-6"
            type="button"
            color="secondary-1"
            disabled={loading || (!!maxFiles && files.length >= maxFiles)}
            {...getRootProps()}
          >
            <UploadIcon className="mr-5" /> {t("upload-file")}
          </Button>
        )}
        <ValidationError message={error} />
      </div>
    </>
  );
};
export default DocumentUploader;
