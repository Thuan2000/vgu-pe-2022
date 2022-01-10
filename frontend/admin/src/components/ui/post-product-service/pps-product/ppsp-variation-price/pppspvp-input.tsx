import React from "react";
import { IPostProductFormValues } from "../pps-product-interface";
import {
  Control,
  Controller,
  FieldName,
  InternalFieldName,
} from "react-hook-form";
import PPSPVPManager from "./pppspvp-manager";

interface IPPSPVPInputProps {
  control: Control<IPostProductFormValues>;
  name: FieldName<IPostProductFormValues>;
}

const PPSPVPInput: React.FC<IPPSPVPInputProps> = ({
  name,
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field: { onChange, value } }) => (
        <PPSPVPManager onChange={onChange} value={value} {...props} />
      )}
    />
  );
};
export default PPSPVPInput;
