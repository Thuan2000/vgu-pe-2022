import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Control, Controller, RefCallBack } from "react-hook-form";

interface ImageInputProps extends Partial<ImageUploaderProps> {
  name: string;
  control: Control<any>;
  changePhotoLabel: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <ImageUploader {...field} {...props} />;
      }}
    />
  );
};

interface ImageUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  changePhotoLabel: string;
  value: any;
  onChange: (e: any) => void;
  onBlur: () => void;
  ref: RefCallBack;
}

const ImageUploader = React.forwardRef(
  (
    { onChange, onBlur, changePhotoLabel, value, ...props }: ImageUploaderProps,
    ref
  ) => {
    const [file, setFile] = useState<any>(value);
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: false,
      onDrop: async (accFiles) => {
        if (!accFiles) return;
        const file = accFiles[0];
        const localUrl = URL.createObjectURL(file);
        const addedLocalUrl = Object.assign(file, { localUrl });
        onChange(addedLocalUrl);
        setFile(addedLocalUrl);
      },
    });

    return (
      <div {...props}>
        <div
          className="w-full h-full relative rounded-sm overflow-hidden"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="object-cover w-full h-full"
            src={
              file?.localUrl ||
              "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/image-placeholder.jpg"
            }
            alt="image-preview"
          />
          <button
            ref={ref as any}
            type="button"
            className="w-full absolute bottom-0 bg-primary bg-opacity-70 py-3 border border-primary"
          >
            <p className="text-center text-white">{changePhotoLabel}</p>
          </button>
        </div>
      </div>
    );
  }
);

export default ImageInput;
