import React, { useState, useEffect } from "react";
import { CreateOptionActionMeta, Props } from "react-select";
import Createable from "react-select/creatable";
import InputErrorMessage from "../inputs/input-error";
import InputLabel from "../inputs/input-label";
import { createableStyles } from "./createable.style";

export interface ICreateableSelectProps extends Props {
  options: any[];
  /**
   * A function that take label as param and do whatever void
   */
  onCreateOption?: (label: string) => void;
  /**
   * A function that take label as param and return a new option
   */
  createNewOption: (label: string) => any;
  getInitialValue?: (option: any) => any;
  label?: string;
  note?: string;
  error?: string;
  required?: boolean;
  numberQueue?: number;
  trigger?: (name: string) => void;
  loading?: boolean;
}
/**
 *
 * @param createNewOption function that take label, and return a new option
 *
 */
const CreateableSelect = React.forwardRef(
  (
    {
      label,
      numberQueue,
      note,
      error,
      loading,
      className,
      options: defaultOptions,
      createNewOption,
      onCreateOption,
      onChange,
      getOptionValue,
      getInitialValue,
      trigger,
      required,
      value,
      ...props
    }: ICreateableSelectProps,
    ref
  ) => {
    const [options, setOptions] = useState(defaultOptions || []);

    useEffect(() => {
      setOptions(defaultOptions);
    }, [loading, defaultOptions]);
    if (["string", "number"].includes(typeof value) && getInitialValue) {
      for (const opt of options || []) {
        if (getInitialValue(opt) && onChange) {
          onChange(opt, {} as any);
          break;
        }
      }
    }

    function handleCreateOption(label: string) {
      if (loading) return;
      const newOption = createNewOption(label);
      const newOptions =
        options?.length > 0 ? [...options, newOption] : [newOption];

      setOptions(newOptions);

      const createMeta: CreateOptionActionMeta<any> = {
        action: "create-option",
        option: newOption,
      };

      if (onChange) onChange(newOption, createMeta);

      if (onCreateOption) onCreateOption(label);
    }

    return (
      <div className={className}>
        <InputLabel
          numberQueue={numberQueue}
          label={label}
          note={note}
          required={required}
          name={props.name}
        />
        <div className={`${!!numberQueue && "ml-8"}`}>
          <Createable
            onChange={onChange}
            onCreateOption={handleCreateOption}
            options={options}
            styles={createableStyles}
            ref={ref as any}
            isOptionSelected={(option: any) => option === value}
            value={value}
            {...props}
          />

          <InputErrorMessage error={error} />
        </div>
      </div>
    );
  }
);

CreateableSelect.displayName = "CreateableSelect";

export default CreateableSelect;
