import React, { InputHTMLAttributes } from "react";
import styles from "./checkbox.module.css";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  name?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, name, error, disabled, ...rest }, ref) => {
    return (
      <div className={`${disabled && "!cursor-not-allowed"} ${className}`}>
        <div className={`flex items-center`}>
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            className={styles.checkbox}
            disabled={disabled}
            {...rest}
          />

          <label htmlFor={name} className="text-sm">
            {label}
          </label>
        </div>

        {error && <p className="my-2 text-xs text-end text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
