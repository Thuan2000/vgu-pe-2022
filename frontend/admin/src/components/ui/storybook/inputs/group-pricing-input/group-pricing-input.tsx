import React from "react";
import { Control, Controller } from "react-hook-form";
import GPIForm from "./gpi-form";
import GPIManager from "./gpi-manager";

interface IGroupPricingInputProps {
  control: Control<any>;
  name: string;
}

const GroupPricingInput: React.FC<IGroupPricingInputProps> = ({
  control,
  name,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return <GPIManager {...field} />;
      }}
    />
  );
};
export default GroupPricingInput;
