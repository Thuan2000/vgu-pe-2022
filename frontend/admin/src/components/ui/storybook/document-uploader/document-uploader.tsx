import React, { useEffect, useRef, useState } from "react";
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
  onChange?: (e: any) => void;
  value?: any;
  error?: string;
  inputFileType: IFileType;
  accessControl?: IFileAccessControl;
}

function getPreviewFiles(values: IFileWithTypename[]) {
  if (!values) return [];
  const files = values.map(({ __typename, ...file }) => file);
  return files;
}

const DocumentUploader = ({
  label,
  note,
  multiple,
  accept,
  required,
  error,
  numberQueue,
  inputFileType,
  onChange,
  value,
  maxFiles,
  accessControl = "PUBLIC_READ",
}: IDocumentUploaderProps) => {
  const { t } = useTranslation("form");
  const [files, setFiles] = useState<IFile[]>(getPreviewFiles(value) || []);
  const [loadingThumbs, setLoadingThumbs] = useState<string[]>([]);
  const firstRun = useRef(true);
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    maxFiles: maxFiles ?? 10,
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

    if (!!files.length) setFiles([...files, ...accFiles!]);
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

      <div className={`space-y-2 ${!!numberQueue && "ml-8"}`}>
        <div className="flex items-center flex-wrap mb-2">
          {files?.map((file, idx) => {
            return (
              <DUThumb
                key={file.url + "document"}
                file={file}
                onClick={openDocument}
                onDelete={() => handleDelete(idx)}
              />
            );
          })}
          {loading &&
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
          {...getRootProps({
            className: `border-dashed border-2 h-24 flex-center rounded 
            ${
              loading
                ? "cursor-not-allowed"
                : "cursor-pointer border-primary focus:border-primary focus:outline-none"
            }`,
          })}
        >
          <input {...getInputProps({ disabled: loading })} />
          <p className="text-xs text-center">
            <span
              className={`font-semibold ${
                loading ? "text-gray-300" : "text-primary"
              }`}
            >
              {t("form:drop-zone")}
            </span>
          </p>
        </div>

        <Button
          size="small"
          className="mt-3 text-xs px-6"
          type="button"
          color="secondary-1"
          disabled={loading}
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
