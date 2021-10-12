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
  label?: string;
  note?: string;
  error?: string;
  numberQueue?: number;
  loading?: boolean;
}
/**
 *
 * @param createNewOption function that take label, and return a new option
 *
 */
const CreateableSelect = ({
  options: defaultOptions,
  createNewOption,
  onCreateOption,
  onChange,
  label,
  numberQueue,
  note,
  error,
  loading,
  className,
  ...props
}: ICreateableSelectProps) => {
  const [options, setOptions] = useState(defaultOptions || []);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [loading, defaultOptions]);

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
        name={props.name}
      />
      <Createable
        onChange={onChange}
        onCreateOption={handleCreateOption}
        options={options}
        styles={createableStyles}
        {...props}
      />
      <InputErrorMessage error={error} />
    </div>
  );
};
export default CreateableSelect;
