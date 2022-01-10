import React, { ChangeEvent } from "react";
import { isEmpty } from "lodash";
import { Control, Controller } from "react-hook-form";
import InputLabel, { IInputLabelProps } from "../input-label";
import styles from "./switch-input.module.css";

interface ISwitchInputProps extends ISwitchProps {
  control: Control<any>;
  name: string;
}

const SwitchInput: React.FC<ISwitchInputProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Switch onChange={onChange} value={value} {...props} />
      )}
    />
  );
};

interface ISwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelProps: IInputLabelProps;
}

export const Switch: React.FC<ISwitchProps> = ({
  labelProps,
  name,
  value = false,
  onChange,
  ...props
}) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e.target.checked as any);
  }

  function toggleSwitch() {
    if (onChange) onChange(!value as any);
  }

  return (
    <div className={`fic`}>
      {!isEmpty(labelProps) && (
        <InputLabel
          className={`translate-y-1 mr-2 ${labelProps.className}`}
          {...labelProps}
        />
      )}
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition-all duration-200">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={(value as any) || false}
          className={`${styles["toggle-checkbox"]} ease-in transition-all duration-200 absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
          onChange={toggleSwitch}
          {...props}
        />
        <label
          htmlFor={name || "toggle-input-name"}
          onClick={toggleSwitch}
          className={`${styles["toggle-label"]} ease-in transition-all duration-200 block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}
        ></label>
      </div>
    </div>
  );
};
export default SwitchInput;
