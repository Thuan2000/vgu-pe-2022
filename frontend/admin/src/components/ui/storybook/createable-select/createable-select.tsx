import XIcon from "@assets/icons/x-icon";
import { COLORS } from "@utils/colors";
import React, { useState, useEffect } from "react";
import { ActionMeta, Props } from "react-select";
import Createable from "react-select/creatable";
import InputErrorMessage from "../inputs/input-error";
import InputLabel, { IInputLabelProps } from "../inputs/input-label";
import {
  getCreateActionMeta,
  getSelectActionMeta,
  getRemoveActionMeta,
} from "./createable-utils";
import { createableStyles } from "./createable.style";

export interface ICreateableSelectProps extends Props, IInputLabelProps {
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
  error?: string;
  inputClassName?: string;
  trigger?: (name: string) => void;
  loading?: boolean;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => any;
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
      labelFontSize,
      error,
      loading,
      className,
      inputClassName,
      options: defaultOptions,
      createNewOption,
      onCreateOption,
      onChange,
      getOptionValue,
      getInitialValue,
      trigger,
      required,
      isMulti,
      value,
      maxMenuHeight,
      name,
      ...props
    }: ICreateableSelectProps,
    ref
  ) => {
    const [options, setOptions] = useState(defaultOptions || []);
    // For custom chips
    const [selectedValues, setSelectedValues] = useState<any[] | undefined>(
      isMulti ? value : (undefined as any)
    );

    useEffect(() => {
      if (!!defaultOptions.length) return;
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

    useEffect(() => {
      if (!props.defaultValue || isMulti) return;

      handleChange(props.defaultValue, getSelectActionMeta(props.defaultValue));
    }, []);

    function handleCreateOption(label: string) {
      if (loading) return;
      const newOption = createNewOption(label);
      const newOptions =
        options?.length > 0 ? [...options, newOption] : [newOption];

      setOptions(newOptions);

      handleChange(
        !!(value as any)?.length
          ? [...(value as any), newOption]
          : isMulti
          ? [newOption]
          : newOption,
        getSelectActionMeta(newOption)
      );

      if (onCreateOption) onCreateOption(label);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleChange(e: any, actionMeta: ActionMeta<any>) {
      // For showing values purpose
      if (isMulti) setSelectedValues(e);

      if (onChange) onChange(e, actionMeta);
    }

    // Called when the x on custom pil option clicked
    function removeAValue(value: any) {
      const newValues = (selectedValues as any[]).filter((v) => value !== v);
      handleChange(newValues, getRemoveActionMeta(value));
    }

    return (
      <div className={className}>
        {label && (
          <InputLabel
            numberQueue={numberQueue}
            label={label}
            note={note}
            required={required}
            name={name}
            labelFontSize={labelFontSize}
          />
        )}
        <div className={`${!!numberQueue && "ml-8"}`}>
          <Createable
            onChange={handleChange}
            onCreateOption={handleCreateOption}
            options={options}
            styles={createableStyles}
            closeMenuOnScroll
            className={`rounded-sm border shadow ${inputClassName}`}
            ref={ref as any}
            isOptionSelected={(option: any) =>
              isMulti ? selectedValues?.includes(option)! : option === value
            }
            value={value}
            isMulti={isMulti}
            name={name}
            maxMenuHeight={maxMenuHeight || 245}
            controlShouldRenderValue={!isMulti}
            {...props}
          />

          {!!selectedValues?.length && isMulti && (
            <div className="flex flex-wrap select-none mt-3">
              {selectedValues.map((value: any, idx: number) => {
                const label = props?.getOptionLabel!(value);

                return (
                  <div
                    key={`${label}-select`}
                    className="flex cursor-default items-center border-primary text-primary border-2 mr-2 mb-2 bg-white rounded-3xl pl-2 text-sm"
                  >
                    {label}
                    <p
                      className="ml-2 h-full flex-center text-sm font-semibold cursor-pointer hover:text-primary-hover hover:bg-gray-10 rounded-r-3xl pl-1 pr-2 transition-colors duration-150"
                      onClick={() => removeAValue(value)}
                    >
                      <XIcon
                        fill={COLORS.PRIMARY.DEFAULT}
                        className="w-2 h-2"
                      />
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <InputErrorMessage error={error} />
        </div>
      </div>
    );
  }
);

CreateableSelect.displayName = "CreateableSelect";

export default CreateableSelect;
