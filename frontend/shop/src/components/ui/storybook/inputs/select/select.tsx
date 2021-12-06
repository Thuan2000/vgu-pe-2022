import React, { useState } from "react";
import ReactSelect, {
  ActionMeta,
  Props,
  RemoveValueActionMeta,
} from "react-select";
import { selectStyles } from "./select.styles";

export type Ref = any;

export interface ISelectProps extends Props {
  getInitialValue?: (option: any) => any;
  options: any[];
}

const REMOVE_VALUE_ACTION_META = {
  action: "remove-value",
  name: "location",
};

export const Select = React.forwardRef<Ref, ISelectProps>(
  (
    { isMulti, onChange, name, getInitialValue, options, value, ...props },
    ref
  ) => {
    // This is for showing values
    const [values, setValues] = useState<any[] | any>(value);

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
        <ReactSelect
          ref={ref}
          name={name}
          styles={selectStyles}
          openMenuOnFocus
          openMenuOnClick
          isMulti={isMulti}
          options={options}
          controlShouldRenderValue={!isMulti}
          onChange={isMulti ? handleChange : onChange}
          value={value}
          {...props}
        />
        {isMulti && (
          <div className="flex flex-wrap select-none mt-3">
            {values &&
              values.length &&
              values?.map((value: any, idx: number) => {
                const label = props?.getOptionLabel!(value);

                return (
                  <div
                    key={`${label}-select`}
                    className="flex cursor-default items-center border-primary text-primary border-2 mr-2 mb-2 bg-white rounded-3xl pl-2 text-sm"
                  >
                    {label}
                    <p
                      className="ml-2  text-sm font-semibold cursor-pointer hover:text-primary-hover hover:bg-gray-10 rounded-r-3xl pl-1 pr-2 transition-colors duration-150"
                      onClick={() => removeAValue(value)}
                    >
                      x
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
