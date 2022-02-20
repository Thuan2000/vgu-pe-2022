import React, { ReactSVGElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone, FileRejection } from "react-dropzone";

import UploadIcon from "@assets/icons/upload-icon";
import Button from "../button";
import Swal from "sweetalert2";
import { COLORS } from "@utils/colors";
import InputLabel from "../inputs/input-label";
import ValidationError from "../validation-error";
import {
  useDeleteFileMutation,
  useUploadFilesMutation,
} from "@graphql/upload.graphql";
import { generateUUID } from "@utils/functions";
import { IFile, IFileAccessControl, IFileType } from "@graphql/types.graphql";
import DUThumb from "./du-thumb";
import Image from "next/image";
import Loader from "../loader/loader";
import { useModal } from "src/contexts/modal.context";
import ImageCropper, { CroppedImageUrls } from "./image-cropper";

export interface IFileWithTypename extends IFile {
  __typename?: string;
}

export interface IDUFile extends IFile {
  isNew: boolean;
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
  onChange?: (e: IFile[]) => void;
  value?: IFile[];
  error?: string;
  inputFileType: IFileType;
  accessControl?: IFileAccessControl;
  hideUploadButton?: boolean;
  dropZonePlaceholder?: ReactSVGElement;
  inputStyle?: React.CSSProperties;
  thumbOnInput?: boolean;
  disabled?: boolean;
  inputClassName?: string;
  aspectRatio?: number;
}

const DocumentUploader = (props: IDocumentUploaderProps) => {
  const {
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
    disabled,
    onChange,
    value: files = [],
    maxFiles = 10,
    accessControl = "PUBLIC_READ",
    inputClassName,
    aspectRatio,
  } = props;
  if (!accept) throw "PLEASE_SET_THE_ACCEPT_CORRECTLY";
  const { t } = useTranslation("form");
  const [loadingThumbs, setLoadingThumbs] = useState<string[]>([]);
  const [needToEditedFiles, setNeedToEditedFiles] = useState<File[]>([]);
  const [deleteFile, isDeletingFile] = useDeleteFileMutation();
  const { openModal, closeModal } = useModal();
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
    if (!needToEditedFiles.length) return;

    const srcs: IDUFile[] = needToEditedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      return {
        fileName: file.name,
        fileType: file.type,
        url,
        location: url,
        isNew: true,
      };
    });

    openModal(
      (
        <ImageCropper
          aspectRatio={aspectRatio}
          onFinish={handleFinishCropping}
          fileSources={srcs}
          onClose={closeModal}
        />
      ) as any,
      {
        onClose: () => setNeedToEditedFiles([]),
        closeOnClickOutside: false,
      }
    );
  }, [needToEditedFiles]);

  async function handleFinishCropping(croppedImgs: CroppedImageUrls) {
    setNeedToEditedFiles([]);
    closeModal();
    if (!onChange) return;

    const accFiles = Object.keys(croppedImgs).map((k) => croppedImgs[k]);
    if (!!files?.length && multiple) onChange([...files, ...accFiles!]);
    else onChange(accFiles!);
  }

  async function handleOnDrop(acceptedFiles: File[]) {
    if (!!maxFiles && files?.length + acceptedFiles?.length > maxFiles) {
      fireErrorModal("too-many-files");
      return;
    }
    if (inputFileType === "image") {
      setNeedToEditedFiles(acceptedFiles);
      return;
    }

    setLoadingThumbs(new Array(acceptedFiles.length).fill(""));

    const localFiles: IFile[] = acceptedFiles.map((f) => {
      const url = URL.createObjectURL(f);
      const file: IDUFile = {
        fileName: f.name,
        fileType: f.type,
        url,
        location: url,
        isNew: true,
      };

      return file;
    });

    if (!onChange) return;

    if (!!files?.length && multiple) onChange([...files, ...localFiles!]);
    else onChange(localFiles!);
  }

  function handleDelete(index: number) {
    if (!onChange) return;
    // const location = files[index].location;
    // if (!location.includes("blob")) {
    //   deleteFile({
    //     variables: { location },
    //   });
    // }

    files?.splice(index, 1);
    onChange([...files]);
  }

  function openDocument(url: string) {
    window.open(url);
  }

  function fireErrorModal(errorCode: string) {
    Swal.fire({
      icon: "error",
      text: `${t(`form:error-${errorCode}-message`)} 
        ${errorCode === "too-many-files" ? maxFiles || 10 : ""},
        ${maxFiles - files?.length}
        ${t("form:slot-left-message")}
      `,
      confirmButtonColor: COLORS.GREEN,
    });
  }

  function onDropRejected(e: FileRejection[] = []) {
    const { code } = e[0]?.errors[0];

    fireErrorModal(code);
  }

  const isDisabled =
    disabled || loading || (!!maxFiles && files?.length >= maxFiles);

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

      <div
        className={`select-none space-y-2 h-fit-content ${
          !!numberQueue && "ml-8"
        }`}
      >
        {(!!files?.length || !!loadingThumbs.length) && (
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
                    key={idx + "loading-thumb" + generateUUID()}
                    file={{} as any}
                    isLoading
                    onClick={() => {}}
                    onDelete={() => {}}
                  />
                );
              })}
          </div>
        )}
        <div
          style={{ ...inputStyle }}
          {...getRootProps({
            className: `${inputClassName} h-24 border-dashed border-2 flex-center rounded relative overflow-hidden
            ${files.length > 0 && thumbOnInput ? "border-0" : ""}
            ${
              loading || (!!maxFiles && files?.length >= maxFiles)
                ? "cursor-not-allowed"
                : "cursor-pointer border-primary focus:border-primary focus:outline-none"
            }`,
          })}
        >
          <input
            {...getInputProps({
              disabled: isDisabled,
            })}
          />
          {thumbOnInput && files?.length > 0 && (
            <div className={`w-full h-full overflow-hidden relative`}>
              {!loading && <Image src={files[0]?.url} layout="fill" />}
            </div>
          )}
          {thumbOnInput && files.length <= 0 && loading && (
            <Loader simple className="w-10 h-10" />
          )}
          {(!thumbOnInput || files.length <= 0) && !loading && (
            <p className="text-xs text-center">
              <span
                className={`font-semibold ${
                  loading || (!!maxFiles && files?.length >= maxFiles)
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
            disabled={isDisabled}
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
