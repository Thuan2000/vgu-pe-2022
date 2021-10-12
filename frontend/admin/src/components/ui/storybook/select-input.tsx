import React from "react";
import { GetOptionLabel, GetOptionValue } from "react-select";
import InputLabel from "./inputs/input-label";
import SelectController, { SelectControllerProps } from "./select-controller";

interface ISelectInput extends SelectControllerProps {
  options: any[];
  numberQueue?: number | string;
  label?: string;
  note?: string;
  loading?: boolean;
  initialValue?: any;
  queueBackground?: string;
  error?: string;
  getOptionLabel: GetOptionLabel<any>;
  getOptionValue: GetOptionValue<any>;
}

const SelectInput: React.FC<ISelectInput> = ({
  options,
  getOptionLabel,
  label,
  className,
  numberQueue,
  queueBackground,
  control,
  name,
  note,
  error,
  loading,
  getOptionValue,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <InputLabel
          queueBackground={queueBackground}
          label={label}
          numberQueue={numberQueue}
          note={note}
        />
      )}
      <SelectController
        options={options}
        control={control}
        name={name}
        isLoading={loading}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        {...props}
      />
      {error && <p className="my-2 text-xs text-start text-red-500">{error}</p>}
    </div>
  );
};
export default SelectInput;
