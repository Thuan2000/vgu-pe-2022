import React from "react";

import { Controller } from "react-hook-form";
import DocumentUploader, { IDocumentUploaderProps } from "./document-uploader";
import ValidationError from "./validation-error";

interface DocumentInputProps extends IDocumentUploaderProps {
  control: any;
  name: string;
}

const DocumentInput = ({ control, name, ...props }: DocumentInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <>
          <DocumentUploader {...rest} {...props} />
          <ValidationError message={props.error} />
        </>
      )}
    />
  );
};

export default DocumentInput;
