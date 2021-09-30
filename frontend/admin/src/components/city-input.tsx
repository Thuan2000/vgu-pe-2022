import { IVietnamCity } from "@utils/vietnam-cities";
import React from "react";
import InputLabel from "./ui/storybook/inputs/input-label";
import SelectInput, { SelectInputProps } from "./ui/storybook/select-input";

interface ICityInput extends SelectInputProps {
  options: any[];
  numberQueue?: number;
  label?: string;
  note?: string;
  loading?: boolean;
  initialValue?: IVietnamCity;
  error?: string;
  getOptionLabel: (option: IVietnamCity) => string;
  getOptionValue: (option: IVietnamCity) => string;
}

const CityInput: React.FC<ICityInput> = ({
  options,
  getOptionLabel,
  label,
  numberQueue,
  control,
  name,
  note,
  error,
  loading,
  getOptionValue,
  ...props
}) => {
  return (
    <div>
      <InputLabel label={label} numberQueue={numberQueue} note={note} />
      <SelectInput
        options={options}
        control={control}
        name={name}
        isLoading={loading}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        className="my-6 w-full"
        {...props}
      />
      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};
export default CityInput;
