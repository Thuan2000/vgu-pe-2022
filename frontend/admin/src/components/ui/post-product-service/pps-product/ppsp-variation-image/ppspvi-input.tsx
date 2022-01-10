import React from "react";
import { Control, Controller } from "react-hook-form";
import PPSPVIManager from "./ppspvi-manager";
import { IPostProductFormValues } from "../pps-product-interface";

interface IPPSPVIInputProps {
  control: Control<IPostProductFormValues>;
  name: string;
}

const PPSPVIInput: React.FC<IPPSPVIInputProps> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name as any}
      render={({ field: { onChange, value } }) => (
        <PPSPVIManager value={value} onChange={onChange} />
      )}
    />
  );
};
export default PPSPVIInput;
