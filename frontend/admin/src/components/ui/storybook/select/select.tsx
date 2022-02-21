import XIcon from "@assets/icons/x-icon";
import { COLORS } from "@utils/colors";
import React, { useState } from "react";
import ReactSelect, {
  ActionMeta,
  Props,
  RemoveValueActionMeta,
} from "react-select";
import InputLabel, { IInputLabelProps } from "../inputs/input-label";
import ValidationError from "../validation-error";
import { selectStyles } from "./select.styles";
import { GetOptionLabel, GetOptionValue } from "react-select";
import { isArray } from "lodash";

export type Ref = any;

export interface ISelectProps extends Props, IInputLabelProps {
  getInitialValue?: (option: any) => any;
  options: any[];
  getOptionLabel: GetOptionLabel<any>;
  error?: string;
  loading?: boolean;
  getOptionValue: GetOptionValue<any>;
}

export const Select = React.forwardRef<Ref, ISelectProps>(
  (
    {
      label,
      labelFontSize,
      className,
      numberQueue,
      error,
      loading,
      queueBackground,
      note,
      isMulti,
      onChange,
      required,
      name,
      getInitialValue,
      options,
      value,
      maxMenuHeight,
      ...props
    },
    ref
  ) => {
    // This is for showing values
    const [values, setValues] = useState<any[] | any>(
      isArray(value) ? value : [value]
    );

    if (["string", "number"].includes(typeof value) && getInitialValue) {
      for (const opt of options || []) {
        if (getInitialValue(opt) && onChange) {
          onChange(opt, {} as any);
          break;
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleChange(e: any, actionMeta: ActionMeta<any>) {
      // For showing values purpose
      setValues(e);

      if (onChange) onChange(e, actionMeta);
    }

    // Called when the x on custom pil option clicked
    function removeAValue(value: any) {
      const actionMeta: RemoveValueActionMeta<any> = {
        name,
        action: "remove-value",
        removedValue: value,
      };
      const newValues = (values as any[]).filter((v) => value !== v);
      handleChange(newValues, actionMeta);
    }
    return (
      <div>
        {label && (
          <InputLabel
            queueBackground={queueBackground}
            label={label}
            labelFontSize={labelFontSize}
            numberQueue={numberQueue}
            note={note}
            required={required}
          />
        )}
        <div className={`${!!numberQueue && "ml-8"}`}>
          <ReactSelect
            ref={ref}
            name={name}
            styles={selectStyles}
            isMulti={isMulti}
            maxMenuHeight={maxMenuHeight || 245}
            options={options}
            isLoading={loading}
            controlShouldRenderValue={!isMulti}
            onChange={isMulti ? handleChange : onChange}
            {...props}
            value={value}
          />
          {!!values?.length && isMulti && (
            <div className="flex flex-wrap select-none mt-3">
              {values.map((value: any, idx: number) => {
                const label = props?.getOptionLabel!(value);
                return (
                  <div
                    key={`${label}-select`}
                    className="flex cursor-default items-center border-primary text-primary border-2 mr-2 mb-2 bg-white rounded-3xl pl-2 text-sm"
                  >
                    {label}
                    <p
                      className="ml-2 h-full flex-center  text-sm font-semibold cursor-pointer hover:text-primary-hover hover:bg-gray-10 rounded-r-3xl pl-1 pr-2 transition-colors duration-150"
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
          {error && <ValidationError message={error} />}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
