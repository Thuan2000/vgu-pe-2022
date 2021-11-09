import React, { useRef } from "react";
import { Control, Controller } from "react-hook-form";
import Input from "./input";
import { IInputProps } from "./input-config";

interface IMaskInputProps extends IMasked {
  control: Control<any>;
  name: string;
}

const MaskInput: React.FC<IMaskInputProps> = ({
  control,
  name,
  onChange: inputOnChange,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => {
        return (
          <Masked
            onChange={(e: any) => {
              if (inputOnChange) inputOnChange(e);
              onChange(e);
            }}
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};

export default MaskInput;

interface IMasked extends Partial<IInputProps> {
  prefix?: string;
  suffix?: string;
  /**
   * Preventing typescript error
   */
  onChange?: any;
}

const Masked: React.FC<IMasked> = ({
  onChange,
  prefix,
  suffix,
  value,
  ...props
}) => {
  const firstRun = useRef(true);

  function getMaskedValue(value: string) {
    return `${prefix || ""}${value}${suffix || ""}`;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onChange) return;
    let value = e.target.value;
    value = value.replace(prefix || "", "");
    value = value.replace(suffix || "", "");

    if (!value || prefix?.includes(value)) onChange("");
    else onChange(getMaskedValue(value));
  }

  return (
    <div>
      <Input
        value={firstRun.current && !value ? prefix : value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
