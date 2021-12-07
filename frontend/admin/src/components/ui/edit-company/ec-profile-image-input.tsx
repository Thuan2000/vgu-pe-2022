import ThreeDotIcon from "@assets/icons/three-dot-icon";
import { COLORS } from "@utils/colors";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import loading from "../loading";
import Loader from "../storybook/loader/loader";
import Image from "next/image";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import { IFile, IFileAccessControl, IFileType } from "@graphql/types.graphql";
import { getCompanyName } from "@utils/functions";
import { IFileWithTypename } from "../storybook/document-uploader/document-uploader";
import { Control, Controller } from "react-hook-form";
import CirclePlusIcon from "@assets/icons/circle-plus-icon";

interface IECProfileImageInputProps extends IECProfileImageUploaderProps {
  control: Control<any>;
  name: string;
}

const ECProfileImageInput: React.FC<IECProfileImageInputProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <ECProfileImageUploader {...field} {...props} />}
    />
  );
};

export default ECProfileImageInput;

interface IECProfileImageUploaderProps {
  className: string;
  onChange?: (f: IFile) => void;
  value?: IFile;
}

const ECProfileImageUploader: React.FC<IECProfileImageUploaderProps> = ({
  onChange,
  value,
  ...props
}) => {
  const [image, setImage] = useState<IFile>(value as any);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else if (!!image && onChange) onChange(image);
  }, [image]);

  const [uploadFiles, { loading }] = useUploadFilesMutation({});

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDropRejected: onDropRejected,
    onDrop: handleOnDrop,
  });

  async function handleOnDrop(acceptedFiles: File[]) {
    const { data } = await uploadFiles({
      variables: {
        input: {
          companyName: getCompanyName() as string,
          files: acceptedFiles,
          uploadsFileInputType: "image" as any,
          fileAccessControl: "PUBLIC_READ" as any,
        },
      },
    });
    const uploadedFiles = data?.uploadFiles;
    const accFiles = uploadedFiles?.map(
      ({ __typename, ...file }: IFileWithTypename) => file
    );
    if (accFiles && accFiles?.length > 0) setImage(accFiles[0]!);
  }

  function onDropRejected() {}

  return (
    <div {...props}>
      <div className="rounded-full border overflow-hidden shadow-lg bg-white w-24 h-24 flex-center">
        <div
          {...getRootProps({
            className: `w-full h-full flex-center
            ${loading ? "cursor-not-allowed" : "cursor-pointer "}`,
          })}
        >
          <input
            {...getInputProps({
              disabled: loading,
            })}
          />

          {loading && <Loader simple className="w-10 h-10" />}
          {!loading && !image && <CirclePlusIcon />}
          {/* // {loading ? (
          //   <Loader simple className="w-10 h-10" />
          // ) : (
          //   <ThreeDotIcon fill={!!image ? COLORS.WHITE : COLORS.GRAY.DEFAULT} />
          // )} */}

          {!loading && !!image && (
            <div className="relative overflow-hidden w-full h-full">
              {!loading && <Image src={image.url} layout="fill" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
