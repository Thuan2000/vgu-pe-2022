import { IVietnamCity, vietnamProvinces } from "@utils/vietnam-cities";
import React from "react";
import SelectInput, { ISelectInput } from "../storybook/select-input";

interface ILocationInputProps extends Partial<ISelectInput> {
  getOptionValue?: (e: IVietnamCity) => string;
  getOptionLabel?: (e: IVietnamCity) => string;
}

const LocationInput: React.FC<ILocationInputProps> = ({ ...props }) => {
  return (
    <div>
      <SelectInput
        {...(props as any)}
        options={vietnamProvinces}
        getOptionLabel={(e: IVietnamCity) => e.name}
        getOptionValue={(e: IVietnamCity) => e.name}
      />
    </div>
  );
};
export default LocationInput;
