import { getDocumentAccept } from "@utils/functions";
import React from "react";
import {
  UseFormRegister,
  Control,
  FieldErrors,
  UseFormTrigger,
  UseFormGetValues,
} from "react-hook-form";
import DocumentInput from "../storybook/document-input";
import { ECFormValues } from "./ec-schema";

interface IECAdditionalInputProps {
  register: UseFormRegister<ECFormValues>;
  control: Control<ECFormValues>;
  errors?: FieldErrors<ECFormValues>;
  trigger: UseFormTrigger<ECFormValues>;
  getValues: UseFormGetValues<ECFormValues>;
}

const ECAdditionalInput: React.FC<IECAdditionalInputProps> = ({ control }) => {
  return (
    <div className="space-y-5 w-2/3">
      <DocumentInput
        label={"ec-gallery-input-label"}
        control={control}
        name="additional.gallery"
        accept="image/*"
        inputFileType="image"
        multiple
      />

      <DocumentInput
        label={"ec-certificates-input-label"}
        control={control}
        name="additional.certificates"
        accept={getDocumentAccept()}
        inputFileType="application"
        multiple
      />
    </div>
  );
};
export default ECAdditionalInput;
