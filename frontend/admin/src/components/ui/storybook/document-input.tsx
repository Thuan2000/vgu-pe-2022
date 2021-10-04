import React from "react";

import { Controller } from "react-hook-form";
import DocumentUploader from "./document-uploader";
import ValidationError from "./validation-error";

interface DocumentInputProps {
  control: any;
  name: string;
  label?: string;
  accept: string;
  note?: string;
  numberQueue?: number;
  multiple?: boolean;
  error?: string;
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
