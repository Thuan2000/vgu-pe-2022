import React from "react";
import { Control, Controller } from "react-hook-form";

import PPIPackageManager from "./ppi-package-manager";

interface IPackagePricingInputProps {
  control: Control<any>;
  name: string;
  onAbort: () => void;
}

const PackagePricingInput: React.FC<IPackagePricingInputProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return <PPIPackageManager {...field} {...props} />;
      }}
    />
  );
};
export default PackagePricingInput;
