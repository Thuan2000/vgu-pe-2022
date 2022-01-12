import React from "react";

import { Controller } from "react-hook-form";
import DocumentUploader from "./document-uploader";
import { IDocumentUploaderProps } from "./document-uploader/document-uploader";

interface DocumentInputProps extends IDocumentUploaderProps {
  control: any;
  name: string;
  className?: string;
}

const DocumentInput = ({
  control,
  name,
  onChange: inputOnChange,
  className,
  ...props
}: DocumentInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value, ...rest } }) => (
        <div className={className}>
          <DocumentUploader
            onChange={(e) => {
              onChange(e);
              if (inputOnChange) inputOnChange(e);
            }}
            value={value}
            {...rest}
            {...props}
          />
        </div>
      )}
    />
  );
};

export default DocumentInput;
