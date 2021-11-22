import React from "react";

import { Controller } from "react-hook-form";
import DocumentUploader, { IDocumentUploaderProps } from "./document-uploader";

interface DocumentInputProps extends IDocumentUploaderProps {
  control: any;
  name: string;
}

const DocumentInput = ({
  control,
  name,
  onChange: inputOnChange,
  ...props
}: DocumentInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, ...rest } }) => (
        <>
          <DocumentUploader
            onChange={(e) => {
              onChange(e);
              if (inputOnChange) inputOnChange(e);
            }}
            {...rest}
            {...props}
          />
        </>
      )}
    />
  );
};

export default DocumentInput;
